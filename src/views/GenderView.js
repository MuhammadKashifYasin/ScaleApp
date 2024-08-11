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
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const maleImageSource = require('../img/male-empty.png');
const femaleImageSource = require('../img/female-empty.png');
export default class GenderView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: true,
      maleImageSource: require('../img/male-empty.png'),
      femaleImageSource: require('../img/female-empty.png'),
    };
  }

  componentDidMount() {
    if (this.state.gender) {
      this.setState({maleImageSource: require('../img/male-tick.png')});
    } else {
      this.setState({femaleImageSource: require('../img/female-tick.png')});
    }
  }

  setGender(gender) {
    if (gender === 'male') {
      this.setState({gender: true});
      this.setState({maleImageSource: require('../img/male-tick.png')});
      this.setState({femaleImageSource: require('../img/female-empty.png')});
    } else {
      this.setState({gender: false});
      this.setState({femaleImageSource: require('../img/female-tick.png')});
      this.setState({maleImageSource: require('../img/male-empty.png')});
    }
  }

  async addGender() {
    console.log(this.state.gender);

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('gender', this.state.gender ? 1 : 0);
    formdata.append('signup_state', 5);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('AgeView');
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
              marginTop: 40,
              height: '70%',
              justifyContent: 'center',
            }}>
            <Text style={[styles.textStyle, {marginBottom: 20}]}>
              {translate('GenderView.Text1')}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  width: 146,
                  height: 186,
                  backgroundColor: '#fff',
                  marginRight: 10,
                  borderRadius: 10,
                }}>
                <TouchableOpacity onPress={() => this.setGender('male')}>
                  <Image
                    source={this.state.maleImageSource}
                    style={{
                      alignSelf: 'center',
                      width: 31,
                      height: 100,
                      marginTop: 28,
                    }}
                  />
                  <Text style={{alignSelf: 'center', marginTop: 30}}>
                    {translate('GenderView.Text2')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 146,
                  height: 186,
                  backgroundColor: '#fff',
                  marginLeft: 10,
                  borderRadius: 10,
                }}>
                <TouchableOpacity onPress={() => this.setGender('female')}>
                  <Image
                    source={this.state.femaleImageSource}
                    style={{
                      alignSelf: 'center',
                      width: 31,
                      height: 100,
                      marginTop: 28,
                    }}
                  />
                  <Text style={{alignSelf: 'center', marginTop: 30}}>
                    {translate('GenderView.Text3')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={[
                styles.textStyleSmall,
                {marginTop: 30, textAlign: 'center'},
              ]}>
              {translate('GenderView.Text4')} {'\n'}
              {translate('GenderView.Text5')}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => this.addGender()}
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
