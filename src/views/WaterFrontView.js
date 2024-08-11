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
  NativeModules,
  TouchableWithoutFeedback,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
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
const myRef = React.createRef();
const emptyGlass = require('../img/glass-empty.png');
const fullGlass = require('../img/glass-full-front.png');
const sadEmoji = require('../img/sadsmile.png');
const happyEmoji = require('../img/icon-smile.png');
const performanceBars = [
  {
    key: 0,
    name: translate('StepsReminderView.Text8'),
    day: translate('common.saturday'),
    barImage: require('../img/empty-bar.png'),
  },
  {
    key: 1,
    name: translate('StepsReminderView.Text9'),
    day: translate('common.sunday'),
    barImage: require('../img/empty-bar.png'),
  },
  {
    key: 2,
    name: translate('StepsReminderView.Text3'),
    day: translate('common.monday'),
    barImage: require('../img/empty-bar.png'),
  },
  {
    key: 3,
    name: translate('StepsReminderView.Text4'),
    day: translate('common.tuesday'),
    barImage: require('../img/empty-bar.png'),
  },
  {
    key: 4,
    name: translate('StepsReminderView.Text5'),
    day: translate('common.wednesday'),
    barImage: require('../img/empty-bar.png'),
  },
  {
    key: 5,
    name: translate('StepsReminderView.Text6'),
    day: translate('common.thursday'),
    barImage: require('../img/empty-bar.png'),
  },
  {
    key: 6,
    name: translate('StepsReminderView.Text7'),
    day: translate('common.friday'),
    barImage: require('../img/empty-bar.png'),
  },
];

export default class WaterFrontView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cups_value: 0,
      cups_amount: 0,
      glassImage1: false,
      glassImage2: false,
      glassImage3: false,
      glassImage4: false,
      glassImage5: false,
      glassImage6: false,
      glassImage7: false,
      glassImage8: false,
      disableGlass1: true,
      disableGlass2: true,
      disableGlass3: true,
      disableGlass4: true,
      disableGlass5: true,
      disableGlass6: true,
      disableGlass7: true,
      disableGlass8: true,
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
    formdata.append('lifestyle_type', 2);

    getLifestyleHistory(formdata)
      .then(res => {
        console.log(res.water);
        if (res.water.length > 0) {
          let date1 = moment(
            res.water[0].date.split('-').reverse().join('-') + 'T00:00:00.000Z',
          );
          let date2 = moment().startOf('week');
          if (date2 < date1) {
            this.setState({cups_value: JSON.parse(res.water[0].cups_count)});
            this.setState({
              cups_amount: JSON.parse(res.water[0].cups_count) * 250,
            });
          }
          this.updateGlass(this.state.cups_value);
          this.updatePerformance(res.water);
        } else {
          this.updateGlass(this.state.cups_value);
        }
      })
      .catch(err => {
        console.log('Error', err);
      });
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
          performance: performance.cups_count,
          emoji: performance.cups_count > 5 ? happyEmoji : sadEmoji,
          title:
            performance.cups_count > 5
              ? translate('common.bestPerformance')
              : translate('common.worstPerformance'),
        };
        let barImage = '';
        if (performance.cups_count < 5) {
          barImage = require('../img/quarter.png');
        } else if (performance.cups_count > 4 && performance.cups_count < 8) {
          barImage = require('../img/three-quarter.png');
        } else if (performance.cups_count === 8) {
          barImage = require('../img/full-bar.png');
        } else if (performance.cups_count === 0) {
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

  async updateWaterLifestyleHistory() {
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('Lifestyle_type', 2);
    formdata.append('water_value', 1);
    formdata.append('datetime', Moment(new Date()).format('MM-DD-YYYY'));

    updateLifestyleHistory(formdata)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  updateGlass(cups_value) {
    let update = {};
    for (var i = cups_value; i >= 0; i--) {
      update['glassImage' + i] = true;
    }
    update['disableGlass' + (cups_value + 1)] = false;
    this.setState(update);
  }

  calculateDrinks(cups_value) {
    let update = {};
    update['cups_value'] = cups_value;
    update['cups_amount'] = cups_value * 250;
    update['glassImage' + cups_value] = true;
    update['disableGlass' + cups_value] = true;
    update['disableGlass' + (cups_value + 1)] = false;
    this.setState(update);
    this.updateWaterLifestyleHistory();
  }

  render() {
    return (
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
          {/*<TouchableOpacity
            onPress={() => this.props.navigation.navigate('WaterShareView')}
            style={{zIndex: 10, width: 40, height: 40, position: 'absolute', right: 12, margin: 10, top: 25}}>
            <Image source={require('../img/front-forward-icon.png')} />
          </TouchableOpacity>*/}
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{alignItems: 'center', top: 70, height: 290}}>
              <Text style={{width: 180, fontSize: 24, fontWeight: 'bold'}}>
                {translate('WaterFrontView.Text1')}{' '}
                <Text style={{color: '#7265E3'}}>
                  {this.state.cups_value} {translate('WaterFrontView.Text2')}{' '}
                </Text>
                {translate('WaterFrontView.Text8')}
              </Text>
              <View style={{height: 150, marginTop: 20}}>
                <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
                  <TouchableOpacity
                    disabled={this.state.disableGlass1}
                    onPress={() => this.calculateDrinks(1)}>
                    {this.state.glassImage1 ? (
                      <Image style={{}} source={fullGlass} />
                    ) : (
                      <Image style={{}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.state.disableGlass2}
                    onPress={() => this.calculateDrinks(2)}>
                    {this.state.glassImage2 ? (
                      <Image style={{marginLeft: 40}} source={fullGlass} />
                    ) : (
                      <Image style={{marginLeft: 40}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.state.disableGlass3}
                    onPress={() => this.calculateDrinks(3)}>
                    {this.state.glassImage3 ? (
                      <Image style={{marginLeft: 40}} source={fullGlass} />
                    ) : (
                      <Image style={{marginLeft: 40}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.state.disableGlass4}
                    onPress={() => this.calculateDrinks(4)}>
                    {this.state.glassImage4 ? (
                      <Image style={{marginLeft: 40}} source={fullGlass} />
                    ) : (
                      <Image style={{marginLeft: 40}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
                  <TouchableOpacity
                    disabled={this.state.disableGlass5}
                    onPress={() => this.calculateDrinks(5)}>
                    {this.state.glassImage5 ? (
                      <Image style={{}} source={fullGlass} />
                    ) : (
                      <Image style={{}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.state.disableGlass6}
                    onPress={() => this.calculateDrinks(6)}>
                    {this.state.glassImage6 ? (
                      <Image style={{marginLeft: 40}} source={fullGlass} />
                    ) : (
                      <Image style={{marginLeft: 40}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.state.disableGlass7}
                    onPress={() => this.calculateDrinks(7)}>
                    {this.state.glassImage7 ? (
                      <Image style={{marginLeft: 40}} source={fullGlass} />
                    ) : (
                      <Image style={{marginLeft: 40}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.state.disableGlass8}
                    onPress={() => this.calculateDrinks(8)}>
                    {this.state.glassImage8 ? (
                      <Image style={{marginLeft: 40}} source={fullGlass} />
                    ) : (
                      <Image style={{marginLeft: 40}} source={emptyGlass} />
                    )}
                  </TouchableOpacity>
                </View>
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
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.textStyleSmallBoldFront}>
                    {this.state.cups_amount} ml
                  </Text>
                  <Text style={styles.textStyleSmall}>
                    {translate('WaterFrontView.Text3')}
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: '#F4F6FA',
                    width: 3,
                    height: 53,
                    alignSelf: 'center',
                  }}></View>
                <View style={{flexDirection: 'column'}}>
                  <Text
                    style={[
                      styles.textStyleSmallBoldFront,
                      {justifyContent: 'center', alignSelf: 'center'},
                    ]}>
                    {this.state.cups_value} {translate('WaterFrontView.Text2')}
                  </Text>
                  <Text style={styles.textStyleSmallFront}>
                    {translate('WaterFrontView.Text4')}
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
                {translate('WaterFrontView.Text5')}{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate('WaterReminderView');
                }}
                style={{marginTop: 15}}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#F77777',
                    fontWeight: 'bold',
                    textDecorationLine: 'underline',
                  }}>
                  {translate('WaterFrontView.Text6')}
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
                {translate('WaterFrontView.Text7')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  width: '100%',
                  flexWrap: 'wrap',
                }}>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={performanceBar => performanceBar.key}
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
                            {item.title}
                          </Text>
                          <Text>{item.day}</Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 'bold',
                            color: '#2D3142',
                            marginLeft: 160,
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
    );
  }
}
