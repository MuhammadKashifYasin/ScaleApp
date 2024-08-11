import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  I18nManager,
  View,
  Text,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '@react-native-firebase/app';
import type, {
  RemoteMessage,
  Notification,
  NotificationOpen,
} from 'react-native-firebase/app';
import {getUserDetails, updateUserDetails} from './src/service/Api';
import {Config} from './src/config/Config';
import AppNavigator from './src/app_navigator/AppNavigator';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import SplashScreen from 'react-native-splash-screen';
import * as RNLocalize from 'react-native-localize';

import {NavigationContainer} from '@react-navigation/native';
import {setI18nConfig} from './src/common/i18n';

const ReactNative = require('react-native');

// Function to set up i18n configuration

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {},
      rootPage: '',
    };
    Text.defaultProps = {};
    Text.defaultProps.allowFontScaling = false;
    setI18nConfig();
  }

  componentWillUnmount() {
    // this.checkPermission();
    // this.notificationListener();
    // this.createNotificationListeners();
    RNLocalize.addEventListener('change', this.handleLocalizationChange);
  }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  }

  //3
  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        let fcmTok = firebase.messaging().ios.getAPNSToken();
        console.log(fcmTok);
        console.log(fcmToken);
        let authToken = await AsyncStorage.getItem('authToken');
        let phoneNumber = await AsyncStorage.getItem('phoneNumber');

        let formdata = new FormData();

        formdata.append('phone_number', phoneNumber);
        formdata.append('auth_token', authToken);
        formdata.append('push_notification_token', fcmToken);

        updateUserDetails(formdata)
          .then(res => {
            console.log(res);
            this.navigatorRef.navigate('HomeView');
          })
          .catch(err => {
            console.log('Error', err);
          });

        await AsyncStorage.setItem('fcmToken', fcmToken);
      }
    }
  }

  //2
  async requestPermission() {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected');
    }
  }

  async componentDidMount() {
    try {
      ReactNative.I18nManager.allowRTL(false);
    } catch (e) {
      console.log(e);
    }
    RNLocalize.removeEventListener('change', this.handleLocalizationChange);
    // this.createNotificationListeners();
  }

  handleLocalizationChange() {
    setI18nConfig();
    this.forceUpdate();
  }

  async createNotificationListeners() {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    const notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        console.log('this is done' + notification);
        const {title, body} = notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        console.log('this is opened notification listerner' + notification);
        const {title, body} = notificationOpen.notification;
        this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      console.log('this is notification open' + notificationOpen);
      const {title, body} = notificationOpen.notification;
      this.showAlert(title, body);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  showAlert(title, body) {
    Alert.alert(
      title,
      body,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
  }

  render() {
    return (
      <NavigationContainer
        ref={ref => {
          this.navigatorRef = ref;
        }}>
        <AppNavigator />
      </NavigationContainer>
    );
  }
}
