import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
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
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class SuccessView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async approveSuccess() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('signup_state', 11);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('TutorialView');
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ImageBackground
          source={require('../img/success_bg.png')}
          style={styles.mainContainer}>
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginTop: 10,
              height: '80%',
              justifyContent: 'center',
            }}>
            <View style={{alignSelf: 'center'}}>
              <View
                style={{
                  height: 112,
                  width: 112,
                  borderRadius: 60,
                  backgroundColor: '#fff',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="138.678"
                  height="20"
                  viewBox="0 0 158.678 33">
                  <G id="logo-black" transform="translate(-96 -44)">
                    <G
                      id="Group_8"
                      data-name="Group 8"
                      transform="translate(-2150 884)">
                      <G
                        id="Path_15"
                        data-name="Path 15"
                        transform="translate(2246 -840)"
                        fill="none">
                        <Path
                          d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                          stroke="none"
                        />
                        <Path
                          d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                          stroke="none"
                          fill="#0a0d08"
                        />
                      </G>
                      <Path
                        id="Path_16"
                        data-name="Path 16"
                        d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                        transform="translate(0 1)"
                        fill="none"
                        stroke="#0a0d08"
                        stroke-width="2"
                      />
                      <Path
                        id="Path_17"
                        data-name="Path 17"
                        d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                        transform="translate(0 1)"
                        fill="none"
                        stroke="#0a0d08"
                        stroke-width="2"
                      />
                    </G>
                    <Path
                      id="Path_51"
                      data-name="Path 51"
                      d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                      transform="translate(135 70)"
                      fill="#0a0d08"
                    />
                  </G>
                </Svg>
              </View>
            </View>
            <Text style={[styles.textStyle, {color: 'white', marginTop: 20}]}>
              {translate('SuccessView.Text1')}
            </Text>
            <Text
              style={[
                styles.textStyleSmall,
                {textAlign: 'center', color: 'white', marginTop: 10},
              ]}>
              {translate('SuccessView.Text2')} {'\n'}
              {translate('SuccessView.Text3')}
              {'\n'}
              {translate('SuccessView.Text4')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.approveSuccess()}
            style={{position: 'absolute', bottom: 20}}>
            <LinearGradient
              angleCenter={{x: 0.5, y: 1.5}}
              angle={90}
              useAngle={true}
              colors={['#fff', '#fff']}
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
                style={{color: '#636271', fontSize: 18, fontWeight: 'bold'}}>
                {translate('common.getStarted')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}
