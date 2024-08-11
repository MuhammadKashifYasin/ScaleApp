import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
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
import {Switch} from 'react-native-switch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import {sendEmail} from 'react-native-email-action';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import Toast, {DURATION} from 'react-native-easy-toast';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

const options = {
  to: 'y@scale-app.com',
  subject: 'Contact ScaleApp',
  body: '',
};

export default class SettingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      search: '',
      userDetails: {},
      profile_photo: null,
      active: true,
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  async openLink() {
    try {
      const url = 'http://scale-app.com/';
      if (await InAppBrowser.isAvailable()) {
        const result = await InAppBrowser.open(url);
      } else Linking.openURL(url);
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    console.log(this.props.navigation.state.params.userDetails.profile_photo);
    if (this.props.navigation.state.params.userDetails.profile_photo != null) {
      this.setState({
        profile_photo: {
          uri: this.props.navigation.state.params.userDetails.profile_photo.uri,
        },
      });
    }
  }

  updateSearch(search) {
    this.setState({search});
  }

  logout() {
    AsyncStorage.clear();
    this.props.navigation.navigate('WelcomeView');
  }

  sendEmailToContact() {
    sendEmail(options);
  }

  manageConnectedDevice() {
    this.setState({active: !this.state.active});
    this.refs.toast.show(
      this.state.active
        ? translate('SettingView.Text12')
        : translate('SettingView.Text11'),
      500,
      () => {
        // something you want to do at close
      },
    );
  }

  render() {
    const {search} = this.state;
    return (
      <SafeAreaView
        style={
          ([styles.mainContainer], {height: '100%', backgroundColor: '#fff'})
        }>
        <Toast ref="toast" />
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
                }}>
                <View>
                  <TouchableOpacity
                    style={{top: 5}}
                    onPress={() =>
                      this.props.navigation.navigate('UserProfileView')
                    }>
                    <Icon
                      name="arrow-left"
                      size={18}
                      backgroundColor="#F2F2F2"
                      color="#2a292b"></Icon>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                {this.state.profile_photo != null ? (
                  <View
                    style={{
                      width: 66,
                      height: 66,
                      borderRadius: 50,
                      justifyContent: 'center',
                    }}>
                    <Image
                      style={{width: 66, height: 66, borderRadius: 50}}
                      source={this.state.profile_photo}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 66,
                      height: 66,
                      borderRadius: 50,
                      justifyContent: 'center',
                    }}>
                    <Image source={require('../img/emoji_place_holder.png')} />
                  </View>
                )}
                <View style={{alignSelf: 'center', marginLeft: 15}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      marginLeft: 15,
                      fontSize: 26,
                      fontWeight: 'bold',
                    }}>
                    {this.props.navigation.state.params.userDetails.fname}{' '}
                    {this.props.navigation.state.params.userDetails.lname}
                  </Text>
                  <Text
                    style={{
                      textAlign: 'left',
                      marginLeft: 15,
                      color: '#7B7F8E',
                    }}>
                    {this.props.navigation.state.params.userDetails.email}
                  </Text>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('InviteFriendView', {
                    userDetails: this.props.navigation.state.params.userDetails,
                  })
                }
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                  top: 10,
                }}>
                <View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('SettingView.Text1')}
                  </Text>
                </View>
              </TouchableOpacity>
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
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('SettingView.Text2')}
                  </Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    right: 22,
                  }}>
                  <Switch
                    backgroundActive={'#60C3C6'}
                    value={true}
                    backgroundInactive={'#F2F2F2'}
                    circleActiveColor={'white'}
                    circleInactiveColor={'white'}
                  />
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
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('SettingView.Text3')}
                  </Text>
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                    right: 22,
                  }}>
                  <Switch
                    backgroundActive={'#60C3C6'}
                    backgroundInactive={'#F2F2F2'}
                    circleActiveColor={'white'}
                    circleInactiveColor={'white'}
                  />
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('FeedBackView')}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                  top: 10,
                }}>
                <View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('SettingView.Text4')}
                  </Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => this.sendEmailToContact()}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                  top: 10,
                }}>
                <View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('SettingView.Text5')}
                  </Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => this.manageConnectedDevice()}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                  top: 10,
                }}>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    {translate('SettingView.Text6')}
                  </Text>
                </View>
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-end',
                      top: 25,
                      color: this.state.active ? '#27AE60' : 'red',
                      right: 22,
                      fontSize: 14,
                      fontWeight: 'bold',
                    }}>
                    {this.state.active
                      ? translate('SettingView.Text7')
                      : translate('SettingView.Text10')}
                  </Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => this.openLink()}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                  top: 10,
                }}>
                <View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('SettingView.Text8')}
                  </Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity
                onPress={() => {
                  this.logout();
                }}
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  width: '100%',
                  height: 50,
                  top: 10,
                }}>
                <View>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      color: '#27AE60',
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('SettingView.Text9')}
                  </Text>
                </View>
              </TouchableOpacity>
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
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
