import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
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
  import DatePicker from 'react-native-date-picker';
  import Search from 'react-native-search-box';

  const {styles} = Styles;

  export default class TipsPopUpView extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
    render() {
      return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
          <SafeAreaView style={[styles.mainContainer, {backgroundColor: '#000000', justifyContent: 'center'}]}>

            <ImageBackground
            source={require('../img/tips_popup.png')}
            style={{width: 380, height: 472}}>
            <View style  =  {{position: 'absolute', bottom: 0, marginBottom: 20, alignSelf: 'center'}}>
            <RoundButton img = {require('../img/alright_btn.png')}></RoundButton>
            </View>
            </ImageBackground>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      );
    }
  }
