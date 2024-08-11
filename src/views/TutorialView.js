import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class TutorialView extends React.Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}>
        <ImageBackground
          source={require('../img/tutorial_bg.png')}
          style={styles.mainContainer}>
          <View
            style={{
              flexDirection: 'column',
              alignSelf: 'center',
              marginTop: 10,
              height: '40%',
              justifyContent: 'center',
            }}>
            <View></View>
            <Image
              source={require('../img/tutorial_water.png')}
              style={{
                marginTop: 5,
                height: 68,
                width: 420,
                alignSelf: 'center',
              }}></Image>
            <View style={{flexDirection: 'column'}}>
              <Image
                source={require('../img/arrow.png')}
                style={{
                  marginTop: 5,
                  height: 60,
                  width: 10,
                  alignSelf: 'center',
                }}></Image>

              <Text
                style={[
                  styles.textStyleSmall,
                  {textAlign: 'center', color: 'white', marginTop: 10},
                ]}>
                {translate('TutorialView.Text1')} {'\n'}
                {translate('TutorialView.Text2')} {'\n'}
                {translate('TutorialView.Text3')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NotificationView')}
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
                {translate('TutorialView.Text4')}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </TouchableWithoutFeedback>
    );
  }
}
