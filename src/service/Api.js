import {Config} from '../config/Config';
import {ToastAndroid, Platform} from 'react-native';
import axios from 'axios';

export function getCorsAnywhere() {
  /// No longer available for released version
  ///
  Config.PRODUCTION = true;
  if (!Config.PRODUCTION) return Config.CORS_ANYWHERE;
  return '';
}

// export const registerUser = async phoneNumber => {
//   try {
//     console.log('Register user called with phone number:', phoneNumber);
//     const response = await axios.post(`${Config.BASE_URL}/register`, {
//       phoneNumber,
//     });
//     console.log('Response from server:', response);
//     return response.data;
//   } catch (error) {
//     console.log('Error in registerUser function:', error);
//     throw error;
//   }
// };

export function registerUser(phone = '') {
  phone = phone.replace('+', '');

  let formdata = new FormData();

  formdata.append('phone_number', phone);
  formdata.append('stage', 1);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);

  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('registerUser catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function verifySmsCode(phone = '', code = '') {
  console.log('teeee');
  let formdata = new FormData();

  formdata.append('phone_number', '972549370601');
  formdata.append('sms_code', code);
  formdata.append('stage', 2);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log('teeee2');

  const url = getCorsAnywhere() + Config.BASE_URL;
  console.log('Request URL:', url);
  console.log('test', formdata);
  return new Promise(function (resolve, reject) {
    console.log('teeee3');
    fetch(url, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        console.log('teeee4', response);
        if (!response.ok) {
          console.log('Network response was not ok');
          reject(response.statusText);
          return;
        }
        return response.json();
      })
      .then(res => {
        console.log('teeee5', res);
        if (response.status == 200) resolve(res);
        else {
          console.log('error', res);
          reject(res);
        }
      })
      .catch(error => {
        console.log('error', error);
        // Need to remove on production mode
        ToastAndroid.show('verifySmsCode catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function updateUserDetails(formdata) {
  formdata.append('stage', 4);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('updateUserDetails catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function getUserDetails(formdata) {
  formdata.append('stage', 3);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('getUserDetails catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function newsFeed(formdata) {
  formdata.append('stage', 5);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('getUserDetails catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function getLifestyleHistory(formdata) {
  formdata.append('stage', 6);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show(
          'getLifestyleHistory catch error',
          ToastAndroid.SHORT,
        );
        reject(error);
      });
  });
}

export function updateLifestyleHistory(formdata) {
  formdata.append('stage', 7);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show(
          'updateLifestyleHistory catch error',
          ToastAndroid.SHORT,
        );
        reject(error);
      });
  });
}

export function getWakeUpFriends(formdata) {
  formdata.append('stage', 8);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('getWakeUpFriends catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function getFoodIngredients(formdata) {
  formdata.append('stage', 9);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('getFoodIngredients catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function getMenuList(formdata) {
  formdata.append('stage', 10);
  formdata.append('version', 1);
  formdata.append('limit', 20);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('getMenuList catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function updateSetReminder(formdata) {
  formdata.append('stage', 11);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('updateSetReminder catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function makeWakeupCall(formdata) {
  formdata.append('stage', 12);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  console.log(formdata);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('makeWakeupCall catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}

export function searchList(formdata) {
  console.log(formdata);
  formdata.append('stage', 13);
  formdata.append('version', 1);
  formdata.append('platform', Platform.OS);
  return new Promise(function (resolve, reject) {
    fetch(getCorsAnywhere() + Config.BASE_URL, {
      method: 'POST',
      headers: {
        Origin: '',
      },
      body: formdata,
    })
      .then(response => {
        response.json().then(res => {
          console.log('Server Response' + res);
          if (response.status == '200') resolve(res);
          else reject(res);
        });
      })
      .catch(error => {
        /// need to remove on production mode
        ToastAndroid.show('makeWakeupCall catch error', ToastAndroid.SHORT);
        reject(error);
      });
  });
}
