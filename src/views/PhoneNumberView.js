import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Dimensions,
  PixelRatio,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import CountryPicker from 'react-native-country-picker-modal';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import {registerUser} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';
// import CustomTextInput from 'react-native-stylized-placeholder';

const translate = memoize((key, config) => i18n.t(key, config));
const {height, width} = Dimensions.get('window');
const {styles} = Styles;
const intendedFontSize = 12;

var validate = require('../validate.js');

export default class PhoneNumberView extends React.Component {
  constructor() {
    super();
    this.state = {
      countryCode: 'IL',
      phoneCode: '972',
      phone: '',
      phoneError: false,
    };
  }

  onPressFlag() {
    this.myCountryPicker.open();
  }

  selectCountry(country) {
    this.phone.selectCountry(country.iso2);
  }

  onSelectCountry(country) {
    this.setState({
      countryCode: country['cca2'],
      phoneCode: country['callingCode'],
    });
    this.forceUpdate();
  }

  // async sendSmsCode() {
  //   console.log('Phone number:', this.state.phone);
  //   const phoneNumberError = validate.isEmpty(this.state.phone);
  //   this.setState({phoneError: phoneNumberError});
  //   if (!phoneNumberError) {
  //     try {
  //       await AsyncStorage.setItem(
  //         'phoneNumber',
  //         this.state.phoneCode + this.state.phone,
  //       );
  //       const res = await registerUser(this.state.phoneCode + this.state.phone);
  //       console.log('Response from registerUser:', res);
  //       Config.PhoneNumber = this.state.phoneCode + this.state.phone;
  //       Config.SMSCode = res.sms_code;
  //       this.props.navigation.navigate('SMSCodeView');
  //     } catch (err) {
  //       console.log('Error in sendSmsCode:', err);
  //     }
  //   }
  // }

  async sendSmsCode() {
    console.log(this.state.phone);
    const phoneNumberError = validate.isEmpty(this.state.phone);
    this.setState({phoneError: phoneNumberError});
    if (!phoneNumberError) {
      try {
        await AsyncStorage.setItem(
          'phoneNumber',
          this.state.phoneCode + this.state.phone,
        );
        const res = await registerUser(this.state.phoneCode + this.state.phone);
        console.log('phone1');
        console.log('phone2');
        console.log('phone3', res);
        Config.PhoneNumber = this.state.phoneCode + this.state.phone;
        Config.SMSCode = res.sms_code;
        this.props.navigation.navigate('SMSCodeView');
      } catch (err) {
        console.log('Error55', err);
      }
    }
  }

  onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        // your call back function
        alert('please enter numbers only');
      }
    }
    this.setState({phone: newText});
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
              marginTop: 50,
            }}>
            <Text style={[styles.textStyle, {marginBottom: 10}]}>
              {translate('phoneNumberView.Text1')} {'\n'}{' '}
              {translate('phoneNumberView.Text2')}
            </Text>
            <KeyboardAvoidingView
              behavior={Platform.OS == 'ios' ? 'padding' : ''}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: !this.state.phoneError ? '#fff' : 'red',
                  flexDirection: 'row',
                  backgroundColor: '#fff',
                  width: 300,
                  marginLeft: 20,
                  marginRight: 20,
                  marginTop: 30,
                  borderRadius: 10,
                  height: 50,
                  alignItems: 'center',
                  paddingLeft: 15,
                  paddingRight: 15,
                }}>
                <CountryPicker
                  ref={'countryPicker'}
                  closeable
                  style={{marginLeft: 0}}
                  countryCode={this.state.countryCode}
                  withCallingCode={true}
                  onSelect={country => this.onSelectCountry(country)}
                  // styles={countryPickerCustomStyles}
                  translation="eng"
                />
                <Text style={{fontSize: 20}}>+{this.state.phoneCode}</Text>
                <TextInput
                  style={{flex: 1, height: 50, marginLeft: 5, fontSize: 20}}
                  keyboardType="numeric"
                  onChangeText={text => this.onChanged(text)}
                  value={this.state.phone}
                  allowFontScaling={false}
                  maxLength={10} //setting limit of input
                />
              </View>
              {this.state.phoneError && (
                <Text style={[styles.errorTextStyle, {marginTop: 5}]}>
                  {translate('phoneNumberView.Text3')}!
                </Text>
              )}
            </KeyboardAvoidingView>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{position: 'absolute', bottom: 10}}>
            <View style={{marginBottom: 10}}>
              <TouchableOpacity onPress={() => this.sendSmsCode()}>
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
