import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Keyboard,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));
const {height, width} = Dimensions.get('window');
const moment = extendMoment(Moment);

const {styles} = Styles;

export default class AgeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  async addAge() {
    var fifteenYearAgo = new Date();
    fifteenYearAgo.setFullYear(fifteenYearAgo.getFullYear() - 15);
    var fifteenYearsFromNow = Moment(fifteenYearAgo).format('YYYY');
    var selectDate = Moment(this.state.date).format('YYYY');
    if (selectDate < fifteenYearsFromNow) {
      let authToken = await AsyncStorage.getItem('authToken');
      let phoneNumber = await AsyncStorage.getItem('phoneNumber');

      let formdata = new FormData();

      formdata.append('phone_number', phoneNumber);
      formdata.append('auth_token', authToken);
      formdata.append(
        'birthdate',
        Moment(this.state.date).format('MM-DD-YYYY'),
      );
      formdata.append('signup_state', 6);

      updateUserDetails(formdata)
        .then(res => {
          console.log(res);
          this.props.navigation.navigate('FitnessView');
        })
        .catch(err => {
          console.log('Error', err);
        });
    } else {
      alert('Age Limit 15 Years Old');
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
              alignItems: 'center',
              marginTop: 40,
              width: width,
              height: '60%',
              justifyContent: 'center',
            }}>
            <Text style={[styles.textStyle, {}]}>
              {translate('AgeView.Text1')}
            </Text>
            <Text
              style={[
                styles.textStyleSmall,
                {
                  width: '80%',
                  marginTop: 10,
                  textAlign: 'center',
                  fontSize: 16,
                },
              ]}>
              {translate('AgeView.Text2')}
            </Text>
            <DatePicker
              format="DD-MM-YYYY"
              maximumDate={new Date()}
              style={{backgroundColor: 'white', marginTop: 10}}
              date={this.state.date}
              mode="date"
              onDateChange={date => this.setState({date})}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.addAge()}
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
