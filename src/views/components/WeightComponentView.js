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
import ScrollPicker from "react-native-fen-wheel-scroll-picker";

const {styles} = Styles;
export default class WeightComponentView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordShow: false,
    };
  }
  render() {
    return (
      <SafeAreaView style={[styles.mainContainer]}>
        <ImageBackground
          source={require('../../img/color_bg.png')}
          style={{width: '100%', height: 399}}>
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

                <Image source={require('../../img/back_icon_white.png')}></Image>
              </TouchableOpacity>
            </TouchableOpacity>
            <Text
              style={[
                styles.textStyle,
                {color: 'white', alignSelf: 'center', fontSize: 24,marginTop: 90,width: 332,height: 70},
              ]}>
              Good Day {'\n'} Your compled Activity
            </Text>
          </ImageBackground>
        </ImageBackground>

        <TouchableOpacity
          onPress={()=> this.props.navigation.navigate('WeightFrontView')}
          style={{position: 'absolute', justifyContent: 'flex-end', bottom: 20, width: 331, height: 384, shadowColor: 'rgba(112, 136, 210, 0.1)', borderRadius: 15, backgroundColor: '#fff'}}>
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
              source={require('../../img/Vector_4.png')}
              style={{justifyContent: 'center',alignSelf: 'center',marginTop: '20.42%'}}
              />
              <Text
                style={{alignSelf: 'center', marginTop: 35,fontSize: 28,fontWeight: 'bold'}}>
                74.30
              </Text>
              <Text
                style={[
                  styles.textStyleSmall,
                  {alignSelf: 'center', },
                ]}>
                   its your goal
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
                <Text style={styles.textStyleSmallBold}>74.30</Text>
                <Text style={styles.textStyleSmall}>Cal Burned</Text>
              </View>
              <View
                style={{
                  backgroundColor: '#F4F6FA',
                  width: 3,
                  height: 53,
                  alignSelf: 'center',
                }}></View>
              <View style={{flexDirection: 'column'}}>
                <Text style={[styles.textStyleSmallBold,{justifyContent: 'center',alignSelf: 'center'}]}>74.00</Text>
              <Text style={styles.textStyleSmall}>Daily Goal</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}