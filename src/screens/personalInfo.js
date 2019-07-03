import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator, ScrollView,KeyboardAvoidingView} from "react-native";
import { Field, reduxForm } from 'redux-form';
import localization from "../localization/localization";
import { Form, Input, Item, Picker, Icon, Container, Header, Right, Content, ListItem } from 'native-base';
import { Colors } from "../assets/colors";
import { CustomButton } from "../Ui/customButon";
import { Avatar } from '../Ui/avatar';
import { HeaderWithoutButtons } from '../Ui/headerWithoutButtons';
import { connect } from "react-redux";
import { updateInfoRequest } from "../store/Actions/actions/updateInfo";
import { LocalStorage } from "../helpers/localStorage";
import { CustomPicker } from '../Ui/customPicker';
import CustomInput from '../Ui/CustomIput';
import { AppText } from "../Ui/appText";
import { allCountries, allNationalities, allCities, selectCity, selectCountry, selectNationality } from '../store/Actions/actions/country';
import Mobile from '../Ui/Mobile';
import Toast from "react-native-easy-toast";



const validate = values => {

   // debugger;
    const errors = {};
    if (!values.fullname)
    errors.fullname = localization.required;
else if (values.fullname.length > 50)
    errors.name = "name must be less than or equal 50 characters";

    if (values.email) {
        var emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailChecked = emailValidation.test(values.email.toLowerCase());
        if (!emailChecked)
            errors.email = localization.emailValidation;
    }

    if (values.phone) {
        if (values.phone.length < 8 && values.phone.length > 15)
            errors.phone = localization.phoneValidation;
        else if (isNaN(values.phone)) {
            errors.phone = localization.mobileValidation
        }

    }
    if (!values.country)

    errors.country = localization.required

if (!values.city)
    errors.city = localization.required



    return errors;
}

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        props.getCountries();
        this.state = {
            country_id: null,
            city_id: null,
            nationality_id: null,
            policyChecked: false,
            errList: [],
            prefix:'',
            nationality:'',
            country:'',
            city:'',
            countries:[],
            nationalities:[],
            cities:[],
            saveButtonPressed:false,

        };

    }



    countries = null;
    cities = null;
    prefixMemory = LocalStorage.user.prefix;
    saveButton;
    errors;
    counterInfo = 0;
    updateduser = this.updateduser=LocalStorage.user    ;
componentDidMount() {
    console.log('user',LocalStorage.user)
        this.props.getCountries();
        this.props.change("fullname", LocalStorage.user.name);
        this.props.change("email", LocalStorage.user.email);
        this.props.change("phone", LocalStorage.user.phone);
        this.props.change("country", LocalStorage.user.country_id);
        this.props.change("city", LocalStorage.user.city_id);

        this.setState({'prefix': LocalStorage.user.prefix})
    }
    componentWillReceiveProps(NewProps){
        console.log(NewProps)
        this.props=NewProps;
       
        if (this.props.countries) {
            this.getCountries(this.props.countries);
        }

       
        if (this.props.cities) {
            this.getCities(this.props.cities);
        }
    }
    updateUserData = (values) => {
       // debugger;
        this.updateduser.name = values.fullname ? values.fullname : LocalStorage.user.name;
        this.updateduser.email = values.email ? values.email : LocalStorage.user.email;
        this.updateduser.phone = values.phone ? values.phone : LocalStorage.user.phone;
        this.updateduser.prefix = this.state.prefix;
        this.updateduser.country_id = values.country ? values.country : LocalStorage.user.country_id;
        this.updateduser.city_id = values.city ? values.city : LocalStorage.user.city_id,
        this.updateduser.state_id = values.city ? values.city : LocalStorage.user.state_id,

            this.props.updateInfo({
                name: this.updateduser.name,
                email: this.updateduser.email,
                phone: this.updateduser.phone,
                prefix: this.updateduser.prefix,
                countryID: this.updateduser.country_id,
                stateID: this.updateduser.state_id,
                cityID: this.updateduser.state_id,
                token: LocalStorage.user.token,
                nationalityID: LocalStorage.user.nationality_id,
                id: LocalStorage.user.id
            })
            this.setState({saveButtonPressed:true})

        //lessa f data el gedida
        this.counterInfo = 1;
    }

    renderInputField = (props) => {
        return (
            <View style={{ flex: 0.4 }}>

                <ListItem>
                    <CustomInput placeholder={props.placeholder} secureTextEntry={props.secureTextEntry} text={props.input.value} changeText={props.input.onChange} containerStyle={props.containerStyle} label={props.label} />
                </ListItem>

                {props.meta.touched &&
                    ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))}
            </View>

        )
    }

    renderPickerField = (props) => {
        return (
     <View style={{ flex: 0.4 }}>

         <ListItem style={props.listSyle}> 
             <CustomPicker 
                containerStyle={props.containerStyle}
                placeholder={props.placeholder}
                 value={props.input.value}
                 data={props.data}
                 label={props.label}
                 labelStyle={props.labelStyle}
                 type={props.type}
                 onchangeValue={(value)=>{props.input.onChange}} 
                 SetValue={(value)=>props.SetValue(value)}    
                 error={props.meta.touched &&  props.meta.error }       
     />

         </ListItem>

         {/* {props.meta.touched &&
             ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))} */}
     </View>

 )
}

    
    // renderPickerField = (props) => {
    //    // debugger;
    //     if (props.input.name == 'country') {
    //         if (props.input.value) {
    //             this.props.getcities(props.input.value);

    //             this.prefixMemory = props.input.value.phonecode;

    //         }
    //     }
    //     return (
    //         <View style={{ flex: 0.4 }}>

    //             <ListItem>

    //                 <CustomPicker containerStyle={props.containerStyle} placeholder={props.placeholder}
    //                     selected={props.input.value?props.input.value:LocalStorage.user.country_id}
    //                     data={props.data}
    //                     label={props.label}
    //                     onchangeValue={props.input.onChange}

    //                 />
    //             </ListItem>

    //             {props.meta.touched &&
    //                 ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))}
    //         </View>

    //     )
    // }


    renderMobileField = (props) => {
        return (
            <View style={{ flex: 0.4 }}>

                <ListItem>

                    <Mobile placeholder={props.placeholder} value={props.input.value} changeText={props.input.onChange} mobileExtension={props.mobilextension} label={localization.mobileNumber}/>

                </ListItem>

                {props.meta.touched &&
                    ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))}
            </View>

        )
    }

    getCountries(allcountries) {
        this.countries = allcountries.countries.map((item, index) => {
            return (
                // <Picker.Item key={item.id} label={item.name_en} value={item}

                // />
                {
                    key:item.id ,label:item.name_en, value:item.id ,phoneCode:item.phonecode
                }

            )
        });
        this.setState({countries:this.countries})
    }
    getCities = (value) => {
        this.cities=[].concat(...value.cities)
        this.cities = this.cities.map(
            (item, index) => {
                return (
                    // <Picker.Item key={item.id} label={item.name_en} value={item.id}

                    // />
                    {
                        // key:item.id ,label:item.name_en,
                      value:item.name_en
                    }

                )
            }
        );
            this.setState({cities:this.cities});
    }

    render() {
        // if (this.props.countries) {
        //     console.log(this.props);

        //     this.countries = this.props.countries.countries.map((item, index) => {
        //         return (
        //             <Picker.Item key={item.id} label={item.name_ar} value={item}
        //             />
        //         )
        //     })

        // }
        // if (this.props.cities) {

        //     this.cities = this.props.cities.states.map(
        //         (item, index) => {
        //             return (
        //                 <Picker.Item key={item.id} label={item.name_ar} value={item.id}

        //                 />

        //             )
        //         }
        //     )

        // }

        if (this.state.saveButtonPressed) {
            this.saveButton = <View style={{flex:1,height:50}}><ActivityIndicator /></View>
        }
        else {
            this.saveButton = (

                <View style={{ flex: 1, justifyContent: 'space-around' ,alignItems:'center'}}>

                    <CustomButton onPress={this.props.handleSubmit(this.updateUserData)} text={localization.save} style={{ backgroundColor: Colors.orange, width: '55%',alignSelf:'center' }} />
                </View>
            )
        }
        if (this.state.saveButtonPressed&&this.props.updateInfoSuccessData) {
           // debugger;
            if (this.refs.toast)
                this.refs.toast.show(this.props.updateInfoSuccessData.msg, 500, () => {

                    // LocalStorage.user.name = this.updateduser.name;
                    // LocalStorage.user.email = this.updateduser.email;
                    // LocalStorage.user.phone = this.updateduser.phone;
                    // LocalStorage.user.prefix = this.updateduser.prefix;
                    // LocalStorage.user.country_id = this.updateduser.country_id;
                    // LocalStorage.user.city_id = this.updateduser.city_id;
                    // LocalStorage.user.state_id = this.updateduser.state_id;
                    console.log('storage',this.updateduser)
                    new LocalStorage().setLoginUser(this.updateduser);
                    this.setState({saveButtonPressed:false});
                    this.props.navigation.navigate('profile');
                })
        }
        else if (this.props.errorData) {
            if (this.counterInfo != 0) {
                this.errors = [];
                if (this.props.errorData.msg === "token_expired") {
                    this.refs.toast.show(this.props.errorData.msg, 1500, () => {
                        this.props.navigation.navigate('Welcome')
                    })
                }
                else {
                    for (var property in this.props.errorData.data.errors) {
                        this.errors.push(
                            <AppText style={{ color: Colors.red }} text={this.props.visitor.data.errors[property][0]} />
                        )
                    }
                    this.counterInfo = 0;
                }
            }
        }


        return (
            <Container style={{ backgroundColor: Colors.lightBlue,flex:1}}>
                <HeaderWithoutButtons navigation={this.props.navigation} page='profile' />
          <Content contentContainerStyle={{ flex: 1,marginBottom: 10, }}>
            <ScrollView style={{flex:1}}>
                             
            <View style={{ flex:1, justifyContent: 'space-evenly', alignItems: 'center' }}>
        
        <Avatar page="personal" image={LocalStorage.user.image} />
        <Text>{localization.personalData}</Text>

    </View>

    <View style={{ justifyContent: 'space-between', flex: 5,width:'100%',}} >


        <Field placeholder={LocalStorage.user.name} type="text" label={localization.name} containerStyle={{ top: '2%' }} name="fullname" component={this.renderInputField} type="text" />


        <Field placeholder={LocalStorage.user.email} type="text" label={localization.email} containerStyle={{ top: '2%' }} name="email" component={this.renderInputField} type="text" />


        <Field placeholder={LocalStorage.user.phone} type="text" name="phone" component={this.renderMobileField} mobilextension={this.state.prefix} />



        {/* <Field label={localization.country} data={this.countries} placeholder={localization.pickCountry} name="country" component={this.renderPickerField} />


        <Field label={localization.city} data={this.cities} placeholder={localization.pickCity} name="city" component={this.renderPickerField} />
*/}
<Field containerStyle={{ top: '4%' }} label={localization.country} data={this.state.countries} placeholder={LocalStorage.user.country.name_en} name="country" component={this.renderPickerField}  
SetValue={(value)=>{
let selectedObj=this.props.countries.countries.filter(arr=>{return arr.id===value})[0];
this.updateduser.country=selectedObj
this.setState({country:value,prefix:selectedObj.phonecode,cities:[{}]});
this.props.change("country", value);
this.props.change("city", null)
this.props.getcities(selectedObj);
}
}  />


<Field label={localization.city} data={this.state.cities} placeholder={LocalStorage.user.city.name_en} name="city" type='city' component={this.renderPickerField} 
SetValue={(value)=>{
let ALLCITIESDATA=[].concat(...this.props.cities.cities)

let selectedObj=ALLCITIESDATA.filter(arr=>{return arr.name_en===value})[0];
this.updateduser.city=selectedObj
this.props.change("city", selectedObj.id)
this.setState({city:value});

}}
/>


    </View>
    {this.errors}

    {this.saveButton}


    <Toast
        ref="toast"
        position='bottom'
        positionValue={160}
        fadeInDuration={750}
        fadeOutDuration={1000}
        opacity={0.8}
        textStyle={{ color: 'white' }}
    />
            </ScrollView>   
            
         </Content>
        

            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: '10%',
        backgroundColor: Colors.lightBlue
    },
    fieldsWidth: {
        width: 200,
        alignItems: 'center',
        alignSelf: 'center'
    },
    fieldsContainer: {
        flex: 0.2,
        alignItems: 'center'
    },
    fields: {
        backgroundColor: Colors.white,
        textAlign: 'center'
    },
})

const mapStateToProps = (state) => (
    {
        ...state.updateInfoReducer,
        ...state.countryReducer

    }
)

const mapDispatchToProps = (dispatch) => (
    {
        updateInfo: (updateInfoData) => dispatch(updateInfoRequest(updateInfoData)),
        getCountries: () => dispatch(allCountries()),
        getcities: (country) => dispatch(allCities(country)),

    }
)

const PersonalInfoForm = reduxForm({
    form: 'personalInfo',
    validate

})(PersonalInfo)
export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfoForm)
