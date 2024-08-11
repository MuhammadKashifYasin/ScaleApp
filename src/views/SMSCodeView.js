import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  NativeModules,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import LinearGradient from 'react-native-linear-gradient';
import {Config} from '../config/Config';
import {verifySmsCode, registerUser} from '../service/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class SMSCodeView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
      countDown: 59,
      noMoreNeeded: false,
    };

    this.verifySmsCode = this.verifySmsCode.bind(this);
  }

  componentDidMount() {
    this.startCountDown();
  }

  verifySmsCode(code) {
    // this.props.navigation.navigate('EmailView');

    if (code === Config.SMSCode) {
      verifySmsCode(Config.PhoneNumber, Config.SMSCode)
        .then(res => {
          console.log('heell', res);
          this.setState({noMoreNeeded: true});
          AsyncStorage.setItem('authToken', res.auth_token);
          AsyncStorage.setItem('verifiedThroughSms', '1');
          Config.AuthToken = res.auth_token;
          this.props.navigation.navigate('EmailView');
        })
        .catch(err => {
          console.log('Error11', err);
        });
    } else {
      console.log('error123');
    }
  }

  sendAgain() {
    if (!this.state.noMoreNeeded) {
      registerUser(Config.PhoneNumber)
        .then(res => {
          console.log(res);
          Config.SMSCode = res.sms_code;
          this.startCountDown();
          this.forceUpdate();
        })
        .catch(err => {
          console.log('Error33', err);
        });
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

  startCountDown() {
    this.setState({countDown: 59});
    this.timer = setInterval(() => {
      if (this.state.countDown == 0) {
        clearInterval(this.timer);
        this.sendAgain();
      } else {
        this.setState({countDown: this.state.countDown - 1});
        this.forceUpdate();
      }
    }, 1000);
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={styles.mainContainer}>
          <HeaderWithSteps
            onPress={() => this.props.navigation.navigate('PhoneNumberView')}
          />
          <KeyboardAvoidingView
            style={{flex: 1, flexDirection: 'column'}}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            enabled
            keyboardVerticalOffset={100}
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                marginTop: 50,
              }}>
              <Text style={[styles.textStyle, {marginBottom: 10}]}>
                {translate('SMSCodeView.Text1')}
                {'\n'}
                {translate('SMSCodeView.Text2')}
              </Text>
              <View
                style={[{flexDirection: 'column', justifyContent: 'center'}]}>
                <View style={styles.sectionSMSCode}>
                  <SmoothPinCodeInput
                    placeholder=""
                    cellStyle={{
                      borderWidth: 2,
                      borderRadius: 20.5,
                      borderColor: '#F4F6FA',
                      backgroundColor: '#fff',
                    }}
                    cellStyleFocused={{
                      borderColor: 'darkorange',
                      backgroundColor: '#F2F2F2',
                    }}
                    textStyle={{
                      fontSize: 24,
                      fontWeight: 'bold',
                      color: '#000',
                    }}
                    textStyleFocused={{
                      color: '#000',
                    }}
                    value={this.state.code}
                    onTextChange={code => this.setState({code})}
                  />
                </View>
                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                  <Text style={[styles.textStyleSmall, {marginTop: 10}]}>
                    {translate('SMSCodeView.Text3')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() => this.sendAgain()}>
                  <Text
                    style={
                      (styles.textStyleSmall,
                      {color: '#219653', textAlign: 'center'})
                    }>
                    {translate('SMSCodeView.Text4')} {this.state.countDown}s
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{position: 'absolute', bottom: 10}}>
            <View style={{marginBottom: 10}}>
              <TouchableOpacity
                onPress={() => this.verifySmsCode(this.state.code)}>
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
                  <Text
                    style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                    {translate('common.continue')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
