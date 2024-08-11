import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  PanResponder,
  PanResponderInstance,
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
import LinearGradient from 'react-native-linear-gradient';
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';
import {AnimatedCircularProgress} from 'react-native-circular-progress';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const MAX_POINTS = 250;

export default class SeeWeightView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weight: '70',
      isMoving: false,
      pointsDelta: 0,
      points: 80,
    };
  }

  async addWeight() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('weight', this.state.weight);
    formdata.append('signup_state', 3);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('HeightView');
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
        <SafeAreaView style={styles.mainContainer}>
          <HeaderWithSteps onPress={() => this.props.navigation.goBack()} />
          {/*<AnimatedCircularProgress
            size={100}
            width={15}
            fill={10}
            tintColor="#00e0ff"
            onAnimationComplete={() => console.log('onAnimationComplete')}
            backgroundColor="#3d5875" />*/}
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 80,
              height: 200,
              width: 182,
            }}>
            <Image
              style={{position: 'absolute'}}
              source={require('../img/Graph.png')}
            />
            {/*<Image style={{position: 'absolute'}} source={require('../img/graph-outer.png')}/>
              <Image style={{position: 'absolute', top: 12}} source={require('../img/graph-inner.png')}/>
              <Image style={{position: 'absolute', left: -5}} source={require('../img/graph-outer-fill.png')}/>*/}
            <View
              style={{position: 'absolute', flexDirection: 'column', top: 88}}>
              <Text
                style={{
                  fontSize: 32,
                  color: '#2D3142',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                68.30
              </Text>
              <Text
                style={{
                  fontSize: 22,
                  color: '#9C9EB9',
                  textAlign: 'center',
                  fontWeight: 'normal',
                }}>
                {translate('SeeWeightView.Text1')}
              </Text>
            </View>
          </View>
          <Text style={[styles.textStyle, {marginTop: 20, fontSize: 24}]}>
            {translate('SeeWeightView.Text2')}
          </Text>
          <Text style={[styles.textStyleSmall, {marginTop: 30}]}>
            {translate('SeeWeightView.Text3')}
          </Text>
          <TouchableOpacity
            onPress={() => this.addWeight()}
            style={{position: 'absolute', bottom: 20}}>
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
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
