import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import {Slider} from '@miblanchard/react-native-slider';
import Rheostat, {BarRheostat} from 'react-native-rheostat';
import LinearGradient from 'react-native-linear-gradient';
import {
  componentThumbStyles,
  customStyles,
  customStyles2,
  customStyles3,
  customStyles4,
  customStyles5,
  customStyles6,
  customStyles7,
  customStyles8,
  customStyles9,
  iosStyles,
  stylesFitness,
} from './styles/styles';

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
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class FitnessView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: 0.2,
    };
  }

  roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }

  async addFitnessLevel() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('fitness_level', this.roundToTwo(this.state.marker));
    formdata.append('signup_state', 7);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('GoalView');
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

          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginTop: 60,
              justifyContent: 'center',
              width: '90%',
            }}>
            <Text style={[styles.textStyle, {marginBottom: 20}]}>
              {translate('FitnessView.Text1')} {'\n'}
              {translate('FitnessView.Text2')}
            </Text>
          </View>
          <View style={{marginBottom: 10}}>
            <ImageBackground
              source={require('../img/meter.png')}
              style={{
                zIndex: 0,
                width: 331,
                height: 24,
                top: 25,
              }}></ImageBackground>
            <Slider
              style={{zIndex: 11}}
              animateTransition
              maximumTrackTintColor="#b7b7b7"
              minimumTrackTintColor="#1073ff"
              thumbStyle={iosStyles.thumb}
              trackStyle={iosStyles.track}
              value={this.state.marker}
              onValueChange={marker => this.setState({marker})}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 20,
              justifyContent: 'space-between',
              width: '80%',
            }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                width: 77,
                height: 30,
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: '#EEFFF3',
                borderRadius: 17.5,
              }}>
              {translate('FitnessView.Text3')}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 12,
                width: 77,
                height: 30,
                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: '#EEFFF3',
                borderRadius: 17.5,
              }}>
              {translate('FitnessView.Text4')}
            </Text>
          </View>
          {/*<View style={{flexDirection: 'column'}}>
            <Text style={[styles.textStyle, {fontSize: 18}]}>
              {translate('FitnessView.Text5')}
            </Text>
            <Text
              style={[styles.textStyle, {fontSize: 16, letterSpacing: 0.228571}]}>
              {translate('FitnessView.Text6')} {'\n'}{translate('FitnessView.Text7')}
            </Text>
          </View>*/}
          <TouchableOpacity
            onPress={() => this.addFitnessLevel()}
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
