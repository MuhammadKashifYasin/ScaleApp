import { Config } from '../config/Config';
import { ToastAndroid, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";
import { updateLifestyleHistory } from '../service/Api';
import Fitness from '@ovalmoney/react-native-fitness';
import GoogleFit, { Scopes } from 'react-native-google-fit';

async updateStepsLifestyleHistory(steps){
    let formdata = new FormData();

    let authToken = await AsyncStorage.getItem('authToken');
    let phoneNumber = await AsyncStorage.getItem('phoneNumber');

    formdata.append("phone_number", phoneNumber);
    formdata.append("auth_token", authToken);
    formdata.append("Lifestyle_type", 5);
    formdata.append("steps_value", steps);
    formdata.append("datetime", Moment(new Date()).format('MM-DD-YYYY'));

    updateLifestyleHistory(formdata).then(res=>{
      console.log(res);
    }).catch(err=>{
      console.log("Error", err);
    });
  }

export function getStepsForAndroid(eventSteps) {
  var dateNow = new Date()
  console.log(new Date().toISOString());
  var startDate = Moment(dateNow).format('YYYY-MM-DD')+'T00:00:17.971Z'
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ_WRITE,
      Scopes.FITNESS_BODY_READ_WRITE,
    ],
  }
  GoogleFit.authorize(options)
  .then(authResult => {
    if (authResult.success) {
      console.log('success');
      const dates = {
        startDate: startDate, // required ISO8601Timestamp
        endDate: new Date().toISOString() // required ISO8601Timestamp
      };

      GoogleFit.getDailyStepCountSamples(dates)
      .then((res) => {
        console.log('Daily steps >>> ', res)
        res.map((step)=>{
          if(step.source == 'com.google.android.gms:estimated_steps'){
            const getPercentage = step.steps[0].value/10000 * 100;
            if(step.steps[0].value > eventSteps){
              this.updateStepsLifestyleHistory();
              eventSteps = JSON.stringify(step.steps[0].value);
            }
          }
        })
        setTimeout(()=>{
          if(this._isMounted == true){
            this.getStepsForAndroid(eventSteps);
            return eventSteps;
          }
        }, 3000)
      })
      .catch((err) => {
        console.log(err)
      })
    } else {
      console.log("AUTH_DENIED", authResult.message);
    }
  })
  .catch(() => {
    console.log("AUTH_ERROR");
  })
}



