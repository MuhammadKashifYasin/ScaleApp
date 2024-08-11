import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
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
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-material-dropdown';
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
import {Slider} from '@miblanchard/react-native-slider';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';
import {updateLifestyleHistory, getLifestyleHistory} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {extendMoment} from 'moment-range';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

var validate = require('../validate.js');
const {styles} = Styles;
const data = [
  {
    label: 'Aerobic Exercise',
    value: 'aerobic',
  },
  {
    label: 'Chest Exercise',
    value: 'chest',
  },
  {
    label: 'Leg Exercise',
    value: 'leg',
  },
];

const typeData = [
  {
    label: 'Gym Workout',
    value: 'gym',
  },
  {
    label: 'Cardio',
    value: 'cardio',
  },
  {
    label: 'Yoga',
    value: 'yoga',
  },
];

export default class ActivityAddView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      marker: 0.5,
      name: 'aerobic',
      type: 'gym',
      activityTime: '90',
      activityTimeError: false,
      date: new Date(),
      setDatePickerVisibility: false,
    };

    this.toggleDatePicker = this.toggleDatePicker.bind(this);
    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  componentDidMount() {
    // this.setState({'date': Moment(this.state.date).format('HH:mm')});
  }

  roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }

  async updateActivityLifestyleHistory() {
    const activityTimeError = validate.isEmpty(this.state.activityTime);
    this.setState({activityTimeError: activityTimeError});
    if (!activityTimeError) {
      let formdata = new FormData();

      let authToken = await AsyncStorage.getItem('authToken');
      let phoneNumber = await AsyncStorage.getItem('phoneNumber');

      formdata.append('phone_number', phoneNumber);
      formdata.append('auth_token', authToken);
      formdata.append('datetime', Moment(new Date()).format('MM-DD-YYYY'));
      formdata.append('Lifestyle_type', 3);
      formdata.append('activity_name', this.state.name);
      formdata.append('activity_type', this.state.type);
      formdata.append(
        'activity_volume',
        JSON.stringify(this.roundToTwo(this.state.marker)),
      );
      formdata.append('activity_value', this.state.activityTime);

      updateLifestyleHistory(formdata)
        .then(res => {
          console.log(res);
          this.props.navigation.goBack();
        })
        .catch(err => {
          console.log('Error', err);
        });
    }
  }

  toggleDatePicker() {
    console.log('pressed');
    this.setState({setDatePickerVisibility: true});
  }

  hideDatePicker() {
    this.setState({setDatePickerVisibility: false});
  }

  handleConfirm(date) {
    console.log('this is pressed', Moment(this.state.date).format('HH:mm'));
    this.hideDatePicker();
  }

  onChanged(text) {
    let newText = '';
    let numbers = '0123456789';

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
        if (newText > 150) {
          newText = 0;
          alert(translate('ActivityAddView.Text14'));
        }
      } else {
        // your call back function
        alert(translate('ActivityAddView.Text13'));
      }
    }
    this.setState({activityTime: newText});
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView
          style={
            ([styles.mainContainer], {backgroundColor: '#fff', height: '100%'})
          }>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                zIndex: 10,
                width: 40,
                height: 10,
                left: 12,
                margin: 10,
                top: 15,
              }}>
              <Image source={require('../img/front-page-back-icon.png')} />
            </TouchableOpacity>
            <Text
              style={{
                height: 40,
                position: 'absolute',
                left: 90,
                margin: 10,
                top: 15,
                textAlign: 'center',
                fontSize: 24,
                fontWeight: 'bold',
              }}>
              {translate('ActivityAddView.Text1')}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{top: 70, height: 650}}>
                <View style={{marginTop: 40, width: '100%', height: 130}}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                      style={{
                        position: 'absolute',
                        left: 25,
                        fontSize: 16,
                        color: '#9C9EB9',
                        fontWeight: 'bold',
                      }}>
                      {translate('ActivityAddView.Text2')}
                    </Text>
                    <View
                      style={{
                        position: 'absolute',
                        right: 25,
                        backgroundColor: '#F4F6FA',
                        width: 250,
                        height: 50,
                        marginLeft: 50,
                        borderRadius: 15,
                      }}>
                      <RNPickerSelect
                        style={{
                          textAlign: 'left',
                          left: 20,
                          color: '#4D4D4D',
                          iconContainer: {
                            top: 15,
                            right: 15,
                          },
                          inputIOS: {
                            fontSize: 16,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            color: '#4D4D4D',
                            paddingRight: 30, // to ensure the text is never behind the icon
                          },
                          inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            color: '#4D4D4D',
                            paddingRight: 30, // to ensure the text is never behind the icon
                          },
                        }}
                        value={this.state.name}
                        onValueChange={value => this.setState({name: value})}
                        placeholder="Select"
                        Icon={() => {
                          return (
                            <Icon
                              name="caret-down"
                              size={18}
                              backgroundColor="#F2F2F2"
                              color="#66D9D6"></Icon>
                          );
                        }}
                        items={data}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 75,
                    }}>
                    <Text
                      style={{
                        position: 'absolute',
                        left: 25,
                        fontSize: 16,
                        color: '#9C9EB9',
                        fontWeight: 'bold',
                      }}>
                      {translate('ActivityAddView.Text3')}
                    </Text>
                    <View
                      style={{
                        position: 'absolute',
                        right: 25,
                        backgroundColor: '#F4F6FA',
                        width: 250,
                        height: 50,
                        marginLeft: 50,
                        borderRadius: 15,
                      }}>
                      <RNPickerSelect
                        style={{
                          textAlign: 'left',
                          left: 20,
                          color: '#4D4D4D',
                          iconContainer: {
                            top: 15,
                            right: 15,
                          },
                          inputIOS: {
                            fontSize: 16,
                            paddingVertical: 12,
                            paddingHorizontal: 10,
                            color: '#4D4D4D',
                            paddingRight: 30, // to ensure the text is never behind the icon
                          },
                          inputAndroid: {
                            fontSize: 16,
                            paddingHorizontal: 10,
                            paddingVertical: 8,
                            color: '#4D4D4D',
                            paddingRight: 30, // to ensure the text is never behind the icon
                          },
                        }}
                        value={this.state.type}
                        onValueChange={value => this.setState({type: value})}
                        placeholder="Select"
                        Icon={() => {
                          return (
                            <Icon
                              name="caret-down"
                              size={18}
                              backgroundColor="#F2F2F2"
                              color="#66D9D6"></Icon>
                          );
                        }}
                        items={typeData}
                      />
                    </View>
                  </View>
                </View>
                <View style={{left: 15, width: '100%'}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#9C9EB9',
                      fontWeight: 'bold',
                    }}>
                    {translate('ActivityAddView.Text4')}
                  </Text>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: !this.state.activityTimeError
                        ? '#fff'
                        : 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      width: 350,
                      height: 76,
                      backgroundColor: '#F4F6FA',
                      borderRadius: 10,
                      marginTop: 12,
                    }}>
                    {/*<TouchableOpacity
                      onPress={this.toggleDatePicker}>
                      <Text style={{fontSize: 36, fontWeight: 'bold', color: '#2D3142'}}>{Moment(this.state.date).format('HH:mm')}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={this.state.setDatePickerVisibility}
                      mode="time"
                      date={this.state.date}
                      onConfirm={this.handleConfirm}
                      onCancel={this.hideDatePicker}
                    />*/}
                    <TextInput
                      onChangeText={text => this.onChanged(text)}
                      value={this.state.activityTime}
                      keyboardType="numeric"
                      maxLength={3}
                      style={{
                        fontSize: 36,
                        fontWeight: 'bold',
                        color: '#2D3142',
                      }}
                    />
                    <Text
                      style={{
                        marginTop: 15,
                        color: '#9C9EB9',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      {translate('ActivityAddView.Text12')}
                    </Text>
                  </View>
                  {this.state.activityTimeError && (
                    <Text style={[styles.errorTextStyle, {marginTop: 5}]}>
                      {translate('ActivityAddView.Text11')}
                    </Text>
                  )}
                </View>
                <View style={{left: 15, top: 15}}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#9C9EB9',
                      fontWeight: 'bold',
                    }}>
                    {translate('ActivityAddView.Text6')}
                  </Text>
                  <View
                    style={{
                      width: 350,
                      height: 76,
                      borderRadius: 10,
                      marginTop: 12,
                    }}>
                    <View style={{marginBottom: 20}}>
                      <ImageBackground
                        source={require('../img/meter.png')}
                        style={{
                          zIndex: 0,
                          width: 350,
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
                        width: '100%',
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
                        {translate('ActivityAddView.Text7')}
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
                        {translate('ActivityAddView.Text8')}
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
                        {translate('ActivityAddView.Text9')}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => this.updateActivityLifestyleHistory()}
                  style={{top: 85, alignSelf: 'center'}}>
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
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 12},
                      shadowOpacity: 0.58,
                      shadowRadius: 16.0,
                      elevation: 5,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 10,
                      }}>
                      {translate('ActivityAddView.Text10')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
