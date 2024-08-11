import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React from 'react';
import backgroundColor from '../../config/Colors';
import RoundButton from './RoundButton';
import Styles from '../styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './HeaderWithSteps';
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
import {updateLifestyleHistory, getLifestyleHistory} from '../../service/Api';
import {Config} from '../../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {styles} = Styles;
export default class WaterComponentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cups_value: 0,
    };
  }

  async componentDidMount() {
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('lifestyle_type', 2);

    getLifestyleHistory(formdata)
      .then(res => {
        console.log(res.water);
        this.setState({cups_value: JSON.parse(res.water[0].cups_count)});
        this.updateGlass();
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  render() {
    return (
      <SafeAreaView style={[styles.mainContainer]}>
        <ImageBackground
          source={require('../../img/color_bg3.png')}
          style={{zIndex: 0, width: '100%', height: 399}}>
          <ImageBackground
            source={require('../../img/confetti.png')}
            style={{width: '100%', height: 379}}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                left: 0,
                margin: 10,
              }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={{width: 40, height: 40}}>
                <Image
                  source={require('../../img/back_icon_white.png')}></Image>
              </TouchableOpacity>
            </TouchableOpacity>
            <Text
              style={[
                styles.textStyle,
                {
                  color: 'white',
                  alignSelf: 'center',
                  fontSize: 24,
                  marginTop: 90,
                  width: 332,
                  height: 70,
                },
              ]}>
              Drink non-stop
            </Text>
          </ImageBackground>
        </ImageBackground>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'flex-end',
            bottom: 20,
          }}
          style={{zIndex: 2, position: 'absolute', height: '100%'}}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('WaterFrontView')}
            style={{
              width: 331,
              height: 384,
              shadowColor: 'rgba(112, 136, 210, 0.1)',
              borderRadius: 15,
              backgroundColor: '#fff',
            }}>
            <View style={{flexDirection: 'column', height: '100%'}}>
              <Image
                source={require('../../img/logo_v_small.png')}
                style={{alignSelf: 'center', margin: 10}}></Image>
              <View
                style={{
                  backgroundColor: '#F4F6FA',
                  width: '90%',
                  height: 3,
                  alignSelf: 'center',
                }}></View>
              <View
                style={{
                  width: 220,
                  height: 173,
                  flexDirection: 'column',
                  width: '100%',
                }}>
                <Image
                  source={require('../../img/Vector_2.png')}
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: '10.42%',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 35,
                    fontSize: 28,
                    fontWeight: 'bold',
                  }}>
                  {this.state.cups_value}/8 Glass
                </Text>
                <Text style={[styles.textStyleSmall, {alignSelf: 'center'}]}>
                  Full capacity
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  position: 'absolute',
                  bottom: 0,
                  width: '100%',
                  justifyContent: 'space-around',
                }}>
                <View style={{flexDirection: 'column'}}>
                  <Text style={styles.textStyleSmallBold}>
                    {this.state.cups_value}
                  </Text>
                  <Text style={styles.textStyleSmall}>Glass</Text>
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
                    8
                  </Text>
                  <Text style={styles.textStyleSmall}>Daily Goal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
