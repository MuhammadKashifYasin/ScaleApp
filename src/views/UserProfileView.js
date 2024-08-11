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
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from 'react-native-elements';
import {LineChart} from 'react-native-line-chart';
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
  Image,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const data = {
  labels: [],
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

export default class UserProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      search: '',
      data: {
        labels: [],
        datasets: [
          {
            data: [20, 45, 28, 80, 99, 43],
          },
        ],
      },
      userDetails: {},
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  async componentDidMount() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();
    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    getUserDetails(formdata)
      .then(res => {
        this.state.userDetails = res.user_details;
        if (this.state.userDetails.profile_photo != null) {
          this.state.userDetails.profile_photo = {
            uri: this.state.userDetails.profile_photo,
          };
        }
        this.setState({userDetails: this.state.userDetails});
        if (this.state.userDetails.Weight_history.length > 0) {
          let data = {
            labels: [],
            datasets: [
              {
                data: this.state.userDetails.Weight_history,
              },
            ],
          };
          this.setState({data: data});
        }
        console.log(this.state.userDetails);
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  updateSearch(search) {
    this.setState({search});
  }

  render() {
    const {search} = this.state;
    return (
      <SafeAreaView style={([styles.mainContainer], {height: '100%'})}>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{height: 120, marginTop: 20, marginLeft: 15}}>
              <View
                style={{
                  marginLeft: 10,
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'center',
                }}>
                <View style={{width: '50%'}}>
                  <TouchableOpacity
                    style={{top: 5}}
                    onPress={() => this.props.navigation.navigate('HomeView')}>
                    <Icon
                      name="align-left"
                      size={18}
                      backgroundColor="#F2F2F2"
                      color="#2a292b"></Icon>
                  </TouchableOpacity>
                </View>
                <View style={{width: '50%'}}>
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end', right: 40, top: 5}}
                    onPress={() =>
                      this.props.navigation.navigate('SettingView', {
                        userDetails: this.state.userDetails,
                      })
                    }>
                    <Icon
                      name="cog"
                      size={18}
                      backgroundColor="#F2F2F2"
                      color="#2a292b"></Icon>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row', marginBottom: 20}}>
                <View style={{alignSelf: 'center'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginLeft: 15,
                      fontSize: 26,
                      fontWeight: 'bold',
                    }}>
                    {translate('UserProfileView.Text1')}
                  </Text>
                  <Text style={{textAlign: 'left', marginLeft: 15}}>
                    {translate('UserProfileView.Text2')}
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
                placeholder={translate('common.search')}
                onChangeText={this.updateSearch}
                value={search}
              />
            </View>
            <View style={{top: 15, marginLeft: 15}}>
              <Text
                style={[
                  styles.textStyleSmall,
                  {
                    textAlign: 'left',
                    width: '90%',
                    color: 'black',
                    fontSize: 18,
                    marginTop: 25,
                    marginLeft: 10,
                  },
                ]}>
                {translate('UserProfileView.Text3')}_
                {this.state.userDetails.height}
              </Text>
              <Text
                style={[
                  styles.textStyleSmall,
                  {
                    textAlign: 'left',
                    width: '90%',
                    color: 'black',
                    fontSize: 18,
                    marginTop: 25,
                    marginLeft: 10,
                  },
                ]}>
                {translate('UserProfileView.Text4')}_
                {this.state.userDetails.current_weight}
              </Text>
              <Text
                style={[
                  styles.textStyleSmall,
                  {
                    textAlign: 'left',
                    width: '90%',
                    color: 'black',
                    fontSize: 18,
                    marginTop: 25,
                    marginLeft: 10,
                  },
                ]}>
                {translate('UserProfileView.Text5')}_
                {this.state.userDetails.bmi}
              </Text>
              <Text
                style={[
                  styles.textStyleSmall,
                  {
                    textAlign: 'left',
                    width: '90%',
                    color: 'black',
                    fontSize: 18,
                    marginTop: 25,
                    marginLeft: 10,
                  },
                ]}>
                {translate('UserProfileView.Text6')}_
                {this.state.userDetails.bmr}
              </Text>
            </View>
            <View style={{top: 50, height: 600, backgroundColor: '#fff'}}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                }}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 15,
                      marginLeft: 15,
                      fontSize: 26,
                      fontWeight: 'bold',
                    }}>
                    {translate('UserProfileView.Text7')}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Image
                    style={{top: 20, alignSelf: 'flex-end', right: 22}}
                    source={require('../img/settings-dots.png')}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                }}>
                <View style={{width: '50%', flexDirection: 'row'}}>
                  <View style={{marginTop: 20, left: 10}}>
                    <Svg
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      xlink="http://www.w3.org/1999/xlink">
                      <Path
                        d="M0 24.68H24V0.68H0V24.68Z"
                        fill="url(#pattern0)"
                      />
                      <Defs>
                        <Pattern
                          id="pattern0"
                          patternContentUnits="objectBoundingBox"
                          width="1"
                          height="1">
                          <Use href="#image0" transform="scale(0.015625)" />
                        </Pattern>
                        <Image
                          id="image0"
                          width="64"
                          height="64"
                          href="data:image/png;base64,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"
                        />
                      </Defs>
                    </Svg>
                  </View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 15,
                      marginLeft: 25,
                      fontSize: 26,
                      fontWeight: 'normal',
                    }}>
                    {translate('UserProfileView.Text4')}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      top: 15,
                      right: 22,
                      fontSize: 26,
                      fontWeight: 'bold',
                    }}>
                    {this.state.userDetails.user_daily_weight} Kg
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                  borderWidth: 1,
                  top: 20,
                  width: '90%',
                  alignSelf: 'center',
                  borderColor: '#F2F2F2',
                }}
              />
              <View style={{left: 22, top: 30, width: '90%', height: 200}}>
                <LineChart
                  data={this.state.data}
                  width={360}
                  height={200}
                  chartConfig={chartConfig}
                />
                <Text style={{fontSize: 14, color: '#2D3142'}}>
                  {translate('UserProfileView.Text8')}
                </Text>
              </View>
              <View style={{top: 60}}>
                <View
                  style={{
                    paddingLeft: 10,
                    borderWidth: 1,
                    top: 20,
                    width: '90%',
                    alignSelf: 'center',
                    borderColor: '#F2F2F2',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: 50,
                    top: 10,
                  }}>
                  <View style={{width: '50%', flexDirection: 'row'}}>
                    <Image
                      style={{top: 20, left: 15}}
                      source={require('../img/pizza-slice-user-profile.png')}
                    />
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        top: 25,
                        marginLeft: 25,
                        fontSize: 14,
                        fontWeight: 'normal',
                      }}>
                      {translate('UserProfileView.Text9')}
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        top: 25,
                        right: 22,
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {this.state.userDetails.user_daily_nutrition}{' '}
                      {translate('UserProfileView.Text12')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingLeft: 10,
                    borderWidth: 1,
                    top: 20,
                    width: '90%',
                    alignSelf: 'center',
                    borderColor: '#F2F2F2',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: 50,
                    top: 10,
                  }}>
                  <View style={{width: '50%', flexDirection: 'row'}}>
                    <Image
                      style={{top: 20, left: 15}}
                      source={require('../img/user-profile-shoe.png')}
                    />
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        top: 25,
                        marginLeft: 25,
                        fontSize: 14,
                        fontWeight: 'normal',
                      }}>
                      {translate('UserProfileView.Text10')}
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        top: 25,
                        right: 22,
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {this.state.userDetails.user_daily_steps}{' '}
                      {translate('UserProfileView.Text10')}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    paddingLeft: 10,
                    borderWidth: 1,
                    top: 20,
                    width: '90%',
                    alignSelf: 'center',
                    borderColor: '#F2F2F2',
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    height: 50,
                    top: 10,
                  }}>
                  <View style={{width: '50%', flexDirection: 'row'}}>
                    <Image
                      style={{top: 20, left: 15}}
                      source={require('../img/water-drop.png')}
                    />
                    <Text
                      style={{
                        alignSelf: 'flex-start',
                        top: 25,
                        marginLeft: 25,
                        fontSize: 14,
                        fontWeight: 'normal',
                      }}>
                      {translate('UserProfileView.Text11')}
                    </Text>
                  </View>
                  <View style={{width: '50%'}}>
                    <Text
                      style={{
                        alignSelf: 'flex-end',
                        top: 25,
                        right: 22,
                        fontSize: 14,
                        fontWeight: 'bold',
                      }}>
                      {this.state.userDetails.user_daily_water}{' '}
                      {translate('UserProfileView.Text13')}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
