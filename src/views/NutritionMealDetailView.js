import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {getFoodIngredients} from '../service/Api';
import {Config} from '../config/Config';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';
import ProgressLoader from 'rn-progress-loader';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const data = [
  {
    value: '1',
  },
  {
    value: '2',
  },
  {
    value: '3',
  },
];
const weight = [
  {
    value: 'gram',
  },
  {
    value: 'Piece',
  },
];

const foodNames = [
  {
    item_name: 'pizza',
    item_photo_url: 'https://www.scale-app.com/image.png',
    item_type: 'Piece',
    item_calories: 800,
    food_type: 1,
  },
  {
    item_name: 'carrot',
    item_photo_url: 'https://www.scale-app.com/image.png',
    item_type: 'gram',
    item_calories: 50,
    food_type: 1,
  },
  {
    item_name: 'pizza',
    item_photo_url: 'https://www.scale-app.com/image.png',
    item_type: 'Piece',
    item_calories: 800,
    food_type: 1,
  },
];

const letters = [{name: 'A'}, {name: 'B'}, {name: 'C'}];

export default class NutritionMealDetailView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      foodLists: [],
      tempFoodLists: [],
      foodLetters: [],
      appHasLoaded: false,
      calories: 0,
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  async componentDidMount() {
    // this.setState({foodLists: foodNames});
    // console.log(foodNames);

    // this.populateData(foodNames);
    // console.log(this.state.foodLetters);
    this.setState({appHasLoaded: true});
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);

    getFoodIngredients(formdata)
      .then(res => {
        console.log(res);
        res.foot_list.map(list => {
          let param = {
            item_name: list.item_name,
            item_photo_url: list.item_photo_url,
            item_type: list.item_type,
            item_calories: list.item_calories,
            food_type: list.food_type,
          };
          this.setState({foodLists: this.state.foodLists.concat(param)});
        });
        this.populateData(this.state.foodLists);
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  populateData(foodNames) {
    this.setState({foodLetters: []});
    // this.setState({foodLists: foodNames});
    foodNames.map(food => {
      console.log(food.item_name.charAt(0).toUpperCase());
      this.state.foodLetters.push(food.item_name.charAt(0).toUpperCase());
    });
    this.state.foodLetters = this.state.foodLetters.filter((elem, pos) => {
      return this.state.foodLetters.indexOf(elem) == pos;
    });
    const myData = this.state.foodLetters.sort((a, b) => a.localeCompare(b));
    this.setState({foodLetters: myData});
    this.setState({appHasLoaded: false});
  }

  // updateSearch(search){
  //   console.log(search);
  //   if(this.state.tempFoodLists.length == 0){
  //     this.setState({tempFoodLists: this.state.foodLists});
  //   }
  //   var array = this.state.foodLists.filter((elem)=> {
  //     return elem.item_name == search;
  //   });
  //   console.log(array);
  //   if(array.length > 0){
  //     this.setState({foodLists: array});
  //     this.populateData(array);
  //   }
  //   if(search == ''){
  //     this.setState({foodLists: this.state.tempFoodLists});
  //     this.populateData(this.state.tempFoodLists);
  //   }

  //   this.setState({ search });
  // };

  async updateSearch(search) {
    console.log(search);
    this.setState({appHasLoaded: true});
    if (this.state.tempFoodLists.length == 0) {
      this.setState({tempFoodLists: this.state.foodLists});
    }
    this.state.foodLists = [];
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('food_type', 1);
    formdata.append('search_query', search);

    searchList(formdata)
      .then(res => {
        res.foot_list.map(list => {
          let param = {
            item_name: list.item_name,
            item_photo_url: list.item_photo_url,
            item_type: list.item_type,
            item_calories: list.item_calories,
            food_type: list.food_type,
          };
          this.setState({foodLists: this.state.foodLists.concat(param)});
        });
        this.populateData(this.state.foodLists);
        this.setState({appHasLoaded: false});
      })
      .catch(err => {
        console.log('Error', err);
      });

    // var array = this.state.foodLists.filter((elem)=> {
    //   return elem.meal_name == search;
    // });
    // console.log(array);
    // if(array.length > 0){
    //   this.setState({foodLists: array});
    // }

    this.setState({search});
  }

  addMeal() {
    this.props.navigation.navigate('NutritionMealsView');
  }

  calculateCal(cal) {
    if (cal < 0) {
    } else {
      this.setState({calories: cal});
    }
  }

  render() {
    const {search} = this.state;

    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={([styles.mainContainer], {height: '100%'})}>
          <ProgressLoader
            visible={this.state.appHasLoaded}
            isModal={true}
            isHUD={false}
            hudColor={'#000000'}
            color={'#FFFFFF'}
          />
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{width: '100%', height: 120, marginTop: 20}}>
                <View style={{marginLeft: 10}}>
                  <Icon.Button
                    name="align-left"
                    backgroundColor="#F2F2F2"
                    color="#2a292b"
                    style={{marginLeft: 10}}
                    onPress={() =>
                      this.props.navigation.goBack()
                    }></Icon.Button>
                </View>
                <View style={{marginLeft: 10, flexDirection: 'row'}}>
                  <Icon.Button
                    name="list"
                    backgroundColor="#F2F2F2"
                    color="#2a292b"
                    style={{marginLeft: 10}}></Icon.Button>
                  <View style={{alignSelf: 'center'}}>
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        fontSize: 26,
                        fontWeight: 'bold',
                      }}>
                      {translate('NutritionMealDetailView.Text1')}
                    </Text>
                    <Text style={{alignSelf: 'center'}}>
                      {translate('NutritionMealDetailView.Text2')}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{width: '90%', alignSelf: 'center'}}>
                <SearchBar
                  containerStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 40,
                    height: 55,
                  }}
                  inputContainerStyle={{backgroundColor: '#fff'}}
                  lightTheme
                  placeholder="Search"
                  onChangeText={this.updateSearch}
                  value={search}
                />
              </View>
              <View style={{top: 15}}>
                <Text
                  style={{
                    color: '#2D3142',
                    fontWeight: 'bold',
                    fontSize: 20,
                    left: 19,
                  }}>
                  {translate('NutritionMealDetailView.Text3')}
                </Text>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  keyExtractor={letter => letter}
                  data={this.state.foodLetters}
                  renderItem={({item}) => {
                    return (
                      <View style={{width: '98.5%'}}>
                        <Text
                          style={{
                            color: '#2D3142',
                            fontWeight: 'normal',
                            fontSize: 16,
                            left: 24,
                          }}>
                          {item}
                        </Text>
                        {this.state.foodLists.map(food => {
                          if (food.item_name.charAt(0).toUpperCase() === item) {
                            return (
                              <View
                                style={{
                                  width: '100%',
                                  left: 3,
                                  flexDirection: 'row',
                                  borderBottomWidth: 2,
                                  borderBottomColor: '#F4F4F4',
                                  backgroundColor: '#fff',
                                  height: 48.26,
                                  alignItems: 'center',
                                }}>
                                <Text style={{width: '25%', left: 24}}>
                                  {food.item_name}
                                </Text>
                                <View style={{width: '25%'}}>
                                  <Dropdown
                                    data={data}
                                    value={'1'}
                                    dropdownOffset={{top: 17}}
                                    textColor={{color: '#9C9EB9'}}
                                    containerStyle={{width: '90%'}}
                                    itemTextStyle={{textAlign: 'center'}}
                                    style={{textAlign: 'center'}}
                                    inputContainerStyle={{
                                      borderBottomColor: 'transparent',
                                      textAlign: 'center',
                                    }}
                                    baseColor="#5EC23B"
                                  />
                                </View>
                                <View style={{width: '25%'}}>
                                  <Dropdown
                                    data={weight}
                                    value={food.item_type}
                                    dropdownOffset={{top: 17}}
                                    textColor={{color: '#9C9EB9'}}
                                    containerStyle={{width: '90%'}}
                                    itemTextStyle={{textAlign: 'center'}}
                                    style={{textAlign: 'center'}}
                                    inputContainerStyle={{
                                      borderBottomColor: 'transparent',
                                      textAlign: 'center',
                                    }}
                                    baseColor="#5EC23B"
                                  />
                                </View>
                                <View style={{width: '25%'}}>
                                  <View
                                    style={{
                                      borderWidth: 1,
                                      borderRadius: 40,
                                      borderColor: '#5EC23B',
                                      width: 66,
                                      height: 24,
                                      alignSelf: 'center',
                                      flexDirection: 'row',
                                    }}>
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.calculateCal(
                                          this.state.calories -
                                            food.item_calories,
                                        )
                                      }
                                      style={{width: '50%'}}>
                                      <Text
                                        style={{
                                          color: '#5EC23B',
                                          textAlign: 'center',
                                        }}>
                                        -
                                      </Text>
                                    </TouchableOpacity>
                                    <View
                                      style={{
                                        borderLeftWidth: 1,
                                        borderLeftColor: '#5EC23B',
                                      }}
                                    />
                                    <TouchableOpacity
                                      onPress={() =>
                                        this.calculateCal(
                                          this.state.calories +
                                            food.item_calories,
                                        )
                                      }
                                      style={{width: '50%'}}>
                                      <Text
                                        style={{
                                          color: '#5EC23B',
                                          textAlign: 'center',
                                        }}>
                                        +
                                      </Text>
                                    </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            );
                          }
                        })}
                      </View>
                    );
                  }}
                />
              </View>
              {this.state.foodLists.length > 0 ? (
                <View
                  style={{width: '100%', alignItems: 'center', height: 100}}>
                  <TouchableOpacity
                    onPress={() => this.addMeal()}
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
                        {translate('NutritionMealDetailView.Text4')}{' '}
                        {this.state.calories}{' '}
                        {translate('NutritionMealDetailView.Text5')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : null}
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
