import React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const stack= createNativeStackNavigator();
const App =()=>{
  return(
  <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text>hii</Text>
  </View>
  )
}

export default App;