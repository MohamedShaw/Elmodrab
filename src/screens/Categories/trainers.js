import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList, TouchableHighlight, ActivityIndicator,ScrollView} from "react-native";
import { Container, Tab, Content, Icon, ListItem, Thumbnail, Left, Body, Right, Button, Card, CardItem } from 'native-base';
import localization from '../../localization/localization';
import { getAllTrainers } from '../../store/Actions/actions/Trainers';
import { connect } from 'react-redux';
import { ContentData } from '../../Ui/Content';

import InternetConnection from '../../helpers/internetConnection';
import { AppText } from '../../Ui/appText';
import TrainingOpp from './TrainingOpp';
import { Colors } from '../../assets/colors';
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";


class Trainers extends Component {
    connection = new InternetConnection();
    connected=true;
    constructor(props) {
        super(props);

        this.GetAllTrainers();
    }
    trainerDataArray;


    async GetAllTrainers() {

        this.connected = await this.connection.checkConnection();
        if (this.connected) {
            this.props.getAllTrainers();
        }
    }
    renderDataList() {
        return (
            this.props.loading ?
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />

                </View> :
           <ScrollView style={{flex:1,}}>
          <TrainingOpp contentStyle={{backgroundColor:'lightblue'}} listStyle={{
             backgroundColor:'lightblue'}}
  />
                <ContentData
                    data={this.trainerDataArray}
                    navigationObject='TrainerDetails' navigation={this.props.navigation}
                />
           </ScrollView>
        )
    }
    renderInvalidData() {
        return(
            <View style={{flexDirection:'row',alignItems:'center'}}>
            <AppText text={localization.invalidData}/>
            <Icon name="undo" onPress={()=>this.GetAllTrainers()}/>

            </View>
        )
    }
    render() {
        if (this.props.AllTrainers) {
            console.log('trainer',this.props.AllTrainers)

            this.trainerDataArray = this.props.AllTrainers.data.persons.filter((item)=>
            (item.role_id==='2')    
        )
        }
        return(
       this.connected?this.renderDataList():this.renderInvalidData()
        )
    }
}
const styles = StyleSheet.create({
})
//9
const mapStateToProps = state => {
    return {
        AllTrainers: state.trainersReducers.trainers,
        loading: state.trainersReducers.loading,
        error: state.trainersReducers.error
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getAllTrainers: () => {
            dispatch(getAllTrainers());
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trainers);