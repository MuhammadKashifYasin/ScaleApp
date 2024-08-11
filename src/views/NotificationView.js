import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeView from './HomeView';
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import firebase from '@react-native-firebase/app';
import {i18n} from '../common/i18n';
import Icon from 'react-native-vector-icons/FontAwesome5';
import memoize from 'lodash.memoize';
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

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class NotificationView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async approveNotification() {
    this.checkPermission();
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('registration_process', 1);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        AsyncStorage.setItem('registrationProcess', '1');
        this.props.navigation.navigate('HomeView');
      })
      .catch(err => {
        console.log('Error', err);
      });
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
            this.props.navigation.navigate('HomeView');
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
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={styles.mainContainer}>
          <HeaderWithSteps onPress={() => this.props.navigation.goBack()} />

          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginTop: 10,
              height: '40%',
              justifyContent: 'center',
            }}>
            <Text style={[styles.textStyle, {}]}>
              {translate('NotificationView.Text1')}
              {'\n'} {translate('NotificationView.Text2')}
            </Text>
            <ImageBackground
              source={require('../img/Phone.png')}
              style={{marginTop: 10, width: 319, height: 199}}>
              <View
                style={{
                  flexDirection: 'row',
                  height: 50,
                  width: 285,
                  backgroundColor: '#fff',
                  position: 'absolute',
                  top: 95,
                  left: 10,
                }}>
                <View>
                  <Svg
                    width="65"
                    height="60"
                    viewBox="0 0 241 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M56.2306 14.8865C55.7152 7.92889 61.2211 2 68.1978 2H96.4238H122.002H146.468H175.566C182.63 2 188.166 8.07211 187.515 15.1064L178.616 111.214C178.045 117.386 172.866 122.107 166.667 122.107H75.3168C69.0333 122.107 63.8138 117.26 63.3496 110.994L56.2306 14.8865Z"
                      fill="#EEFFF3"
                    />
                    <Path
                      d="M131.68 19.3269C132.036 18.2814 131.478 17.1449 130.432 16.7885C129.387 16.4321 128.25 16.9907 127.894 18.0362L131.68 19.3269ZM88.8365 37.0912L90.7914 37.5138L88.8365 37.0912ZM187.515 15.1064L185.523 14.922L187.515 15.1064ZM185.523 14.922L176.625 111.029L180.607 111.398L189.506 15.2908L185.523 14.922ZM166.667 120.107H75.3168V124.107H166.667V120.107ZM65.3441 110.846L58.2251 14.7387L54.236 15.0342L61.3551 111.141L65.3441 110.846ZM122.002 4H146.468V0H122.002V4ZM146.468 4H175.566V0H146.468V4ZM144.514 2.42267L152.101 37.5138L156.011 36.6685L148.423 1.57733L144.514 2.42267ZM68.1978 4H96.4238V0H68.1978V4ZM96.4238 4H122.002V0H96.4238V4ZM90.7914 37.5138L98.3786 2.42267L94.469 1.57733L86.8817 36.6685L90.7914 37.5138ZM149.169 41.1478H121.446V45.1478H149.169V41.1478ZM121.446 41.1478H93.7236V45.1478H121.446V41.1478ZM123.339 43.7932L131.68 19.3269L127.894 18.0362L119.553 42.5025L123.339 43.7932ZM86.8817 36.6685C85.9388 41.0295 89.2618 45.1478 93.7236 45.1478V41.1478C91.8114 41.1478 90.3873 39.3828 90.7914 37.5138L86.8817 36.6685ZM75.3168 120.107C70.0806 120.107 65.7309 116.068 65.3441 110.846L61.3551 111.141C61.8966 118.452 67.986 124.107 75.3168 124.107V120.107ZM176.625 111.029C176.148 116.173 171.833 120.107 166.667 120.107V124.107C173.899 124.107 179.941 118.599 180.607 111.398L176.625 111.029ZM152.101 37.5138C152.505 39.3828 151.081 41.1478 149.169 41.1478V45.1478C153.63 45.1478 156.953 41.0295 156.011 36.6685L152.101 37.5138ZM189.506 15.2908C190.266 7.08413 183.808 0 175.566 0V4C181.453 4 186.066 9.0601 185.523 14.922L189.506 15.2908ZM58.2251 14.7387C57.7956 8.94074 62.3839 4 68.1978 4V0C60.0584 0 53.6347 6.91704 54.236 15.0342L58.2251 14.7387Z"
                      fill="black"
                    />
                    <Path
                      d="M136.786 2H122.002H106.107C100.456 2 95.5717 5.94147 94.3777 11.464L88.8366 37.0912C88.1631 40.2062 90.5367 43.1478 93.7237 43.1478H121.446H149.169C152.356 43.1478 154.729 40.2062 154.056 37.0912L148.515 11.464C147.321 5.94147 142.436 2 136.786 2Z"
                      fill="white"
                    />
                    <Path
                      d="M148.515 11.464L146.56 11.8867L148.515 11.464ZM154.056 37.0912L156.011 36.6685L154.056 37.0912ZM88.8366 37.0912L90.7915 37.5138L88.8366 37.0912ZM94.3777 11.464L92.4228 11.0413L94.3777 11.464ZM131.68 19.3269C132.036 18.2814 131.478 17.1449 130.432 16.7885C129.387 16.4321 128.25 16.9907 127.894 18.0362L131.68 19.3269ZM122.002 4H136.786V0H122.002V4ZM146.56 11.8867L152.101 37.5138L156.011 36.6685L150.47 11.0413L146.56 11.8867ZM106.107 4H122.002V0H106.107V4ZM90.7915 37.5138L96.3325 11.8867L92.4228 11.0413L86.8818 36.6685L90.7915 37.5138ZM149.169 41.1478H121.446V45.1478H149.169V41.1478ZM121.446 41.1478H93.7237V45.1478H121.446V41.1478ZM123.339 43.7932L131.68 19.3269L127.894 18.0362L119.553 42.5025L123.339 43.7932ZM106.107 0C99.5148 0 93.8159 4.59838 92.4228 11.0413L96.3325 11.8867C97.3275 7.28456 101.398 4 106.107 4V0ZM86.8818 36.6685C85.9389 41.0295 89.2619 45.1478 93.7237 45.1478V41.1478C91.8115 41.1478 90.3874 39.3828 90.7915 37.5138L86.8818 36.6685ZM152.101 37.5138C152.505 39.3828 151.081 41.1478 149.169 41.1478V45.1478C153.631 45.1478 156.954 41.0295 156.011 36.6685L152.101 37.5138ZM136.786 4C141.494 4 145.565 7.28456 146.56 11.8867L150.47 11.0413C149.077 4.59838 143.378 0 136.786 0V4Z"
                      fill="black"
                    />
                  </Svg>
                </View>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={{
                      color: '#2D3142',
                      fontSize: 16,
                      fontWeight: 'bold',
                    }}>
                    ScaleApp
                  </Text>
                  <Text>You have achieved your goal</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              height: 134,
              width: 331,
              alignSelf: 'center',
              marginBottom: 97,
            }}>
            <View
              style={{flexDirection: 'row', height: 22, alignItems: 'center'}}>
              <Icon
                name="check"
                size={25}
                backgroundColor="#F2F2F2"
                color="#9C9EB9"></Icon>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2D3142',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 15,
                }}>
                New weekly healthy reminder
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.0649626)',
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <View
              style={{flexDirection: 'row', height: 22, alignItems: 'center'}}>
              <Icon
                name="check"
                size={25}
                backgroundColor="#F2F2F2"
                color="#9C9EB9"></Icon>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2D3142',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 15,
                }}>
                Motivational reminder
              </Text>
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0, 0, 0, 0.0649626)',
                marginTop: 20,
                marginBottom: 20,
              }}
            />
            <View
              style={{flexDirection: 'row', height: 22, alignItems: 'center'}}>
              <Icon
                name="check"
                size={25}
                backgroundColor="#F2F2F2"
                color="#9C9EB9"></Icon>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#2D3142',
                  fontSize: 16,
                  fontWeight: '500',
                  marginLeft: 15,
                }}>
                Personalised program
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.approveNotification()}
            style={{marginTop: 20}}>
            <LinearGradient
              angleCenter={{x: 0.5, y: 1.5}}
              angle={90}
              useAngle={true}
              colors={['#63D7E6', '#77E365']}
              style={{
                borderRadius: 50,
                marginRight: 10,
                width: 331,
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 12},
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 5,
              }}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                {translate('common.continue')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={[
                styles.textStyleSmall,
                {color: '#7265E3', alignSelf: 'center', marginTop: 20},
              ]}>
              {translate('common.notNow')}
            </Text>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
