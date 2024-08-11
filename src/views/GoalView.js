import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
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
import LinearGradient from 'react-native-linear-gradient';
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
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class GoalView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nutrition: false,
      water: true,
      weight: false,
      overall: false,
      health_need: ['water'],
    };
  }

  setGoal(option) {
    this.state.health_need.map(health => {
      if (health === option) {
        this.setState({
          health_need: this.state.health_need.filter(item => item !== option),
        });
      } else {
        this.setState({health_need: this.state.health_need.concat(option)});
      }
    });
    if (option === 'weight') {
      this.setState({weight: !this.state.weight});
    } else if (option === 'water') {
      this.setState({water: !this.state.water});
    } else if (option === 'nutrition') {
      this.setState({nutrition: !this.state.nutrition});
    } else if (option === 'overall') {
      this.setState({overall: !this.state.overall});
    }
  }

  async addHealthNeed() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let health_need = [];
    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('health_need', JSON.stringify(this.state.health_need));
    formdata.append('signup_state', 8);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('PhotoView');
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={styles.mainContainer}>
          <HeaderWithSteps onPress={() => this.props.navigation.goBack()} />

          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              height: '80%',
              justifyContent: 'center',
            }}>
            <Text style={[styles.textStyle, {}]}>
              {translate('GoalView.Text1')} {'\n'}
              {translate('GoalView.Text2')}
            </Text>
            <Text
              style={[
                styles.textStyleSmall,
                {textAlign: 'center', marginTop: 5},
              ]}>
              {translate('GoalView.Text3')}
            </Text>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <ListItem
                style={{
                  backgroundColor: '#fff',
                  marginTop: 10,
                  width: 331,
                  height: 60,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                selected={this.state.weight}>
                <Left style={{left: 20}}>
                  <Text style={{fontWeight: 'normal', fontSize: 16}}>
                    {translate('GoalView.Text4')}
                  </Text>
                </Left>
                <Right>
                  <Radio
                    onPress={() => this.setGoal('weight')}
                    style={{
                      backgroundColor: '#F4F6FA',
                      borderRadius: 50,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                    color={'#F4F6FA'}
                    selectedColor={'#7265E3'}
                    selected={this.state.weight}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={{
                  backgroundColor: '#fff',
                  marginTop: 10,
                  width: 331,
                  height: 60,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                selected={this.state.water}>
                <Left style={{left: 20}}>
                  <Text style={{fontWeight: 'normal', fontSize: 16}}>
                    {translate('GoalView.Text5')}
                  </Text>
                </Left>
                <Right>
                  <Radio
                    onPress={() => this.setGoal('water')}
                    style={{
                      backgroundColor: '#F4F6FA',
                      borderRadius: 50,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                    color={'#F4F6FA'}
                    selectedColor={'#7265E3'}
                    selected={this.state.water}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={{
                  backgroundColor: '#fff',
                  marginTop: 10,
                  width: 331,
                  height: 60,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                selected={this.state.nutrition}>
                <Left style={{left: 20}}>
                  <Text style={{fontWeight: 'normal', fontSize: 16}}>
                    {translate('GoalView.Text6')}
                  </Text>
                </Left>
                <Right>
                  <Radio
                    onPress={() => this.setGoal('nutrition')}
                    style={{
                      backgroundColor: '#F4F6FA',
                      borderRadius: 50,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                    color={'#F4F6FA'}
                    selectedColor={'#7265E3'}
                    selected={this.state.nutrition}
                  />
                </Right>
              </ListItem>
              <ListItem
                style={{
                  backgroundColor: '#fff',
                  marginTop: 10,
                  width: 331,
                  height: 60,
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                selected={this.state.overall}>
                <Left style={{left: 20}}>
                  <Text style={{fontWeight: 'normal', fontSize: 16}}>
                    {translate('GoalView.Text7')}
                  </Text>
                </Left>
                <Right>
                  <Radio
                    onPress={() => this.setGoal('overall')}
                    style={{
                      backgroundColor: '#F4F6FA',
                      borderRadius: 50,
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                    }}
                    color={'#F4F6FA'}
                    selectedColor={'#7265E3'}
                    selected={this.state.overall}
                  />
                </Right>
              </ListItem>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.addHealthNeed()}
            style={{position: 'absolute', bottom: 20}}>
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
                justifyContent: 'center',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 12},
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 5,
              }}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                {translate('common.continue')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
