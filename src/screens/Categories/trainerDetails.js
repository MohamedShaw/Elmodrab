import React, { Component } from 'react';
import { Platform, View, StyleSheet, Text, FlatList, TouchableHighlight, ScrollView, Linking,Dimensions } from "react-native";
import { Container, Tab, Content, Icon, ListItem, Thumbnail, Left, Body, Right, Button, Card, CardItem, Image, Row } from 'native-base';
import { HeaderScreen } from '../../Ui/Header';
import localization from '../../localization/localization';
import { Colors } from '../../assets/colors';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

import { NewChanges } from '../../Ui/newChangesCard';
import { HeaderWithoutButtons } from '../../Ui/headerWithoutButtons';
import { AppText } from '../../Ui/appText';
import { LocalStorage } from '../../helpers/localStorage';
import { Avatar } from '../../Ui/avatar';

const dataArray = [{ key: 'a' }, { key: 'b' }];
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
export default class TrainerDetails extends Component {

    mytrainer = null;
    constructor(props) {

        super(props);
        this.state = {
            facebook: false,
            telegram: false,
            snapchat: false,
            twitter: false,
            youtube: false,
            whatsapp: false,
            linkedin: false,
            instagram: false,
            socials:{
                facebook:null,
                telegram:null,
                snapchat:null,
                twitter: null,
                youtube: null,
                whatsapp:null,
                linkedin:null,
                instagram: null,
            }

        };
        this.SetTrainerObject(this.props.navigation.getParam("objectData"));

    }
    componentDidMount(){
         this.getSocialMedia()
    }
    updateSocials=(key,url)=>{
      let temp=this.state.socials
      temp[key]=url.slice(1,-1);
      this.setState({socials:temp})
      console.log('socials',this.state.socials)
    }
    async getSocialMedia() {    
        // debugger;
        console.log( this.props.navigation.getParam("objectData").socials)
        this.props.navigation.getParam("objectData").socials.map(value=>{
            switch(value.social){
             case 'f':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({facebook:true}); this.updateSocials('facebook' , value.url.toLocaleLowerCase());} break;}
             case 't':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({twitter:true});  this.updateSocials('twitter' ,  value.url.toLocaleLowerCase());}break;}
             case 'y':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({youtube:true});  this.updateSocials( 'youtube' , value.url.toLocaleLowerCase());}break;}
             case 'l':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({linkedin:true}); this.updateSocials( 'linkedin' ,value.url.toLocaleLowerCase());} break;}
             case 'i':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({instagram:true});this.updateSocials( 'instagram',value.url.toLocaleLowerCase());} break;}
             case 's':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({snapchat:true}); this.updateSocials('snapchat'  ,value.url.toLocaleLowerCase());}break;}
             case 'm':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({telegram:true});this.updateSocials( 'telegram' , value.url.toLocaleLowerCase());} break;}
             case 'w':{if(value.url && value.url!=="disabled"&& value.url!==""){this.setState({whatsapp:true});this.updateSocials( 'whatsapp' , value.url.toLocaleLowerCase());} break;}
 
             return;
 
         }
        })
    }
    async SetTrainerObject(trainerChildren) {
        console.log(trainerChildren);
       // debugger;
        this.mytrainer = trainerChildren;
        if (LocalStorage.user) {
           // debugger;
            if (trainerChildren.id === LocalStorage.user.id) {
                let number = await new LocalStorage().getVisits();
                if (number !== -1) {
                    number++;
                    await new LocalStorage().setVisits({ id: trainerChildren.id, num: number });
                }
            }
        }

    }
    render() {
// alert(JSON.stringify(this.mytrainer))      
        return (
            <Container style={{ flex: 1 }}>
                <HeaderWithoutButtons page="Home" navigation={this.props.navigation} />
                {/* <ScrollView> */}
                {/* <NewChanges /> */}

         <Content style={{flex:1,backgroundColor:'cadetblue'}}>
         <View style={{ flex: 1,minHeight:'100%' }}>
                    {/*  {/* height: '50%', ,top:-5  */}

                    <View style={{ backgroundColor: 'green', flex:1 }} >

                        <Card transparent>
                            <CardItem style={{ justifyContent: 'center', backgroundColor: 'green' }}>
                                <Body style={{ alignItems: 'center',justifyContent:'center' }}>
                                    <Avatar image={this.mytrainer.image} page="details" />
                                </Body>
                            </CardItem>

                            <CardItem style={{ backgroundColor: 'green', height: '50%' }}>
                                <Body style={{ justifyContent: 'center', alignItems: 'center' }}>

                                    <AppText text={this.mytrainer.trainer.character} />
                                    <AppText text={this.mytrainer.name} />
                                    <AppText text={this.mytrainer.trainer.credit} />
                                    <AppText text={this.mytrainer.trainer_field.field} />
                                </Body>
                            </CardItem>

                            <CardItem style={{ alignSelf: 'center', backgroundColor: 'green', top: -20, height: '20%' }}>
                                <Body style={{ justifyContent: 'center', alignItems: 'center', height: '130%' }}>
                                    <AppText text="info@domain.com" />
                                    <AppText text="www.domain.com" />
                                </Body>
                            </CardItem>
                        </Card>
                    </View>

                    {/* height: '50%', */}
                    <View style={{ backgroundColor: 'cadetblue', flex:1 }}>
                        <Card style={{ alignSelf: "center", width: '70%', height: Dimensions.get('screen').height*0.065,bottom:12,top:-12,zIndex:100 }}>
                            <CardItem>
                                <Body style={{ alignSelf: 'center' }}>
                                    <Text style={{ color: 'black', alignSelf: 'center',height:'100%'}}>{localization.SOAcard}</Text>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card transparent style={{ top: -25 }}>
                            <CardItem style={{ backgroundColor: 'cadetblue',height:'60%' }}>
                                <Body style={{height:'30%',justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{ alignSelf: 'center' }}>
                                        {this.mytrainer.professional_card["card"]}
                                        
                                    </Text>
                                </Body>
                            </CardItem>

                            <CardItem style={{ backgroundColor: 'cadetblue' }} >
                                <Body style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around',marginHorizontal: 10, }}>
                                {this.state.socials.whatsapp&&<Ionicons name='logo-whatsapp' style={{
                                        textDecorationStyle: 'solid',
                                    }} size={40} color={Colors.orange}
                                        onPress={() => {
                                            //check if he has fb then redirect else toast
                                           // debugger;
                                            Linking.canOpenURL(`whatsapp://send?text=${''}&phone=${this.state.socials.whatsapp}`).then(supported => {
                                                if (!supported) {
                                                    alert('Can\'t redirect to this url: ' + this.state.socials.whatsapp);
                                                } else {
                                                    return Linking.openURL(`whatsapp://send?text=${''}&phone=${this.state.socials.whatsapp}`);
                                                }
                                            }).catch(err => alert('Can\'t Redirect to this url ', err));
                                        }} />}
                                 {this.state.socials.facebook&&   <FontAwesome name='facebook-square' style={{
                                        textDecorationStyle: 'solid',
                                    }} size={40} color={Colors.blue}
                                        onPress={() => {
                                            //check if he has fb then redirect else toast
                                           // debugger;
                                            Linking.canOpenURL(this.state.socials.facebook).then(supported => {
                                                if (!supported) {
                                                    alert('Can\'t redirect to this url: ' + this.state.socials.facebook);
                                                } else {
                                                    return Linking.openURL(this.state.socials.facebook);
                                                }
                                            }).catch(err => alert('Can\'t Redirect to this url ', err));
                                        }} />}
                                   {this.state.socials.instagram&&      <FontAwesome name='instagram' style={{

                                    }} size={40} onPress={() => {
                                        //check if he has fb then redirect else toast
                                       // debugger;
                                        Linking.canOpenURL(this.state.socials.instagram).then(supported => {
                                            if (!supported) {
                                                alert('Can\'t redirect to this url: ' + this.state.socials.instagram);
                                            } else {
                                                return Linking.openURL(this.state.socials.instagram);
                                            }
                                        }).catch(err => alert('Can\'t Redirect to this url ', err));
                                    }} />}
                                    {/* {this.state.socials.twitter&&     <FontAwesome name='twitter-square' style={{

                                    }} size={35} color={Colors.lightBlue}
                                        onPress={() => {
                                            //check if he has fb then redirect else toast
                                           // debugger;
                                            Linking.canOpenURL(this.state.socials.twitter).then(supported => {
                                                if (!supported) {
                                                    alert('Can\'t redirect to this url: ' + this.state.socials.twitter);
                                                } else {
                                                    return Linking.openURL( this.state.socials.twitter);
                                                }
                                            }).catch(err => alert('Can\'t Redirect to this url ', err));
                                        }} />} */}
                                    {this.state.socials.linkedin&&     <FontAwesome name='linkedin-square' style={{

                                    }} size={35} color={Colors.blue}
                                        onPress={() => {
                                            //check if he has fb then redirect else toast
                                           // debugger;
                                            Linking.canOpenURL( this.state.socials.linkedin).then(supported => {
                                                if (!supported) {
                                                    alert('Can\'t handle url: ' +  this.state.socials.linkedin);
                                                } else {
                                                    return Linking.openURL( this.state.socials.linkedin);
                                                }
                                            }).catch(err => alert('Can\'t Redirect to this url ', err));
                                        }} />}
                                    {this.state.socials.snapchat&&     <FontAwesome name='snapchat-ghost' style={{

                                    }} size={35} color="yellow"
                                        onPress={() => {
                                            //check if he has fb then redirect else toast
                                           // debugger;
                                            Linking.canOpenURL( this.state.socials.snapchat).then(supputubeorted => {
                                                if (!supported) {
                                                    alert('Can\'t handle url: ' +  this.state.socials.snapchat);
                                                } else {
                                                    return Linking.openURL( this.state.socials.snapchat);
                                                }
                                            }).catch(err => alert('Can\'t Redirect to this url ', err));
                                        }} />}

{this.state.socials.youtube&&   <FontAwesome name='youtube-play' style={{

                                    }} size={35} color="red"
                                        onPress={() => {
                                            //check if he has fb then redirect else toast
                                           // debugger;
                                            Linking.canOpenURL( this.state.socials.youtube).then(supported => {
                                                if (!supported) {
                                                    alert('Can\'t handle url: ' + this.state.socials.youtube);
                                                } else {
                                                    return Linking.openURL( this.state.socials.youtube);
                                                }
                                            }).catch(err => alert('Can\'t Redirect to this url ', err));
                                        }} />}


                                </Body>
                            </CardItem>
                        </Card>
                    </View>

                </View>
         </Content>

                {/* </ScrollView> */}
            </Container>
        )
    }
}
const styles = StyleSheet.create({
})