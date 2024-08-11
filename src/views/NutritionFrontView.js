import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  NativeModules,
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
import {BarChart, Grid} from 'react-native-svg-charts';
import Moment from 'moment';
import {updateLifestyleHistory, getLifestyleHistory} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {extendMoment} from 'moment-range';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const moment = extendMoment(Moment);
const {styles} = Styles;

export default class NutritionFrontView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('lifestyle_type', 1);

    getLifestyleHistory(formdata)
      .then(res => {
        console.log(res);
        if (res.nutrition.length > 0) {
          if (date2 < date1) {
            let date1 = moment(
              res.water[0].date.split('-').reverse().join('-') +
                'T00:00:00.000Z',
            );
            let date2 = moment().startOf('week');
          }
        }
      })
      .catch(err => {
        console.log('Error', err);
      });
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
              height: 40,
              left: 12,
              margin: 10,
              top: 15,
            }}>
            <Image source={require('../img/front-page-back-icon.png')} />
          </TouchableOpacity>
          {/*<TouchableOpacity
              onPress={() => this.props.navigation.navigate('NutritionShareView')}
              style={{zIndex: 10, width: 40, height: 40, position: 'absolute', right: 12, margin: 10, top: 25}}>
              <Image source={require('../img/front-forward-icon.png')} />
            </TouchableOpacity>*/}
        </View>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{alignItems: 'center', top: 70, height: 240}}>
              <Text
                style={{
                  textAlign: 'center',
                  width: 230,
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                {translate('NutritionFrontView.Text1')}{' '}
                <Text style={{color: '#7265E3'}}>
                  500 {translate('NutritionFrontView.Text2')}{' '}
                </Text>
                {translate('NutritionFrontView.Text9')}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('NutritionMealsView')
                }
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
                    {translate('NutritionFrontView.Text10')}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
            <View style={{width: '80%', alignSelf: 'center'}}>
              <Text>2000 {translate('NutritionFrontView.Text2')}</Text>
              <View
                style={{
                  paddingLeft: 10,
                  borderWidth: 1,
                  width: '100%',
                  borderColor: '#C4C4C4',
                }}></View>
              <BarChart
                style={{height: 63}}
                data={data}
                svg={{fill}}
                contentInset={{top: 10}}>
                <Grid />
              </BarChart>
            </View>
            <View style={{width: '80%', alignSelf: 'center', marginTop: 50}}>
              <View
                style={{
                  width: '100%',
                  height: 38,
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '10%',
                    height: 16,
                    width: 16,
                    backgroundColor: '#FFA56C',
                    borderRadius: 4,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'normal',
                    width: '40%',
                    left: 12,
                  }}>
                  {translate('NutritionFrontView.Text3')}
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: 'normal', width: '25%'}}>
                  100g
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    width: '25%',
                    textAlign: 'right',
                  }}>
                  32%
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  borderWidth: 1,
                  width: '100%',
                  borderColor: '#F2F2F2',
                }}></View>
              <View
                style={{
                  width: '100%',
                  height: 38,
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '10%',
                    height: 16,
                    width: 16,
                    backgroundColor: '#7265E3',
                    borderRadius: 4,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'normal',
                    width: '40%',
                    left: 12,
                  }}>
                  {translate('NutritionFrontView.Text4')}
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: 'normal', width: '25%'}}>
                  40g
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    width: '25%',
                    textAlign: 'right',
                  }}>
                  40%
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  borderWidth: 1,
                  width: '100%',
                  borderColor: '#F2F2F2',
                }}></View>
              <View
                style={{
                  width: '100%',
                  height: 38,
                  flex: 1,
                  flexDirection: 'row',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '10%',
                    height: 16,
                    width: 16,
                    backgroundColor: '#3FC7BC',
                    borderRadius: 4,
                  }}></View>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'normal',
                    width: '40%',
                    left: 12,
                  }}>
                  {translate('NutritionFrontView.Text5')}
                </Text>
                <Text
                  style={{fontSize: 16, fontWeight: 'normal', width: '25%'}}>
                  100g
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    width: '25%',
                    textAlign: 'right',
                  }}>
                  32%
                </Text>
              </View>
            </View>
            <View
              style={{
                paddingLeft: 10,
                borderWidth: 5,
                width: '100%',
                borderColor: '#F2F2F2',
              }}></View>
            <View style={{height: 230, left: '5.87%', top: '2%'}}>
              <Text
                style={{color: '#2D3142', fontWeight: 'bold', fontSize: 20}}>
                Breakfast
              </Text>
              <View style={{flexDirection: 'row', marginTop: 20, width: '80%'}}>
                <Image
                  style={{alignSelf: 'center', marginRight: 10}}
                  source={require('../img/coffee-mug.png')}
                />
                <View style={{width: '65.3%', marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#2D3142',
                    }}>
                    Latte Macchiato
                  </Text>
                  <Text style={{color: '#9C9EB9'}}>1 piece 2 oz</Text>
                </View>
                <Text
                  style={{
                    width: '20%',
                    textAlign: 'right',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#2D3142',
                  }}>
                  190
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  borderWidth: 1,
                  marginTop: 20,
                  width: '80%',
                  borderColor: '#F2F2F2',
                }}></View>
              <View style={{flexDirection: 'row', marginTop: 20, width: '80%'}}>
                <Image
                  style={{alignSelf: 'center', marginRight: 10}}
                  source={require('../img/pizza-slice.png')}
                />
                <View style={{width: '65.3%', marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#2D3142',
                    }}>
                    Tuna Pizza
                  </Text>
                  <Text style={{color: '#9C9EB9'}}>1 piece 2 oz</Text>
                </View>
                <Text
                  style={{
                    width: '20%',
                    textAlign: 'right',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#2D3142',
                  }}>
                  190
                </Text>
              </View>
            </View>
            <View
              style={{height: 50, width: '100%', backgroundColor: '#FFEFE5'}}>
              <View
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  flex: 1,
                  flexDirection: 'row',
                }}>
                <Image
                  style={{width: 19, marginTop: 10}}
                  source={require('../img/L-path.png')}
                />
                <Image
                  style={{width: 19, marginTop: 15, marginLeft: 5}}
                  source={require('../img/warning-icon.png')}
                />
                <Text
                  style={{
                    width: '80%',
                    marginLeft: 15,
                    color: '#FE9C5E',
                    fontSize: 14,
                    fontWeight: 'bold',
                    marginTop: 15,
                  }}>
                  High carb (300 gr per slice)
                </Text>
                <Image
                  style={{position: 'absolute', right: 0, marginTop: 15}}
                  source={require('../img/arrow-up.png')}
                />
              </View>
            </View>
            <View
              style={{
                paddingLeft: 10,
                borderWidth: 5,
                width: '100%',
                borderColor: '#F2F2F2',
              }}></View>
            <View style={{height: 130, left: '5.87%', top: '2%'}}>
              <Text
                style={{color: '#2D3142', fontWeight: 'bold', fontSize: 20}}>
                Lunch
              </Text>
              <View style={{flexDirection: 'row', marginTop: 20, width: '80%'}}>
                <Image
                  style={{alignSelf: 'center', marginRight: 10}}
                  source={require('../img/burger-icon.png')}
                />
                <View style={{width: '65.3%', marginLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: 'bold',
                      color: '#2D3142',
                    }}>
                    Big Mac Burger
                  </Text>
                  <Text style={{color: '#9C9EB9'}}>1 piece 2 oz</Text>
                </View>
                <Text
                  style={{
                    width: '20%',
                    textAlign: 'right',
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#2D3142',
                  }}>
                  190
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
