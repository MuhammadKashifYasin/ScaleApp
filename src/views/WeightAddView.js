import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  AppState,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
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
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from 'react-native-elements';
import {Dropdown} from 'react-native-material-dropdown';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
import {updateLifestyleHistory, getLifestyleHistory} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BleManager from 'react-native-ble-manager';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const moment = extendMoment(Moment);
const goingDown = require('../img/going-down.png');
const goingUp = require('../img/going-up.png');
const goingEqual = require('../img/going-equal.png');
var Buffer = require('buffer/').Buffer;
const histories = [
  {
    value: 73,
    withDecimal: 30,
    date: '20.12 2012',
    fromWhen: 'last 3 days',
    icon: require('../img/going-down.png'),
    barColor: '#E365A1',
  },
  {
    value: 74,
    withDecimal: 56,
    date: '20.12 2012',
    fromWhen: 'last 3 days',
    icon: require('../img/going-up.png'),
    barColor: '#77E365',
  },
  {
    value: 74,
    withDecimal: 80,
    date: '20.12 2012',
    fromWhen: 'last 3 days',
    icon: require('../img/going-equal.png'),
    barColor: '#FE9C5E',
  },
  {
    value: 72,
    withDecimal: 30,
    date: '20.12 2012',
    fromWhen: 'last 3 days',
    icon: require('../img/going-down.png'),
    barColor: '#fff',
  },
  {
    value: 75,
    withDecimal: 30,
    date: '20.12 2012',
    fromWhen: 'last 3 days',
    icon: require('../img/going-up.png'),
    barColor: '#fff',
  },
  {
    value: 75,
    withDecimal: 30,
    date: '20.12 2012',
    fromWhen: 'last 3 days',
    icon: require('../img/going-equal.png'),
    barColor: '#fff',
  },
];

const window = Dimensions.get('window');

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class WeightAddView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight_value: 0,
      date: new Date(),
      goal_weight: 73.4,
      histories: [],
      scanning: false,
      peripherals: new Map(),
      appState: '',
    };

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic =
      this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral =
      this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  async componentDidMount() {
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('lifestyle_type', 4);

    getLifestyleHistory(formdata)
      .then(res => {
        console.log(res.weight);
        this.setState({weight_value: res.weight[0].weight_count});
        res.weight.map(weight => {
          const start = moment(new Date(), 'DD.MM YYYY');
          const end = moment(weight.date, 'DD.MM YYYY');
          let range = moment.range(start, end);
          let sign = '';
          let barColor = '';
          if (weight.weight_count > this.state.goal_weight) {
            sign = goingUp;
            barColor = '#77E365';
          } else if (weight.weight_count < this.state.goal_weight) {
            sign = goingDown;
            barColor = '#E365A1';
          } else if (weight.weight_count === this.state.goal_weight) {
            sign = goingEqual;
            barColor = '#FE9C5E';
          }
          let param = {
            value: String(weight.weight_count).split('.')[0],
            withDecimal: String(weight.weight_count).split('.')[1],
            date: weight.date,
            fromWhen: 'from ' + range.diff('days') + ' days',
            icon: sign,
            barColor: barColor,
          };
          this.setState({histories: this.state.histories.concat(param)});
        });
        console.log(this.state.histories);
      })
      .catch(err => {
        console.log('Error', err);
      });

    AppState.addEventListener('change', this.handleAppStateChange);

    BleManager.start({showAlert: false});

    this.handlerDiscover = bleManagerEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );
    this.handlerStop = bleManagerEmitter.addListener(
      'BleManagerStopScan',
      this.handleStopScan,
    );
    this.handlerDisconnect = bleManagerEmitter.addListener(
      'BleManagerDisconnectPeripheral',
      this.handleDisconnectedPeripheral,
    );
    this.handlerUpdate = bleManagerEmitter.addListener(
      'BleManagerDidUpdateValueForCharacteristic',
      this.handleUpdateValueForCharacteristic,
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ).then(result => {
        if (result) {
          console.log('Permission is OK');
        } else {
          PermissionsAndroid.requestPermission(
            PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          ).then(result => {
            if (result) {
              console.log('User accept');
            } else {
              console.log('User refuse');
            }
          });
        }
      });
    }
  }

  handleAppStateChange(nextAppState) {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      BleManager.getConnectedPeripherals([]).then(peripheralsArray => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data) {
    console.log(
      'Received data from ' +
        data.peripheral +
        ' characteristic ' +
        data.characteristic,
      data.value,
    );
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({scanning: false});
  }

  startScan() {
    if (!this.state.scanning) {
      //this.setState({peripherals: new Map()});
      BleManager.scan([], 3, true).then(results => {
        console.log('Scanning...');
        this.setState({scanning: true});
      });
    }
  }

  retrieveConnected() {
    BleManager.getConnectedPeripherals([]).then(results => {
      if (results.length == 0) {
        console.log('No connected peripherals');
      }
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({peripherals});
      }
    });
  }

  handleDiscoverPeripheral(peripheral) {
    var peripherals = this.state.peripherals;
    console.log('Got ble peripheral', peripheral);
    this.setState({weight_value: Math.abs(peripheral.rssi)});
    if (!peripheral.name) {
      peripheral.name = 'NO NAME';
    }
    peripherals.set(peripheral.id, peripheral);
    this.setState({peripherals});
    this.test(peripheral);
  }

  test(peripheral) {
    if (peripheral) {
      if (peripheral.connected) {
        BleManager.disconnect(peripheral.id);
      } else {
        BleManager.connect(peripheral.id)
          .then(() => {
            let peripherals = this.state.peripherals;
            let p = peripherals.get(peripheral.id);
            if (p) {
              p.connected = true;
              peripherals.set(peripheral.id, p);
              this.setState({peripherals});
            }
            console.log('Connected to ' + peripheral.id);

            setTimeout(() => {
              /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/

              // Test using bleno's pizza example
              // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
              BleManager.retrieveServices(peripheral.id).then(
                peripheralInfo => {
                  // console.log('this ia device data'+ JSON.stringify(peripheralInfo));
                  let data = peripheralInfo;
                  var service = data.characteristics[0].service;
                  // var service = 'ffb0';
                  var characteristic = data.characteristics[0].characteristic;
                  // var characteristic = 'ffb3';
                  console.log(service, characteristic);

                  setTimeout(() => {
                    BleManager.startNotification(
                      peripheral.id,
                      service,
                      characteristic,
                    )
                      .then(() => {
                        console.log('Started notification on ' + peripheral.id);
                        setTimeout(() => {
                          // BleManager.write(peripheral.id, service, characteristic, [1,95]).then(() => {
                          //   console.log('Writed 351 temperature, the pizza should be BAKED');
                          /*
                      var PizzaBakeResult = {
                        HALF_BAKED: 0,
                        BAKED:      1,
                        CRISPY:     2,
                        BURNT:      3,
                        ON_FIRE:    4
                      };*/
                          // });
                          BleManager.read(
                            peripheral.id,
                            service,
                            characteristic,
                          )
                            .then(readData => {
                              // Success code
                              console.log('Read: ' + readData);

                              const buffer = Buffer.Buffer.from(readData); //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                              const sensorData = buffer.readUInt8(1, true);
                              console.log(sensorData);
                            })
                            .catch(error => {
                              // Failure code
                              console.log(error);
                            });
                        }, 500);
                      })
                      .catch(error => {
                        console.log('Notification error', error);
                      });
                  }, 200);
                },
              );
            }, 900);
          })
          .catch(error => {
            console.log('Connection error', error);
          });
      }
    }
  }

  addReminder() {
    this.props.navigation.navigate('WeightReminderView');
  }

  async addWeight() {
    this.setState({weight_value: 68.4});

    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('Lifestyle_type', 4);
    formdata.append('weight_value', this.state.weight_value);
    formdata.append('datetime', Moment(new Date()).format('DD.MM YYYY'));

    updateLifestyleHistory(formdata)
      .then(res => {
        this.props.navigation.navigate('WeightShareView');
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  renderItem(item) {
    const color = item.connected ? 'green' : '#fff';
    return (
      <TouchableHighlight onPress={() => this.test(item)}>
        <View style={[styles.row, {backgroundColor: color}]}>
          <Text
            style={{
              fontSize: 12,
              textAlign: 'center',
              color: '#333333',
              padding: 10,
            }}>
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 10,
              textAlign: 'center',
              color: '#333333',
              padding: 2,
            }}>
            RSSI: {item.rssi}
          </Text>
          <Text
            style={{
              fontSize: 8,
              textAlign: 'center',
              color: '#333333',
              padding: 2,
              paddingBottom: 20,
            }}>
            {item.id}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const btnScanTitle =
      translate('WeightAddView.Text4') +
      '(' +
      (this.state.scanning ? 'on' : 'off') +
      ')';

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={([styles.mainContainer], {height: '100%'})}>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{width: '100%', height: 150, marginTop: 20}}>
                <View style={{marginLeft: 25}}>
                  <TouchableOpacity
                    onPress={() => this.props.navigation.goBack()}
                    style={{zIndex: 10, width: 40, height: 40}}>
                    <Image
                      source={require('../img/front-page-back-icon.png')}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{marginLeft: 25, flexDirection: 'row'}}>
                  <View style={{alignSelf: 'center'}}>
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: 26,
                        fontWeight: 'bold',
                      }}>
                      {translate('WeightAddView.Text1')}
                    </Text>
                    <Text style={{alignSelf: 'center'}}>
                      {translate('WeightAddView.Text2')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'center', height: 200}}>
                <TouchableOpacity
                  onPress={() => this.addReminder()}
                  style={{top: 30, right: 21, position: 'absolute'}}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#63D7E6', '#77E365']}
                    style={{
                      borderRadius: 50,
                      marginRight: 10,
                      width: 87,
                      height: 28,
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
                        fontSize: 9,
                        fontWeight: 'bold',
                        marginTop: 8,
                      }}>
                      {translate('WeightAddView.Text3')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <View
                  style={{
                    alignItems: 'center',
                    height: 156,
                    width: 182,
                    top: 40,
                  }}>
                  <Image source={require('../img/graph-outer.png')} />
                  <Image
                    style={{position: 'absolute', top: 12}}
                    source={require('../img/graph-inner.png')}
                  />
                  <Image
                    style={{position: 'absolute', left: -5}}
                    source={require('../img/graph-outer-fill.png')}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      flexDirection: 'column',
                      top: 88,
                    }}>
                    <Text
                      style={{
                        fontSize: 32,
                        color: '#2D3142',
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}>
                      {this.state.weight_value}
                    </Text>
                    <Text
                      style={{
                        fontSize: 22,
                        color: '#9C9EB9',
                        textAlign: 'center',
                        fontWeight: 'normal',
                      }}>
                      Kg
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{width: '100%', alignItems: 'center', height: 120}}>
                <TouchableOpacity
                  onPress={() => this.startScan()}
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
                      {btnScanTitle}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              {this.state.histories.length > 0 ? (
                <View>
                  <View
                    style={{width: '100%', flexDirection: 'row', height: 50}}>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#2D3142',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        position: 'absolute',
                        left: 20,
                      }}>
                      {translate('WeightAddView.Text5')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#2D3142',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        position: 'absolute',
                        right: 100,
                      }}>
                      {translate('WeightAddView.Text6')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 24,
                        color: '#2D3142',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        position: 'absolute',
                        right: 20,
                      }}>
                      {String(this.state.goal_weight).split('.')[0]}.
                      <Text style={{fontSize: 16, fontWeight: 'normal'}}>
                        {String(this.state.goal_weight).split('.')[1]}
                      </Text>
                    </Text>
                  </View>
                  <View>
                    <FlatList
                      keyExtractor={history => history.value}
                      data={this.state.histories}
                      renderItem={({item}) => {
                        return (
                          <View
                            style={{
                              width: '99%',
                              left: 3,
                              flexDirection: 'row',
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              borderBottomWidth: 2,
                              borderBottomColor: '#F4F4F4',
                              backgroundColor: '#fff',
                              height: 48.26,
                              alignItems: 'center',
                            }}>
                            <View style={{width: '20%', flexDirection: 'row'}}>
                              <View
                                style={{
                                  width: 8,
                                  height: 46,
                                  marginRight: 10,
                                  backgroundColor: item.barColor,
                                  borderTopLeftRadius: 10,
                                }}
                              />
                              <Text
                                style={{
                                  alignSelf: 'center',
                                  fontSize: 24,
                                  color: '#2D3142',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}>
                                {item.value}.
                                <Text
                                  style={{fontSize: 16, fontWeight: 'normal'}}>
                                  {item.withDecimal}
                                </Text>
                              </Text>
                            </View>
                            <View
                              style={{
                                width: '25%',
                                fontSize: 16,
                                flexDirection: 'column',
                              }}>
                              <Text
                                style={{fontWeight: 'bold', color: '#C4C4C4'}}>
                                {item.date}
                              </Text>
                              <Text
                                style={{
                                  fontWeight: 'normal',
                                  color: '#C4C4C4',
                                }}>
                                {item.fromWhen}
                              </Text>
                            </View>
                            <View style={{width: '10%'}}>
                              <Image source={item.icon} />
                            </View>
                            <View style={{width: '45%'}}>
                              <TouchableOpacity
                                style={{
                                  borderWidth: 1,
                                  borderRadius: 40,
                                  borderColor: '#F7F8FA',
                                  backgroundColor: '#F7F8FA',
                                  width: 73,
                                  height: 24,
                                  alignSelf: 'center',
                                }}>
                                <Text
                                  style={{
                                    textAlign: 'center',
                                    color: '#C4C4C4',
                                  }}>
                                  {translate('WeightAddView.Text7')}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                </View>
              ) : null}
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
