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
import CountryPicker from 'react-native-country-picker-modal';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';
const {styles} = Styles;
export default class PersonalInfoView extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <SafeAreaView style={styles.mainContainer}>
          <HeaderWithSteps onPress={() => this.props.navigation.goBack()} />

          <View
            style={{flexDirection: 'column', alignItems: 'center', marginTop: 20}}>
            <View style={{top: 50}}>
              <Text style={{color: '#2D3142', fontSize: 24, fontWeight: 'bold'}}>What's Your Name?</Text>
            </View>
            <View style={{width: 332, height: 58, backgroundColor: '#fff', borderRadius: 15, top: 80}}>
              <TextInput style={{textAlign: 'center'}} placeholder="First Name"></TextInput>
            </View>
            <View style={{width: 332, height: 58, backgroundColor: '#fff', borderRadius: 15, top: 100}}>
              <TextInput style={{textAlign: 'center'}} placeholder="Last Name"></TextInput>
            </View>
          </View>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('SleepReminderView')}
            style={{position: 'absolute', bottom: 20}}>
            <LinearGradient
              angleCenter={{ x: 0.5, y: 1.5}}
              angle={90}
              useAngle={true}
              colors={['#63D7E6', '#77E365']}
              style={{borderRadius: 50, marginRight: 10, width: 331, height: 50, alignItems: 'center',
                      shadowColor: "#000", shadowOffset: { width: 0, height: 12, }, shadowOpacity: 0.58,
                      shadowRadius: 16.00, elevation: 5}}>
              <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', marginTop: 12}}>Continue</Text>
            </LinearGradient>
          </TouchableOpacity>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    );
  }
}
