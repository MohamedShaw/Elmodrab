import React, { Component } from 'react';
import { View, Platform, StyleSheet,ActivityIndicator, Text, FlatList, TouchableHighlight, ScrollView } from "react-native";
import { Container, Tab, Content, Icon, ListItem, Thumbnail, Left, Body, Right, Button, Form, Picker, Item, Input, CheckBox, Radio, Card, List } from 'native-base';
import localization from '../localization/localization';
import { connect } from 'react-redux';
import { search } from '../store/Actions/actions/Search';
import { allCountries, allCities, allCitiesOfState } from '../store/Actions/actions/country';
import { CustomButton } from '../Ui/customButon';
import { HeaderWithoutButtons } from '../Ui/headerWithoutButtons';
import { Colors } from '../assets/colors';
import RadioButton from 'radio-button-react-native';
import {Dropdown} from 'react-native-material-dropdown'
const dataArray = [{ key: 'a' }, { key: 'b' }];
const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
const errMsg = "All Fields are required *";
import Toast, { DURATION } from "react-native-easy-toast";

class Search extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            selectedName: false,
            selectedPlace: false,
            name: null, type: 'name',
            country_id: '',
            city_id: '',
            state_id: null,
            pickerDisabled: true,
            value: 0,
            // allCountriesLocal: null,
            dataArray: null,
            searchPressed:false,
        };
        props.getAllCountries();
    }
    allCountriesLocal = [];
    allCitiesLocal = [];
    allCitiesOfStateLocal = null;
    fetchedData;

    getAllNeededCountries(countries) {
        if (countries != null) {


            this.allCountriesLocal = countries.countries.map((item, index) => {

                // return (<Picker.item key={item.id} label={item.name_en} value={item} />)
return     {
    key:item.id ,label:item.name_en, value:item.id ,phoneCode:item.phonecode
}

            });
        }


    }
    componentWillReceiveProps(NewProps){
        this.props=NewProps;
        if (this.props.countries) {
            // debugger;
             this.getAllNeededCountries(this.props.countries);
         }
 
         if (this.props.cities) {
             if (this.props.cities != null) {
                 this.allCitiesLocal = this.props.cities.cities.map((item, index) => {
                     // return (
                     //     <Picker.item key={item.id} label={item.name_en} value={item} />)
                     return     {
                         key:item.id ,label:item.name_en, value:item.id 
                     }
                 })
 
             }
 
         }
 
      
        // debugger;
 
         if (this.state.searchPressed&&this.props.trainer) {
            // debugger;
            let data=this.props.trainer;
             if (this.props.trainer.length != 0)
                 this.props.navigation.navigate('SearchResults', { dataArray:data , objectData: this.state.type == "place" ? 'CenterDetails' : 'TrainerDetails' })
             else {
                 this.refs.toast.show("SORRY!! NO RESULTS FOR YOUR SEARCH",1500,()=>{})
 
             }
             this.setState({searchPressed:false})
         }
    }



    isNotNull(type, name, ...params) {

        let err = false;
        let arr = [];
        (name === null && type == "name") ? err = true : arr.push(name);
        (params === null &&params === "" && type == "place") ? err = true : arr.push(params);
        arr.push(type);

        if (err)
            {
                this.refs.toast.show("Please fill all fields !",1500,()=>{})
                return;
            }

        else {
            if (type == "name")
                this.props.search({ name: this.state.name, type: this.state.type, });

            else if (type == "place")
               { 
                   this.props.search({ country_id: this.state.country_id, city_id: this.state.city_id, state_id: this.state.city_id, type: this.state.type, });
            
            }
            this.setState({searchPressed:true})

        }
    }

    render() {

    
        return (
            <Container style={{ flex: 1, backgroundColor: Colors.lightBlue }}>
                <HeaderWithoutButtons navigation={this.props.navigation} page={null} />
                <Content style={{ flex: 1 }}>


                    <Text style={{ textAlign: 'center', fontSize: 25 }}>{localization.search}</Text>
                    {/* <View style={{ flex: 1, justifyContent: 'space-evenly', flexDirection: 'row', alignSelf: 'center', width: '80%', backgroundColor: 'white' }}> */}
                    {/* <View style={{flex:1,justifyContent:'flex-start',alignItems:'flex-start'}}> */}
                    <List>

                        <ListItem  >
                        <Left style={{flex:0.5}}>
                                <RadioButton currentValue={this.state.value} value={0} onPress={
                                    (value) => {
                                        if (value == 0)

                                            this.setState({ type: "name", selectedPlace: false, pickerDisabled: true, selectedName: true, value: value })
                                    }
                                }>

                                </RadioButton>
                            </Left>
                            
                            <Body style={{flex:5}}>

                                <Input placeholder="مجال التدريب"
                                editable={this.state.value===0}
                                    value={this.state.name}
                                    
                                    style={{ backgroundColor: Colors.white, flex: 1,width:'100%',textAlign:'right', paddingHorizontal:10,left: 0 }}
                                    onChangeText={(text) => {
                                        this.setState({ name: text })
                                    }} />
                            </Body>
            
                        </ListItem>
                   
                        <ListItem>
                            <Left style={{flex:0.5}}>
                                <RadioButton
                                    currentValue={this.state.value} value={1} onPress={(value) => {
                                        if (value == 1)
                                            this.setState({ type: "place", selectedPlace: true, pickerDisabled: false, selectedName: false, value: value })
                                    }}
                                />
                            </Left>

                            <Body style={{flex:5,}}>

 
                    <Dropdown
                                disabled={this.state.value===0}
                                containerStyle={{
                                justifyContent:'center',   
                                backgroundColor: Colors.white,
                                left: 0
                            
                                }}
                                placeholder={localization.pickCountry}
                                dropdownOffset={{ top: 0, left: 0,right:0}}
                                animationDuration={0}
                                delayPressIn={0}
                                            style={{
                                    height:'100%',
                                    width:'100%',
                                    paddingHorizontal:10, 
                                    }}
                                baseColor='transparent'
                                    value={this.state.country_id}
                                    data={this.allCountriesLocal}
                                onChangeText={(value)=>{
                                    let selectedObj=this.props.countries.countries.filter(arr=>{return arr.id===value})[0];
                                    this.props.getAllCities(selectedObj);
                                    this.setState({ country_id: value ,city_id:""});
                                }}
                                    
                        />

<Dropdown
                                disabled={this.state.value===0}

            containerStyle={{
            justifyContent:'center',   
             backgroundColor: Colors.white,
             marginVertical: 10,
          
            }}
            placeholder={localization.pickCity}
            dropdownOffset={{ top: 0, left: 0,right:0}}
            animationDuration={0}
            delayPressIn={0}
                        style={{
                height:'100%',
                width:'100%',
                paddingHorizontal:10, 
                 }}
               baseColor='transparent'
                value={this.state.city_id}
                data={this.allCitiesLocal}
               onChangeText={(value)=>{
                this.setState({ city_id: value });               }}
                
      />
           
                            </Body>

                        </ListItem>
                    </List>

              
                    <View style={{ flex: 0.9 }}>

                      {this.props.loading?<ActivityIndicator/>: 
                       <CustomButton text={localization.search} style={{ flex: 1, alignSelf: 'center', width: '75%',height:60, top: 20, justifyContent: 'center', backgroundColor: 'red' }} 
                       
                       onPress={() => {
                           // debugger;

                            this.isNotNull(this.state.type, this.state.name, this.state.city_id, this.state.country_id);
                        }} />
                    }
                 
                    </View>

                
                    <Toast
                        ref="toast"
                        position="top"
                        positionValue={200}
                        fadeInDuration={750}
                        fadeOutDuration={2000}
                        opacity={1}
                        textStyle={{ color: 'white' }}
                        
                    />
                </Content>

            </Container>


        )
    }
}
const styles = StyleSheet.create({
})
const mapStateToProps = (state) => {

    return {

        ...state.searchReducer,
        ...state.countryReducer

    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        search: (newObject) => dispatch(search(newObject)),
        getAllCountries: () => dispatch(allCountries()),
        getAllCities: (country_id) => dispatch(allCities(country_id)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);