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
  NativeModules,
  FlatList,
  ImageBackground,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import 'moment/locale/he';
import {updateLifestyleHistory, getLifestyleHistory} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {extendMoment} from 'moment-range';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const moment = extendMoment(Moment);
const {styles} = Styles;
const sadEmoji = require('../img/sadsmile.png');
const happyEmoji = require('../img/icon-smile.png');

export default class ActivityFrontView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityTimeSpent: 0,
      performanceData: [],
      performanceBars: [],
    };
  }

  async componentDidMount() {
    this.setState({
      performanceBars: [
        {
          key: 0,
          name: this.getSystemLocale() == 'he-US' ? 'שבת' : 'Saturday',
          day: this.getSystemLocale() == 'he-US' ? 'ש' : 'S',
          barImage: require('../img/empty-bar.png'),
        },
        {
          key: 1,
          name: this.getSystemLocale() == 'he-US' ? 'ראשון' : 'Sunday',
          day: this.getSystemLocale() == 'he-US' ? 'א' : 'S',
          barImage: require('../img/empty-bar.png'),
        },
        {
          key: 2,
          name: this.getSystemLocale() == 'he-US' ? 'שני' : 'Monday',
          day: this.getSystemLocale() == 'he-US' ? 'ב' : 'M',
          barImage: require('../img/empty-bar.png'),
        },
        {
          key: 3,
          name: this.getSystemLocale() == 'he-US' ? 'שלישי' : 'Tuesday',
          day: this.getSystemLocale() == 'he-US' ? 'ג' : 'T',
          barImage: require('../img/empty-bar.png'),
        },
        {
          key: 4,
          name: this.getSystemLocale() == 'he-US' ? 'רביעי' : 'Wednesday',
          day: this.getSystemLocale() == 'he-US' ? 'ד' : 'W',
          barImage: require('../img/empty-bar.png'),
        },
        {
          key: 5,
          name: this.getSystemLocale() == 'he-US' ? 'חמישי' : 'Thursday',
          day: this.getSystemLocale() == 'he-US' ? 'ה' : 'T',
          barImage: require('../img/empty-bar.png'),
        },
        {
          key: 6,
          name: this.getSystemLocale() == 'he-US' ? 'שישי' : 'Friday',
          day: this.getSystemLocale() == 'he-US' ? 'ו' : 'F',
          barImage: require('../img/empty-bar.png'),
        },
      ],
    });
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('lifestyle_type', 3);

    getLifestyleHistory(formdata)
      .then(res => {
        console.log(res);

        if (res.activity.length > 0) {
          let date1 = moment(
            res.activity[0].date.split('-').reverse().join('-') +
              'T00:00:00.000Z',
          );
          let date2 = moment().startOf('week');
          if (date2 < date1) {
            this.setState({
              activityTimeSpent: this.convertMinsToTime(
                JSON.parse(res.activity[0].activity_time_spent),
              ),
            });
          }
          this.updatePerformance(res.activity);
        }
        // this.setState({activityTimeSpent: this.convertMinsToTime(70)});
        // let param = [
        //   {"date": "26-02-2020", "activity_time_spent": 90},
        //   {"date": "27-02-2020", "activity_time_spent": 30},
        //   {"date": "28-02-2020", "activity_time_spent": 60},
        //   {"date": "29-02-2020", "activity_time_spent": 120}
        // ]
        // this.updatePerformance(param);
      })
      .catch(err => {
        console.log('Error', err);
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

  updatePerformance(performances) {
    performances.map(performance => {
      let date1 = moment(
        performance.date.split('-').reverse().join('-') + 'T00:00:00.000Z',
      );
      let date2 = moment().startOf('week');

      if (date2 < date1) {
        let param = {
          day:
            this.getSystemLocale() === 'he-US'
              ? date1.locale('he').format('dddd')
              : date1.locale('en').format('dddd'),
          performance: this.convertMinsToTime(performance.activity_time_spent),
          emoji: performance.activity_time_spent > 60 ? happyEmoji : sadEmoji,
          title:
            performance.activity_time_spent > 60
              ? translate('ActivityFrontView.Text10')
              : translate('ActivityFrontView.Text11'),
        };
        let barImage = '';
        if (performance.activity_time_spent < 30) {
          barImage = require('../img/quarter.png');
        } else if (
          performance.activity_time_spent > 29 &&
          performance.activity_time_spent < 120
        ) {
          barImage = require('../img/three-quarter.png');
        } else if (performance.activity_time_spent >= 120) {
          barImage = require('../img/full-bar.png');
        } else if (performance.activity_time_spent === 0) {
          barImage = require('../img/empty-bar.png');
        }
        this.state.performanceBars.map((bar, index) => {
          if (bar.name === date1.format('dddd')) {
            this.state.performanceBars[index].barImage = barImage;
          }
        });

        this.setState({
          performanceData: this.state.performanceData.concat(param),
        });
      }
      this.setState({performanceBars: this.state.performanceBars});
    });
  }

  convertMinsToTime(mins) {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes}`;
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
              onPress={() => this.props.navigation.navigate('HomeView')}
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
          </View>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{alignItems: 'center', top: 70, height: 290}}>
                <Text
                  style={{
                    width: 180,
                    fontSize: 24,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {translate('ActivityFrontView.Text1')}{' '}
                  <Text style={{color: '#46c4e6'}}>
                    {this.state.activityTimeSpent}{' '}
                    {translate('ActivityFrontView.Text2')}{' '}
                  </Text>
                  {translate('ActivityFrontView.Text9')}
                </Text>
                <View style={{height: 80, marginTop: 20, alignSelf: 'center'}}>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ActivityAddView')
                    }
                    style={{top: 45}}>
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
                        {translate('ActivityFrontView.Text8')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    position: 'absolute',
                    marginTop: 20,
                    bottom: 0,
                    width: '75%',
                    justifyContent: 'space-around',
                  }}>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Image source={require('../img/icon-smile.png')} />
                    <Text style={styles.textStyleSmallBoldFront}>
                      {this.state.activityTimeSpent} h
                    </Text>
                    <Text style={styles.textStyleSmall}>
                      {translate('ActivityFrontView.Text3')}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#F4F6FA',
                      width: 3,
                      height: 53,
                      alignSelf: 'center',
                    }}></View>
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Text
                      style={[
                        styles.textStyleSmallBoldFront,
                        {justifyContent: 'center', alignSelf: 'center'},
                      ]}>
                      1:30 h
                    </Text>
                    <Text style={styles.textStyleSmallFront}>
                      {translate('ActivityFrontView.Text4')}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 50,
                  backgroundColor: '#F4DCDC',
                  top: 100,
                  flexDirection: 'row',
                  textAlign: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    marginTop: 15,
                    marginLeft: 20,
                    color: '#F77777',
                    fontWeight: 'bold',
                  }}>
                  {translate('ActivityFrontView.Text5')}{' '}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ActivityReminderView');
                  }}
                  style={{marginTop: 15}}>
                  <Text
                    style={{
                      fontSize: 14,
                      color: '#F77777',
                      fontWeight: 'bold',
                      textDecorationLine: 'underline',
                    }}>
                    {translate('ActivityFrontView.Text6')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{marginTop: 12, position: 'absolute', right: 25}}>
                  <Image source={require('../img/cross-icon.png')} />
                </TouchableOpacity>
              </View>
              <View style={{height: 900, top: 120, left: '5.87%'}}>
                <Text
                  style={{color: '#2D3142', fontWeight: 'bold', fontSize: 20}}>
                  {translate('ActivityFrontView.Text7')}
                </Text>
                <View
                  style={{flexDirection: 'row', marginTop: 20, width: '100%'}}>
                  <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={performanceBar => performanceBar.name}
                    data={this.state.performanceBars}
                    extraData={this.state.performanceBars}
                    renderItem={({item, index}) => {
                      return (
                        <View
                          style={{
                            flexDirection: 'column',
                            width: '14%',
                            marginLeft: 20,
                          }}>
                          <Image source={item.barImage} />
                          <Text
                            style={{color: '#9C9EB9', fontSize: 12, width: 12}}>
                            {item.day}
                          </Text>
                        </View>
                      );
                    }}
                  />
                </View>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  keyExtractor={performanceData => performanceData.day}
                  data={this.state.performanceData}
                  renderItem={({item, index}) => {
                    return (
                      <View style={{height: 100}}>
                        <View style={{flexDirection: 'row', marginTop: 20}}>
                          <Image
                            style={{alignSelf: 'center', marginRight: 10}}
                            source={item.emoji}
                          />
                          <View style={{marginLeft: 10}}>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: '#2D3142',
                              }}>
                              {item.title}{' '}
                              {translate('ActivityFrontView.Text12')}
                            </Text>
                            <Text>{item.day}</Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 16,
                              fontWeight: 'bold',
                              color: '#2D3142',
                              marginLeft: 140,
                            }}>
                            {item.performance}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingLeft: 10,
                            borderWidth: 1,
                            marginTop: 20,
                            width: '87%',
                            borderColor: '#F2F2F2',
                          }}></View>
                      </View>
                    );
                  }}
                />
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
