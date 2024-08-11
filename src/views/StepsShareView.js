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
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import ScrollPicker from 'react-native-fen-wheel-scroll-picker';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
export default class StepsShareView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordShow: false,
    };
  }
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <SafeAreaView style={[styles.mainContainer]}>
          <ImageBackground
            source={require('../img/color_bg1.png')}
            style={{width: '100%', height: 379}}>
            <ImageBackground
              source={require('../img/confetti.png')}
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
                  <Image source={require('../img/back_icon_white.png')}></Image>
                </TouchableOpacity>
              </TouchableOpacity>
              <Text
                style={[
                  styles.textStyle,
                  {
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 24,
                    marginTop: 30,
                    width: 332,
                    height: 70,
                  },
                ]}>
                {translate('StepsShareView.Text1')}
              </Text>
            </ImageBackground>
          </ImageBackground>

          <ImageBackground
            source={require('../img/rect_card.png')}
            style={{marginTop: -250, width: 331, height: 384}}>
            <View style={{flexDirection: 'column', height: '100%'}}>
              <Image
                source={require('../img/logo_v_small.png')}
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
                  source={require('../img/Vector.png')}
                  style={{
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: '30.42%',
                  }}
                />
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 15,
                    fontSize: 28,
                    fontWeight: 'bold',
                  }}>
                  10,234
                </Text>
                <Text style={[styles.textStyleSmall, {alignSelf: 'center'}]}>
                  {translate('StepsShareView.Text2')}
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
                  <Text style={styles.textStyleSmallBold}>9</Text>
                  <Text style={styles.textStyleSmall}>
                    {translate('StepsShareView.Text3')}
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
                  <Text style={styles.textStyleSmallBold}>8</Text>
                  <Text style={styles.textStyleSmall}>
                    {translate('StepsShareView.Text4')}
                  </Text>
                </View>
              </View>
            </View>
          </ImageBackground>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              marginBottom: 20,
              width: '100%',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <RoundButton
              onPress={() => this.props.navigation.navigate('HomeView')}
              img={require('../img/share_friend_btn.png')}
            />
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('HomeView')}>
              <Text
                style={[
                  styles.textStyleSmall,
                  {color: '#7265E3', alignSelf: 'center', marginTop: 15},
                ]}>
                {translate('common.notNow')}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
