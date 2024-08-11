import {Dimensions, Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F4F6FA',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  input: {
    padding: 10,
  },
  cardView: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,
    borderRadius: 0,
    elevation: 21,
  },
  viewSeparator: {
    paddingLeft: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#F2F2F2',
  },
  calendarBox: {
    width: 77.5,
    height: 60,
    alignItems: 'center',
    borderRadius: 10,
    color: '#2a292b',
    marginBottom: 10,
  },
  calendarBoxMonth: {
    backgroundColor: '#7265E3',
    width: '100%',
    textAlign: 'center',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    color: '#fff',
  },
  calendarBoxDate: {
    justifyContent: 'center',
    marginTop: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  baseText: {
    fontSize: 18,
    color: '#6c6c6c',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardButton: {},
  cardDescription: {
    marginBottom: 10,

    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 18,
    lineHeight: 20,
  },
  columnContainer: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  textStyle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 24,
    lineHeight: 30,
    /* or 119% */
    textAlign: 'center',
    color: '#2D3142',
  },
  errorTextStyle: {
    fontStyle: 'normal',
    fontSize: 12,
    lineHeight: 30,
    /* or 119% */
    textAlign: 'center',
    color: 'red',
  },
  textStyleSmall: {
    color: '#9C9EB9',

    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
  },
  textStyleSmallFront: {
    color: '#9C9EB9',

    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  containerSMSCode: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionSMSCode: {
    alignItems: 'center',
    margin: 16,
  },
  titleSMSCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  getStartedBtn: {
    // background: linearGradient(166.42deg, #63D7E6 16.28%, #77E365 100%),
    borderRadius: 23.5,
  },

  inputBackgroundWhite: {
    alignContent: 'center',
    width: 320,
    height: 58,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
  },
  yearlySubscription: {
    width: 331,
    height: 77,
    backgroundColor: '#F4F6FA',
    borderRadius: 10,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  inputTextStyle: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 16,
    lineHeight: 14,
    textAlign: 'center',
    /* identical to box height, or 87% */

    letterSpacing: 0.228571,
    alignSelf: 'center',
    height: 40,
    color: '#2D3142',
    width: 'auto',
    marginLeft: 20,
    marginTop: 3,
  },
  textStyleSmallBold: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    letterSpacing: 0,
    color: '#2D3142',
  },
  textStyleSmallBoldFront: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 24,
    lineHeight: 33,
    textAlign: 'center',
    color: '#2D3142',
  },
});

export default {styles};
