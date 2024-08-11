import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import React from 'react';
  
  export default class RoundButton extends React.Component {

    constructor(props){
        super(props)

       

    }
    render(){
        const uri = this.props.img
        console.log(uri)
        return(
     <TouchableOpacity style={this.props.style} onPress = {this.props.onPress}>
              <Image source={uri} style = {{width: 331,height: 50}}></Image>
            </TouchableOpacity>
        );
    }
  }