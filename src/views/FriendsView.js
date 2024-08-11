import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  Dimensions,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  TextInput,
} from 'react-native';
import ProgressLoader from 'rn-progress-loader';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import { SearchBar } from 'react-native-elements';
import {LineChart} from 'react-native-line-chart';
import {Switch} from 'react-native-switch';
import LinearGradient from 'react-native-linear-gradient';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWakeUpFriends, makeWakeupCall} from '../service/Api';
import {Config} from '../config/Config';

import ListItem from './components/ListItem';
import Avatar from './components/Avatar';
import SearchBar from './components/SearchBar';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const {height, width} = Dimensions.get('window');

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

const getAvatarInitials = textString => {
  if (!textString) return '';

  const text = textString.trim();

  const textSplit = text.split(' ');

  if (textSplit.length <= 1) return text.charAt(0);

  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

  return initials;
};

export default class FriendsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      customStyleIndex: 0,
      contacts: [],
      searchPlaceholder: 'Search',
      appHasLoaded: true,
    };

    this.updateSearch = this.updateSearch.bind(this);
    this.handleCustomIndexSelect = this.handleCustomIndexSelect.bind(this);
    this.loadContacts = this.loadContacts.bind(this);
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.loadContacts();
      });
    } else {
      this.loadContacts();
    }
  }

  async loadContacts() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');
    Contacts.getAll((err, contacts) => {
      if (err === 'denied') {
        console.warn('Permission to access contacts was denied');
        this.setState({appHasLoaded: false});
      } else {
        console.log(contacts);
        var newData = contacts.filter(contact => {
          return contact.phoneNumbers.length > 0 && contact.givenName != '';
        });

        let formdata = new FormData();

        formdata.append('phone_number', phoneNumber);
        formdata.append('auth_token', authToken);
        formdata.append('user_contacts', JSON.stringify(newData));

        getWakeUpFriends(formdata)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log('Error', err);
          });
        newData.sort(
          (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
        );
        this.setState({contacts: newData});
        this.setState({appHasLoaded: false});
      }
    });

    Contacts.getCount(count => {
      this.setState({searchPlaceholder: `Search ${count} contacts`});
    });
  }

  async wakeUpCall(wakeupPhoneNumber) {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('wakeup_phone_number', wakeupPhoneNumber);

    makeWakeupCall(formdata)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  updateSearch(text) {
    const phoneNumberRegex =
      /\b[\+]?[(]?[0-9]{2,6}[)]?[-\s\.]?[-\s\/\.0-9]{3,15}\b/m;
    const emailAddressRegex =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (text === '' || text === null) {
      this.loadContacts();
    } else if (phoneNumberRegex.test(text)) {
      Contacts.getContactsByPhoneNumber(text, (err, contacts) => {
        this.setState({contacts});
      });
    } else if (emailAddressRegex.test(text)) {
      Contacts.getContactsByEmailAddress(text, (err, contacts) => {
        this.setState({contacts});
      });
    } else {
      Contacts.getContactsMatchingString(text, (err, contacts) => {
        this.setState({contacts});
      });
    }
  }

  handleCustomIndexSelect(index) {
    //handle tab selection for custom Tab Selection SegmentedControlTab
    this.setState(prevState => ({...prevState, customStyleIndex: index}));
  }

  render() {
    const {search, customStyleIndex} = this.state;
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
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{width: '100%', height: 120, marginTop: 20}}>
              <View style={{zIndex: 10, marginLeft: 20, marginBottom: 20}}>
                <TouchableOpacity
                  style={{top: 5}}
                  onPress={() => this.props.navigation.navigate('HomeView')}>
                  <Icon
                    name="arrow-left"
                    size={18}
                    backgroundColor="#F2F2F2"
                    color="#2a292b"></Icon>
                </TouchableOpacity>
              </View>
              <View style={{marginLeft: 10, flexDirection: 'row'}}>
                <Icon
                  name="list"
                  size={18}
                  color="#2a292b"
                  style={{marginLeft: 10, marginTop: 10}}></Icon>
                <View style={{alignSelf: 'center', marginLeft: 20}}>
                  <Text
                    style={{
                      alignSelf: 'flex-start',
                      fontSize: 26,
                      fontWeight: 'bold',
                    }}>
                    {translate('FriendsView.Text1')}
                  </Text>
                  <Text style={{alignSelf: 'center'}}>
                    {translate('FriendsView.Text2')}
                  </Text>
                </View>
              </View>
              <View style={{width: '90%', alignSelf: 'center', marginTop: 40}}>
                <SearchBar
                  searchPlaceholder={this.state.searchPlaceholder}
                  onChangeText={this.search}
                />
              </View>
            </View>
            <View style={{top: 100}}>
              <SegmentedControlTab
                values={[translate('FriendsView.Text3')]}
                selectedIndex={customStyleIndex}
                onTabPress={this.handleCustomIndexSelect}
                borderRadius={0}
                tabsContainerStyle={{
                  height: 50,
                  backgroundColor: '#F2F2F2',
                  width: '30%',
                }}
                tabStyle={{
                  backgroundColor: 'transparent',
                  borderBottomColor: '#6CC2E6',
                  borderWidth: 0,
                  borderColor: 'transparent',
                }}
                activeTabStyle={{
                  backgroundColor: 'transparent',
                  borderWidth: 2,
                  borderBottomColor: '#6CC2E6',
                  marginTop: 2,
                }}
                tabTextStyle={{color: '#2A3139', fontWeight: 'bold'}}
                activeTabTextStyle={{
                  color: '#2A3139',
                  borderBottomColor: '#6CC2E6',
                }}
              />
              <View style={{top: 10}}>
                <ScrollView>
                  {this.state.contacts.map(contact => {
                    return (
                      <View
                        style={{
                          width: '100%',
                          backgroundColor: '#fff',
                          borderBottomColor: '#C4C4C4',
                          marginBottom: 1.44,
                        }}>
                        <View
                          style={{
                            height: 48.26,
                            width: width - 10,
                            left: 20,
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                          }}>
                          <Avatar
                            img={
                              contact.hasThumbnail
                                ? {uri: contact.thumbnailPath}
                                : undefined
                            }
                            placeholder={getAvatarInitials(
                              `${contact.givenName} ${contact.familyName}`,
                            )}
                            width={40}
                            height={40}
                            style={{
                              justifyContent: 'center',
                              alignSelf: 'center',
                            }}
                          />
                          <View
                            style={{
                              height: 48.26,
                              width: width - 180,
                              justifyContent: 'center',
                              alignSelf: 'flex-end',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: 'rgba(137, 137, 137, 0.8)',
                                left: 10,
                              }}>
                              {contact.givenName} {contact.familyName}
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
                                color: '#C4C4C4',
                                left: 10,
                              }}>
                              {contact.phoneNumbers[0].number}
                            </Text>
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              this.wakeUpCall(contact.phoneNumbers[0].number)
                            }
                            style={{alignSelf: 'center'}}>
                            <LinearGradient
                              angleCenter={{x: 0.5, y: 1.5}}
                              angle={90}
                              useAngle={true}
                              colors={['#63D7E6', '#77E365']}
                              style={{
                                borderRadius: 50,
                                marginRight: 20,
                                width: 90,
                                height: 30,
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
                                  fontSize: 16,
                                  fontWeight: 'bold',
                                  marginTop: 5,
                                }}>
                                {translate('FriendsView.Text4')}
                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
