
import React, { Component } from 'react';
import {TouchableOpacity,View,Text } from "react-native";
import { Icon, Thumbnail } from 'native-base';
import { Colors } from '../assets/colors';
import Image from "react-native-image-progress";
import ProgressBar from "react-native-progress/Circle";

export  class Avatar extends Component {
  constructor(props) {
    super(props);
    this.props=props;
    this.state = {
      image:null,
      page:null,
    };
  }
componentWillReceiveProps(newprops){
  if(newprops.image)this.setState({image:newprops.image.name});
  if(newprops.page)this.setState({page:newprops.page});
  this.props=newprops
  
}
componentDidMount(){
  if(this.props!==null&&this.props.image)this.setState({image:this.props.image.name});
  if(this.props!==null&&this.props.page)this.setState({page:this.props.page});
   
}
  render() {
    return (
      this.state.image?
        <Thumbnail circle  large
        defaultSource={require('../assets/images/user-default.png')}
      source={{ 
 //http://modarrebarabi.sailaway-eg.com/public/
        uri: `http://almodarrebalarabi.com/public/${this.state.image}`+''
     
     }} 
     /> 
   :
     <TouchableOpacity
     style={{
         borderWidth:1,
         borderColor:'rgba(0,0,0,0.2)',
         //alignItems:'center',
         justifyContent:'center',
         width:50,
         height:50,
         backgroundColor:'#fff',
         borderRadius:100,
       }}
       >
   {this.state.page?<Thumbnail circle  large
        source={require('../assets/images/user-default1.jpg')}
    
     />:<Thumbnail circle  large
     source={require('../assets/images/user-default.png')}
 
  />}
     
   
  </TouchableOpacity>
    );
  }
}
/*
export const Avatar=(props)=>(
   
 props.image?
     <Thumbnail circle  large
     source={{ 

       uri: `http://modarrebarabi.sailaway-eg.com/public/${props.image.name}`
    
    }} 
     defaultSource={require('../assets/images/modareb.png')}
    />  :
    <TouchableOpacity
    style={{
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        //alignItems:'center',
        justifyContent:'center',
        width:50,
        height:50,
        backgroundColor:'#fff',
        borderRadius:100,
      }}
      >
  {props.page?<Icon name="person" style={{alignSelf:'center'}} size={30} color="#01a699" />:<Icon name="person"  size={30} color="#01a699" />}
    
  
 </TouchableOpacity>


)
**/