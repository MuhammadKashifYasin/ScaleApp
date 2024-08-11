import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  TextInput,
  NativeModules,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
import LinearGradient from 'react-native-linear-gradient';
import {BarChart, Grid} from 'react-native-svg-charts';
import {
  Container,
  Header,
  Content,
  ListItem,
  Text,
  Radio,
  Right,
  Left,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {updateSetReminder} from '../service/Api';
import {Config} from '../config/Config';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class StepsReminderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reminder: ['3:2'],
      weekDayName2: true,
      weekDayName3: false,
      weekDayName4: false,
      weekDayName5: false,
      weekDayName6: false,
      weekDayName7: false,
      weekDayName1: false,
      dayNames: [],
    };
  }

  componentDidMount() {
    this.setState({
      dayNames: [
        {
          name: this.getSystemLocale() == 'he-US' ? 'שני' : 'Monday',
          backGroundColor: '#F4F6FA',
          reminder_day: 2,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'שלישי' : 'Tuesday',
          backGroundColor: '#F4F6FA',
          reminder_day: 3,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'רביעי' : 'Wednesday',
          backGroundColor: '#F4F6FA',
          reminder_day: 4,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'חמישי' : 'Thursday',
          backGroundColor: '#F4F6FA',
          reminder_day: 5,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'שישי' : 'Friday',
          backGroundColor: '#F4F6FA',
          reminder_day: 6,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'שבת' : 'Saturday',
          backGroundColor: '#F4F6FA',
          reminder_day: 7,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'ראשון' : 'Sunday',
          backGroundColor: '#F4F6FA',
          reminder_day: 1,
        },
      ],
    });
  }

  getSystemLocale() {
    let locale = '';
    // iOS
    if (
      NativeModules.SettingsManager &&
      NativeModules.SettingsManager.settings &&
      NativeModules.SettingsManager.settings.AppleLanguages
    ) {
      locale = NativeModules.SettingsManager.settings.AppleLanguages[0];
      // Android
    } else if (NativeModules.I18nManager) {
      locale = NativeModules.I18nManager.localeIdentifier;
    }

    if (typeof locale === 'undefined') {
      console.log('Couldnt get locale');
      return 'en';
    }

    return locale;
  }

  async saveReminder() {
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('reminder', JSON.stringify(this.state.reminder));

    updateSetReminder(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('StepsFrontView');
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  setReminder(reminder_day) {
    let update = {};

    update['weekDayName' + reminder_day] =
      !this.state['weekDayName' + reminder_day];
    if (update['weekDayName' + reminder_day]) {
      this.setState({
        reminder: this.state.reminder.concat('3:' + reminder_day),
      });
    } else {
      this.removeDay('3:' + reminder_day);
    }
    this.setState(update);
    setTimeout(() => {
      console.log(this.state.reminder);
    }, 2000);
  }

  removeDay(e) {
    console.log(e);
    var array = [...this.state.reminder]; // make a separate copy of the array
    var index = array.indexOf(e);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({reminder: array});
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={([styles.mainContainer], {height: '100%'})}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={{
                zIndex: 10,
                width: 40,
                height: 40,
                position: 'absolute',
                left: 12,
                margin: 10,
                top: 25,
              }}>
              <Image source={require('../img/front-page-back-icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View
                style={{width: '100%', height: 700, backgroundColor: 'white'}}>
                <View style={{alignItems: 'center', top: 70, height: 200}}>
                  <Image source={require('../img/utensils.png')} />
                  <Text
                    style={{
                      textAlign: 'center',
                      width: 230,
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}>
                    {translate('StepsReminderView.Text1')}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'center',
                      width: 260,
                      fontSize: 16,
                      color: '#9C9EB9',
                      fontWeight: 'normal',
                    }}>
                    {translate('StepsReminderView.Text2')}
                  </Text>
                </View>
                <View style={{alignItems: 'center', width: '95%'}}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={dayName => dayName.name}
                    data={this.state.dayNames}
                    renderItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => this.setReminder(item.reminder_day)}>
                          <View
                            style={{
                              width: 331,
                              height: 60,
                              borderRadius: 10,
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}
                            selected={false}>
                            <Left style={{left: 20}}>
                              <Text
                                style={{
                                  fontWeight: 'normal',
                                  fontSize: 16,
                                  marginLeft: 20,
                                }}>
                                {item.name}
                              </Text>
                            </Left>
                            <Right>
                              {this.state['weekDayName' + item.reminder_day] ? (
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 50,
                                    backgroundColor: '#77E365',
                                  }}></View>
                              ) : (
                                <View
                                  style={{
                                    height: 20,
                                    width: 20,
                                    borderRadius: 50,
                                    backgroundColor: item.backGroundColor,
                                  }}></View>
                              )}
                            </Right>
                          </View>
                        </TouchableOpacity>
                      );
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => this.saveReminder()}
                    style={{top: 30}}>
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
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {translate('common.save')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
