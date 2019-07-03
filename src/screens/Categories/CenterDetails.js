import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight } from "react-native";
import { Container, Tab, Content, Icon, ListItem, Thumbnail, Left, Body, Right, Button, Card, CardItem, Image, Row } from 'native-base';
import { HeaderScreen } from '../../Ui/Header';
import localization from '../../localization/localization';
import { Colors } from '../../assets/colors';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { NewChanges } from '../../Ui/newChangesCard';
import { HeaderWithoutButtons } from '../../Ui/headerWithoutButtons';
import { AppText } from '../../Ui/appText';
import { LocalStorage } from '../../helpers/localStorage';
import { Avatar } from '../../Ui/avatar';

const dataArray = [{ key: 'a' }, { key: 'b' }];
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
export default class CenterDetails extends Component {
    myCenter = null;
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
        this.SetCenterObject(this.props.navigation.getParam("objectData"));

    }
    componentDidMount(){
         this.getSocialMedia()
    }
    updateSocials=(key,url)=>{
      let temp=this.state.socials
      temp[key]=url.slice(1, -1);
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
   async SetCenterObject(centerChildren) {
        
        console.log(centerChildren);
        this.myCenter = centerChildren;
        if(LocalStorage.user){
           // debugger;
        if(centerChildren.id===LocalStorage.user.id){
           let number= await new LocalStorage().getVisits();
          // debugger;
           if(number!==-1)
           {
               number++;
       await new LocalStorage().setVisits({id:centerChildren.id,num:number});
           }
        }
        }
    }
    render() {
        return ( 
            <Container style={{ flex: 1 }}>
                <HeaderWithoutButtons page="Home" navigation={this.props.navigation} />
                {/* <NewChanges /> */}

                <Content style={{flex:1,backgroundColor:'#eee'}}>
                <View style={{ flex: 1,minHeight:'100%' }}>
                        <View style={{ height: '45%', backgroundColor: 'red',flex:1 }}>

                            <Card transparent>
                                <CardItem style={{ justifyContent: 'center', backgroundColor: 'red' }}>
                                    <Body style={{alignItems:'center'}}>
                                        {/* change */}
                                        <Avatar image={this.myCenter.image} page="Details"/>

                                        {/* <Thumbnail style={{ alignSelf: 'center' }} large circle source={{ uri: uri }} /> */}
                                    </Body>
                                </CardItem>

                                <CardItem style={{ backgroundColor: 'red',height:'60%' }}>
                                    <Body style={{justifyContent:'center',alignItems:'center'}}>
                                        <AppText text={this.myCenter.name} />
                                        <AppText text={this.myCenter.center.manager} />
                                        {this.myCenter.center_fields.map((item,key)=>(
                                            item.field!==''&&item.field!=="Comming Soon" ? <AppText  key={key} text={ item.field} />:null
                                ))}

                                    </Body>
                                </CardItem>

                                <CardItem style={{ alignSelf: 'center', backgroundColor: 'red',height:'15%',top:-20 }}>
                                    <Body style={{ justifyContent: 'center', alignItems: 'center', height: '130%' }}>
                                        <AppText text="info@domain.com"/>
                                         <AppText text="www.domain.com"/>
                                    </Body>
                                </CardItem>
                            </Card>
                        </View>


                        <View style={{flex:1, height: '10%', backgroundColor: 'darkred', }}>
                            <Card style={{ alignSelf: "center", width: '70%', top: -25 }}>
                                <CardItem>
                                    <Body style={{ alignSelf: 'center' }}>
                                        <Text style={{ color: 'black', alignSelf: 'center' }}>{localization.SOAcard}</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card transparent style={{ top: -25 }}>
                                <CardItem style={{ backgroundColor: 'darkred' }}>
                                    <Body style={{}}>
                                        <Text style={{ alignSelf: 'center' }}>
                                            {/* change */}
                                            {this.myCenter.professional_card["card"]}

                                        </Text>
                                    </Body>
                                </CardItem>

                                <CardItem style={{ backgroundColor: 'darkred',height:'60%' }}>
                                    <Body style={{}}>
                                        <Text style={{ alignContent: 'flex-start' }}> 1-{localization.Administrativeandfinancialtraining}</Text>
                                        <Text style={{ alignContent: 'flex-start' }}> 2-{localization.OccupationalSafetyandHealth}</Text>
                                    </Body>
                                </CardItem>

                                <CardItem style={{ backgroundColor: 'darkred' }} >
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
                                    {this.state.socials.twitter&&     <FontAwesome name='twitter-square' style={{

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
                                        }} />}
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
                                    {/* <Body style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                                        <FontAwesome name='facebook-square' size={40} color={Colors.blue} />
                                        <FontAwesome name='instagram' size={40} />
                                        <FontAwesome name='whatsapp' size={40} color="green" />
                                        <FontAwesome name='twitter-square' size={35} color={Colors.lightBlue} />
                                        <FontAwesome name='linkedin-square' size={35} color={Colors.blue} />
                                    </Body>
                                </CardItem> */}
                            </Card>
                        </View>
                    </View>

                </Content>
            </Container>

        )
    }
}
const styles = StyleSheet.create({
})