import React,{Component} from 'react';
import {Button,Text} from 'native-base';
import {StyleSheet} from 'react-native'
import { Colors } from '../assets/colors';
import { AppText } from './appText';

export const CustomButton=(props)=>(
<Button onPress={props.onPress}  style={[{padding:5},styles.button,props.style]}>
<AppText text={props.text} style={[{},props.textStyle]} />
</Button>
)
const styles=StyleSheet.create({
    button:{
        width:'30%',
        height:50,
        backgroundColor:Colors.lightBlue,
       
    }
})