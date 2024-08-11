import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Clipboard,
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
import LinearGradient from 'react-native-linear-gradient';
import Share from 'react-native-share';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';
import Toast, {DURATION} from 'react-native-easy-toast';

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

export default class InviteFriendView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      search: '',
    };
    this.updateSearch = this.updateSearch.bind(this);
  }

  updateSearch(search) {
    this.setState({search});
  }

  inviteNowBtn() {
    let url = this.props.navigation.state.params.userDetails.unique_share_link;
    let title = 'ScaleApp - Fitness App';
    let message = 'https://scale-app.com/affiliates?token=';
    let options = Platform.select({
      default: {
        title,
        subject: title,
        message: `${message}${url}`,
      },
    });
    Share.open(options);
  }

  async writeToClipboard() {
    await Clipboard.setString(
      'https://scale-app.com/affiliates?token=' +
        this.props.navigation.state.params.userDetails.unique_share_link,
    );
    this.refs.toast.show('Copied to clipboard', 500, () => {
      // something you want to do at close
    });
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
            <View style={{height: 20, marginTop: 20, marginLeft: 15}}>
              <View
                style={{
                  marginLeft: 10,
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={{top: 5}}
                  onPress={() => this.props.navigation.navigate('SettingView')}>
                  <Icon
                    name="arrow-left"
                    size={18}
                    backgroundColor="#F2F2F2"
                    color="#2a292b"></Icon>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{flexDirection: 'column', alignItems: 'center', top: 20}}>
              <Image
                source={require('../img/invite-friend-illustration.png')}
              />
              <Text
                style={{
                  fontSize: 24,
                  color: '#2D3142',
                  fontWeight: 'bold',
                  width: '50%',
                  textAlign: 'center',
                }}>
                {translate('InviteFriendView.Text1')}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#9C9EB9',
                  fontWeight: 'normal',
                  width: '65%',
                  textAlign: 'center',
                }}>
                {translate('InviteFriendView.Text2')}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => this.writeToClipboard()}
              style={{top: 30, alignSelf: 'center', marginBottom: 30}}>
              <LinearGradient
                angleCenter={{x: 0.5, y: 1.5}}
                angle={90}
                useAngle={true}
                colors={['#DDF5E4', '#DDF5E4']}
                style={{
                  borderRadius: 50,
                  marginRight: 10,
                  width: 331,
                  height: 50,
                  flexDirection: 'row',
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 12},
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,
                  elevation: 1,
                }}>
                <Text
                  style={{
                    width: '90%',
                    textAlign: 'left',
                    left: 20,
                    color: '#219653',
                    fontSize: 11,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                  }}>
                  https://scale-app.com/affiliates?token=
                  {
                    this.props.navigation.state.params.userDetails
                      .unique_share_link
                  }
                </Text>
                <Icon
                  style={{width: '10%', top: 15, marginLeft: 5}}
                  name="clone"
                  size={18}
                  backgroundColor="#27AE60"
                  color="#27AE60"></Icon>
              </LinearGradient>
            </TouchableOpacity>
            <View>
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
                    {translate('InviteFriendView.Text4')}
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
                    {
                      this.props.navigation.state.params.userDetails
                        .invites_sent
                    }{' '}
                    {translate('InviteFriendView.Text8')}
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
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('InviteFriendView.Text5')}
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
                    {
                      this.props.navigation.state.params.userDetails
                        .Invites_accepted
                    }{' '}
                    {translate('InviteFriendView.Text9')}
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
                <View style={{width: '50%'}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      top: 25,
                      marginLeft: 25,
                      fontSize: 14,
                      fontWeight: 'normal',
                    }}>
                    {translate('InviteFriendView.Text6')}
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
                    $5.00
                  </Text>
                </View>
              </View>
              <View style={{height: 300}}>
                <TouchableOpacity
                  onPress={() => this.inviteNowBtn()}
                  style={{top: 30, alignSelf: 'center'}}>
                  <LinearGradient
                    angleCenter={{x: 0.5, y: 1.5}}
                    angle={90}
                    useAngle={true}
                    colors={['#63D7E6', '#77E365']}
                    style={{
                      borderRadius: 50,
                      marginRight: 10,
                      width: 331,
                      height: 50,
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
                      {translate('InviteFriendView.Text7')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
