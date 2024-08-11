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
  ImageBackground,
  Keyboard,
  TouchableWithoutFeedback,
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
import {getMenuList, searchList} from '../service/Api';
import {Config} from '../config/Config';
import ProgressLoader from 'rn-progress-loader';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

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
    value: 'Gr',
  },
  {
    value: 'piece',
  },
];

const mealDishes = [
  {
    meal_name: 'steak and potatoes',
    meal_photo_url: {
      uri: 'https://thestayathomechef.com/wp-content/uploads/2018/03/Perfect-Pancakes-4-e1520987577263.jpg',
    },
    meal_content:
      'Easy Garlic Butter Steak and Potatoes Skillet with juicy seared steak and crispy roasted potatoes all oven baked in one pan',
    meal_calories_count: 1200,
    meal_fat_count: 300,
    meal_carb_count: 200,
    meal_protein_count: 400,
    food_type: 2,
  },
  {
    meal_name: 'pizza',
    meal_photo_url: {
      uri: 'https://thestayathomechef.com/wp-content/uploads/2018/03/Perfect-Pancakes-4-e1520987577263.jpg',
    },
    meal_content:
      'Easy Garlic Butter Steak and Potatoes Skillet with juicy seared steak and crispy roasted potatoes all oven baked in one pan',
    meal_calories_count: 1200,
    meal_fat_count: 300,
    meal_carb_count: 200,
    meal_protein_count: 400,
    food_type: 2,
  },
];
const mealDishe = [
  {
    title: 'steak and potatoes',
    image: 'https://www.scale-app.com/image.png',
    ingredients_howto:
      'Easy Garlic Butter Steak and Potatoes Skillet with juicy seared steak and crispy roasted potatoes all oven baked in one pan',
    calories: 1200,
    total_fat: 300,
    carbohydrates: 200,
    proteins: 400,
    food_type: 2,
  },
];

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default class ReceipesFoodMenuView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      foodDetail: {},
      appHasLoaded: false,
      isModalVisible: false,
      page: 1,
      foodLists: [],
      tempFoodLists: [],
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  async componentDidMount() {
    this.loadMoreReceipes();
  }

  async loadMoreReceipes() {
    this.setState({appHasLoaded: true});
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('page', this.state.page);
    var array = [];
    getMenuList(formdata)
      .then(res => {
        // console.log(res.menu_list);
        res.menu_list.map(list => {
          let param = {
            meal_name: list.title,
            meal_photo_url: {
              uri: list.image
                ? list.image
                : 'https://www.scale-app.com/image.png',
            },
            meal_content: list.ingredients_howto,
            meal_calories_count: list.calories,
            meal_fat_count: list.total_fat,
            meal_carb_count: list.carbohydrates,
            meal_protein_count: list.proteins,
            food_type: list.food_type,
          };
          this.setState({foodLists: this.state.foodLists.concat(param)});
        });
        this.setState({page: this.state.page + 1});
        this.setState({appHasLoaded: false});
      })
      .catch(err => {
        console.log('Error', err);
      });
    console.log(this.state.foodLists);
  }

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
    formdata.append('food_type', 2);
    formdata.append('search_query', search);

    searchList(formdata)
      .then(res => {
        res.menu_list.map(list => {
          let param = {
            meal_name: list.title,
            meal_photo_url: {
              uri: list.image
                ? list.image
                : 'https://www.scale-app.com/image.png',
            },
            meal_content: list.ingredients_howto,
            meal_calories_count: list.calories,
            meal_fat_count: list.total_fat,
            meal_carb_count: list.carbohydrates,
            meal_protein_count: list.proteins,
            food_type: list.food_type,
          };
          this.setState({foodLists: this.state.foodLists.concat(param)});
        });
        this.setState({appHasLoaded: false});
      })
      .catch(err => {
        console.log('Error', err);
      });
    // console.log(array);
    // if(array.length > 0){
    //   this.setState({foodLists: array});
    // }
    if (search == '') {
      this.setState({foodLists: this.state.tempFoodLists});
      this.setState({appHasLoaded: false});
    }
    this.setState({search});
  }

  addMeal() {
    this.props.navigation.navigate('NutritionMealsView');
  }

  toggleModal(foodDetail) {
    this.props.navigation.navigate('ModalView', {
      isMeal: true,
      isReceipe: false,
      itemDetails: null,
      userDetails: null,
      foodDetail: foodDetail,
    });
    // this.setState({ foodDetail: foodDetail });
    // this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  hideModal() {
    this.setState({isModalVisible: !this.state.isModalVisible});
  }

  render() {
    const {search} = this.state;

    return (
      <SafeAreaView style={([styles.mainContainer], {height: '100%'})}>
        <ProgressLoader
          visible={this.state.appHasLoaded}
          isModal={true}
          isHUD={false}
          hudColor={'#000000'}
          color={'#FFFFFF'}
        />
        <View style={{flex: 1}}>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            onScroll={({nativeEvent}) => {
              if (isCloseToBottom(nativeEvent)) {
                this.loadMoreReceipes();
              }
            }}
            showsVerticalScrollIndicator={false}>
            <View style={{width: '100%', height: 120, marginTop: 20}}>
              <TouchableOpacity
                style={{marginLeft: 20, marginBottom: 20}}
                onPress={() => this.props.navigation.goBack()}>
                <Icon
                  name="align-left"
                  size={18}
                  backgroundColor="#F2F2F2"
                  color="#2a292b"></Icon>
              </TouchableOpacity>
              <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Icon
                  name="list"
                  size={18}
                  backgroundColor="#F2F2F2"
                  color="#2a292b"
                  style={{
                    marginLeft: 10,
                    marginTop: 5,
                    marginRight: 10,
                  }}></Icon>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: 26,
                      fontWeight: 'bold',
                    }}>
                    {translate('ReceipesFoodMenuView.Text1')}
                  </Text>
                  <Text style={{alignSelf: 'center'}}>
                    {translate('ReceipesFoodMenuView.Text2')}
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
                  left: 20,
                }}>
                {translate('ReceipesFoodMenuView.Text3')}
              </Text>
              <View
                style={{width: '100%', alignSelf: 'center', top: 20, left: 20}}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {this.state.foodLists.map(foodList => {
                    return (
                      <TouchableOpacity
                        onPress={() => this.toggleModal(foodList)}>
                        <View
                          style={{
                            height: 160,
                            width: 154,
                            backgroundColor: '#fff',
                            padding: 10,
                            marginRight: 20,
                            marginBottom: 18,
                            borderRadius: 5,
                            shadowColor: '#000',
                            shadowOffset: {width: 0, height: 5},
                            shadowOpacity: 0.58,
                            shadowRadius: 16.0,
                            elevation: 2,
                          }}>
                          <ImageBackground
                            source={foodList.meal_photo_url}
                            style={{width: 135, height: 140}}>
                            <View
                              style={{
                                width: 135,
                                height: 59,
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                marginTop: 81,
                                alignSelf: 'center',
                              }}>
                              <Text
                                style={{
                                  marginLeft: 5,
                                  fontSize: 12,
                                  fontWeight: 'bold',
                                  marginTop: 5,
                                }}>
                                {foodList.meal_name}
                              </Text>
                              <Text
                                style={{
                                  marginLeft: 5,
                                  fontSize: 12,
                                  color: '#616871',
                                  marginTop: 5,
                                }}>
                                {foodList.meal_calories_count}
                              </Text>
                            </View>
                          </ImageBackground>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
