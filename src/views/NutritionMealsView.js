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
  NativeModules,
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
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const mainMeals = [
  {name: 'Morning', calories: 1567, option: true},
  {name: 'Lunch', calories: 0, option: false},
  {name: 'Dinner', calories: 0, option: false},
];
export default class NutritionMealsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: 2,
      mainMeals: [
        {name: 'Morning', calories: 1567, option: true},
        {name: 'Lunch', calories: 0, option: false},
        {name: 'Dinner', calories: 0, option: false},
      ],
    };
  }

  componentDidMount() {
    this.setState({
      mainMeals: [
        {
          name: this.getSystemLocale() == 'he-US' ? 'בוקר' : 'Morning',
          calories: 1567,
          option: true,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'ארוחת צהריים' : 'Lunch',
          calories: 0,
          option: false,
        },
        {
          name: this.getSystemLocale() == 'he-US' ? 'ארוחת ערב' : 'Dinner',
          calories: 0,
          option: false,
        },
      ],
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

  setGoal(calories) {}

  addFoodMenu() {
    this.props.navigation.navigate('ChooseMealView');
  }

  addNameMeal() {}

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
                top: 25,
              }}>
              <Image source={require('../img/front-page-back-icon.png')} />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <View style={{alignItems: 'center', top: 70, height: 110}}>
                <Text
                  style={{
                    textAlign: 'center',
                    width: 230,
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}>
                  {translate('NutritionMealsView.Text1')}{' '}
                  <Text style={{color: '#7265E3'}}>
                    1567 {translate('NutritionMealsView.Text2')}{' '}
                  </Text>
                  / 1800 {translate('NutritionMealsView.Text2')}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('NutritionReminderView')
                  }
                  style={{
                    top: 20,
                    alignSelf: 'flex-end',
                    right: 30,
                    zIndex: 10,
                  }}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#63D7E6', '#77E365']}
                    style={{
                      borderRadius: 50,
                      marginRight: 10,
                      width: 87,
                      height: 23,
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
                        marginTop: 5,
                      }}>
                      {translate('NutritionMealsView.Text8')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center', top: 70, height: 110}}>
                <View>
                  <TouchableOpacity
                    style={{
                      width: '30%',
                      flex: 1,
                      flexDirection: 'row',
                      position: 'absolute',
                      left: -150,
                    }}
                    onPress={() => this.addFoodMenu()}>
                    <Image source={require('../img/plus-icon.png')} />
                    <Text
                      style={{
                        color: '#9C9EB9',
                        fontWeight: 'normal',
                        fontSize: 16,
                        left: 10,
                      }}>
                      {translate('NutritionMealsView.Text3')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{alignItems: 'center', width: '95%'}}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  keyExtractor={mainMeal => mainMeal.name}
                  data={this.state.mainMeals}
                  renderItem={({item}) => {
                    return (
                      <ListItem
                        style={{
                          backgroundColor: '#fff',
                          marginTop: 10,
                          width: 331,
                          height: 60,
                          borderRadius: 10,
                          alignItems: 'center',
                        }}
                        selected={item.option}>
                        <Left style={{left: 20}}>
                          <Text style={{fontWeight: 'normal', fontSize: 16}}>
                            {item.name}
                          </Text>
                        </Left>
                        <Right>
                          <Text style={{fontWeight: 'normal', fontSize: 14}}>
                            {item.calories} cal
                          </Text>
                        </Right>
                        <Right>
                          <Radio
                            onPress={() => this.setGoal(item.calories)}
                            style={{
                              backgroundColor: '#F4F6FA',
                              borderRadius: 50,
                              width: 20,
                              height: 20,
                            }}
                            color={'#F4F6FA'}
                            selectedColor={'#7265E3'}
                            selected={item.option}
                          />
                        </Right>
                      </ListItem>
                    );
                  }}
                />
                {/*<TouchableOpacity
                  style={{backgroundColor: '#fff', left: 10, marginTop: 10, width: 331, height: 60, borderRadius: 10, alignItems: 'flex-start', justifyContent: 'center'}}
                  onPress={()=>this.addNameMeal()}>
                  <View
                    style={{flexDirection: 'row', left: 20}}>
                    <Image source={require('../img/plus-icon.png')}/>
                    <Text style={{fontWeight: 'normal', fontSize: 16, marginLeft: 20}}>Add Name Meal</Text>
                  </View>
                </TouchableOpacity>*/}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    left: 10,
                    marginTop: 10,
                    width: 331,
                    height: 60,
                    borderRadius: 10,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                  }}
                  onPress={() => this.addFoodMenu()}>
                  <View style={{flexDirection: 'row', left: 20}}>
                    <Image source={require('../img/plus-icon.png')} />
                    <Text
                      style={{
                        fontWeight: 'normal',
                        fontSize: 16,
                        marginLeft: 20,
                      }}>
                      {translate('NutritionMealsView.Text7')}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
