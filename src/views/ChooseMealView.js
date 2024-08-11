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
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const mainMeals = [
  {name: 'Morning', calories: 1567, option: true},
  {name: 'Lunch', calories: 0, option: false},
  {name: 'Dinner', calories: 0, option: false},
];
export default class ChooseMealView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 2,
    };
  }

  componentDidMount() {}

  addFoodMenu() {
    this.props.navigation.navigate('NutritionMealDetailView');
  }

  addReceipeMeal() {
    this.props.navigation.navigate('ReceipesFoodMenuView');
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
                left: 12,
                margin: 10,
                top: 35,
              }}>
              <Image source={require('../img/front-page-back-icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{alignItems: 'center', top: 100, height: 110}}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 230,
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>
                  {translate('ChooseMealView.Text1')}
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#666666',
                    width: 200,
                    fontSize: 16,
                    fontWeight: 'normal',
                    top: 50,
                  }}>
                  {translate('ChooseMealView.Text2')}
                </Text>
              </View>
              <View style={{top: 200, height: 110}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => this.addFoodMenu()}
                    style={{width: '50%', position: 'absolute', left: 0}}>
                    <View
                      style={{
                        borderRadius: 5,
                        margin: 15,
                        backgroundColor: '#fff',
                        width: 160,
                        height: 160,
                      }}>
                      <View style={{alignSelf: 'center', marginTop: 30}}>
                        <Svg
                          width="40"
                          height="48"
                          viewBox="0 0 40 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <Path
                            d="M25.4 0.600098C24.4064 0.600098 23.6 1.4065 23.6 2.4001C23.6 3.3937 24.4064 4.2001 25.4 4.2001H34.4C35.3936 4.2001 36.2 3.3937 36.2 2.4001C36.2 1.4065 35.3936 0.600098 34.4 0.600098H25.4ZM25.4 7.8001L21.5399 14.2337C20.5319 15.9113 20 17.8353 20 19.7919V25.3712C23.2886 28.01 25.4 32.0568 25.4 36.6036C25.4 40.488 23.8537 44.0048 21.3535 46.595C21.9709 47.09 22.745 47.4001 23.6 47.4001H36.2C38.189 47.4001 39.8 45.7891 39.8 43.8001V19.7919C39.8 17.8335 39.2664 15.9113 38.2602 14.2337L34.4 7.8001H25.4ZM11 25.8001C5.03481 25.8001 0.200012 30.6349 0.200012 36.6001C0.200012 42.5653 5.03481 47.4001 11 47.4001C16.9652 47.4001 21.8 42.5653 21.8 36.6001C21.8 30.6349 16.9652 25.8001 11 25.8001ZM10.9367 29.4001H10.9965H11.0598C11.7924 29.4073 12.3268 30.0969 12.1918 30.8169L11.5309 34.3571C11.4859 34.6145 11.261 34.8001 11 34.8001C10.739 34.8001 10.5142 34.6145 10.4656 34.3571L9.8047 30.8169C9.6697 30.0969 10.2041 29.4073 10.9367 29.4001ZM5.63165 32.42C5.96735 32.3624 6.32811 32.4468 6.61251 32.6907L9.32306 35.0146C9.52106 35.1838 9.57219 35.4716 9.44259 35.6966C9.31299 35.9234 9.0388 36.0256 8.7922 35.9392L5.42423 34.7544C4.71683 34.506 4.40999 33.678 4.78439 33.0282L4.79845 33.0036C4.98565 32.6787 5.29595 32.4776 5.63165 32.42ZM16.3684 32.42C16.7043 32.4776 17.0153 32.6787 17.2016 33.0036L17.2156 33.0282C17.59 33.678 17.2832 34.5095 16.5758 34.7579L13.2078 35.9427C12.9612 36.0291 12.6888 35.9269 12.5574 35.7001C12.4278 35.4733 12.479 35.1873 12.677 35.0181L15.3875 32.6907C15.6719 32.4468 16.0324 32.3624 16.3684 32.42ZM8.7922 37.2575C9.0388 37.1711 9.31119 37.2733 9.44259 37.5001C9.57219 37.7269 9.52106 38.0129 9.32306 38.1821L6.61251 40.5095C6.04371 40.9973 5.17105 40.8464 4.79845 40.1966L4.78439 40.172C4.40999 39.5222 4.71683 38.6907 5.42423 38.4423L8.7922 37.2575ZM13.2078 37.261L16.5758 38.4458C17.2832 38.6942 17.59 39.5222 17.2156 40.172L17.2016 40.1966C16.8272 40.8464 15.9563 40.9973 15.3875 40.5095L12.677 38.1856C12.479 38.0164 12.4278 37.7286 12.5574 37.5036C12.687 37.2768 12.9612 37.1746 13.2078 37.261ZM11 38.4001C11.261 38.4001 11.4858 38.5857 11.5344 38.8431L12.1953 42.3833C12.3303 43.1033 11.7959 43.7929 11.0633 43.8001H11.0035H10.9402C10.2076 43.7929 9.67321 43.1033 9.80822 42.3833L10.4692 38.8431C10.5142 38.5857 10.739 38.4001 11 38.4001Z"
                            fill="#7265E3"
                          />
                        </Svg>
                      </View>
                      <Text
                        style={{
                          alignSelf: 'center',
                          textAlign: 'center',
                          fontSize: 14,
                          color: '#2D3142',
                        }}>
                        {translate('ChooseMealView.Text3')}
                      </Text>
                      <View style={{bottom: 0, position: 'absolute'}}>
                        <LinearGradient
                          angleCenter={{x: 0.5, y: 1.5}}
                          angle={90}
                          useAngle={true}
                          colors={['#7265E3', '#7265E3']}
                          style={{
                            borderRadius: 5,
                            marginRight: 10,
                            width: 160,
                            height: 34,
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
                              fontSize: 12,
                              fontWeight: 'normal',
                              marginTop: 8,
                            }}>
                            {translate('ChooseMealView.Text4')}
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => this.addReceipeMeal()}
                    style={{width: '50%', position: 'absolute', right: 0}}>
                    <View
                      style={{
                        borderRadius: 5,
                        margin: 15,
                        backgroundColor: '#fff',
                        width: 160,
                        height: 160,
                      }}>
                      <View style={{alignSelf: 'center', marginTop: 30}}>
                        <Svg
                          width="56"
                          height="38"
                          viewBox="0 0 56 38"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <Path
                            d="M0.160034 0.600038V12.2C0.160034 16.0833 1.81847 17.4382 2.91503 18.3263C3.52675 18.8202 3.64003 18.9335 3.64003 19.16V30.76C3.64003 34.8336 3.24128 37.72 5.96003 37.72C8.83285 37.72 8.28003 34.0225 8.28003 30.76V19.16C8.28003 18.9833 8.29363 18.9018 8.93253 18.435C10.0518 17.6103 11.76 16.3688 11.76 12.3813V0.600038H9.44003V11.04C9.44003 11.6789 8.92347 12.2 8.28003 12.2C7.6366 12.2 7.12003 11.6789 7.12003 11.04V0.600038H4.80003V11.04C4.80003 11.6789 4.28347 12.2 3.64003 12.2C2.9966 12.2 2.48003 11.6789 2.48003 11.04V0.600038H0.160034ZM49.9675 0.600038C49.7727 0.609101 49.5914 0.677069 49.4238 0.781288C49.0839 0.994257 48.88 1.36129 48.88 1.76004V29.7813C48.88 33.7914 48.3453 37.72 51.2 37.72C53.6968 37.72 53.52 33.8775 53.52 29.6V21.48C53.52 20.4514 53.946 19.4274 54.4263 18.2538C55.0924 16.618 55.84 14.7738 55.84 12.2C55.84 10.8089 56.6828 3.71754 50.5475 0.708788C50.3663 0.618163 50.1624 0.590976 49.9675 0.600038ZM29.74 1.76004C20.4646 1.76004 12.92 9.30457 12.92 18.58C12.92 27.8555 20.4646 35.4 29.74 35.4C39.0155 35.4 46.56 27.8555 46.56 18.58C46.56 9.30457 39.0155 1.76004 29.74 1.76004ZM29.0875 7.59629C29.7264 7.5691 30.2838 8.04488 30.32 8.68379C30.3563 9.32269 29.8714 9.84379 29.2325 9.88004C24.6424 10.1428 21.04 13.9718 21.04 18.58C21.04 23.3786 24.9414 27.28 29.74 27.28C34.3483 27.28 38.1772 23.6777 38.44 19.0875C38.4763 18.4486 38.9974 17.9683 39.6363 18C40.2752 18.0363 40.76 18.5936 40.7238 19.2325C40.393 25.0507 35.5763 29.6 29.74 29.6C23.6636 29.6 18.72 24.6564 18.72 18.58C18.72 12.7438 23.2694 7.9316 29.0875 7.59629Z"
                            fill="#63D7E7"
                          />
                        </Svg>
                      </View>
                      <Text
                        style={{
                          alignSelf: 'center',
                          textAlign: 'center',
                          fontSize: 14,
                          color: '#2D3142',
                        }}>
                        {translate('ChooseMealView.Text5')}
                      </Text>
                      <View style={{bottom: 0, position: 'absolute'}}>
                        <LinearGradient
                          angleCenter={{x: 0.5, y: 1.5}}
                          angle={90}
                          useAngle={true}
                          colors={['#63D7E7', '#63D7E7']}
                          style={{
                            borderRadius: 5,
                            marginRight: 10,
                            width: 160,
                            height: 34,
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
                              fontSize: 12,
                              fontWeight: 'normal',
                              marginTop: 8,
                            }}>
                            {translate('ChooseMealView.Text6')}
                          </Text>
                        </LinearGradient>
                      </View>
                    </View>
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
