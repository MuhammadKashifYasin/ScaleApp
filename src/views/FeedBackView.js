import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import React from 'react';
import backgroundColor from '../config/Colors';
import RoundButton from './components/RoundButton';
import Styles from './styles/AppStyle';
import PhoneInput from 'react-native-phone-input';
import HeaderWithSteps from './components/HeaderWithSteps';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SearchBar} from 'react-native-elements';
import {LineChart} from 'react-native-line-chart';
import {Switch} from 'react-native-switch';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Image,
  Symbol,
  Defs,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';
import {i18n} from '../common/i18n';
import memoize from 'lodash.memoize';

const translate = memoize((key, config) => i18n.t(key, config));

const {styles} = Styles;
const data = {
  labels: [],
  datasets: [
    {
      data: [20, 45, 28, 80, 99, 43],
    },
  ],
};
const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(156, 158, 185, ${opacity})`,
};

const secondBW = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="47"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.56494 1.09717H47.3984V46.9305H1.56494V1.09717Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.56494 24.0139C1.56494 11.3565 11.8251 1.09717 24.4817 1.09717C37.1382 1.09717 47.3984 11.3565 47.3984 24.0139C47.3984 36.6704 37.1382 46.9306 24.4817 46.9306C11.8251 46.9306 1.56494 36.6704 1.56494 24.0139Z"
        fill="#D5D2D0"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M36.4716 4.4541C38.7531 8.01726 40.0772 12.2535 40.0772 16.7979C40.0772 29.4545 29.817 39.7147 17.1605 39.7147C12.7644 39.7147 8.658 38.4763 5.16992 36.3308C9.24273 42.6896 16.3699 46.9037 24.482 46.9037C37.1385 46.9037 47.3987 36.6435 47.3987 23.987C47.3987 15.7256 43.0265 8.48628 36.4716 4.4541Z"
      fill="#CACACA"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.7274 18.4537C17.7274 19.3865 16.9713 20.1426 16.0385 20.1426C15.1067 20.1426 14.3506 19.3865 14.3506 18.4537C14.3506 17.521 15.1067 16.7649 16.0385 16.7649C16.9713 16.7649 17.7274 17.521 17.7274 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.6133 18.4537C34.6133 19.3865 33.8572 20.1426 32.9244 20.1426C31.9917 20.1426 31.2356 19.3865 31.2356 18.4537C31.2356 17.521 31.9917 16.7649 32.9244 16.7649C33.8572 16.7649 34.6133 17.521 34.6133 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.3196 27.4889C28.0158 26.3592 26.2484 25.7223 24.481 25.7559C22.7427 25.7621 20.9911 26.3972 19.6741 27.4986C19.0099 28.0613 18.4543 28.7476 18.0666 29.4878C17.6576 30.2933 17.4456 31.1033 17.4368 31.8974C17.435 32.0873 17.5551 32.2568 17.7345 32.3196C17.9138 32.3823 18.1125 32.3231 18.2291 32.1729C18.7034 31.5582 19.1539 31.0706 19.6035 30.6837C20.0875 30.273 20.6016 29.9303 21.1316 29.6635C22.1871 29.1362 23.353 28.8545 24.503 28.8492C25.6849 28.8403 26.8031 29.1062 27.8348 29.6423C28.8965 30.1864 29.8716 31.037 30.7319 32.1694C30.8167 32.2816 30.9483 32.3443 31.0844 32.3443C31.1321 32.3443 31.1806 32.3363 31.2283 32.3204C31.4085 32.2577 31.5286 32.0864 31.526 31.8956C31.5013 30.2968 30.6763 28.6486 29.3196 27.4889Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.9446 22.7766C28.1557 30.5406 28.9091 34.9933 28.9091 34.9933C28.9091 38.3259 31.612 41.0278 34.9446 41.0278C38.2772 41.0278 40.9801 38.3259 40.9801 34.9933C40.9801 34.9933 41.7335 30.5406 34.9446 22.7766Z"
      fill="#888888"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M30.4578 39.0284C31.5627 40.2561 33.1633 41.0281 34.9448 41.0281C38.2774 41.0281 40.9794 38.3262 40.9794 34.9927C40.9794 34.9927 41.2939 33.1201 39.6677 29.6895C38.4674 37.5127 33.5528 38.9374 30.4578 39.0284Z"
      fill="#6B6B6B"
    />
  </Svg>
);
const secondColor = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="47"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.56494 1.09723H47.3984V46.9306H1.56494V1.09723Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.56494 24.0139C1.56494 11.3565 11.8251 1.09723 24.4817 1.09723C37.1382 1.09723 47.3984 11.3565 47.3984 24.0139C47.3984 36.6705 37.1382 46.9307 24.4817 46.9307C11.8251 46.9307 1.56494 36.6705 1.56494 24.0139Z"
        fill="#FFD07D"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M36.4719 4.45404C38.7534 8.01719 40.0774 12.2534 40.0774 16.7979C40.0774 29.4544 29.8172 39.7146 17.1607 39.7146C12.7646 39.7146 8.65824 38.4762 5.17017 36.3308C9.24297 42.6895 16.3702 46.9036 24.4822 46.9036C37.1387 46.9036 47.3989 36.6434 47.3989 23.9869C47.3989 15.7256 43.0267 8.48622 36.4719 4.45404Z"
      fill="#FFC262"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.7274 18.4537C17.7274 19.3865 16.9713 20.1426 16.0385 20.1426C15.1067 20.1426 14.3506 19.3865 14.3506 18.4537C14.3506 17.521 15.1067 16.7649 16.0385 16.7649C16.9713 16.7649 17.7274 17.521 17.7274 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.6133 18.4537C34.6133 19.3865 33.8572 20.1426 32.9244 20.1426C31.9917 20.1426 31.2356 19.3865 31.2356 18.4537C31.2356 17.521 31.9917 16.7649 32.9244 16.7649C33.8572 16.7649 34.6133 17.521 34.6133 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.3196 27.4888C28.0158 26.3591 26.2484 25.7223 24.481 25.7558C22.7427 25.762 20.9911 26.3971 19.6741 27.4986C19.0099 28.0612 18.4543 28.7475 18.0666 29.4877C17.6576 30.2933 17.4456 31.1032 17.4368 31.8973C17.435 32.0872 17.5551 32.2568 17.7345 32.3195C17.9138 32.3822 18.1125 32.323 18.2291 32.1729C18.7034 31.5581 19.1539 31.0705 19.6035 30.6837C20.0875 30.2729 20.6016 29.9302 21.1316 29.6635C22.1871 29.1362 23.353 28.8544 24.503 28.8491C25.6849 28.8403 26.8031 29.1061 27.8348 29.6423C28.8965 30.1864 29.8716 31.037 30.7319 32.1693C30.8167 32.2815 30.9483 32.3442 31.0844 32.3442C31.1321 32.3442 31.1806 32.3363 31.2283 32.3204C31.4085 32.2577 31.5286 32.0863 31.526 31.8955C31.5013 30.2968 30.6763 28.6486 29.3196 27.4888Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.9446 22.7766C28.1557 30.5406 28.9091 34.9932 28.9091 34.9932C28.9091 38.3258 31.612 41.0278 34.9446 41.0278C38.2772 41.0278 40.9801 38.3258 40.9801 34.9932C40.9801 34.9932 41.7335 30.5406 34.9446 22.7766Z"
      fill="#47C5EA"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M30.4578 39.0284C31.5627 40.2561 33.1633 41.0281 34.9448 41.0281C38.2774 41.0281 40.9794 38.3262 40.9794 34.9927C40.9794 34.9927 41.2939 33.1201 39.6677 29.6895C38.4674 37.5127 33.5528 38.9374 30.4578 39.0284Z"
      fill="#00BCEA"
    />
  </Svg>
);

const firstColor = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="46"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1 1.09717H46.8341V46.9303H1V1.09717Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.999756 24.0136C0.999756 11.3571 11.2599 1.09692 23.9165 1.09692C36.573 1.09692 46.8341 11.3571 46.8341 24.0136C46.8341 36.6711 36.573 46.9304 23.9165 46.9304C11.2599 46.9304 0.999756 36.6711 0.999756 24.0136Z"
        fill="#FFD07D"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M35.9067 4.4541C38.1891 8.01726 39.5122 12.2535 39.5122 16.7979C39.5122 29.4545 29.252 39.7147 16.5955 39.7147C12.1994 39.7147 8.09394 38.4763 4.60498 36.3308C8.67867 42.6896 15.8059 46.9037 23.917 46.9037C36.5736 46.9037 46.8338 36.6435 46.8338 23.987C46.8338 15.7256 42.4624 8.48628 35.9067 4.4541Z"
      fill="#FFC262"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.1624 19.7489C17.1624 20.6816 16.4072 21.4377 15.4736 21.4377C14.5417 21.4377 13.7856 20.6816 13.7856 19.7489C13.7856 18.8161 14.5417 18.0601 15.4736 18.0601C16.4072 18.0601 17.1624 18.8161 17.1624 19.7489Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.0482 19.7489C34.0482 20.6816 33.2921 21.4377 32.3593 21.4377C31.4275 21.4377 30.6714 20.6816 30.6714 19.7489C30.6714 18.8161 31.4275 18.0601 32.3593 18.0601C33.2921 18.0601 34.0482 18.8161 34.0482 19.7489Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M20.2335 15.788L18.6966 17.3249L13.5701 12.1974C14.418 11.3486 15.7942 11.3486 16.643 12.1974L20.2335 15.788Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M29.1368 17.3246L27.5999 15.7877L31.1913 12.1972C32.0392 11.3483 33.4154 11.3483 34.2642 12.1972L29.1368 17.3246Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M32.3598 34.5008C31.8705 29.4396 28.2658 25.5125 23.8971 25.5222C19.5301 25.5311 15.9414 29.474 15.4741 34.5379L32.3598 34.5008Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15.4739 34.5375C15.4739 34.5375 22.5825 27.405 32.3596 34.5004L15.4739 34.5375Z"
      fill="#F77777"
    />
  </Svg>
);

const firstBW = (
  <Svg
    width="46"
    height="46"
    viewBox="0 0 46 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="46"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0 0.097168H45.8341V45.9303H0V0.097168Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M-0.000244141 23.0135C-0.000244141 10.357 10.2599 0.0968018 22.9165 0.0968018C35.573 0.0968018 45.8341 10.357 45.8341 23.0135C45.8341 35.6709 35.573 45.9302 22.9165 45.9302C10.2599 45.9302 -0.000244141 35.6709 -0.000244141 23.0135Z"
        fill="#D5D2D0"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M38.5122 15.7979C38.5122 28.4545 28.252 38.7147 15.5955 38.7147C11.1994 38.7147 7.09394 37.4763 3.60498 35.3308C7.67867 41.6896 14.8059 45.9037 22.917 45.9037C35.5736 45.9037 45.8338 35.6435 45.8338 22.987C45.8338 14.7256 41.4624 7.48628 34.9067 3.4541C37.1891 7.01726 38.5122 11.2535 38.5122 15.7979Z"
      fill="#CACACA"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M16.1624 18.749C16.1624 19.6817 15.4072 20.4378 14.4736 20.4378C13.5417 20.4378 12.7856 19.6817 12.7856 18.749C12.7856 17.8162 13.5417 17.0601 14.4736 17.0601C15.4072 17.0601 16.1624 17.8162 16.1624 18.749Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M33.0482 18.749C33.0482 19.6817 32.2921 20.4378 31.3593 20.4378C30.4275 20.4378 29.6714 19.6817 29.6714 18.749C29.6714 17.8162 30.4275 17.0601 31.3593 17.0601C32.2921 17.0601 33.0482 17.8162 33.0482 18.749Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M19.2335 14.788L17.6966 16.3249L12.5701 11.1974C13.418 10.3486 14.7942 10.3486 15.643 11.1974L19.2335 14.788Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M28.1368 16.3246L26.5999 14.7877L30.1913 11.1972C31.0392 10.3483 32.4154 10.3483 33.2642 11.1972L28.1368 16.3246Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M31.3598 33.5007C30.8705 28.4395 27.2658 24.5125 22.8971 24.5222C18.5301 24.531 14.9414 28.474 14.4741 33.5378L31.3598 33.5007Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.4739 33.5374C14.4739 33.5374 21.5825 26.4049 31.3596 33.5003L14.4739 33.5374Z"
      fill="#6B6B6B"
    />
  </Svg>
);

const thirdColor = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="47"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.82959 1.09717H47.663V46.9305H1.82959V1.09717Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.7463 1.09717C37.4028 1.09717 47.663 11.3565 47.663 24.0139C47.663 36.6704 37.4028 46.9306 24.7463 46.9306C12.0898 46.9306 1.82959 36.6704 1.82959 24.0139C1.82959 11.3565 12.0898 1.09717 24.7463 1.09717Z"
        fill="#FFD07D"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.736 4.4541C39.0184 8.01726 40.3416 12.2535 40.3416 16.7979C40.3416 29.4545 30.0814 39.7147 17.4249 39.7147C13.0288 39.7147 8.92329 38.4763 5.43433 36.3308C9.50802 42.6896 16.6352 46.9037 24.7464 46.9037C37.4029 46.9037 47.6631 36.6435 47.6631 23.987C47.6631 15.7256 43.2917 8.48628 36.736 4.4541Z"
        fill="#FFC262"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M33.6498 34.4925H15.8428C15.032 34.4925 14.3687 33.8291 14.3687 33.0183C14.3687 32.2066 15.032 31.5432 15.8428 31.5432H33.6498C34.4606 31.5432 35.124 32.2066 35.124 33.0183C35.124 33.8291 34.4606 34.4925 33.6498 34.4925Z"
        fill="#2F302F"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.3282 19.9125C18.3282 20.8452 17.573 21.6013 16.6394 21.6013C15.7075 21.6013 14.9514 20.8452 14.9514 19.9125C14.9514 18.9797 15.7075 18.2236 16.6394 18.2236C17.573 18.2236 18.3282 18.9797 18.3282 19.9125Z"
        fill="#2F302F"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.2139 19.9125C35.2139 20.8452 34.4579 21.6013 33.5251 21.6013C32.5932 21.6013 31.8372 20.8452 31.8372 19.9125C31.8372 18.9797 32.5932 18.2236 33.5251 18.2236C34.4579 18.2236 35.2139 18.9797 35.2139 19.9125Z"
        fill="#2F302F"
      />
    </G>
  </Svg>
);

const thirdBW = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="47"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.82959 1.09723H47.663V46.9306H1.82959V1.09723Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.82959 24.0139C1.82959 11.3565 12.0898 1.09723 24.7463 1.09723C37.4028 1.09723 47.663 11.3565 47.663 24.0139C47.663 36.6705 37.4028 46.9307 24.7463 46.9307C12.0898 46.9307 1.82959 36.6705 1.82959 24.0139Z"
        fill="#D5D2D0"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M36.736 4.45404C39.0184 8.01719 40.3416 12.2534 40.3416 16.7979C40.3416 29.4544 30.0814 39.7146 17.4249 39.7146C13.0288 39.7146 8.92329 38.4762 5.43433 36.3308C9.50802 42.6895 16.6352 46.9036 24.7464 46.9036C37.4029 46.9036 47.6631 36.6434 47.6631 23.9869C47.6631 15.7256 43.2917 8.48622 36.736 4.45404Z"
        fill="#CACACA"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M33.6498 34.4925H15.8428C15.032 34.4925 14.3687 33.8292 14.3687 33.0184C14.3687 32.2066 15.032 31.5433 15.8428 31.5433H33.6498C34.4606 31.5433 35.124 32.2066 35.124 33.0184C35.124 33.8292 34.4606 34.4925 33.6498 34.4925Z"
        fill="#2F302F"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M18.3282 19.9123C18.3282 20.8451 17.573 21.6012 16.6394 21.6012C15.7075 21.6012 14.9514 20.8451 14.9514 19.9123C14.9514 18.9796 15.7075 18.2235 16.6394 18.2235C17.573 18.2235 18.3282 18.9796 18.3282 19.9123Z"
        fill="#2F302F"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.2139 19.9123C35.2139 20.8451 34.4579 21.6012 33.5251 21.6012C32.5932 21.6012 31.8372 20.8451 31.8372 19.9123C31.8372 18.9796 32.5932 18.2235 33.5251 18.2235C34.4579 18.2235 35.2139 18.9796 35.2139 19.9123Z"
        fill="#2F302F"
      />
    </G>
  </Svg>
);
const fourthColor = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="46"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.00024 1.09717H46.8337V46.9305H1.00024V1.09717Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.00024 24.0139C1.00024 11.3565 11.2604 1.09717 23.917 1.09717C36.5735 1.09717 46.8337 11.3565 46.8337 24.0139C46.8337 36.6704 36.5735 46.9306 23.917 46.9306C11.2604 46.9306 1.00024 36.6704 1.00024 24.0139Z"
        fill="#FFD07D"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M35.9072 4.4541C38.1887 8.01726 39.5127 12.2535 39.5127 16.7979C39.5127 29.4545 29.2525 39.7147 16.596 39.7147C12.1999 39.7147 8.09354 38.4763 4.60547 36.3308C8.67828 42.6896 15.8055 46.9037 23.9175 46.9037C36.574 46.9037 46.8342 36.6435 46.8342 23.987C46.8342 15.7256 42.462 8.48628 35.9072 4.4541Z"
      fill="#FFC262"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.5238 27.481C13.9338 26.9077 12.9878 27.5419 13.2934 28.306C14.9867 32.5369 19.1231 35.525 23.9591 35.525C28.7138 35.525 32.7919 32.6349 34.5372 28.5162C34.8552 27.7654 33.9013 27.1144 33.3156 27.6833C29.9618 30.9346 22.8417 35.5612 14.5238 27.481Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.1629 19.9125C17.1629 20.8452 16.4068 21.6013 15.4741 21.6013C14.5413 21.6013 13.7861 20.8452 13.7861 19.9125C13.7861 18.9797 14.5413 18.2236 15.4741 18.2236C16.4068 18.2236 17.1629 18.9797 17.1629 19.9125Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.0486 19.9125C34.0486 20.8452 33.2925 21.6013 32.3597 21.6013C31.427 21.6013 30.6709 20.8452 30.6709 19.9125C30.6709 18.9797 31.427 18.2236 32.3597 18.2236C33.2925 18.2236 34.0486 18.9797 34.0486 19.9125Z"
      fill="#2F302F"
    />
  </Svg>
);
const fourthBW = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="46"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.00024 1.09723H46.8337V46.9306H1.00024V1.09723Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.00024 24.0139C1.00024 11.3565 11.2604 1.09723 23.917 1.09723C36.5735 1.09723 46.8337 11.3565 46.8337 24.0139C46.8337 36.6705 36.5735 46.9307 23.917 46.9307C11.2604 46.9307 1.00024 36.6705 1.00024 24.0139Z"
        fill="#D5D2D0"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M35.9072 4.45404C38.1887 8.01719 39.5127 12.2534 39.5127 16.7979C39.5127 29.4544 29.2525 39.7146 16.596 39.7146C12.1999 39.7146 8.09354 38.4762 4.60547 36.3308C8.67828 42.6895 15.8055 46.9036 23.9175 46.9036C36.574 46.9036 46.8342 36.6434 46.8342 23.9869C46.8342 15.7256 42.462 8.48622 35.9072 4.45404Z"
      fill="#CACACA"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M14.5236 27.4811C13.9336 26.9079 12.9876 27.5421 13.2932 28.3061C14.9864 32.537 19.1228 35.5252 23.9588 35.5252C28.7135 35.5252 32.7916 32.6351 34.537 28.5163C34.855 27.7655 33.901 27.1146 33.3154 27.6834C29.9616 30.9347 22.8415 35.5614 14.5236 27.4811Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.1627 19.9123C17.1627 20.8451 16.4066 21.6012 15.4738 21.6012C14.5411 21.6012 13.7859 20.8451 13.7859 19.9123C13.7859 18.9796 14.5411 18.2235 15.4738 18.2235C16.4066 18.2235 17.1627 18.9796 17.1627 19.9123Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.0486 19.9123C34.0486 20.8451 33.2925 21.6012 32.3597 21.6012C31.427 21.6012 30.6709 20.8451 30.6709 19.9123C30.6709 18.9796 31.427 18.2235 32.3597 18.2235C33.2925 18.2235 34.0486 18.9796 34.0486 19.9123Z"
      fill="#2F302F"
    />
  </Svg>
);

const fifthColor = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="47"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.60156 1.09717H47.435V46.9305H1.60156V1.09717Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.60156 24.0139C1.60156 11.3565 11.8618 1.09717 24.5183 1.09717C37.1748 1.09717 47.435 11.3565 47.435 24.0139C47.435 36.6704 37.1748 46.9306 24.5183 46.9306C11.8618 46.9306 1.60156 36.6704 1.60156 24.0139Z"
        fill="#FFD07D"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M36.5082 4.4541C38.7898 8.01726 40.1129 12.2535 40.1129 16.7979C40.1129 29.4545 29.8536 39.7147 17.1971 39.7147C12.801 39.7147 8.69462 38.4763 5.20654 36.3308C9.27935 42.6896 16.4065 46.9037 24.5186 46.9037C37.1751 46.9037 47.4344 36.6435 47.4344 23.987C47.4344 15.7256 43.0631 8.48628 36.5082 4.4541Z"
      fill="#FFC262"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.7635 18.4537C17.7635 19.3865 17.0083 20.1426 16.0756 20.1426C15.1419 20.1426 14.3867 19.3865 14.3867 18.4537C14.3867 17.521 15.1419 16.7649 16.0756 16.7649C17.0083 16.7649 17.7635 17.521 17.7635 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.6495 18.4537C34.6495 19.3865 33.8943 20.1426 32.9607 20.1426C32.0279 20.1426 31.2727 19.3865 31.2727 18.4537C31.2727 17.521 32.0279 16.7649 32.9607 16.7649C33.8943 16.7649 34.6495 17.521 34.6495 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.1189 26.1812C9.99158 33.9143 16.5517 39.9259 24.5189 39.9259C32.4843 39.9259 39.0444 33.9143 39.9171 26.1812H9.1189Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.8811 35.6928C16.6573 38.3152 20.3979 39.9254 24.5185 39.9254C28.4605 39.9254 32.0573 38.4521 34.7919 36.0275L34.6497 35.6945C24.3082 30.6519 14.0215 35.6239 13.8811 35.6928Z"
      fill="#F77777"
    />
  </Svg>
);

const fifthBW = (
  <Svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="47"
      height="46">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.60156 1.09723H47.435V46.9306H1.60156V1.09723Z"
        fill="white"
      />
    </Mask>
    <G mask="url(#mask0)">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.60156 24.0139C1.60156 11.3565 11.8618 1.09723 24.5183 1.09723C37.1748 1.09723 47.435 11.3565 47.435 24.0139C47.435 36.6705 37.1748 46.9307 24.5183 46.9307C11.8618 46.9307 1.60156 36.6705 1.60156 24.0139Z"
        fill="#D5D2D0"
      />
    </G>
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M36.5085 4.45404C38.79 8.01719 40.1132 12.2534 40.1132 16.7979C40.1132 29.4544 29.8539 39.7146 17.1973 39.7146C12.8012 39.7146 8.69486 38.4762 5.20679 36.3308C9.27959 42.6895 16.4068 46.9036 24.5188 46.9036C37.1754 46.9036 47.4347 36.6434 47.4347 23.9869C47.4347 15.7256 43.0633 8.48622 36.5085 4.45404Z"
      fill="#CACACA"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.7637 18.4537C17.7637 19.3865 17.0085 20.1426 16.0758 20.1426C15.1422 20.1426 14.387 19.3865 14.387 18.4537C14.387 17.521 15.1422 16.7649 16.0758 16.7649C17.0085 16.7649 17.7637 17.521 17.7637 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M34.6495 18.4537C34.6495 19.3865 33.8943 20.1426 32.9607 20.1426C32.0279 20.1426 31.2727 19.3865 31.2727 18.4537C31.2727 17.521 32.0279 16.7649 32.9607 16.7649C33.8943 16.7649 34.6495 17.521 34.6495 18.4537Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M9.1189 26.1812C9.99158 33.9143 16.5517 39.9259 24.5189 39.9259C32.4843 39.9259 39.0444 33.9143 39.9171 26.1812H9.1189Z"
      fill="#2F302F"
    />
    <Path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M13.8811 35.6928C16.6573 38.3152 20.3979 39.9254 24.5185 39.9254C28.4605 39.9254 32.0573 38.4521 34.7919 36.0275L34.6497 35.6945C24.3082 30.6519 14.0215 35.6239 13.8811 35.6928Z"
      fill="#6B6B6B"
    />
  </Svg>
);

export default class FeedBackView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smiley: '',
      smileyRatingText: '',
      feedbackReason1: false,
      feedbackReason2: false,
      feedbackReason3: false,
      feedbackReason4: false,
      feedbackReason5: false,
      feedbackReason6: false,
    };
  }

  feedbackReason(number) {
    let update = {};
    update['feedbackReason' + number] = !this.state['feedbackReason' + number];
    this.setState(update);
  }

  render() {
    return (
      <SafeAreaView
        style={
          ([styles.mainContainer], {height: '100%', backgroundColor: '#fff'})
        }>
        <View style={{flex: 1}}>
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <View style={{height: 20, marginTop: 20, marginLeft: 15}}>
              <View
                style={{
                  marginLeft: 10,
                  flex: 1,
                  flexWrap: 'wrap',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <TouchableOpacity
                  style={{top: 5}}
                  onPress={() => this.props.navigation.navigate('SettingView')}>
                  <Icon
                    name="arrow-left"
                    size={18}
                    backgroundColor="#F2F2F2"
                    color="#2a292b"></Icon>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{flexDirection: 'column', alignItems: 'center', top: 20}}>
              <Text
                style={{
                  fontSize: 24,
                  color: '#2D3142',
                  fontWeight: 'bold',
                  width: '70%',
                  textAlign: 'center',
                }}>
                {translate('FeedBackView.Text1')}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: '#9C9EB9',
                  fontWeight: 'normal',
                  width: '65%',
                  textAlign: 'center',
                }}>
                {translate('FeedBackView.Text2')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({smiley: 'first'});
                    this.setState({
                      smileyRatingText: translate('FeedBackView.Text14'),
                    });
                  }}>
                  {this.state.smiley === 'first' ? firstColor : firstBW}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({smiley: 'second'});
                    this.setState({
                      smileyRatingText: translate('FeedBackView.Text15'),
                    });
                  }}>
                  {this.state.smiley === 'second' ? secondColor : secondBW}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({smiley: 'third'});
                    this.setState({
                      smileyRatingText: translate('FeedBackView.Text3'),
                    });
                  }}>
                  {this.state.smiley === 'third' ? thirdColor : thirdBW}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({smiley: 'fourth'});
                    this.setState({
                      smileyRatingText: translate('FeedBackView.Text4'),
                    });
                  }}>
                  {this.state.smiley === 'fourth' ? fourthColor : fourthBW}
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({smiley: 'fifth'});
                    this.setState({
                      smileyRatingText: translate('FeedBackView.Text16'),
                    });
                  }}>
                  {this.state.smiley === 'fifth' ? fifthColor : fifthBW}
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.textStyle,
                  {
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    marginBottom: 20,
                    marginTop: 20,
                  },
                ]}>
                {this.state.smileyRatingText}
              </Text>
            </View>
            <View
              style={{
                paddingLeft: 10,
                borderWidth: 1,
                top: 20,
                width: '90%',
                alignSelf: 'center',
                borderColor: '#F2F2F2',
              }}
            />
            <View>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  top: 40,
                  left: 20,
                  marginBottom: 30,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#2D3142',
                    fontWeight: 'bold',
                    width: '50%',
                    textAlign: 'left',
                    marginTop: 10,
                  }}>
                  {translate('FeedBackView.Text5')}
                </Text>
                <View style={{marginTop: 10}}>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <TouchableOpacity onPress={() => this.feedbackReason(1)}>
                      <View
                        style={{
                          backgroundColor: this.state.feedbackReason1
                            ? '#DDF5E4'
                            : '#F4F6FA',
                          width: 117,
                          height: 35,
                          borderRadius: 17.5,
                          margin: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: this.state.feedbackReason1
                              ? '#219653'
                              : '#2D3142',
                          }}>
                          {translate('FeedBackView.Text6')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.feedbackReason(2)}>
                      <View
                        style={{
                          backgroundColor: this.state.feedbackReason2
                            ? '#DDF5E4'
                            : '#F4F6FA',
                          width: 151,
                          height: 35,
                          borderRadius: 17.5,
                          margin: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: this.state.feedbackReason2
                              ? '#219653'
                              : '#2D3142',
                          }}>
                          {translate('FeedBackView.Text7')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <TouchableOpacity onPress={() => this.feedbackReason(3)}>
                      <View
                        style={{
                          backgroundColor: this.state.feedbackReason3
                            ? '#DDF5E4'
                            : '#F4F6FA',
                          width: 100,
                          height: 35,
                          borderRadius: 17.5,
                          margin: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: this.state.feedbackReason3
                              ? '#219653'
                              : '#2D3142',
                          }}>
                          {translate('FeedBackView.Text8')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.feedbackReason(4)}>
                      <View
                        style={{
                          backgroundColor: this.state.feedbackReason4
                            ? '#DDF5E4'
                            : '#F4F6FA',
                          width: 107,
                          height: 35,
                          borderRadius: 17.5,
                          margin: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: this.state.feedbackReason4
                              ? '#219653'
                              : '#2D3142',
                          }}>
                          {translate('FeedBackView.Text9')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', width: '100%'}}>
                    <TouchableOpacity onPress={() => this.feedbackReason(5)}>
                      <View
                        style={{
                          backgroundColor: this.state.feedbackReason5
                            ? '#DDF5E4'
                            : '#F4F6FA',
                          width: 137,
                          height: 35,
                          borderRadius: 17.5,
                          margin: 10,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            textAlign: 'center',
                            color: this.state.feedbackReason5
                              ? '#219653'
                              : '#2D3142',
                          }}>
                          {translate('FeedBackView.Text17')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.feedbackReason(6)}>
                      <View
                        style={{
                          backgroundColor: this.state.feedbackReason6
                            ? '#DDF5E4'
                            : '#F4F6FA',
                          width: 128,
                          height: 35,
                          borderRadius: 17.5,
                          margin: 10,
                          justifyContent: 'center',
                          color: this.state.feedbackReason6
                            ? '#219653'
                            : '#2D3142',
                        }}>
                        <Text style={{textAlign: 'center'}}>
                          {translate('FeedBackView.Text10')}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <KeyboardAvoidingView
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                style={{}}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      top: 20,
                      left: 20,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#2D3142',
                        fontWeight: 'bold',
                        width: '50%',
                        textAlign: 'left',
                        marginTop: 10,
                      }}>
                      {translate('FeedBackView.Text11')}
                    </Text>
                    <View
                      style={{
                        backgroundColor: '#F4F6FA',
                        width: 331,
                        height: 105,
                        borderRadius: 10,
                        marginTop: 10,
                      }}>
                      <TextInput
                        style={{left: 10}}
                        placeholder={translate(
                          'FeedBackView.Text12',
                        )}></TextInput>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </KeyboardAvoidingView>
              <View style={{height: 300}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('HomeView')}
                  style={{top: 30, alignSelf: 'center'}}>
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
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 12},
                      shadowOpacity: 0.58,
                      shadowRadius: 16.0,
                      elevation: 5,
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                        marginTop: 10,
                      }}>
                      {translate('FeedBackView.Text13')}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
