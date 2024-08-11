import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import DatePicker from 'react-native-date-picker';
import {Switch} from 'react-native-switch';
import Moment from 'moment';
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import LinearGradient from 'react-native-linear-gradient';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const {height, width} = Dimensions.get('window');
const addAlarmWidth = width / 2;

export default class SleepReminderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      sleep_time: [],
      switchValue: false,
    };

    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  componentDidUpdate() {}

  toggleSwitch(value) {
    this.setState({switchValue: value});
  }

  async addReminder() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('time_to_sleep', Moment(this.state.date).format('HH:mm'));
    formdata.append('signup_state', 10);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('SuccessView');
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <HeaderWithSteps onPress={() => this.props.navigation.goBack()} />
        <ScrollView>
          <View
            style={{
              backgroundColor: '#fff',
              width: width,
              height: 481,
              top: 44,
              alignItems: 'center',
            }}>
            <View style={{}}>
              <Svg
                width="143"
                height="89"
                viewBox="0 0 143 89"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M5.64778 72.4115C5.64778 70.0752 9.5582 68.1432 14.6462 67.8195C14.9897 66.7468 15.4859 65.7413 16.1115 64.8287C15.7625 63.4402 15.5726 61.9804 15.5726 60.4715C15.5726 51.3743 22.3414 44 30.6916 44C36.8939 44 42.2208 48.0704 44.5524 53.8916C44.968 53.8661 45.3866 53.849 45.8104 53.849C50.4608 53.849 54.6367 55.4265 57.5095 57.9305C60.5408 58.5241 63.1651 60.3602 64.9065 62.9304C67.6207 59.7553 72.3806 57.0439 78.7562 57.8711C90.6797 59.4179 89.738 71.7927 89.738 71.7927C89.738 71.7927 93.1896 64.6771 104.034 65.2959C114.879 65.9145 118.919 75.9691 118.919 75.9691C118.919 75.9691 121.115 73.3395 126.763 73.6489C132.411 73.9583 135.235 78.2896 135.235 78.2896C139.468 77.6474 139.338 78.5972 143 79.8913C141.1 79.9166 143.515 79.339 142.374 79.9216C124.769 88.9107 110.646 82.2224 95.5843 84.6974C76.5478 87.9979 67.8959 87.5854 49.0686 84.6974C39.4526 82.6668 34.3756 89.875 29.147 88.9107C14.9543 86.2932 19.6666 81.7987 14.6462 83.0364C12.4385 83.6093 13.9412 79.2748 11.78 79.9131C11.7805 79.9057 11.7822 79.8988 11.7827 79.8913C10.5529 80.2453 9.02682 80.4552 7.37361 80.4552C3.30139 80.4552 0 79.1831 0 77.6138C0 76.0781 3.16194 74.8278 7.11382 74.7748C6.1837 74.0824 5.64778 73.2746 5.64778 72.4115Z"
                  fill="#E1DDF5"
                />
                <Mask
                  id="mask0"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="71"
                  y="0"
                  width="62"
                  height="62">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M132.561 44.0017L115.035 0.62309L71.5205 18.2041L89.0466 61.5827L132.561 44.0017Z"
                    fill="white"
                  />
                </Mask>
                <G mask="url(#mask0)">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M84.4502 46.6321C90.8272 53.834 101.337 56.6172 110.811 52.7893C122.822 47.9364 128.638 34.2923 123.802 22.3217C120.645 14.5097 113.762 9.34043 106.023 8.02856C107.748 9.96383 109.185 12.225 110.212 14.769C115.048 26.7389 109.236 40.4013 97.2283 45.2528C93.0207 46.9528 88.614 47.352 84.4502 46.6321Z"
                    fill="#FFD474"
                  />
                </G>
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M64.8608 13.5571L62.4708 17.9403L58.1033 20.337L62.4708 22.7311L64.8608 27.1143L67.2508 22.7311L71.6191 20.337L67.2508 17.9403L64.8608 13.5571Z"
                  fill="#FFD474"
                />
                <Mask
                  id="mask1"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  x="3"
                  y="45"
                  width="8"
                  height="8">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.5371 45.9951H3.41221V52.9431H10.5371V45.9951Z"
                    fill="white"
                  />
                </Mask>
                <G mask="url(#mask1)">
                  <Path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.97557 45.9951L5.71631 48.2427L3.41154 49.4707L5.71631 50.6988L6.97557 52.9431L8.23484 50.6988L10.5371 49.4707L8.23484 48.2427L6.97557 45.9951Z"
                    fill="#FFD474"
                  />
                </G>
                <Path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M72.1381 65.7002L70.8518 68.0599L68.5001 69.3498L70.8518 70.6413L72.1381 73.0002L73.4244 70.6413L75.7778 69.3498L73.4244 68.0599L72.1381 65.7002Z"
                  fill="white"
                />
              </Svg>
            </View>
            <View style={{top: 27, width: 255, height: 48}}>
              <Text
                style={{
                  color: '#2D3142',
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {translate('SleepReminderView.Text1')}
              </Text>
            </View>
            <View style={{top: 30, width: 289, height: 49}}>
              <Text
                style={{
                  color: '#9C9EB9',
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'normal',
                }}>
                {translate('SleepReminderView.Text2')}
              </Text>
            </View>
            <View>
              <DatePicker
                style={{backgroundColor: 'white', marginTop: 30}}
                date={this.state.date}
                mode={'time'}
                onDateChange={date => this.setState({date: date})}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row', height: 54, marginTop: 60}}>
            <View style={{width: addAlarmWidth, left: 25, top: 5}}>
              <Text style={{fontSize: 16, color: '#2D3142'}}>
                {translate('SleepReminderView.Text3')}
              </Text>
            </View>
            <View
              style={{width: addAlarmWidth, alignItems: 'flex-end', right: 25}}>
              <Switch
                value={this.state.switchValue}
                onValueChange={val => this.toggleSwitch(val)}
                backgroundActive={'#60C3C6'}
                backgroundInactive={'#fff'}
                circleActiveColor={'white'}
                circleInactiveColor={'white'}
              />
            </View>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => this.addReminder()}
              style={{top: 30, height: 200, alignItems: 'center'}}>
              <LinearGradient
                angleCenter={{x: 0.5, y: 1.5}}
                angle={90}
                useAngle={true}
                colors={['#63D7E6', '#77E365']}
                style={{
                  borderRadius: 50,
                  marginRight: 10,
                  width: 273,
                  height: 44,
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
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
