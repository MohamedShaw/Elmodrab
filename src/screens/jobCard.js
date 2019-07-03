import React, { Component } from "react";
import { Container, Header, Content, Card, Input, CardItem, Body, Item,Textarea, } from "native-base";
import { View, StyleSheet, Text,ActivityIndicator,ScrollView } from "react-native";
import { HeaderScreen } from "../Ui/Header";
import { Avatar } from "../Ui/avatar";
import { HeaderWithoutButtons } from "../Ui/headerWithoutButtons";
import { Colors } from "../assets/colors";
import { CustomButton } from "../Ui/customButon";
import localization from "../localization/localization";
import { LocalStorage } from "../helpers/localStorage";
import { AppText } from "../Ui/appText";
import { connect } from "react-redux";
import Toast from "react-native-easy-toast";


import { updateProfessionalCardRequest } from "../store/Actions/actions/updateInfo";
class JobCard extends Component {
    state={card:null,saveButtonPressed:false}
    updateProfessionalCard(){
       
        this.props.onUpdateCard({
            id:LocalStorage.user.id,
            token:LocalStorage.user.token,
            card:this.state.card

        })
        this.setState({saveButtonPressed:true})
    }
    renderProfessionalCard() {
        if (LocalStorage.user.hasOwnProperty("professional_card")) {
            return(

                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

                    <Textarea rowSpan={10} style={{backgroundColor:'white',width:300}} bordered placeholder={LocalStorage.user.professional_card.card} value={this.state.card}
                    onChangeText={(text)=>this.setState({card:text})} 
                    maxLength={1000}
                    />
                    {this.props.loadingProfessional? <ActivityIndicator size="large" color="black" />:   
                        <CustomButton onPress={()=>this.updateProfessionalCard()} text={localization.save} style={{ alignSelf: 'center', backgroundColor: Colors.orange, width: '55%', marginTop: '5%' }} />
                    }
                </View>

          
            )
        }
        else{
            return(
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

            <AppText text={localization.invalidProfessionalCard}/>
            </View>

            )
        }
    }
    render() {
       // debugger;
        if(this.props.professionalSuccessData&&this.state.saveButtonPressed){
            this.refs.toast.show(this.props.professionalSuccessData.msg,2000,()=>{
                this.setState({saveButtonPressed:false})
                this.props.navigation.navigate('profile');
            })
        }
        if(this.props.professionalErrorData&&this.state.saveButtonPressed){
            if(this.props.professionalData.msg=="token_expired"){
                this.refs.toast.show(this.props.professionalErrorData.msg,1500,()=>{
                    this.setState({saveButtonPressed:false})
                    this.props.navigation.navigate('Welcome');
                })
            }
            else{
            this.refs.toast.show(this.props.professionalErrorData.msg);
            }
        }
        return (
            <Container style={{ backgroundColor: Colors.lightBlue }}>
                <HeaderWithoutButtons navigation={this.props.navigation} page='profile' />
                <Toast
        ref="toast"
        position='bottom'
        positionValue={160}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: 'white' }}
    />
                <Content contentContainerStyle={styles.content}>
               <View style={{flex:1,flexDirection:'column',marginTop:10}}>
               <View style={{flex:1,alignSelf:'center'}}>
 
 <Avatar page="card" image={LocalStorage.user.image} />
<AppText text={LocalStorage.user.name}/>
</View>
<View style={{flex:4}}>
{this.renderProfessionalCard()}

</View>


               </View>
              
                </Content>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    content: {
    },

    cardButtons: {
        width: '70%',
        height: '30%'
    }
})

const mapStateToProps = (state) => {

    return {

        ...state.updateInfoReducer,
        
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCard: (professionalData) => dispatch(updateProfessionalCardRequest(professionalData)),
      


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobCard);