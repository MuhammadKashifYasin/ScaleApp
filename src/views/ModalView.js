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
import {getMenuList} from '../service/Api';
import {Config} from '../config/Config';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class ModalView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodLists: [],
      tempFoodLists: [],
    };
  }

  async componentDidMount() {
    console.log(this.props.navigation.state.params);
    // this.setState({foodLists: mealDishes});
  }

  render() {
    return (
      <SafeAreaView style={([styles.mainContainer], {height: '100%'})}>
        <View style={{flex: 1}}>
          <Icon.Button
            name="times"
            color="black"
            backgroundColor="transparent"
            onPress={() => {
              this.props.navigation.goBack();
            }}></Icon.Button>
          <View
            style={{
              backgroundColor: '#fff',
              width: '100%',
              alignSelf: 'center',
              height: '100%',
            }}>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              style={{marginBottom: 20}}>
              {this.props.navigation.state.params.isMeal ? (
                <View>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: 20,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    {this.props.navigation.state.params.foodDetail.meal_name}
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'normal',
                        fontSize: 16,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    <Text style={{fontSize: 20, color: '#7265E3'}}>
                      {
                        this.props.navigation.state.params.foodDetail
                          .meal_calories_count
                      }
                    </Text>
                  </Text>
                  <Image
                    style={{width: 331, height: 193, left: 15, marginTop: 10}}
                    source={
                      this.props.navigation.state.params.foodDetail
                        .meal_photo_url
                    }
                  />
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: 17,
                        width: '90%',
                        marginTop: 30,
                        marginLeft: 17,
                      },
                    ]}>
                    {translate('ModalView.Text2')}
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'normal',
                        fontSize: 16,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    {this.props.navigation.state.params.foodDetail.meal_content}
                  </Text>
                  <View style={{flexDirection: 'row', height: 50}}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {translate('ModalView.Text3')}
                    </Text>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {
                        this.props.navigation.state.params.foodDetail
                          .meal_calories_count
                      }
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', height: 50}}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {translate('ModalView.Text4')}
                    </Text>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {
                        this.props.navigation.state.params.foodDetail
                          .meal_fat_count
                      }
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', height: 50}}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {translate('ModalView.Text5')}
                    </Text>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {
                        this.props.navigation.state.params.foodDetail
                          .meal_carb_count
                      }
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', height: 50}}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {translate('ModalView.Text6')}
                    </Text>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          textAlign: 'left',
                          fontWeight: 'normal',
                          fontSize: 16,
                          width: '50%',
                          marginTop: 20,
                          marginLeft: 17,
                        },
                      ]}>
                      {
                        this.props.navigation.state.params.foodDetail
                          .meal_protein_count
                      }
                    </Text>
                  </View>
                  <View
                    style={{height: 80, width: '100%', alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('NutritionMealsView');
                      }}
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
                          Add Cal{' '}
                          {
                            this.props.navigation.state.params.foodDetail
                              .meal_calories_count
                          }
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : this.props.navigation.state.params.isReceipe ? (
                <View>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: 20,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    {
                      this.props.navigation.state.params.userDetails
                        .recepie_title
                    }
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'normal',
                        fontSize: 16,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    <Text style={{fontSize: 20, color: '#7265E3'}}>
                      {
                        this.props.navigation.state.params.userDetails
                          .recepie_hashtag
                      }
                    </Text>
                  </Text>
                  <Image
                    style={{width: 331, height: 193, left: 15, marginTop: 10}}
                    source={
                      this.props.navigation.state.params.userDetails
                        .recepie_photo
                    }
                  />
                  <View style={{top: 20, flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{
                        marginLeft: 10,
                        width: 50,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="heart"
                        size={20}
                        backgroundColor="#fff"
                        color="#D6D9E0"
                        style={{marginLeft: 10, width: 50, top: 5}}></Icon>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 8,
                        color: '#9C9EB9',
                        fontSize: 16,
                        position: 'absolute',
                        left: 45,
                      }}>
                      45
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: 17,
                        width: '90%',
                        marginTop: 30,
                        marginLeft: 17,
                      },
                    ]}>
                    Within the context the group creates,
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'normal',
                        fontSize: 16,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    healthy food is defined as food that provides nourishment
                    and enables people to thrive; green food was produced in a
                    manner that is environmentally sustainable; fair means that
                    no one along the production line was exploited during its
                    creation; and, affordable means that all people have access
                    to it. Many think of good food as primarily fruits and
                    vegetables, but it also includes meat, dairy and grains. And
                    while good food is nutrient-dense it is also tasty and
                    visually appealing. Good food means that it enhances the
                    condition of is consumers and growers; its production
                    maintains the health of the environment while generating a
                    profit for the grower. These three conditions,
                    people/society, environment and profit are also referred to
                    as the triple bottom line. In a triple bottom line system
                    people/society and the environment are equally as important
                    as profit.
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'bold',
                        fontSize: 20,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    {
                      this.props.navigation.state.params.itemDetails
                        .partner_title
                    }
                  </Text>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'normal',
                        fontSize: 16,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    <Text style={{fontSize: 20, color: '#7265E3'}}>
                      {
                        this.props.navigation.state.params.itemDetails
                          .partner_full_name
                      }
                    </Text>
                  </Text>
                  <Image
                    style={{width: 331, height: 193, left: 15, marginTop: 10}}
                    source={
                      this.props.navigation.state.params.itemDetails
                        .partner_photo
                    }
                  />
                  <View style={{top: 20, flexDirection: 'row'}}>
                    <TouchableOpacity
                      style={{
                        marginLeft: 10,
                        width: 50,
                        justifyContent: 'center',
                      }}>
                      <Icon
                        name="heart"
                        size={20}
                        backgroundColor="#fff"
                        color="#D6D9E0"
                        style={{marginLeft: 10, width: 50, top: 5}}></Icon>
                    </TouchableOpacity>
                    <Text
                      style={{
                        marginTop: 8,
                        color: '#9C9EB9',
                        fontSize: 16,
                        position: 'absolute',
                        left: 45,
                      }}>
                      45
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        textAlign: 'left',
                        fontWeight: 'normal',
                        fontSize: 16,
                        width: '90%',
                        marginTop: 20,
                        marginLeft: 17,
                      },
                    ]}>
                    {
                      this.props.navigation.state.params.itemDetails
                        .partner_content
                    }
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
