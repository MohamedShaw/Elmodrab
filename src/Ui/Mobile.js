import {  Label, Input } from "native-base";
import React,{Component} from 'react';

import { View,StyleSheet,Text,Modal ,ScrollView,Image,Dimensions} from "react-native";

const Mobile=(props)=>{
    return(
        <View style={[{flexDirection:'row',flex:1 ,width:'90%',alignSelf:'center'},props.containerStyle]}>
                   <Label style={[{
                         backgroundColor: 'orange', color: 'white',
                         flex: 0.3,
                         height:Dimensions.get('screen').height*0.07,
                         flexWrap: 'wrap',
                         textAlign: 'center',
                         textAlignVertical: 'center',
                         borderRadius: 5,
                         marginHorizontal:10,  
                         
                        },props.style]}
                  >{props.label}</Label>
                  <View style={[{flex:0.7,flexDirection:'row',borderColor: props.error?'red':'transparent',borderWidth: 1,borderRadius:5,},props.subcontainerStyle]}>
                  <Input placeholder={props.placeholder} value={props.value} onChangeText={props.changeText}   style={{ borderRadius:5,borderTopLeftRadius: 0,borderBottomLeftRadius:0,
                     textAlign: 'center',fontSize:20,flex:0.7,backgroundColor:'white',}}/>
                   <Label style={[{borderRadius:5,backgroundColor:'gray',color:'white',flex:0.3, textAlign:'center',textAlignVertical:'center'},props.style]}
                  >{props.mobileExtension}</Label>
                  </View>
                   </View>
    )
}
export default Mobile;



