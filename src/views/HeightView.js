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
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollPicker from 'react-native-picker-scrollview';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const dataSource = [
  {value: '140'},
  {value: '141'},
  {value: '142'},
  {value: '143'},
  {value: '144'},
  {value: '145'},
  {value: '146'},
  {value: '147'},
  {value: '148'},
  {value: '149'},
  {value: '150'},
  {value: '151'},
  {value: '152'},
  {value: '153'},
  {value: '154'},
  {value: '155'},
  {value: '156'},
  {value: '157'},
  {value: '158'},
  {value: '159'},
  {value: '160'},
  {value: '161'},
  {value: '162'},
  {value: '163'},
  {value: '164'},
  {value: '165'},
  {value: '166'},
  {value: '167'},
  {value: '168'},
  {value: '169'},
  {value: '170'},
  {value: '171'},
  {value: '172'},
  {value: '173'},
  {value: '174'},
  {value: '175'},
  {value: '176'},
  {value: '177'},
  {value: '178'},
  {value: '179'},
  {value: '180'},
  {value: '181'},
  {value: '182'},
  {value: '183'},
  {value: '184'},
  {value: '185'},
  {value: '186'},
  {value: '187'},
  {value: '188'},
  {value: '189'},
  {value: '190'},
  {value: '191'},
  {value: '192'},
  {value: '193'},
  {value: '194'},
  {value: '195'},
  {value: '196'},
  {value: '197'},
  {value: '198'},
  {value: '199'},
  {value: '200'},
  {value: '201'},
  {value: '202'},
  {value: '203'},
  {value: '204'},
  {value: '205'},
  {value: '206'},
  {value: '207'},
  {value: '208'},
  {value: '209'},
  {value: '210'},
];

export default class HeightView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 3,
      height: '141',
      heightData: [],
    };
  }

  componentDidMount() {
    this.setState({heightData: dataSource});
  }

  addHeight(height) {
    console.log(height);
    this.setState({height: height});
  }

  async updateHeight() {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('height', this.state.height);
    formdata.append('signup_state', 4);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('GenderView');
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
          <View style={{marginTop: 20}}>
            <View style={{height: 110, marginTop: 60}}>
              <FlatList
                showsVerticalScrollIndicator={false}
                keyExtractor={mainComponent => mainComponent.value}
                data={this.state.heightData}
                renderItem={({item, index}) => {
                  return (
                    <TouchableOpacity
                      style={{height: 40, alignSelf: 'center'}}
                      onPress={() => this.addHeight(item.value)}>
                      {item.value === this.state.height ? (
                        <Text style={{fontSize: 28, fontWeight: 'bold'}}>
                          {item.value}
                        </Text>
                      ) : (
                        <Text style={{fontSize: 24, fontWeight: 'normal'}}>
                          {item.value}
                        </Text>
                      )}
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignSelf: 'center',
                height: '70%',
                justifyContent: 'flex-start',
              }}>
              <Text
                style={[
                  styles.textStyleSmall,
                  {fontSize: 14, alignSelf: 'center', marginTop: 20},
                ]}>
                {translate('HeightView.Text1')}
              </Text>
              <Text style={[styles.textStyle, {marginTop: 10, fontSize: 24}]}>
                {translate('HeightView.Text2')}
              </Text>
              <Text style={[styles.textStyleSmall, {marginTop: 50}]}>
                {translate('HeightView.Text3')}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.updateHeight()}
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
