import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import StepsComponentView from '../views/components/StepsComponentView';
import NutritionComponentView from '../views/components/NutritionComponentView';
import WaterComponentView from '../views/components/WaterComponentView';
import ActivityComponentView from '../views/components/ActivityComponentView';
import WeightComponentView from '../views/components/WeightComponentView';
import HomeView from '../views/HomeView';
import TipsPopUpView from '../views/TipsPopUpView';
import FeedBackView from '../views/FeedBackView';
import FriendsView from '../views/FriendsView';
import UserProfileView from '../views/UserProfileView';
import ActivityShareView from '../views/ActivityShareView';
import WeightShareView from '../views/WeightShareView';
import NutritionShareView from '../views/NutritionShareView';
import WaterShareView from '../views/WaterShareView';
import StepsShareView from '../views/StepsShareView';
import ApprovedAccountView from '../views/ApprovedAccountView';
import PhotoView from '../views/PhotoView';
import PhoneNumberView from '../views/PhoneNumberView';
import SMSCodeView from '../views/SMSCodeView';
import EmailView from '../views/EmailView';
import PasswordView from '../views/PasswordView';
import PaymentView from '../views/PaymentView';
import SyncWeightView from '../views/SyncWeightView';
import SeeWeightView from '../views/SeeWeightView';
import HeightView from '../views/HeightView';
import GenderView from '../views/GenderView';
import AgeView from '../views/AgeView';
import FitnessView from '../views/FitnessView';
import GoalView from '../views/GoalView';
import SleepReminderView from '../views/SleepReminderView';
import SuccessView from '../views/SuccessView';
import TutorialView from '../views/TutorialView';
import NotificationView from '../views/NotificationView';
import SleepReminderScreen from '../views/SleepReminderScreen';
import WaterFrontView from '../views/WaterFrontView';
import NutritionFrontView from '../views/NutritionFrontView';
import NutritionMealsView from '../views/NutritionMealsView';
import NutritionReminderView from '../views/NutritionReminderView';
import NutritionMealDetailView from '../views/NutritionMealDetailView';
import WeightFrontView from '../views/WeightFrontView';
import WeightAddView from '../views/WeightAddView';
import WeightReminderView from '../views/WeightReminderView';
import ActivityFrontView from '../views/ActivityFrontView';
import ActivityAddView from '../views/ActivityAddView';
import StepsFrontView from '../views/StepsFrontView';
import SettingView from '../views/SettingView';
import InviteFriendView from '../views/InviteFriendView';
import PersonalInfoView from '../views/PersonalInfoView';
import ReceipesFoodMenuView from '../views/ReceipesFoodMenuView';
import ChooseMealView from '../views/ChooseMealView';
import StepsReminderView from '../views/StepsReminderView';
import WaterReminderView from '../views/WaterReminderView';
import ActivityReminderView from '../views/ActivityReminderView';
import ModalView from '../views/ModalView';
import SplashView from '../views/SplashView';
import WelcomeView from '../views/WelcomeView';

// const MainNavigator = createStackNavigator(
//   {
//     SplashView: {screen: SplashView},
//     WelcomeView: {screen: WelcomeView},
//     HomeView: {screen: HomeView},
//     TipsPopUpView: {screen: TipsPopUpView},
//     FeedBackView: {screen: FeedBackView},
//     FriendsView: {screen: FriendsView},
//     UserProfileView: {screen: UserProfileView},
//     ActivityShareView: {screen: ActivityShareView},
//     WeightShareView: {screen: WeightShareView},
//     NutritionShareView: {screen: NutritionShareView},
//     WaterShareView: {screen: WaterShareView},
//     StepsShareView: {screen: StepsShareView},
//     WeightComponentView: {screen: WeightComponentView},
//     ActivityComponentView: {screen: ActivityComponentView},
//     WaterComponentView: {screen: WaterComponentView},
//     NutritionComponentView: {screen: NutritionComponentView},
//     StepsComponentView: {screen: StepsComponentView},
//     ApprovedAccountView: {screen: ApprovedAccountView},
//     PhotoView: {screen: PhotoView},
//     PhoneNumberView: {screen: PhoneNumberView},
//     SMSCodeView: {screen: SMSCodeView},
//     EmailView: {screen: EmailView},
//     PasswordView: {screen: PasswordView},
//     PaymentView: {screen: PaymentView},
//     SyncWeightView: {screen: SyncWeightView},
//     SeeWeightView: {screen: SeeWeightView},
//     HeightView: {screen: HeightView},
//     GenderView: {screen: GenderView},
//     AgeView: {screen: AgeView},
//     FitnessView: {screen: FitnessView},
//     GoalView: {screen: GoalView},
//     SleepReminderView: {screen: SleepReminderView},
//     SuccessView: {screen: SuccessView},
//     TutorialView: {screen: TutorialView},
//     NotificationView: {screen: NotificationView},
//     SleepReminderScreen: {screen: SleepReminderScreen},
//     WaterFrontView: {screen: WaterFrontView},
//     NutritionFrontView: {screen: NutritionFrontView},
//     NutritionMealsView: {screen: NutritionMealsView},
//     NutritionReminderView: {screen: NutritionReminderView},
//     NutritionMealDetailView: {screen: NutritionMealDetailView},
//     WeightFrontView: {screen: WeightFrontView},
//     WeightAddView: {screen: WeightAddView},
//     WeightReminderView: {screen: WeightReminderView},
//     ActivityFrontView: {screen: ActivityFrontView},
//     ActivityAddView: {screen: ActivityAddView},
//     StepsFrontView: {screen: StepsFrontView},
//     SettingView: {screen: SettingView},
//     InviteFriendView: {screen: InviteFriendView},
//     PersonalInfoView: {screen: PersonalInfoView},
//     ReceipesFoodMenuView: {screen: ReceipesFoodMenuView},
//     ChooseMealView: {screen: ChooseMealView},
//     StepsReminderView: {screen: StepsReminderView},
//     WaterReminderView: {screen: WaterReminderView},
//     ActivityReminderView: {screen: ActivityReminderView},
//     ModalView: {screen: ModalView},
//   },
//   {
//     headerMode: 'none',
//     navigationOptions: {
//       headerVisible: false,
//       gesturesEnabled: false,
//     },
//   },
// );
// createAppContainer(MainNavigator);

const Stack = createStackNavigator();
const AppNavigator = () => {
  return (
    // <NavigationContainer>
    <Stack.Navigator
      initialRootName="HomeView"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="SplashView" component={SplashView} />
      <Stack.Screen name="WelcomeView" component={WelcomeView} />

      <Stack.Screen name="HomeView" component={HomeView} />

      <Stack.Screen name="TipsPopUpView" component={TipsPopUpView} />
      <Stack.Screen name="FeedBackView" component={FeedBackView} />
      <Stack.Screen name="FriendsView" component={FriendsView} />
      <Stack.Screen name="UserProfileView" component={UserProfileView} />
      <Stack.Screen name="ActivityShareView" component={ActivityShareView} />
      <Stack.Screen name="WeightShareView" component={WeightShareView} />
      <Stack.Screen name="NutritionShareView" component={NutritionShareView} />
      <Stack.Screen name="WaterShareView" component={WaterShareView} />
      <Stack.Screen name="StepsShareView" component={StepsShareView} />
      <Stack.Screen
        name="ApprovedAccountView"
        component={ApprovedAccountView}
      />
      <Stack.Screen name="PhotoView" component={PhotoView} />
      <Stack.Screen name="PhoneNumberView" component={PhoneNumberView} />
      <Stack.Screen name="SMSCodeView" component={SMSCodeView} />
      <Stack.Screen name="EmailView" component={EmailView} />
      <Stack.Screen name="PasswordView" component={PasswordView} />
      <Stack.Screen name="PaymentView" component={PaymentView} />
      <Stack.Screen name="SyncWeightView" component={SyncWeightView} />
      <Stack.Screen name="SeeWeightView" component={SeeWeightView} />
      <Stack.Screen name="HeightView" component={HeightView} />
      <Stack.Screen name="GenderView" component={GenderView} />
      <Stack.Screen name="AgeView" component={AgeView} />
      <Stack.Screen name="FitnessView" component={FitnessView} />
      <Stack.Screen name="GoalView" component={GoalView} />
      <Stack.Screen name="SleepReminderView" component={SleepReminderView} />
      <Stack.Screen name="SuccessView" component={SuccessView} />
      <Stack.Screen name="TutorialView" component={TutorialView} />
      <Stack.Screen name="NotificationView" component={NotificationView} />
      <Stack.Screen
        name="SleepReminderScreen"
        component={SleepReminderScreen}
      />
      <Stack.Screen name="WaterFrontView" component={WaterFrontView} />
      <Stack.Screen name="NutritionFrontView" component={NutritionFrontView} />
      <Stack.Screen name="NutritionMealsView" component={NutritionMealsView} />
      <Stack.Screen
        name="NutritionReminderView"
        component={NutritionReminderView}
      />
      <Stack.Screen
        name="NutritionMealDetailView"
        component={NutritionMealDetailView}
      />
      <Stack.Screen name="WeightFrontView" component={WeightFrontView} />
      <Stack.Screen name="WeightAddView" component={WeightAddView} />
      <Stack.Screen name="WeightReminderView" component={WeightReminderView} />
      <Stack.Screen name="ActivityFrontView" component={ActivityFrontView} />
      <Stack.Screen name="ActivityAddView" component={ActivityAddView} />
      <Stack.Screen name="StepsFrontView" component={StepsFrontView} />
      <Stack.Screen name="SettingView" component={SettingView} />
      <Stack.Screen name="InviteFriendView" component={InviteFriendView} />
      <Stack.Screen name="PersonalInfoView" component={PersonalInfoView} />
      <Stack.Screen
        name="ReceipesFoodMenuView"
        component={ReceipesFoodMenuView}
      />
      <Stack.Screen name="ChooseMealView" component={ChooseMealView} />
      <Stack.Screen name="StepsReminderView" component={StepsReminderView} />
      <Stack.Screen name="WaterReminderView" component={WaterReminderView} />
      <Stack.Screen
        name="ActivityReminderView"
        component={ActivityReminderView}
      />
      <Stack.Screen name="ModalView" component={ModalView} />
    </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default AppNavigator;
