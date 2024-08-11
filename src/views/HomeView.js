import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  Platform,
  Image,
  FlatList,
  Dimensions,
  BackHandler,
  ToastAndroid,
  ImageBackground,
} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import ProgressLoader from 'rn-progress-loader';
import {Card, ListItem, Button} from 'react-native-elements';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import DatePicker from 'react-native-date-picker';
import Search from 'react-native-search-box';
import Icon from 'react-native-vector-icons/FontAwesome5';
import WaterComponentView from './components/WaterComponentView';
import NutritionComponentView from './components/NutritionComponentView';
import WeightComponentView from './components/WeightComponentView';
import StepsComponentView from './components/StepsComponentView';
import ActivityComponentView from './components/ActivityComponentView';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import {newsFeed, updateLifestyleHistory} from '../service/Api';
import {Config} from '../config/Config';
import Fitness from '@ovalmoney/react-native-fitness';
import GoogleFit, {Scopes} from 'react-native-google-fit';
import Moment from 'moment';
import {extendMoment} from 'moment-range';
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

const moment = extendMoment(Moment);
const {styles} = Styles;
const {height, width} = Dimensions.get('window');
const itemWidth = width / 5;

const mainComponents = [
  {
    state: 'water',
    name: 'Water',
    text1: 0,
    text2: 4,
    icon: 'glass-whiskey',
    back_ground: '#FFEFE5',
    navigation: 'WaterFrontView',
  },
  {
    state: 'nutrition',
    name: 'Nutrition',
    text1: 0,
    text2: 600,
    icon: 'utensils',
    back_ground: '#F6FDA6',
    navigation: 'NutritionFrontView',
  },
  {
    state: 'weight',
    name: 'Weight',
    text1: 0,
    text2: 'Kg',
    icon: 'weight',
    back_ground: '#8FEC8D',
    navigation: 'WeightFrontView',
  },
  {
    state: 'steps',
    name: 'Daily Steps',
    text1: 0,
    text2: 10000,
    icon: 'walking',
    back_ground: '#E1DDF5',
    navigation: 'StepsFrontView',
  },
  {
    state: 'activity',
    name: 'Activity',
    text1: 0,
    text2: 'Hours',
    icon: 'hiking',
    back_ground: '#C3D8FF',
    navigation: 'ActivityFrontView',
  },
];

const posts = [
  {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    description:
      'Get active on your off days and challenge your friends by taking the most steps on Saturday and Sunday!',
    title: 'Weekly Assignment',
    subtitle: 'National Health Movement',
    Date: '13 Oct 2020',
  },
  {
    name: 'bry',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    description:
      'Get active on your off days and challenge your friends by taking the most steps on Saturday and Sunday!',
    title: 'Weekly Assignment',
    subtitle: 'National Health Movement',
    Date: '13 Oct 2020',
  },
  {
    name: 'bryn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
    description:
      'Get active on your off days and challenge your friends by taking the most steps on Saturday and Sunday!',
    title: 'Weekly Assignment',
    subtitle: 'National Health Movement',
    Date: '13 Oct 2020',
  },
];

const recepie_photo = '';

const permissions = [
  {
    kind: Fitness?.PermissionKind?.Steps,
    access: Fitness?.PermissionAccess?.Read,
  },
];

const caloriesPermission = [
  {
    kind: Fitness?.PermissionKind?.Calories,
    access: Fitness?.PermissionAccess?.Read,
  },
];

export default class HomeView extends React.Component {
  constructor(props) {
    _isMounted = false;
    super(props);

    this.state = {
      date: new Date(),
      isModalVisible: false,
      appHasLoaded: true,
      eventSteps: 0,
      getCalories: 0,
      userDetails: {},
      mainComponents: [
        {
          state: 'water',
          name: translate('HomeView.Text1'),
          text1: 0,
          text2: 4,
          text3: translate('HomeView.Text35'),
          text3Color: '#FE9C5E',
          icon: 'glass-whiskey',
          back_ground: '#C3D8FF',
          navigation: 'WaterFrontView',
          iconColor: '#2142B7',
        },
        {
          state: 'nutrition',
          name: translate('HomeView.Text2'),
          text1: 0,
          text2: 600,
          text3: translate('HomeView.Text36'),
          text3Color: 'black',
          icon: 'utensils',
          back_ground: '#F6FDA6',
          navigation: 'NutritionFrontView',
          iconColor: '#7B7E5B',
        },
        {
          state: 'weight',
          name: translate('HomeView.Text3'),
          text1: 0,
          text2: 'Kg',
          text3: translate('HomeView.Text37'),
          text3Color: '#129254',
          icon: 'weight',
          back_ground: '#8FEC8D',
          navigation: 'WeightFrontView',
          iconColor: '#129254',
        },
        {
          state: 'steps',
          name: translate('HomeView.Text4'),
          text1: 0,
          text2: 10000,
          text3: translate('HomeView.Text38'),
          text3Color: '#7265E3',
          icon: 'walking',
          back_ground: '#E1DDF5',
          navigation: 'StepsFrontView',
          iconColor: '#7265E3',
        },
        {
          state: 'activity',
          name: translate('HomeView.Text5'),
          text1: 0,
          text2: 'Hours',
          text3: translate('HomeView.Text39'),
          text3Color: '#2242B7',
          icon: 'hiking',
          back_ground: '#FFEFE5',
          navigation: 'ActivityFrontView',
          iconColor: '#FE9C5E',
        },
      ],
      activity_daily_value: 0,
      nutrition_daily_value: 0,
      steps_daily_value: 0,
      water_daily_value: 0,
      weight_daily_value: 0,
      tipsNutritionists: [],
      trainingRecommendations: [],
      itemDetails: null,
      isAnotherModalVisible: false,
      toggleMenu: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  async componentDidMount() {
    this._isMounted = true;

    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);

    newsFeed(formdata)
      .then(res => {
        res.user_feed.recepie_photo = {uri: res.user_feed.recepie_photo};
        this.setState({userDetails: res.user_feed});

        this.state.mainComponents[0].text1 = this.state.userDetails
          .water_daily_value
          ? this.state.userDetails.water_daily_value
          : 0;
        this.state.mainComponents[1].text1 = this.state.userDetails
          .nutrition_daily_value
          ? this.state.userDetails.nutrition_daily_value
          : 0;
        this.state.mainComponents[2].text1 = this.state.userDetails
          .weight_daily_value
          ? this.state.userDetails.weight_daily_value
          : 0;
        this.state.mainComponents[3].text1 = this.state.userDetails
          .steps_daily_value
          ? this.state.userDetails.steps_daily_value
          : 0;
        this.state.mainComponents[4].text1 = this.state.userDetails
          .activity_daily_value
          ? this.state.userDetails.activity_daily_value
          : 0;

        this.state.mainComponents[0].text2 =
          this.state.userDetails.user_daily_goal_water;
        this.state.mainComponents[1].text2 =
          this.state.userDetails.user_daily_goal_nutrition;
        this.state.mainComponents[2].text2 = this.state.userDetails
          .user_daily_goal_weight
          ? this.state.userDetails.user_daily_goal_weight
          : 'Kg';
        this.state.mainComponents[3].text2 =
          this.state.userDetails.user_daily_goal_steps;
        this.state.mainComponents[4].text2 =
          this.state.userDetails.user_daily_goal_activity;
        this.setState({mainComponents: this.state.mainComponents});

        this.state.userDetails.partners.map(partner => {
          let param = {
            partner_category: partner.partner_category,
            partner_content: partner.partner_content,
            partner_full_name: partner.partner_full_name,
            partner_id: partner.partner_id,
            partner_photo: {uri: partner.partner_photo},
            partner_read_time: partner.partner_read_time,
            partner_title: partner.partner_title,
            partner_type: partner.partner_type,
          };

          if (param.partner_type === '1') {
            this.setState({
              trainingRecommendations:
                this.state.trainingRecommendations.concat(param),
            });
          } else if (param.partner_type === '2') {
            this.setState({
              tipsNutritionists: this.state.tipsNutritionists.concat(param),
            });
          }
          this.setState({appHasLoaded: false});
        });

        console.log(this.state.userDetails);
      })
      .catch(err => {
        console.log('Error', err);
      });

    // if(Platform.OS === 'android'){
    //   this.getStepsForAndroid();
    // }else if(Platform.OS === 'ios') {
    //   this.getStepsForIOS();
    // }
  }

  componentWillUnmount() {
    this._isMounted = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  toggleModal() {
    this.props.navigation.navigate('ModalView', {
      isMeal: false,
      isReceipe: true,
      itemDetails: null,
      userDetails: this.state.userDetails,
      foodDetail: null,
    });
    // this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  toggleAnotherModal(item) {
    console.log(item);
    this.props.navigation.navigate('ModalView', {
      isMeal: false,
      isReceipe: false,
      itemDetails: item,
      userDetails: null,
      foodDetail: null,
    });
    // this.setState({ isAnotherModalVisible: !this.state.isAnotherModalVisible });
  }

  handleMenu() {
    // this.setState({toggleMenu: !this.state.toggleMenu});
  }

  handleMenuOnScroll() {
    if (this.state.toggleMenu == false) {
      this.setState({toggleMenu: !this.state.toggleMenu});
    }
  }

  handleMenuOnScrollOnTop() {
    if (this.state.toggleMenu == true) {
    }
  }

  handleScroll(event: Object) {
    console.log(event.nativeEvent.contentOffset.y);
    if (event.nativeEvent.contentOffset.y == 0) {
      this.setState({toggleMenu: false});
    }
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
              console.log('Daily steps >>> ', res);
              res.map(step => {
                if (step.source == 'com.google.android.gms:estimated_steps') {
                  if (step.steps[0].value > this.state.eventSteps) {
                    this.updateStepsLifestyleHistory();
                    this.setState({
                      eventSteps: JSON.stringify(step.steps[0].value),
                    });
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
                    if (
                      JSON.stringify(result[0].quantity) > this.state.eventSteps
                    ) {
                      this.setState({
                        eventSteps: JSON.stringify(result[0].quantity),
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

    Fitness.requestPermissions(caloriesPermission).then(granted => {
      if (granted) {
        Fitness.isAuthorized(caloriesPermission)
          .then(authorized => {
            if (authorized) {
              const datesCalories = {
                startDate: startDate,
                endDate: endDate,
              };
              Fitness.getCalories(datesCalories)
                .then(result => {
                  if (result.length > 0) {
                    console.log(
                      'getCalories Result ' +
                        JSON.stringify(result[0].quantity),
                    );
                    this.setState({
                      getCalories: JSON.stringify(result[0].quantity),
                    });
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
    });
    setTimeout(() => {
      if (this._isMounted == true) {
        this.getStepsForIOS();
      }
    }, 3000);
  }

  render() {
    return (
      <SafeAreaView>
        <ProgressLoader
          visible={this.state.appHasLoaded}
          isModal={true}
          isHUD={false}
          hudColor={'#000000'}
          color={'#FFFFFF'}
        />
        <View style={{width: '100%', height: 70, marginTop: 20}}>
          <View style={{position: 'absolute', left: 0, marginLeft: 25}}>
            <TouchableOpacity
              style={{top: 5}}
              onPress={() => this.props.navigation.navigate('UserProfileView')}>
              <Icon
                name="align-left"
                size={18}
                backgroundColor="#F2F2F2"
                color="#2a292b"></Icon>
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', alignSelf: 'center'}}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              width="158.678"
              height="33"
              viewBox="0 0 158.678 33">
              <G id="logo-black" transform="translate(-96 -44)">
                <G
                  id="Group_8"
                  data-name="Group 8"
                  transform="translate(-2150 884)">
                  <G
                    id="Path_15"
                    data-name="Path 15"
                    transform="translate(2246 -840)"
                    fill="none">
                    <Path
                      d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                      stroke="none"
                    />
                    <Path
                      d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                      stroke="none"
                      fill="#0a0d08"
                    />
                  </G>
                  <Path
                    id="Path_16"
                    data-name="Path 16"
                    d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                    transform="translate(0 1)"
                    fill="none"
                    stroke="#0a0d08"
                    stroke-width="2"
                  />
                  <Path
                    id="Path_17"
                    data-name="Path 17"
                    d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                    transform="translate(0 1)"
                    fill="none"
                    stroke="#0a0d08"
                    stroke-width="2"
                  />
                </G>
                <Path
                  id="Path_51"
                  data-name="Path 51"
                  d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                  transform="translate(135 70)"
                  fill="#0a0d08"
                />
              </G>
            </Svg>
          </View>
          <View style={{position: 'absolute', right: 25, marginRight: 10}}>
            <TouchableOpacity
              style={{top: 5}}
              onPress={() => this.props.navigation.navigate('FriendsView')}>
              <Icon
                name="list"
                size={18}
                backgroundColor="#F2F2F2"
                color="#2a292b"></Icon>
            </TouchableOpacity>
          </View>
        </View>
        {this.state.toggleMenu && (
          <View
            style={{
              width: '100%',
              height: 130,
              backgroundColor: '#fff',
              flexDirection: 'row',
            }}>
            {this.state.mainComponents.map(item => {
              return (
                <View
                  style={{
                    flex: 1,
                    marginLeft: item.state === 'water' ? 4 : 0,
                    margin: 4,
                    minWidth: this.itemWidth,
                    maxWidth: this.itemWidth,
                    height: 130,
                  }}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      this.props.navigation.navigate(item.navigation)
                    }>
                    <View style={{flexDirection: 'column'}}>
                      <View
                        backgroundColor={item.back_ground}
                        style={{
                          flexDirection: 'column',
                          height: 52,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 10,
                        }}>
                        <Icon
                          name={item.icon}
                          size={20}
                          color={item.iconColor}></Icon>
                        <View>
                          <Text style={{fontSize: 16, color: item.iconColor}}>
                            {item.name}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'column',
                          height: 70,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: '#464646',
                            fontSize: 18,
                            textAlign: 'center',
                          }}>
                          {item.state === 'steps'
                            ? this.state.eventSteps
                            : item.text1}
                        </Text>
                        <Text
                          style={{
                            color: '#9C9EB9',
                            fontSize: 16,
                            textAlign: 'center',
                          }}>
                          {item.text2}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        )}
        <ScrollView
          onScrollBeginDrag={() => this.handleMenuOnScroll()}
          onScroll={this.handleScroll}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{height: 5500}}>
            {!this.state.toggleMenu && (
              <View
                style={{
                  width: '100%',
                  backgroundColor: '#fff',
                  flexWrap: 'wrap',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 2,
                }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  extraData={this.state}
                  keyExtractor={mainComponent => mainComponent.name}
                  data={this.state.mainComponents}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        style={{
                          height: 68,
                          flexDirection: 'row',
                          width: '100%',
                          borderBottomWidth: 1,
                          borderBottomColor: '#C4C4C4',
                        }}
                        onPress={() =>
                          this.props.navigation.navigate(item.navigation)
                        }>
                        <View style={{width: '60%', flexDirection: 'row'}}>
                          <Icon
                            name={item.icon}
                            size={26}
                            backgroundColor="transparent"
                            color="#2A292B"
                            style={{
                              marginLeft: 25,
                              alignSelf: 'center',
                            }}></Icon>
                          <View
                            style={{
                              flexDirection: 'column',
                              marginLeft: 30,
                              alignSelf: 'center',
                            }}>
                            <View>
                              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                                {item.name}
                              </Text>
                            </View>
                            <View>
                              <Text
                                style={{
                                  color: '#9C9EB9',
                                  fontSize: 18,
                                  textAlign: 'center',
                                }}>
                                {item.state === 'steps'
                                  ? this.state.eventSteps
                                  : item.text1}{' '}
                                / {item.text2}
                              </Text>
                            </View>
                          </View>
                        </View>
                        <View style={{width: '40%', justifyContent: 'center'}}>
                          <View
                            backgroundColor={item.back_ground}
                            style={{
                              borderRadius: 15,
                              height: 30,
                              width: 80,
                              justifyContent: 'center',
                              alignSelf: 'flex-end',
                              marginRight: 25,
                            }}>
                            <Text
                              style={{
                                textAlign: 'center',
                                color: item.iconColor,
                              }}>
                              {item.text3}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
            )}
            <TouchableOpacity
              style={{marginTop: 10}}
              onPress={() => this.handleMenu()}>
              <View
                style={{
                  backgroundColor: '#808080',
                  width: '30%',
                  height: 3,
                  alignSelf: 'center',
                  borderRadius: 5,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 5},
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 5,
                }}></View>
            </TouchableOpacity>

            <View>
              <Text
                style={[
                  styles.textStyle,
                  {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 25,
                    width: '90%',
                    marginTop: 10,
                    marginLeft: 17,
                  },
                ]}>
                {translate('HomeView.Text6')}
              </Text>
              <View
                style={{
                  width: '100%',
                  height: 600,
                  backgroundColor: '#fff',
                  marginTop: 20,
                  alignItems: 'center',
                }}>
                <LinearGradient
                  angleCenter={{x: 0.5, y: 1.5}}
                  angle={90}
                  useAngle={true}
                  colors={['#63D7E6', '#77E365']}
                  style={{
                    zIndex: 0,
                    borderRadius: 5,
                    marginTop: 40,
                    width: width - 50,
                    height: 379,
                    alignItems: 'center',
                  }}>
                  <ImageBackground
                    source={require('../img/confetti.png')}
                    style={{width: '100%', height: 379}}>
                    <Text
                      style={[
                        styles.textStyle,
                        {
                          color: 'white',
                          alignSelf: 'center',
                          fontSize: 24,
                          marginTop: 60,
                          width: 332,
                          height: 70,
                        },
                      ]}>
                      {translate('HomeView.Text28')}
                    </Text>
                  </ImageBackground>
                </LinearGradient>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    this.props.navigation.navigate('WeightFrontView');
                  }}
                  style={{
                    zIndex: 0,
                    top: 184,
                    position: 'absolute',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 1},
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                  }}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#fff', '#fff']}
                    style={{
                      borderRadius: 15,
                      width: width - 100,
                      height: 384,
                      alignItems: 'center',
                    }}>
                    <View style={{flexDirection: 'column', height: '100%'}}>
                      <Svg
                        style={{alignSelf: 'center', margin: 10}}
                        xmlns="http://www.w3.org/2000/svg"
                        width="108.678"
                        height="33"
                        viewBox="0 0 158.678 33">
                        <G id="logo-black" transform="translate(-96 -44)">
                          <G
                            id="Group_8"
                            data-name="Group 8"
                            transform="translate(-2150 884)">
                            <G
                              id="Path_15"
                              data-name="Path 15"
                              transform="translate(2246 -840)"
                              fill="none">
                              <Path
                                d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                                stroke="none"
                              />
                              <Path
                                d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                                stroke="none"
                                fill="#0a0d08"
                              />
                            </G>
                            <Path
                              id="Path_16"
                              data-name="Path 16"
                              d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                              transform="translate(0 1)"
                              fill="none"
                              stroke="#0a0d08"
                              stroke-width="2"
                            />
                            <Path
                              id="Path_17"
                              data-name="Path 17"
                              d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                              transform="translate(0 1)"
                              fill="none"
                              stroke="#0a0d08"
                              stroke-width="2"
                            />
                          </G>
                          <Path
                            id="Path_51"
                            data-name="Path 51"
                            d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                            transform="translate(135 70)"
                            fill="#0a0d08"
                          />
                        </G>
                      </Svg>
                      <View
                        style={{
                          backgroundColor: '#F4F6FA',
                          width: '90%',
                          height: 3,
                          alignSelf: 'center',
                        }}></View>
                      <View
                        style={{
                          height: 173,
                          alignSelf: 'center',
                          alignItems: 'center',
                          flexDirection: 'column',
                          width: '100%',
                        }}>
                        <Image
                          source={require('../img/Vector_4.png')}
                          style={{marginTop: '20.42%'}}
                        />
                        <Text
                          style={{
                            marginTop: 35,
                            fontSize: 28,
                            fontWeight: 'bold',
                          }}>
                          {this.state.mainComponents[2].text1}
                        </Text>
                        <Text style={[styles.textStyleSmall]}>
                          {translate('HomeView.Text29')}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          bottom: 0,
                          left: 10,
                          top: 80,
                          width: '100%',
                          justifyContent: 'space-around',
                        }}>
                        <View style={{flexDirection: 'column'}}>
                          <Text style={styles.textStyleSmallBold}>
                            {this.state.mainComponents[2].text1}
                          </Text>
                          <Text style={styles.textStyleSmall}>
                            {translate('HomeView.Text30')}
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
                              styles.textStyleSmallBold,
                              {justifyContent: 'center', alignSelf: 'center'},
                            ]}>
                            {this.state.mainComponents[2].text2}
                          </Text>
                          <Text style={styles.textStyleSmall}>
                            {translate('HomeView.Text31')}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 600,
                  backgroundColor: '#fff',
                  marginTop: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#E66363', '#E365A1']}
                    style={{
                      zIndex: 0,
                      borderRadius: 5,
                      marginTop: 40,
                      width: width - 50,
                      height: 379,
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={require('../img/confetti.png')}
                      style={{width: '100%', height: 379}}>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            color: 'white',
                            alignSelf: 'center',
                            fontSize: 24,
                            marginTop: 60,
                            width: 332,
                            height: 70,
                          },
                        ]}>
                        {translate('HomeView.Text15')}
                      </Text>
                    </ImageBackground>
                  </LinearGradient>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.props.navigation.navigate('NutritionFrontView');
                    }}
                    style={{
                      zIndex: 0,
                      top: 184,
                      position: 'absolute',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}>
                    <LinearGradient
                      angleCenter={{x: 0.5, y: 1.5}}
                      angle={90}
                      useAngle={true}
                      colors={['#fff', '#fff']}
                      style={{
                        borderRadius: 15,
                        width: width - 100,
                        height: 384,
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'column', height: '100%'}}>
                        <Svg
                          style={{alignSelf: 'center', margin: 10}}
                          xmlns="http://www.w3.org/2000/svg"
                          width="108.678"
                          height="33"
                          viewBox="0 0 158.678 33">
                          <G id="logo-black" transform="translate(-96 -44)">
                            <G
                              id="Group_8"
                              data-name="Group 8"
                              transform="translate(-2150 884)">
                              <G
                                id="Path_15"
                                data-name="Path 15"
                                transform="translate(2246 -840)"
                                fill="none">
                                <Path
                                  d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                                  stroke="none"
                                />
                                <Path
                                  d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                                  stroke="none"
                                  fill="#0a0d08"
                                />
                              </G>
                              <Path
                                id="Path_16"
                                data-name="Path 16"
                                d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                              <Path
                                id="Path_17"
                                data-name="Path 17"
                                d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                            </G>
                            <Path
                              id="Path_51"
                              data-name="Path 51"
                              d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                              transform="translate(135 70)"
                              fill="#0a0d08"
                            />
                          </G>
                        </Svg>
                        <View
                          style={{
                            backgroundColor: '#F4F6FA',
                            width: '90%',
                            height: 3,
                            alignSelf: 'center',
                          }}></View>
                        <View
                          style={{
                            height: 173,
                            alignSelf: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100%',
                          }}>
                          <Image
                            source={require('../img/Vector_1.png')}
                            style={{marginTop: '20.42%'}}
                          />
                          <Text
                            style={{
                              marginTop: 35,
                              fontSize: 28,
                              fontWeight: 'bold',
                            }}>
                            {this.state.mainComponents[1].text1}{' '}
                            {translate('HomeView.Text16')}
                          </Text>
                          <Text style={[styles.textStyleSmall]}>
                            {translate('HomeView.Text17')}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            bottom: 0,
                            left: 10,
                            top: 80,
                            width: '100%',
                            justifyContent: 'space-around',
                          }}>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={styles.textStyleSmallBold}>
                              {this.state.mainComponents[1].text1}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text18')}
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
                                styles.textStyleSmallBold,
                                {justifyContent: 'center', alignSelf: 'center'},
                              ]}>
                              {this.state.mainComponents[1].text2}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text18')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 600,
                  backgroundColor: '#fff',
                  marginTop: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#63D7E6', '#77E365']}
                    style={{
                      zIndex: 0,
                      borderRadius: 5,
                      marginTop: 40,
                      width: width - 50,
                      height: 379,
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={require('../img/confetti.png')}
                      style={{width: '100%', height: 379}}>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            color: 'white',
                            alignSelf: 'center',
                            fontSize: 24,
                            marginTop: 60,
                            width: 332,
                            height: 70,
                          },
                        ]}>
                        {translate('HomeView.Text24')} {'\n'}{' '}
                        {translate('HomeView.Text25')}
                      </Text>
                    </ImageBackground>
                  </LinearGradient>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.props.navigation.navigate('ActivityFrontView');
                    }}
                    style={{
                      zIndex: 0,
                      top: 184,
                      position: 'absolute',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}>
                    <LinearGradient
                      angleCenter={{x: 0.5, y: 1.5}}
                      angle={90}
                      useAngle={true}
                      colors={['#fff', '#fff']}
                      style={{
                        borderRadius: 15,
                        width: width - 100,
                        height: 384,
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'column', height: '100%'}}>
                        <Svg
                          style={{alignSelf: 'center', margin: 10}}
                          xmlns="http://www.w3.org/2000/svg"
                          width="108.678"
                          height="33"
                          viewBox="0 0 158.678 33">
                          <G id="logo-black" transform="translate(-96 -44)">
                            <G
                              id="Group_8"
                              data-name="Group 8"
                              transform="translate(-2150 884)">
                              <G
                                id="Path_15"
                                data-name="Path 15"
                                transform="translate(2246 -840)"
                                fill="none">
                                <Path
                                  d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                                  stroke="none"
                                />
                                <Path
                                  d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                                  stroke="none"
                                  fill="#0a0d08"
                                />
                              </G>
                              <Path
                                id="Path_16"
                                data-name="Path 16"
                                d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                              <Path
                                id="Path_17"
                                data-name="Path 17"
                                d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                            </G>
                            <Path
                              id="Path_51"
                              data-name="Path 51"
                              d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                              transform="translate(135 70)"
                              fill="#0a0d08"
                            />
                          </G>
                        </Svg>
                        <View
                          style={{
                            backgroundColor: '#F4F6FA',
                            width: '90%',
                            height: 3,
                            alignSelf: 'center',
                          }}></View>
                        <View
                          style={{
                            height: 173,
                            alignSelf: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100%',
                          }}>
                          <Image
                            source={require('../img/Vector_3.png')}
                            style={{marginTop: '20.42%'}}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            bottom: 0,
                            left: 10,
                            top: 80,
                            width: '100%',
                            justifyContent: 'space-around',
                          }}>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={styles.textStyleSmallBold}>
                              {this.state.mainComponents[4].text1}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text26')}
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
                                styles.textStyleSmallBold,
                                {justifyContent: 'center', alignSelf: 'center'},
                              ]}>
                              {this.state.mainComponents[4].text2}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text27')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 600,
                  backgroundColor: '#fff',
                  marginTop: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#6397E6', '#65CCE3']}
                    style={{
                      zIndex: 0,
                      borderRadius: 5,
                      marginTop: 40,
                      width: width - 50,
                      height: 379,
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={require('../img/confetti.png')}
                      style={{width: '100%', height: 379}}>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            color: 'white',
                            alignSelf: 'center',
                            fontSize: 24,
                            marginTop: 60,
                            width: 332,
                            height: 70,
                          },
                        ]}>
                        {translate('HomeView.Text19')}
                      </Text>
                    </ImageBackground>
                  </LinearGradient>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.props.navigation.navigate('WaterFrontView');
                    }}
                    style={{
                      zIndex: 0,
                      top: 184,
                      position: 'absolute',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}>
                    <LinearGradient
                      angleCenter={{x: 0.5, y: 1.5}}
                      angle={90}
                      useAngle={true}
                      colors={['#fff', '#fff']}
                      style={{
                        borderRadius: 15,
                        width: width - 100,
                        height: 384,
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'column', height: '100%'}}>
                        <Svg
                          style={{alignSelf: 'center', margin: 10}}
                          xmlns="http://www.w3.org/2000/svg"
                          width="108.678"
                          height="33"
                          viewBox="0 0 158.678 33">
                          <G id="logo-black" transform="translate(-96 -44)">
                            <G
                              id="Group_8"
                              data-name="Group 8"
                              transform="translate(-2150 884)">
                              <G
                                id="Path_15"
                                data-name="Path 15"
                                transform="translate(2246 -840)"
                                fill="none">
                                <Path
                                  d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                                  stroke="none"
                                />
                                <Path
                                  d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                                  stroke="none"
                                  fill="#0a0d08"
                                />
                              </G>
                              <Path
                                id="Path_16"
                                data-name="Path 16"
                                d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                              <Path
                                id="Path_17"
                                data-name="Path 17"
                                d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                            </G>
                            <Path
                              id="Path_51"
                              data-name="Path 51"
                              d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                              transform="translate(135 70)"
                              fill="#0a0d08"
                            />
                          </G>
                        </Svg>
                        <View
                          style={{
                            backgroundColor: '#F4F6FA',
                            width: '90%',
                            height: 3,
                            alignSelf: 'center',
                          }}></View>
                        <View
                          style={{
                            height: 173,
                            alignSelf: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100%',
                          }}>
                          <Image
                            source={require('../img/Vector_2.png')}
                            style={{marginTop: '20.42%'}}
                          />
                          <Text
                            style={{
                              marginTop: 20,
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}>
                            {this.state.mainComponents[0].text1}/8{' '}
                            {translate('HomeView.Text20')}
                          </Text>
                          <Text style={[styles.textStyleSmall]}>
                            {translate('HomeView.Text21')}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            bottom: 0,
                            left: 10,
                            top: 80,
                            width: '100%',
                            justifyContent: 'space-around',
                          }}>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={styles.textStyleSmallBold}>
                              {this.state.mainComponents[0].text1}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text22')}
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
                                styles.textStyleSmallBold,
                                {justifyContent: 'center', alignSelf: 'center'},
                              ]}>
                              {this.state.mainComponents[0].text2}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text23')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  height: 600,
                  backgroundColor: '#fff',
                  marginTop: 20,
                }}>
                <View style={{alignItems: 'center'}}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#6D63E6', '#E365B1']}
                    style={{
                      zIndex: 0,
                      borderRadius: 5,
                      marginTop: 40,
                      width: width - 50,
                      height: 379,
                      alignItems: 'center',
                    }}>
                    <ImageBackground
                      source={require('../img/confetti.png')}
                      style={{width: '100%', height: 379}}>
                      <Text
                        style={[
                          styles.textStyle,
                          {
                            color: 'white',
                            alignSelf: 'center',
                            fontSize: 24,
                            marginTop: 60,
                            width: 332,
                            height: 70,
                          },
                        ]}>
                        {translate('HomeView.Text11')}
                      </Text>
                    </ImageBackground>
                  </LinearGradient>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      this.props.navigation.navigate('StepsFrontView');
                    }}
                    style={{
                      zIndex: 0,
                      top: 184,
                      position: 'absolute',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 1},
                      shadowOpacity: 0.8,
                      shadowRadius: 2,
                      elevation: 5,
                    }}>
                    <LinearGradient
                      angleCenter={{x: 0.5, y: 1.5}}
                      angle={90}
                      useAngle={true}
                      colors={['#fff', '#fff']}
                      style={{
                        borderRadius: 15,
                        width: width - 100,
                        height: 384,
                        alignItems: 'center',
                      }}>
                      <View style={{flexDirection: 'column', height: '100%'}}>
                        <Svg
                          style={{alignSelf: 'center', margin: 10}}
                          xmlns="http://www.w3.org/2000/svg"
                          width="108.678"
                          height="33"
                          viewBox="0 0 158.678 33">
                          <G id="logo-black" transform="translate(-96 -44)">
                            <G
                              id="Group_8"
                              data-name="Group 8"
                              transform="translate(-2150 884)">
                              <G
                                id="Path_15"
                                data-name="Path 15"
                                transform="translate(2246 -840)"
                                fill="none">
                                <Path
                                  d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                                  stroke="none"
                                />
                                <Path
                                  d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                                  stroke="none"
                                  fill="#0a0d08"
                                />
                              </G>
                              <Path
                                id="Path_16"
                                data-name="Path 16"
                                d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                              <Path
                                id="Path_17"
                                data-name="Path 17"
                                d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                                transform="translate(0 1)"
                                fill="none"
                                stroke="#0a0d08"
                                stroke-width="2"
                              />
                            </G>
                            <Path
                              id="Path_51"
                              data-name="Path 51"
                              d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                              transform="translate(135 70)"
                              fill="#0a0d08"
                            />
                          </G>
                        </Svg>
                        <View
                          style={{
                            backgroundColor: '#F4F6FA',
                            width: '90%',
                            height: 3,
                            alignSelf: 'center',
                          }}></View>
                        <View
                          style={{
                            height: 173,
                            alignSelf: 'center',
                            alignItems: 'center',
                            flexDirection: 'column',
                            width: '100%',
                          }}>
                          <Image
                            source={require('../img/Vector.png')}
                            style={{marginTop: '20.42%'}}
                          />
                          <Text
                            style={{
                              marginTop: 35,
                              fontSize: 28,
                              fontWeight: 'bold',
                            }}>
                            {this.state.eventSteps}
                          </Text>
                          <Text style={[styles.textStyleSmall]}>
                            {translate('HomeView.Text12')}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            bottom: 0,
                            left: 10,
                            top: 80,
                            width: '100%',
                            justifyContent: 'space-around',
                          }}>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={styles.textStyleSmallBold}>
                              {this.state.userDetails.steps_calories}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text26')}
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
                                styles.textStyleSmallBold,
                                {justifyContent: 'center', alignSelf: 'center'},
                              ]}>
                              {this.state.mainComponents[3].text2}
                            </Text>
                            <Text style={styles.textStyleSmall}>
                              {translate('HomeView.Text14')}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 410,
                backgroundColor: '#fff',
                marginTop: 20,
              }}>
              <Svg
                style={{alignSelf: 'center', margin: 10}}
                xmlns="http://www.w3.org/2000/svg"
                width="108.678"
                height="33"
                viewBox="0 0 158.678 33">
                <G id="logo-black" transform="translate(-96 -44)">
                  <G
                    id="Group_8"
                    data-name="Group 8"
                    transform="translate(-2150 884)">
                    <G
                      id="Path_15"
                      data-name="Path 15"
                      transform="translate(2246 -840)"
                      fill="none">
                      <Path
                        d="M7,0H26a7,7,0,0,1,7,7L31,26a7,7,0,0,1-7,7H9a7,7,0,0,1-7-7L0,7A7,7,0,0,1,7,0Z"
                        stroke="none"
                      />
                      <Path
                        d="M 7 2 C 4.275131225585938 2 2.0523681640625 4.190919876098633 2.000913619995117 6.903713226318359 L 3.989009857177734 25.79063034057617 L 4 25.8950309753418 L 4 26 C 4 28.75700950622559 6.242990493774414 31 9 31 L 24 31 C 26.75700950622559 31 29 28.75700950622559 29 26 L 29 25.8950309753418 L 29.01099014282227 25.79063034057617 L 30.99908638000488 6.903713226318359 C 30.9476318359375 4.190919876098633 28.72486877441406 2 26 2 L 7 2 M 7 0 L 26 0 C 29.86598968505859 0 33 3.134010314941406 33 7 L 31 26 C 31 29.86598968505859 27.86598968505859 33 24 33 L 9 33 C 5.134010314941406 33 2 29.86598968505859 2 26 L 0 7 C 0 3.134010314941406 3.134010314941406 0 7 0 Z"
                        stroke="none"
                        fill="#0a0d08"
                      />
                    </G>
                    <Path
                      id="Path_16"
                      data-name="Path 16"
                      d="M2258.572-839.451s-6.545,7.445-1.8,10.39c.246.245,12.68,0,12.68,0s2.536-3.6-1.8-10.39C2267.734-839.369,2258.572-839.451,2258.572-839.451Z"
                      transform="translate(0 1)"
                      fill="none"
                      stroke="#0a0d08"
                      stroke-width="2"
                    />
                    <Path
                      id="Path_17"
                      data-name="Path 17"
                      d="M2262.618-828.952s-.119-2.482,2.58-5.836"
                      transform="translate(0 1)"
                      fill="none"
                      stroke="#0a0d08"
                      stroke-width="2"
                    />
                  </G>
                  <Path
                    id="Path_51"
                    data-name="Path 51"
                    d="M8.762.364A12.9,12.9,0,0,1,4.68-.3,12.016,12.016,0,0,1,1.092-2.184L2.678-4.472A8.413,8.413,0,0,0,5.447-2.964a10.343,10.343,0,0,0,3.315.546,5.967,5.967,0,0,0,3.172-.741,2.233,2.233,0,0,0,1.2-1.963A1.982,1.982,0,0,0,12.038-6.89,9.5,9.5,0,0,0,8.58-7.852,11.479,11.479,0,0,1,3.2-9.672a4.412,4.412,0,0,1-1.664-3.692,4.337,4.337,0,0,1,.9-2.691,5.863,5.863,0,0,1,2.5-1.846,9.468,9.468,0,0,1,3.653-.663,11.13,11.13,0,0,1,3.588.6A10.7,10.7,0,0,1,15.314-16.3L13.78-14.144a8.224,8.224,0,0,0-2.47-1.3,8.658,8.658,0,0,0-2.7-.442,5.464,5.464,0,0,0-2.938.715,2.113,2.113,0,0,0-1.144,1.833A1.976,1.976,0,0,0,5.564-11.6a9.062,9.062,0,0,0,3.328.988,12.9,12.9,0,0,1,5.59,1.833A4.174,4.174,0,0,1,16.2-5.2a4.821,4.821,0,0,1-.923,2.925,5.9,5.9,0,0,1-2.613,1.95A10.27,10.27,0,0,1,8.762.364ZM24.908.286a7.565,7.565,0,0,1-3.614-.832A5.827,5.827,0,0,1,18.889-2.9a7.135,7.135,0,0,1-.845-3.523,6.994,6.994,0,0,1,.858-3.5,6.017,6.017,0,0,1,2.4-2.366,7.339,7.339,0,0,1,3.575-.845,6.777,6.777,0,0,1,4.862,1.976l-1.768,1.9a4.08,4.08,0,0,0-1.378-.9,4.41,4.41,0,0,0-1.664-.325,3.838,3.838,0,0,0-2.873,1.131,4.009,4.009,0,0,0-1.105,2.925,4,4,0,0,0,1.105,2.938,3.862,3.862,0,0,0,2.873,1.118A4.652,4.652,0,0,0,26.7-2.7a3.691,3.691,0,0,0,1.4-.988L29.9-1.742A7.082,7.082,0,0,1,27.612-.208,7.152,7.152,0,0,1,24.908.286Zm19.864-13.13V0h-2.6l-.026-1.716A5.1,5.1,0,0,1,40.17-.247a6.692,6.692,0,0,1-2.7.533,6.438,6.438,0,0,1-3.315-.845A5.84,5.84,0,0,1,31.9-2.938,7.377,7.377,0,0,1,31.1-6.422,7.377,7.377,0,0,1,31.9-9.906a5.84,5.84,0,0,1,2.249-2.379,6.438,6.438,0,0,1,3.315-.845,6.692,6.692,0,0,1,2.7.533,5.1,5.1,0,0,1,1.976,1.469l.026-1.716ZM37.934-2.366A3.763,3.763,0,0,0,40.768-3.5,4.036,4.036,0,0,0,41.86-6.422a4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131A3.763,3.763,0,0,0,35.1-9.347a4.036,4.036,0,0,0-1.092,2.925A4.036,4.036,0,0,0,35.1-3.5,3.763,3.763,0,0,0,37.934-2.366ZM48.308-18.2H51.22V0H48.308Zm12.3,5.1a6.551,6.551,0,0,1,4.888,1.794,6.769,6.769,0,0,1,1.768,4.966q0,.338-.052,1.014H56.94a3.218,3.218,0,0,0,1.274,2.236A4.461,4.461,0,0,0,61-2.262,6.186,6.186,0,0,0,63.1-2.626a4.043,4.043,0,0,0,1.586-.962l1.768,1.716A6.687,6.687,0,0,1,64.025-.234a8.161,8.161,0,0,1-3.107.6,7.66,7.66,0,0,1-3.679-.845A5.952,5.952,0,0,1,54.808-2.86a7.175,7.175,0,0,1-.858-3.562,7.094,7.094,0,0,1,.832-3.484,5.934,5.934,0,0,1,2.34-2.353A7.007,7.007,0,0,1,60.606-13.1Zm.078,2.522a3.8,3.8,0,0,0-2.47.78,3.653,3.653,0,0,0-1.248,2.21h7.462a3.136,3.136,0,0,0-1.157-2.184A4,4,0,0,0,60.684-10.582ZM84.37,0,82.706-3.77H72.93L71.266,0H67.99l8.164-18.2h3.38L87.672,0ZM77.818-15.132,74.1-6.526h7.436Zm19.11,2a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,92.534-1.4V5.928H89.622V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,94.224-12.6,6.692,6.692,0,0,1,96.928-13.13ZM96.46-2.366A3.763,3.763,0,0,0,99.294-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,93.639-3.5,3.774,3.774,0,0,0,96.46-2.366ZM113.308-13.13a6.438,6.438,0,0,1,3.315.845,5.84,5.84,0,0,1,2.249,2.379,7.377,7.377,0,0,1,.806,3.484,7.377,7.377,0,0,1-.806,3.484,5.84,5.84,0,0,1-2.249,2.379,6.438,6.438,0,0,1-3.315.845,6.9,6.9,0,0,1-2.483-.442A5.021,5.021,0,0,1,108.914-1.4V5.928H106V-12.844h2.6l.026,1.716A5.1,5.1,0,0,1,110.6-12.6,6.692,6.692,0,0,1,113.308-13.13ZM112.84-2.366A3.763,3.763,0,0,0,115.674-3.5a4.036,4.036,0,0,0,1.092-2.925,4.036,4.036,0,0,0-1.092-2.925,3.763,3.763,0,0,0-2.834-1.131,3.774,3.774,0,0,0-2.821,1.131,4.009,4.009,0,0,0-1.105,2.925A4.009,4.009,0,0,0,110.019-3.5,3.774,3.774,0,0,0,112.84-2.366Z"
                    transform="translate(135 70)"
                    fill="#0a0d08"
                  />
                </G>
              </Svg>
              <View style={{flexDirection: 'row', left: '5.87%', top: 50}}>
                <Text style={{fontSize: 20, fontWeight: 'normal', width: 247}}>
                  {this.state.userDetails.poll_question}
                </Text>
                <Image
                  style={{left: 30}}
                  source={require('../img/banana.png')}
                />
              </View>
              <View style={{top: 70, width: '90%', alignSelf: 'center'}}>
                <View
                  style={{
                    borderRadius: 10,
                    marginBottom: 15,
                    backgroundColor: '#EFF2F8',
                    height: 50,
                  }}>
                  <Text
                    style={{
                      left: 17,
                      lineHeight: 50,
                      fontSize: 16,
                      color: '#2D3142',
                    }}>
                    {this.state.userDetails.poll_option_1}
                  </Text>
                </View>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#EFF2F8',
                    height: 50,
                  }}>
                  <Text
                    style={{
                      left: 17,
                      lineHeight: 50,
                      fontSize: 16,
                      color: '#2D3142',
                    }}>
                    {this.state.userDetails.poll_option_2}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  borderWidth: 1,
                  top: 90,
                  width: '90%',
                  alignSelf: 'center',
                  borderColor: '#F2F2F2',
                }}
              />
              <View style={{top: 95, flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{marginLeft: 10, width: 50, justifyContent: 'center'}}>
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
                  {this.state.userDetails.poll_likes}
                </Text>
              </View>
            </View>
            {/*<Text style = {[styles.textStyle,{textAlign: 'left', fontWeight: 'bold', fontSize: 25, width: '90%', marginTop: 20, marginLeft: 17}]}>{translate('HomeView.Text1')}Tips</Text>
            <View
              style={{width: '100%', height: 379, backgroundColor: '#fff', marginTop: 20}}>
              <Text style={{color: '#353535', fontSize: 14, position: 'absolute', width: 122, height: 18, left: 10, top: 10}}>{translate('HomeView.Text1')}Yesterday</Text>
              <View
                style={{alignItems: 'center', top: 50}}>
                <Text style={{height: 25, textAlign: 'center', fontSize: 16, fontWeight: 'bold', color: '#000000'}}>{translate('HomeView.Text1')}7 Things To Know About Drinking Coffee</Text>
                <Text style={{width: 284, textAlign: 'center', fontSize: 14, color: '#000000'}}>{translate('HomeView.Text1')}That dark French or Italian roast may taste stronger, but that doesn’t mean it’s packing a stronger caffeine punch. In fact, </Text>
              </View>
              <View
                style={{width: '95%', top: 80, alignSelf: 'center'}}>
                <Image style={{alignSelf: 'center'}} source={require('../img/image-18.png')}/>
              </View>
            </View>*/}
            <View
              style={{
                width: '100%',
                height: 470,
                backgroundColor: '#fff',
                marginTop: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <LinearGradient
                  angleCenter={{x: 0.5, y: 1.5}}
                  angle={90}
                  useAngle={true}
                  colors={['#6397E6', '#65CCE3']}
                  style={{
                    zIndex: 0,
                    borderRadius: 5,
                    marginTop: 40,
                    width: 363,
                    height: 275,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 12},
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 5,
                  }}>
                  <Image
                    style={{position: 'absolute', right: 5.84, top: 32}}
                    source={require('../img/wake-up-cloud-white.png')}
                  />
                  <Image
                    style={{position: 'absolute', left: 97.62, top: 17}}
                    source={require('../img/wake-up-sunlight.png')}
                  />
                  <Image
                    style={{position: 'absolute', left: 10, top: 8}}
                    source={require('../img/wake-up-cloud.png')}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: 10,
                      fontSize: 14,
                      color: '#fff',
                    }}>
                    Yesterday
                  </Text>
                </LinearGradient>
                <LinearGradient
                  angleCenter={{x: 0.5, y: 1.5}}
                  angle={90}
                  useAngle={true}
                  colors={['#fff', '#fff']}
                  style={{
                    zIndex: 0,
                    borderRadius: 5,
                    top: 104,
                    position: 'absolute',
                    width: 300,
                    height: 329,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 12},
                    shadowOpacity: 0.58,
                    shadowRadius: 16.0,
                    elevation: 5,
                  }}>
                  <View style={{width: '50%', alignSelf: 'center'}}>
                    <Image
                      style={{position: 'absolute', top: 20, left: 5}}
                      source={require('../img/small-bell.png')}
                    />
                    <Image
                      style={{position: 'absolute', top: 30, left: 25}}
                      source={require('../img/large-bell.png')}
                    />
                    <Image
                      style={{
                        position: 'absolute',
                        top: 50,
                        alignSelf: 'center',
                      }}
                      source={require('../img/wake-up-profile.png')}
                    />
                    <Text
                      style={{
                        position: 'absolute',
                        top: 120,
                        alignSelf: 'center',
                        fontSize: 20,
                        textAlign: 'center',
                      }}>
                      {this.state.userDetails.wakeup_full_name}
                    </Text>
                  </View>
                  <View style={{width: '100%', alignItems: 'center', top: 150}}>
                    <Text
                      style={{
                        fontSize: 46,
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}>
                      {translate('HomeView.Text9')}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        textAlign: 'center',
                        color: '#B4B4B4',
                      }}>
                      {translate('HomeView.Text10')}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('FriendsView')
                      }
                      style={{top: 30}}>
                      <LinearGradient
                        angleCenter={{x: 0.5, y: 1.5}}
                        angle={90}
                        useAngle={true}
                        colors={['#6397E6', '#65CCE3']}
                        style={{
                          borderRadius: 50,
                          marginRight: 10,
                          width: 160,
                          height: 41,
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 12},
                          shadowOpacity: 0.58,
                          shadowRadius: 16.0,
                          elevation: 5,
                        }}>
                        <Text
                          style={{color: '#fff', fontSize: 18, marginTop: 8}}>
                          {translate('HomeView.Text9')}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                height: 379,
                backgroundColor: '#fff',
                marginTop: 20,
              }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 25,
                    width: '90%',
                    marginTop: 20,
                    marginLeft: 17,
                  },
                ]}>
                {translate('HomeView.Text7')}
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={tipsNutritionist =>
                  tipsNutritionist.partner_title
                }
                data={this.state.tipsNutritionists}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.toggleAnotherModal(item)}>
                      <LinearGradient
                        angleCenter={{x: 0.5, y: 1.5}}
                        angle={90}
                        useAngle={true}
                        colors={['#fff', '#fff']}
                        style={{
                          zIndex: 0,
                          borderRadius: 10,
                          marginLeft: 10,
                          top: 30,
                          width: 316,
                          height: 256,
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 12},
                          shadowOpacity: 0.58,
                          shadowRadius: 16.0,
                          elevation: 5,
                        }}>
                        <Image
                          style={{width: 316, height: 117}}
                          source={item.partner_photo}
                        />
                        <Text
                          style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            left: 16,
                            top: 16,
                          }}>
                          {item.partner_title}
                        </Text>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            position: 'absolute',
                            left: 16,
                            top: 200,
                          }}>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 14, color: '#2D3142'}}>
                              {item.partner_full_name}
                            </Text>
                            <Text style={{fontSize: 14, color: '#9C9EB9'}}>
                              {translate('HomeView.Text33')} •{' '}
                              {item.partner_read_time}{' '}
                              {translate('HomeView.Text34')}
                            </Text>
                          </View>
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
                              style={{marginLeft: 120, width: 50}}></Icon>
                          </TouchableOpacity>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: 379,
                backgroundColor: '#fff',
                marginTop: 20,
              }}>
              <Text
                style={[
                  styles.textStyle,
                  {
                    textAlign: 'left',
                    fontWeight: 'bold',
                    fontSize: 25,
                    width: '90%',
                    marginTop: 20,
                    marginLeft: 17,
                  },
                ]}>
                {translate('HomeView.Text8')}
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={trainingRecommendation =>
                  trainingRecommendation.partner_id
                }
                data={this.state.trainingRecommendations}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => this.toggleAnotherModal(item)}>
                      <LinearGradient
                        angleCenter={{x: 0.5, y: 1.5}}
                        angle={90}
                        useAngle={true}
                        colors={['#fff', '#fff']}
                        style={{
                          zIndex: 0,
                          borderRadius: 10,
                          marginLeft: 10,
                          top: 30,
                          width: 185,
                          height: 242,
                          alignItems: 'center',
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 12},
                          shadowOpacity: 0.58,
                          shadowRadius: 16.0,
                          elevation: 5,
                        }}>
                        <Image
                          style={{width: 185, height: 242}}
                          source={item.partner_photo}
                        />
                        <TouchableOpacity
                          style={{position: 'absolute', left: 16, top: 30}}
                          onPress={() => {}}>
                          <Icon
                            name="heart"
                            size={18}
                            backgroundColor="#F2F2F2"
                            color="#fff"></Icon>
                        </TouchableOpacity>
                        <Text
                          style={{
                            position: 'absolute',
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#fff',
                            left: 16,
                            top: 130,
                          }}>
                          {item.partner_title}
                        </Text>
                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            position: 'absolute',
                            left: 16,
                            top: 200,
                          }}>
                          <View style={{flexDirection: 'column'}}>
                            <Text
                              style={{
                                width: '100%',
                                fontSize: 14,
                                color: '#9C9EB9',
                              }}>
                              {item.partner_full_name}
                            </Text>
                          </View>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{
                width: '100%',
                height: 379,
                backgroundColor: '#fff',
                marginTop: 20,
              }}>
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
                {this.state.userDetails.recepie_title}
              </Text>
              <Text
                style={[
                  styles.textStyle,
                  {
                    textAlign: 'left',
                    fontWeight: 'normal',
                    fontSize: 20,
                    width: '90%',
                    marginTop: 20,
                    marginLeft: 17,
                  },
                ]}>
                <Text style={{fontSize: 20, color: '#7265E3'}}>
                  {this.state.userDetails.recepie_hashtag}
                </Text>
              </Text>
              <Image
                style={{width: 331, height: 193, left: 15, marginTop: 10}}
                source={this.state.userDetails.recepie_photo}
              />
              <View style={{flexDirection: 'row', height: 40}}>
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
                      style={{marginLeft: 10, width: 50}}></Icon>
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginTop: 8,
                      color: '#9C9EB9',
                      fontSize: 16,
                      position: 'absolute',
                      left: 45,
                    }}>
                    {this.state.userDetails.recepie_likes}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={this.toggleModal}
                  style={{
                    marginLeft: 100,
                    top: 15,
                    backgroundColor: '#E1DDF5',
                    borderRadius: 17.5,
                    width: '45%',
                    height: 30,
                    alignSelf: 'flex-end',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#7265E3'}}>
                    {translate('HomeView.Text32')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
