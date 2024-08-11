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
import ImagePicker from 'react-native-image-picker';
// import Carousel from 'react-native-snap-carousel';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import LinearGradient from 'react-native-linear-gradient';
import ImageResizer from 'react-native-image-resizer';
import {updateUserDetails} from '../service/Api';
import {Config} from '../config/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressLoader from 'rn-progress-loader';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;

export default class PhotoView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatarSource: null,
      appHasLoaded: false,
      isAvatarUploaded: false,
    };
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        {this.state.avatarSource ? (
          <Image
            source={{uri: this.state.avatarSource.uri}}
            style={{width: 82, height: 82, borderRadius: 50}}
          />
        ) : (
          <Image
            source={require('../img/emoji_place_holder.png')}
            style={{width: 82, height: 82, borderRadius: 50}}
          />
        )}
      </View>
    );
  };

  async servicePhotoUpload(uri, fileName, fileType) {
    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    let formdata = new FormData();

    formdata.append('profile_photo', {
      uri: uri,
      name: fileName,
      type: fileType,
    });
    formdata.append('phone_number', phoneNumber);
    formdata.append('auth_token', authToken);
    formdata.append('signup_state', 9);

    updateUserDetails(formdata)
      .then(res => {
        console.log(res);
        this.setState({isAvatarUploaded: true});
        this.setState({appHasLoaded: false});
      })
      .catch(err => {
        console.log('Error', err);
      });
  }

  onImageUpload() {
    try {
      var options = {
        title: 'Select Avatar',
        quality: 0.5,
        noData: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log('uploading');
          ImageResizer.createResizedImage(response.uri, 800, 600, 'JPEG', 10)
            .then(response => {
              // response.uri is the URI of the new image that can now be displayed, uploaded...
              // response.path is the path of the new image
              // response.name is the name of the new image with the extension
              // response.size is the size of the new image
              if (response.uri) {
                this.setState({avatarSource: response});
              }
              console.log(this.state.avatarSource);
              this.setState({appHasLoaded: true});
              this.servicePhotoUpload(
                response.uri,
                response.name,
                'image/jpeg',
              );
            })
            .catch(err => {
              // Oops, something went wrong. Check that the filename is correct and
              // inspect err to get more details.
            });
        }
      });
    } catch (err) {
      console.log('onImageUpload error:' + err.message);
      alert('Upload image error:' + err.message);
    }
  }

  continueToSleepReminder() {
    if (this.state.isAvatarUploaded) {
      this.props.navigation.navigate('SleepReminderView');
    } else {
      this.onImageUpload();
    }
  }

  data = [
    {title: 'hello'},
    {title: 'hello'},
    {title: 'hello'},
    {title: 'hello'},
    {title: 'hello'},
  ];
  render() {
    const {avatarSource} = this.state;
    return (
      <SafeAreaView style={styles.mainContainer}>
        <HeaderWithSteps onPress={() => this.props.navigation.goBack()} />
        <ProgressLoader
          visible={this.state.appHasLoaded}
          isModal={true}
          isHUD={false}
          hudColor={'#000000'}
          color={'#FFFFFF'}
        />
        <View
          style={{
            flexDirection: 'column',
            alignSelf: 'center',
            marginTop: 10,
            height: '50%',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{width: 18, height: 12, marginBottom: 10}}
              source={require('../img/slider_im_selector_top.png')}></Image>
            <View style={{}}>
              {this.state.avatarSource ? (
                <Image
                  source={{uri: this.state.avatarSource.uri}}
                  style={{width: 82, height: 82, borderRadius: 50}}
                />
              ) : (
                <Image
                  source={require('../img/emoji_place_holder.png')}
                  style={{width: 82, height: 82, borderRadius: 50}}
                />
              )}
            </View>
            <Image
              style={{width: 18, height: 12, marginTop: 10}}
              source={require('../img/slider_im_select_bottom.png')}></Image>
          </View>
          <Text style={styles.textStyle}>{translate('PhotoView.Text1')}</Text>
          <Text style={[styles.textStyleSmall, {textAlign: 'center'}]}>
            {translate('PhotoView.Text2')} {'\n'}
            {translate('PhotoView.Text1')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.onImageUpload();
            }}
            style={{marginTop: 20}}>
            <Text
              style={[
                styles.textStyleSmall,
                {textAlign: 'center', color: '#7265E3', fontWeight: '500'},
              ]}>
              {translate('PhotoView.Text3')}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => this.continueToSleepReminder()}
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
    );
  }
}
