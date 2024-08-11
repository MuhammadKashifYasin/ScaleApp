import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import SplashScreen from 'react-native-splash-screen';
import firebase from '@react-native-firebase/app';
// import {NavigationActions, StackActions} from 'react-navigation';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import type, {
  RemoteMessage,
  Notification,
  NotificationOpen,
} from '@react-native-firebase/app';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
const Stack = createStackNavigator();
const {styles} = Styles;

export default class SplashView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userDetails: {},
    };
  }

  componentWillUnmount() {
    // this.createNotificationListeners();
  }

  componentDidMount() {
    this.createNotificationListeners();
    this.userAuthentication();
  }

  async createNotificationListeners() {
    console.log('createNotificationListeners');
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    const notificationListener = firebase
      .notifications()
      .onNotification(notificationResponse => {
        var notif = JSON.stri;
        console.log('this is done' + notificationResponse);
        if (notificationResponse.data) {
          const channel = new firebase.notifications.Android.Channel(
            'default',
            'vtrChannel',
            firebase.notifications.Android.Importance.High,
          )
            .setDescription('vtrChannel')
            .setSound(notificationResponse.data.sound);

          firebase.notifications().android.createChannel(channel);

          const notification = new firebase.notifications.Notification()
            .setTitle(notificationResponse.data.title)
            .setBody(notificationResponse.data.message)
            .setSound(notificationResponse.data.sound);

          if (Platform.OS === 'android') {
            notification._android._channelId = 'default';
          }

          firebase.notifications().displayNotification(notification);
          // this.showAlert(title, body, phone);
        }
        // this.showAlert(title, body);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    const notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        if (notificationOpen) {
          console.log('this is notification open' + notificationOpen);
          if (notificationOpen.notification.data) {
            const channel = new firebase.notifications.Android.Channel(
              'vtrChannel',
              'vtrChannel',
              firebase.notifications.Android.Importance.High,
            )
              .setDescription('vtrChannel')
              .setSound(notificationOpen.notification.data.sound);

            firebase.notifications().android.createChannel(channel);

            const notification = new firebase.notifications.Notification()
              .setTitle(notificationOpen.notification.data.title)
              .setBody(notificationOpen.notification.data.message)
              .setSound(notificationOpen.notification.data.sound);

            if (Platform.OS === 'android') {
              notification._android._channelId = 'default';
            }

            firebase.notifications().displayNotification(notification);
            // this.showAlert(title, body, phone);
          }
        }
        // this.showAlert(title, body);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      console.log('this is notification open' + notificationOpen);
      if (notificationOpen.notification.data) {
        const channel = new firebase.notifications.Android.Channel(
          'vtrChannel',
          'vtrChannel',
          firebase.notifications.Android.Importance.High,
        )
          .setDescription('vtrChannel')
          .setSound(notificationOpen.notification.data.sound);

        firebase.notifications().android.createChannel(channel);

        const notification = new firebase.notifications.Notification()
          .setTitle(notificationOpen.notification.data.title)
          .setBody(notificationOpen.notification.data.message)
          .setSound(notificationOpen.notification.data.sound);

        if (Platform.OS === 'android') {
          notification._android._channelId = 'default';
        }

        firebase.notifications().displayNotification(notification);
        // this.showAlert(title, body, phone);
      }
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase
      .messaging()
      .onMessage(notificationResponse => {
        //process data message
        console.log(notificationResponse);
        if (notificationResponse.data) {
          const channel = new firebase.notifications.Android.Channel(
            'vtrChannel',
            'vtrChannel',
            firebase.notifications.Android.Importance.High,
          )
            .setDescription('vtrChannel')
            .setSound(notificationResponse.data.sound);

          firebase.notifications().android.createChannel(channel);

          const notification = new firebase.notifications.Notification()
            .setTitle(notificationResponse.data.title)
            .setBody(notificationResponse.data.message)
            .setSound(notificationResponse.data.sound);

          if (Platform.OS === 'android') {
            notification._android._channelId = 'default';
          }

          firebase.notifications().displayNotification(notification);
          // this.showAlert(title, body, phone);
        }
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

  async userAuthentication() {
    // await AsyncStorage.setItem('authToken', '00846f0fc8bae8004da64e337b5c8cffd6a6f4cdd45df6e729edddb93a4039c6');
    // await AsyncStorage.setItem('phoneNumber', '9725286369874');
    // await AsyncStorage.setItem('verifiedThroughSms', "1");
    // let authToken = '00846f0fc8bae8004da64e337b5c8cffd6a6f4cdd45df6e729edddb93a4039c6';
    // let phoneNumber = '9725286369874';
    // let registrationProcess = true;

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');
    let registrationProcess = await AsyncStorage.getItem('registrationProcess');
    let verifiedThroughSms = await AsyncStorage.getItem('verifiedThroughSms');

    if (authToken && phoneNumber && registrationProcess) {
      const resetAction = StackActions.reset({
        index: 0,
        key: null,
        // actions: [NavigationActions.navigate({routeName: 'HomeView'})],
      });
      this.props.navigation.dispatch(resetAction);
      SplashScreen.hide();
    } else if (phoneNumber && verifiedThroughSms) {
      await this.getUserInfo(phoneNumber, authToken);
    } else if (phoneNumber && !verifiedThroughSms) {
      this.props.navigation.navigate('SMSCodeView');
      SplashScreen.hide();
    } else {
      this.props.navigation.navigate('WelcomeView');
      SplashScreen.hide();
    }
  }

  getUserInfo(phoneNumber, authToken) {
    let formdata = new FormData();
    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);

    getUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.setState({userDetails: res.user_details});
        switch (res.user_details.signup_state) {
          case 1:
            this.props.navigation.navigate('PasswordView');
            SplashScreen.hide();
            break;

          case 2:
            this.props.navigation.navigate('SyncWeightView');
            SplashScreen.hide();
            break;

          case 3:
            this.props.navigation.navigate('HeightView');
            SplashScreen.hide();
            break;

          case 4:
            this.props.navigation.navigate('GenderView');
            SplashScreen.hide();
            break;

          case 5:
            this.props.navigation.navigate('AgeView');
            SplashScreen.hide();
            break;

          case 6:
            this.props.navigation.navigate('FitnessView');
            SplashScreen.hide();
            break;

          case 7:
            this.props.navigation.navigate('GoalView');
            SplashScreen.hide();
            break;

          case 8:
            this.props.navigation.navigate('PhotoView');
            SplashScreen.hide();
            break;

          case 9:
            this.props.navigation.navigate('SleepReminderView');
            SplashScreen.hide();
            break;

          case 10:
            this.props.navigation.navigate('SuccessView');
            SplashScreen.hide();
            break;

          case 11:
            this.props.navigation.navigate('TutorialView');
            SplashScreen.hide();
            break;

          default:
            this.props.navigation.navigate('EmailView');
            SplashScreen.hide();
        }
      })
      .catch(err => {
        console.log('Error', err);
        this.props.navigation.navigate('WelcomeView');
        SplashScreen.hide();
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView>
          <View>
            <View
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}></View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
