import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import {Config} from '../config/Config';
import {updateUserDetails} from '../service/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

var validate = require('../validate.js');
const {styles} = Styles;

export default class EmailView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email_address: null,
      emailError: undefined,
      first_name: '',
      firstNameError: false,
      last_name: '',
      LastNameError: false,
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }

  async submitPersonalInfo() {
    const emailError = validate.single(this.state.email_address, {
      presence: true,
      email: true,
    });
    const firstNameError = validate.isEmpty(this.state.first_name);
    const LastNameError = validate.isEmpty(this.state.last_name);

    this.setState({emailError: emailError});
    this.setState({firstNameError: firstNameError});
    this.setState({LastNameError: LastNameError});

    if (!(emailError != undefined) || !firstNameError || !LastNameError) {
      let authToken = await AsyncStorage.getItem('authToken');
      let phoneNumber = await AsyncStorage.getItem('phoneNumber');

      let formdata = new FormData();

      formdata.append('phone_number', phoneNumber);
      formdata.append('auth_token', authToken);
      formdata.append('email', this.state.email_address);
      formdata.append('fname', this.state.first_name);
      formdata.append('lname', this.state.last_name);
      formdata.append('signup_state', 1);

      updateUserDetails(formdata)
        .then(res => {
          console.log('formdata', formdata);
          console.log('res', res);
          this.props.navigation.navigate('PasswordView');
        })
        .catch(err => {
          console.log('Error', err);
        });
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
          <KeyboardAvoidingView
            style={{flex: 1, flexDirection: 'column', justifyContent: 'center'}}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            enabled
            keyboardVerticalOffset={100}
            resetScrollToCoords={{x: 0, y: 0}}
            contentContainerStyle={styles.container}
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <ScrollView>
              <View
                style={{
                  flexDirection: 'column',
                  alignSelf: 'center',
                  marginTop: 50,
                }}>
                <Text style={[styles.textStyle, {marginBottom: 10}]}>
                  {translate('EmailView.Text7')} {'\n'}
                  {translate('EmailView.Text8')}?
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: !this.state.firstNameError ? '#fff' : 'red',
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
                  <TextInput
                    style={[
                      {flex: 1, height: 40, marginLeft: 5, textAlign: 'center'},
                      styles.input,
                    ]}
                    onChangeText={text => this.setState({first_name: text})}
                    placeholder={translate('EmailView.Text1')}
                    value={this.state.first_name}
                  />
                </View>
                {this.state.firstNameError && (
                  <Text style={[styles.errorTextStyle, {marginTop: 5}]}>
                    {translate('EmailView.Text4')}
                  </Text>
                )}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: !this.state.LastNameError ? '#fff' : 'red',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    width: 300,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                    borderRadius: 10,
                    height: 50,
                    alignItems: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}>
                  <TextInput
                    style={[
                      {flex: 1, height: 40, marginLeft: 5, textAlign: 'center'},
                      styles.input,
                    ]}
                    onChangeText={text => this.setState({last_name: text})}
                    placeholder={translate('EmailView.Text2')}
                    value={this.state.last_name}
                  />
                </View>
                {this.state.LastNameError && (
                  <Text style={[styles.errorTextStyle, {marginTop: 5}]}>
                    {translate('EmailView.Text5')}
                  </Text>
                )}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor:
                      this.state.emailError != undefined ? 'red' : '#fff',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    width: 300,
                    marginLeft: 20,
                    marginRight: 20,
                    marginTop: 20,
                    borderRadius: 10,
                    height: 50,
                    alignItems: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}>
                  <TextInput
                    style={[
                      {flex: 1, height: 40, marginLeft: 5, textAlign: 'center'},
                      styles.input,
                    ]}
                    onChangeText={text => this.setState({email_address: text})}
                    placeholder={translate('EmailView.Text3')}
                    value={this.state.email_address}
                  />
                </View>
                {this.state.emailError != undefined && (
                  <Text style={[styles.errorTextStyle, {marginTop: 5}]}>
                    {translate('EmailView.Text6')}
                  </Text>
                )}
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : ''}
            style={{position: 'absolute', bottom: 10}}>
            <View style={{marginBottom: 10}}>
              <TouchableOpacity onPress={() => this.submitPersonalInfo()}>
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
