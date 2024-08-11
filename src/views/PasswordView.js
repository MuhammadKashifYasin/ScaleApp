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
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useState} from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../service/Api';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
var validate = require('../validate.js');

export default class PasswordView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {},
      passwordShow: false,
      icon: 'eye-slash',
      passCode: '',
      password: true,
      passwordError: false,
    };
  }

  async componentDidMount() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();
    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);

    getUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.setState({userDetails: res.user_details});
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  _changeIcon() {
    this.setState({icon: this.state.icon === 'eye' ? 'eye-slash' : 'eye'});
    this.setState({password: !this.state.password});
  }

  submitPassword() {
    const passwordError = validate.isEmpty(this.state.passCode);

    this.setState({passwordError: passwordError});

    if (!passwordError) {
      if (
        true ||
        this.state.userDetails.purchase_code === this.state.passCode
      ) {
        this.props.navigation.navigate('ApprovedAccountView');
      } else {
        this.props.navigation.navigate('PaymentView');
      }
    }
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
              {translate('PasswordView.Text1')}
            </Text>
            <View
              style={[
                styles.inputBackgroundWhite,
                {
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: !this.state.passwordError ? '#fff' : 'red',
                  flexDirection: 'row',
                },
              ]}>
              <TextInput
                style={{width: '80%', marginLeft: 10, justifyContent: 'center'}}
                onChangeText={text => this.setState({passCode: text})}
                secureTextEntry={this.state.password}
              />
              <TouchableOpacity onPress={() => this._changeIcon()}>
                <Icon
                  name={this.state.icon}
                  size={18}
                  color="#27ae60"
                  style={{
                    alignSelf: 'flex-end',
                    marginLeft: 10,
                    marginTop: 20,
                  }}></Icon>
              </TouchableOpacity>
            </View>
            {this.state.passwordError && (
              <Text style={[styles.errorTextStyle, {marginTop: 5}]}>
                {translate('PasswordView.Text2')}
              </Text>
            )}
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{position: 'absolute', bottom: 10}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('PaymentView')}>
              <Text
                style={[
                  styles.textStyleSmall,
                  {color: '#7265E3', alignSelf: 'center', marginBottom: 20},
                ]}>
                {translate('PasswordView.Text3')}
              </Text>
            </TouchableOpacity>

            <View style={{marginBottom: 10}}>
              <TouchableOpacity onPress={() => this.submitPassword()}>
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
