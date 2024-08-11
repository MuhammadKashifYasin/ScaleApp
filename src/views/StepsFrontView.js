import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
  NativeModules,
  FlatList,
  Platform,
  NativeEventEmitter,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-material-dropdown';
import {BarChart, Grid} from 'react-native-svg-charts';
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
import Fitness from '@ovalmoney/react-native-fitness';
import Moment from 'moment';
import 'moment/locale/he';
import {extendMoment} from 'moment-range';
import {
  updateLifestyleHistory,
  getLifestyleHistory,
  newsFeed,
} from '../service/Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const moment = extendMoment(Moment);

const {styles} = Styles;

const permissions = [
  {
    kind: Fitness.PermissionKind?.Steps,
    access: Fitness.PermissionAccess?.Read,
  },
];

const caloriesPermission = [
  {
    kind: Fitness.PermissionKind?.Calories,
    access: Fitness.PermissionAccess?.Read,
  },
];

export default class StepsFrontView extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      marker: 0.5,
      eventSteps: 0,
      getCalories: 0,
      stepPercentage: 0,
      timer: '',
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
    this._isMounted = true;
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('lifestyle_type', 5);

    getLifestyleHistory(formdata)
      .then(res => {
        if (res.steps_count.length > 0) {
          let date1 = res.steps_count[0].date;
          let date2 = Moment(new Date()).format('DD-MM-YYYY');
          console.log(date1, date2);
          if (date2 == date1) {
          }
          this.updatePerformance(res.steps_count);
        }
      })
      .catch(err => {
        console.log('Error', err);
      });

    if (Platform.OS === 'android') {
      this.getStepsForAndroid();
    } else if (Platform.OS === 'ios') {
      this.getStepsForIOS();
    }
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
          performance: performance.steps_count,
          emoji: performance.steps_count > 5 ? happyEmoji : sadEmoji,
          title:
            performance.steps_count > 5
              ? translate('common.bestPerformance')
              : translate('common.worstPerformance'),
        };
        let barImage = '';
        if (performance.steps_count < 5000) {
          barImage = require('../img/quarter.png');
        } else if (
          performance.steps_count > 4999 &&
          performance.steps_count < 10000
        ) {
          barImage = require('../img/three-quarter.png');
        } else if (performance.steps_count === 10000) {
          barImage = require('../img/full-bar.png');
        } else if (performance.steps_count === 0) {
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  async updateStepsLifestyleHistory() {
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('Lifestyle_type', 5);
    formdata.append('steps_value', this.state.eventSteps);
    formdata.append('datetime', Moment(new Date()).format('MM-DD-YYYY'));

    updateLifestyleHistory(formdata)
      .then(res => {
        console.log(res);
        this.setState({getCalories: res.steps_calories});
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  getStepsForAndroid() {
    var dateNow = new Date();
    console.log(new Date().toISOString());
    var startDate = Moment(dateNow).format('YYYY-MM-DD') + 'T00:00:17.971Z';
    const options = {
      scopes: [
        Scopes.FITNESS_ACTIVITY_READ_WRITE,
        Scopes.FITNESS_BODY_READ_WRITE,
      ],
    };
    GoogleFit.authorize(options)
      .then(authResult => {
        if (authResult.success) {
          console.log('success');
          const dates = {
            startDate: startDate, // required ISO8601Timestamp
            endDate: new Date().toISOString(), // required ISO8601Timestamp
          };

          GoogleFit.getDailyStepCountSamples(dates)
            .then(res => {
              res.map(step => {
                if (step.source == 'com.google.android.gms:estimated_steps') {
                  const getPercentage = (step.steps[0].value / 10000) * 100;
                  if (step.steps[0].value > this.state.eventSteps) {
                    this.setState({
                      eventSteps: JSON.stringify(step.steps[0].value),
                    });
                    this.setState({
                      stepPercentage: this.roundToTwo(getPercentage),
                    });
                    this.updateStepsLifestyleHistory();
                  }
                }
              });
              setTimeout(() => {
                if (this._isMounted == true) {
                  this.getStepsForAndroid();
                }
              }, 3000);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log('AUTH_DENIED', authResult.message);
        }
      })
      .catch(() => {
        console.log('AUTH_ERROR');
      });
  }

  getStepsForIOS() {
    var dateNow = new Date();
    var startDate = Moment(dateNow).format('MM/DD/YYYY');
    var endDate = Moment(dateNow).format('MM/DD/YYYY');

    Fitness.requestPermissions(permissions).then(granted => {
      if (granted) {
        Fitness.isAuthorized(permissions)
          .then(authorized => {
            if (authorized) {
              const dates = {
                startDate: startDate,
                endDate: endDate,
              };
              Fitness.getSteps(dates)
                .then(result => {
                  console.log(result);
                  if (result.length > 0) {
                    console.log(this.state.eventSteps);
                    const getPercentage = (result[0].quantity / 10000) * 100;
                    if (
                      JSON.stringify(result[0].quantity) > this.state.eventSteps
                    ) {
                      this.setState({
                        eventSteps: JSON.stringify(result[0].quantity),
                      });
                      this.setState({
                        stepPercentage: this.roundToTwo(getPercentage),
                      });
                      this.updateStepsLifestyleHistory();
                    }
                  }
                })
                .catch(ex => {
                  console.log('getSteps Error ' + JSON.stringify(ex));
                });
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
    {
      /*Fitness.requestPermissions(caloriesPermission).then(granted=>{
      if(granted){
        Fitness.isAuthorized(caloriesPermission)
          .then(authorized => {
            if(authorized){
              const datesCalories = {
                startDate: startDate,
                endDate: endDate
              };
              Fitness.getCalories(datesCalories)
              .then(result => {
                if(result.length > 0){
                  console.log('getCalories Result ' + JSON.stringify(result[0].quantity));
                  this.setState({getCalories: JSON.stringify(result[0].quantity)});
                }
              })
              .catch(ex => {
                console.log('getCalories Error ' + JSON.stringify(ex));
              });
            }
        })
        .catch(error => {
          console.log(error);
        });
      }
    })*/
    }
    setTimeout(() => {
      if (this._isMounted == true) {
        this.getStepsForIOS();
      }
    }, 3000);
  }

  roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }

  render() {
    const fill = '#FE9C5E';
    const data = [
      1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 10, 20, 15, 45, 10, 25, 15, 20, 50,
      60, 20, 25, 10, 20, 48, 40, 5, 15, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ];
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
              onPress={() => this.props.navigation.navigate('StepsShareView')}
              style={{zIndex: 10, width: 40, height: 40, position: 'absolute', right: 12, margin: 10, top: 25}}>
              <Image source={require('../img/front-forward-icon.png')} />
            </TouchableOpacity>*/}
        </View>
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            style={{marginBottom: 20}}>
            <View style={{top: 154}}>
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  width: 230,
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                {translate('StepsFrontView.Text1')}{' '}
                <Text style={{color: '#7265E3'}}>
                  {this.state.eventSteps} {translate('StepsFrontView.Text9')}{' '}
                </Text>
                {translate('StepsFrontView.Text2')}
              </Text>
              <View
                style={{
                  alignSelf: 'center',
                  alignItems: 'center',
                  height: 156,
                  width: 182,
                  top: 40,
                }}>
                <Image source={require('../img/graph-outer-steps.png')} />
                <Image
                  style={{position: 'absolute'}}
                  source={require('../img/graph-outer-fill-steps.png')}
                />
                <View
                  style={{
                    position: 'absolute',
                    flexDirection: 'column',
                    top: 58,
                  }}>
                  <Image
                    style={{left: 20}}
                    source={require('../img/steps-in-front.png')}
                  />
                  <Text
                    style={{
                      fontSize: 32,
                      color: '#2D3142',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}>
                    {this.state.stepPercentage}%
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      color: '#9C9EB9',
                      textAlign: 'center',
                      fontWeight: 'normal',
                    }}>
                    {translate('StepsFrontView.Text3')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '80%',
                  alignSelf: 'center',
                  top: 90,
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.textStyleSmallBoldFront}>
                    {this.state.getCalories}{' '}
                    {translate('StepsFrontView.Text10')}
                  </Text>
                  <Text style={styles.textStyleSmallFront}>
                    {translate('StepsFrontView.Text4')}
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
                    10,000
                  </Text>
                  <Text style={styles.textStyleSmallFront}>
                    {translate('StepsFrontView.Text5')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  borderWidth: 30,
                  top: 100,
                  width: '100%',
                  borderColor: '#F2F2F2',
                }}></View>
              {/*<View
                style={{height: 140, top: 120, left: '5.87%'}}>
                <Text style={{color: '#2D3142', fontWeight: 'bold', fontSize: 20}}>{translate('StepsFrontView.Text6')}</Text>
                <View
                  style={{flexDirection: 'row', marginTop: 20, width: '100%'}}>
                  <View style={{flexDirection: 'column', width: '14%'}}>
                    <Image source={require('../img/quarter.png')}/>
                    <Text style={{color: '#9C9EB9'}}>{translate('common.monday')}</Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '14%'}}>
                    <Image source={require('../img/full-bar.png')}/>
                    <Text style={{color: '#9C9EB9'}}>{translate('common.tuesday')}</Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '14%'}}>
                    <Image source={require('../img/full-bar.png')}/>
                    <Text style={{color: '#9C9EB9'}}>{translate('common.wednesday')}</Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '14%'}}>
                    <Image source={require('../img/quarter.png')}/>
                    <Text style={{color: '#9C9EB9'}}>{translate('common.thursday')}</Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '14%'}}>
                    <Image source={require('../img/empty-bar.png')}/>
                    <Text style={{color: '#9C9EB9'}}>{translate('common.friday')}</Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '14%'}}>
                    <Image source={require('../img/three-quarter.png')}/>
                    <Text style={{color: '#7265E3'}}>{translate('common.saturday')}</Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '14%'}}>
                    <Image source={require('../img/empty-bar.png')}/>
                    <Text style={{color: '#9C9EB9'}}>{translate('common.sunday')}</Text>
                  </View>
                </View>
              </View>
              <View style={{
                paddingLeft:10,
                borderWidth: 3,
                top: 100,
                width: '100%',
                borderColor: '#F2F2F2'
              }}></View>
              <View
                style={{height: 140, top: 120, left: '5.87%'}}>
                <Text style={{color: '#2D3142', fontWeight: 'bold', fontSize: 20}}>{translate('StepsFrontView.Text7')}</Text>
                <BarChart
                  style={{ height: 63, width: '90%'}}
                  data={ data }
                  svg={{ fill }}
                  contentInset={{ top: 10 }}
                  >
                  <Grid/>
                </BarChart>
                <View
                  style={{flexDirection: 'row', width: '100%'}}>
                  <Image style={{position: 'absolute', left: 0}} source={require('../img/sunlight.png')}/>
                  <Text style={{position: 'absolute', left: 80}}>6AM</Text>
                  <Text style={{position: 'absolute', right: 200}}>12PM</Text>
                  <Text style={{position: 'absolute', right: 110}}>6PM</Text>
                  <Image style={{position: 'absolute', right: 40}} source={require('../img/moonlight.png')}/>
                </View>
              </View>
              <View style={{
                paddingLeft:10,
                borderWidth: 5,
                top: 100,
                width: '100%',
                borderColor: '#F2F2F2'
              }}></View>*/}
              <View style={{top: 120, left: '5.87%'}}>
                <Text
                  style={{color: '#2D3142', fontWeight: 'bold', fontSize: 20}}>
                  {translate('StepsFrontView.Text7')}
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
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
