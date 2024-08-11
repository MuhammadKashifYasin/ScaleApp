import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Button,
  Platform,
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
import { Switch } from 'react-native-switch';
import DatePicker from 'react-native-date-picker';
import LinearGradient from 'react-native-linear-gradient';

const { styles } = Styles;

export default class SleepReminderScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
        <SafeAreaView style={styles.mainContainer}>
          <HeaderWithSteps  onPress = {this.props.navigation.goBack()}/>

          <View style={{alignItems: 'center', width: '100%', height: 350, backgroundColor: '#fff', marginTop: 60}}>
            <Image style={{width: 143, height: 67}}/>
            <Text style={{width: '60%', textAlign: 'center',fontSize: 20, fontWeight: 'bold'}}>What time would you like to sleep?</Text>
            <Text style={{width: '70%', textAlign: 'center', fontSize: 16, fontWeight: 'normal', color: '#9C9EB9'}}>Sets a reminder to alert you at what point you should go to sleep.</Text>
            <View>
              <DatePicker
                style = {{backgroundColor: 'white', marginTop: 10}}
                date={this.state.date}
                mode = {'time'}
                onDateChange={date => this.setState({ date })}
              />
            </View>
          </View>
          <View style={{flexDirection: 'row',justifyContent: 'space-between',alignSelf: 'stretch',paddingLeft: 20,marginTop: 30,marginRight: 20}}>
            <Text style={{fontSize: 16,color: '#2D3142'}}>Add alarm sound</Text>
            <Switch
              backgroundActive={'#60C3C6'}
              backgroundInactive={'#fff'}
              circleActiveColor={'white'}
              circleInactiveColor={'white'}
            />
          </View>
          <TouchableOpacity
            onPress={()=>this.props.navigation.navigate('SuccessView')}
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
