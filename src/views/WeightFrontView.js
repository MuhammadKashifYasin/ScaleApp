import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  Keyboard,
  NativeModules,
  TouchableWithoutFeedback,
  TextInput,
  ImageBackground,
  TouchableHighlight,
  NativeAppEventEmitter,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
import LinearGradient from 'react-native-linear-gradient';
import {LineChart} from 'react-native-line-chart';
import Moment from 'moment';
import 'moment/locale/he';
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
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June'],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(156, 158, 185, ${opacity})`,
};
const screenWidth = Dimensions.get('window').width;

export default class WeightFrontView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weight_goal: 50,
      weight_value: 0,
      weight_diff: 0,
      date_day: new Date(),
      journal_histories: [],
      ble: null,
      scanning: false,
    };
  }

  async componentDidMount() {
    BleManager.start({showAlert: false});
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);

    NativeAppEventEmitter.addListener(
      'BleManagerDiscoverPeripheral',
      this.handleDiscoverPeripheral,
    );

    if (Platform.OS === 'android' && Platform.Version >= 23) {
      PermissionsAndroid.checkPermission(
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

    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('lifestyle_type', 4);

    getLifestyleHistory(formdata)
      .then(res => {
        console.log(res.weight);
        this.setState({weight_value: JSON.parse(res.weight[0].weight_count)});
        this.setState({
          date_day: moment(res.weight[0].date, 'DD.MM YYYY').format('dddd'),
        });
        if (this.state.weight_goal > JSON.parse(res.weight[0].weight_count)) {
          this.setState({
            weight_diff:
              this.state.weight_goal - JSON.parse(res.weight[0].weight_count),
          });
        } else {
          this.setState({
            weight_diff:
              JSON.parse(res.weight[0].weight_count) - this.state.weight_goal,
          });
        }
        res.weight.map(weight => {
          let param = {
            dayName:
              this.getSystemLocale() === 'he-US'
                ? moment(weight.date, 'DD.MM YYYY').locale('he').format('dddd')
                : moment(weight.date, 'DD.MM YYYY').locale('en').format('dddd'),
            weight: weight.weight_count,
          };
          this.setState({
            journal_histories: this.state.journal_histories.concat(param),
          });
        });
        console.log(this.state.journal_histories);
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

  handleScan() {
    BleManager.scan([], 30, true).then(results => {
      console.log('Scanning...');
    });
  }

  toggleScanning(bool) {
    if (bool) {
      this.setState({scanning: true});
      this.scanning = setInterval(() => this.handleScan(), 3000);
    } else {
      this.setState({scanning: false, ble: null});
      clearInterval(this.scanning);
    }
  }

  handleDiscoverPeripheral(data) {
    console.log('Got ble data', data);
    this.setState({ble: data});
  }

  saveReminder() {
    this.props.navigation.navigate('WeightAddView');
  }

  connectScanner(ble) {
    console.log(ble);
    BleManager.connect(ble)
      .then(peripheralInfo => {
        // Success code
        console.log('Connected');
        console.log(peripheralInfo);
      })
      .catch(error => {
        // Failure code
        console.log(error);
      });
  }

  render() {
    const container = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    };

    const bleList = this.state.ble ? (
      <Text> Device found: {this.state.ble.name} </Text>
    ) : (
      <Text>no devices nearby</Text>
    );

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={([styles.mainContainer], {height: '100%'})}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HomeView')}
              style={{
                zIndex: 10,
                width: 40,
                height: 40,
                left: 12,
                margin: 10,
                top: 15,
              }}>
              <Image source={require('../img/front-page-back-icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View
                style={{width: '100%', height: 721, backgroundColor: 'white'}}>
                <Text
                  style={{
                    position: 'absolute',
                    left: 12,
                    margin: 10,
                    top: 45,
                    fontSize: 30,
                    fontWeight: 'bold',
                  }}>
                  {translate('WeightFrontView.Text1')}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    left: 22,
                    top: 105,
                    width: '100%',
                    height: 30,
                  }}>
                  <View style={{flexDirection: 'column', width: '33.33%'}}>
                    <Text style={{color: '#9C9EB9', fontSize: 14}}>
                      {translate('WeightFrontView.Text2')}
                    </Text>
                    <Text
                      style={{
                        color: '#2D3142',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {this.state.weight_value} kg
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '33.33%'}}>
                    <Text style={{color: '#9C9EB9', fontSize: 14}}>
                      {translate('WeightFrontView.Text3')}
                    </Text>
                    <Text
                      style={{
                        color: '#2D3142',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {this.state.weight_goal} kg
                    </Text>
                  </View>
                  <View style={{flexDirection: 'column', width: '33.33%'}}>
                    <Text style={{color: '#9C9EB9', fontSize: 14}}>
                      {translate('WeightFrontView.Text4')}
                    </Text>
                    <Text
                      style={{
                        color: '#2D3142',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      {this.state.weight_diff} kg
                    </Text>
                  </View>
                </View>
                <View style={{left: 22, top: 150, width: '90%', height: 200}}>
                  <LineChart
                    data={data}
                    width={360}
                    height={200}
                    chartConfig={chartConfig}
                  />
                </View>
                <View
                  style={{
                    paddingLeft: 10,
                    borderWidth: 1,
                    top: 170,
                    width: '100%',
                    borderColor: '#F2F2F2',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    width: '70%',
                    top: 190,
                    left: 22,
                  }}>
                  <Image source={require('../img/hand-icon.png')} />
                  <Text style={{fontSize: 14, left: 20}}>
                    {translate('WeightFrontView.Text5')}{' '}
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#5EC23B',
                        fontWeight: 'bold',
                      }}>
                      10% {translate('WeightFrontView.Text6')}
                    </Text>{' '}
                    {translate('WeightFrontView.Text9')}
                  </Text>
                </View>
                <View
                  style={{
                    paddingLeft: 10,
                    borderWidth: 5,
                    top: 200,
                    width: '100%',
                    borderColor: '#F2F2F2',
                  }}
                />
                <View style={{top: 210, left: 22}}>
                  {this.state.journal_histories.length > 0 ? (
                    <View>
                      <Text style={{fontSize: 22, fontWeight: 'bold'}}>
                        {translate('WeightFrontView.Text7')}
                      </Text>
                      <FlatList
                        keyExtractor={journal_history => journal_history.weight}
                        data={this.state.journal_histories}
                        renderItem={({item}) => {
                          return (
                            <View>
                              <View
                                style={{flexDirection: 'row', width: '90%'}}>
                                <Text
                                  style={{
                                    position: 'absolute',
                                    left: 0,
                                    fontSize: 16,
                                  }}>
                                  {item.dayName}
                                </Text>
                                <Text
                                  style={{
                                    position: 'absolute',
                                    right: 20,
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                  }}>
                                  {item.weight}
                                </Text>
                              </View>
                              <View
                                style={{
                                  paddingLeft: 10,
                                  borderWidth: 1,
                                  top: 25,
                                  width: '85%',
                                  borderColor: '#F2F2F2',
                                }}
                              />
                            </View>
                          );
                        }}
                      />
                    </View>
                  ) : null}

                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('WeightAddView')
                    }
                    style={{top: 95}}>
                    <LinearGradient
                      angleCenter={{x: 0.5, y: 1.5}}
                      angle={90}
                      useAngle={true}
                      colors={['#63D7E6', '#77E365']}
                      style={{
                        borderRadius: 50,
                        marginRight: 10,
                        width: 350,
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
                        {translate('WeightFrontView.Text8')}
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
