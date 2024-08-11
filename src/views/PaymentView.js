import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  NativeModules,
  Linking,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
export default class PaymentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordShow: false,
    };
  }

  async openLink() {
    this.props.navigation.navigate('ApprovedAccountView');
    try {
      const url = 'http://scale-app.com/';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url);
      } else Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  getSystemLocale() {
    let locale = '';
    // iOS
    if (
      NativeModules.SettingsManager &&
      NativeModules.SettingsManager.settings &&
      NativeModules.SettingsManager.settings.AppleLanguages
    ) {
      locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
      // Android
    } else if (NativeModules.I18nManager) {
      locale = NativeModules.I18nManager.localeIdentifier;
    }

    if (typeof locale === 'undefined') {
      console.log('Couldnt get locale');
      return 'en';
    }

    return locale;
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView
          style={[styles.mainContainer, {backgroundColor: 'white'}]}>
          <TouchableOpacity
            style={{top: 50, left: 25, position: 'absolute'}}
            onPress={() => this.props.navigation.navigate('PasswordView')}>
            <Icon
              name="arrow-left"
              size={18}
              backgroundColor="#F2F2F2"
              color="#2a292b"></Icon>
          </TouchableOpacity>

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              marginBottom: 20,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Image source={require('../img/payment_main_img.png')}></Image>
            <Text style={[styles.textStyle, {alignSelf: 'center'}]}>
              {translate('PaymentView.Text1')} {'\n'}
              {translate('PaymentView.Text2')}
            </Text>
            <Text
              style={[
                styles.textStyleSmall,
                {color: '#9C9EB9', textAlign: 'center', marginBottom: 20},
              ]}>
              {translate('PaymentView.Text3')} {'\n'}
              {translate('PaymentView.Text4')}
            </Text>
            <View style={[styles.yearlySubscription]}>
              <LinearGradient
                colors={['#63D7E6', '#77E365']}
                style={{
                  borderRadius: 50,
                  marginRight: 10,
                  width: 22,
                  height: 22,
                  alignItems: 'center',
                }}>
                <Icon
                  name="check"
                  style={{fontSize: 12, color: '#fff', marginTop: 4}}
                />
              </LinearGradient>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  justifyContent: 'center',
                }}>
                {this.getSystemLocale() === 'he-US' ? '₪899' : '$149.99'}
                <Text
                  style={{fontSize: 14, fontWeight: 'normal', marginRight: 10}}>
                  /{translate('PaymentView.Text5')}{' '}
                </Text>
              </Text>
              <View
                style={{
                  backgroundColor: '#E9F7E4',
                  borderRadius: 15.5,
                  height: 25,
                  width: 120,
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 12, fontWeight: 'bold', marginTop: 5}}>
                  1 {translate('PaymentView.Text6')}
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.textStyleSmall,
                {color: 'black', alignSelf: 'center'},
              ]}>
              {translate('PaymentView.Text7')}
            </Text>
            <Text
              style={[
                styles.textStyleSmall,
                {color: '#9C9EB9', textAlign: 'center', marginBottom: 20},
              ]}>
              {translate('PaymentView.Text8')}
            </Text>
            <TouchableOpacity onPress={() => this.openLink()} style={{}}>
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
                  {translate('common.purchase')}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
