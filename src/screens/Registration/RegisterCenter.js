import React, { Component } from 'react'
import ImagePicker from 'react-native-image-picker'
import RenderCustomInput from '../../Ui/NewCustomIput'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

import {
	Image,
	View,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	Platform,
	TouchableHighlight,
	ActivityIndicator,
	ImageBackground
} from 'react-native'
import {
	Left,
	Right,
	Label,
	Textarea,
	Radio,
	Button,
	Card,
	CardItem,
	List,
	ListItem,
	Body,
	Item,
	Picker,
	CheckBox,
	Container,
	Content,
	Header,
	Icon
} from 'native-base'
import { RenderCustomPicker } from '../../Ui/NewcustomPicker'
import { RenderCustomPicker1 } from '../../Ui/NewcustomPicker1'

import { Colors } from '../../assets/colors'
import { CustomButton } from '../../Ui/customButon'

import localization from '../../localization/localization'
import { registerCenterAction } from '../../store/Actions/actions/centers'
import { RegistrationSuccess } from '../../screens/Registration/RegsitrationSuccess'
import { HeaderScreen } from '../../Ui/Header'
import { Field, reduxForm } from 'redux-form'
import Mobile from '../../Ui/Mobile'
import {
	allCountries,
	allCities,
	allCitiesOfState,
	allNationalities
} from '../../store/Actions/actions/country'
import { LocalStorage } from '../../helpers/localStorage'
import CustomInput from '../../Ui/CustomIput'
import { AppText } from '../../Ui/appText'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Avatar } from '../../Ui/avatar'

import { CustomPicker } from '../../Ui/customPicker'
import MyCheckbox from './Components/CheckBok/checkbox'

const errMsg = 'All Fields are required *'
const options = {
	title: 'Select Avatar',
	storageOptions: {
		cancelButtonTitle: 'Cancel',
		takePhotoButtonTitle: 'Take Photo from camera',
		chooseFromLibraryButtonTitle: 'Choose from Library',
		cameraType: 'back',
		mediaType: 'photo',
		skipBackup: true,
		cameraRoll: true,
		waitUntilSaved: true, // wait until pic is saved in cameral roll and return path in
		path: 'images' ///
	}
}

const validate = values => {
	// debugger;
	const errors = {}
	if (!values.name) errors.name = localization.required
	else if (values.name.length > 50)
		errors.name = 'name must be less than or equal 50 characters'

	if (!values.manager) errors.manager = localization.required
	if (!values.department) errors.department = localization.required

	if (!values.establishment_year)
		errors.establishment_year = localization.required

	if (values.establishment_year) {
		if (values.establishment_year > 2019 || values.establishment_year < 1500)
			errors.establishment_year = localization.yearfoundedValidation
		else if (isNaN(values.establishment_year))
			errors.establishment_year = localization.yearfoundedNumValidation
	}

	if (!values.courses1) errors.courses1 = localization.required

	// if (!values.courses2)
	//     errors.courses2 = localization.required;
	// if (!values.courses3)
	//     errors.courses3 = localization.required;
	// if (!values.courses4)
	//     errors.courses4 = localization.required;
	// if (!values.courses5)
	//     errors.courses5 = localization.required;
	// if (!values.courses6)
	//     errors.courses6 = localization.required;

	if (!values.professional_card)
		errors.professional_card = localization.required

	if (!values.email) errors.email = localization.required

	if (values.email) {
		var emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const emailChecked = emailValidation.test(values.email.toLowerCase())
		if (!emailChecked) {
			errors.email = localization.emailValidation
		}
	}

	if (!values.phone) errors.phone = localization.required
	if (values.phone) {
		if (isNaN(values.phone)) errors.phone = localization.mobileValidation
		else if (values.phone.length < 8 || values.phone.length > 15)
			errors.phone = localization.phoneValidation
	}

	if (!values.domain) errors.domain = localization.required

	if (!values.password) errors.password = localization.required

	if (!values.confirmPassword) errors.confirmPassword = localization.required

	if (values.password) {
		if (values.password.length < 6)
			errors.password = localization.passwordValidation
	} else if (values.confirmPassword != values.password)
		errors.confirmPassword = localization.exactPassword

	if (!values.country) errors.country = localization.required

	if (!values.city) errors.city = localization.required

	// debugger;
	return errors
}

class RegisterCenter extends Component {
	renderInputField = props => {
		return (
			<View style={{ flex: 0.4 }}>
				<ListItem>
					<CustomInput
						placeholder={props.placeholder}
						secureTextEntry={props.secureTextEntry}
						text={props.input.value}
						changeText={props.input.onChange}
						containerStyle={props.containerStyle}
						label={props.label}
					/>
				</ListItem>

				{props.meta.touched &&
					(props.meta.error && (
						<AppText style={{ color: Colors.red }} text={props.meta.error} />
					))}
			</View>
		)
	}
	renderInputField = props => {
		if (props.meta.touched && props.meta.error) {
		}
		return (
			<View style={{ flex: 0.4 }}>
				<ListItem>
					<CustomInput
						placeholder={props.placeholder}
						error={props.meta.touched && props.meta.error}
						secureTextEntry={props.secureTextEntry}
						text={props.input.value}
						changeText={props.input.onChange}
						containerStyle={props.containerStyle}
						label={props.label}
					/>
				</ListItem>

				{/* {props.meta.touched &&
                        ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))} */}
			</View>
		)
	}

	renderTextareaField = props => {
		// debugger;
		return (
			<View style={{ flex: 0.4 }}>
				<ListItem style={{ flexDirection: 'column', justifyContent: 'center' }}>
					<Label
						style={{
							backgroundColor: 'orange',
							color: 'white',
							width: '100%',
							alignSelf: 'center',
							padding: 10,
							fontSize: 17.5
						}}
					>
						{props.label}
					</Label>
					<Textarea
						value={props.input.value}
						multiline
						scrollEnabled
						style={{
							fontSize: 15,
							backgroundColor: 'white',
							width: '100%',
							borderWidth: 1,
							borderColor:
								props.meta.touched && props.meta.error ? 'red' : 'transparent'
						}}
						onChangeText={props.input.onChange}
						placeholder={props.placeholder}
					/>
				</ListItem>

				{/* {props.meta.touched &&
                     ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))} */}
			</View>
		)
	}

	renderPickerField = props => {
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
						onchangeValue={value => {
							props.input.onChange
						}}
						SetValue={value => props.SetValue(value)}
						error={props.meta.touched && props.meta.error}
					/>
				</ListItem>

				{/* {props.meta.touched &&
             ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))} */}
			</View>
		)
	}
	renderMobileField = props => {
		return (
			<View style={{ flex: 0.4 }}>
				<ListItem>
					<Mobile
						value={props.input.value}
						changeText={props.input.onChange}
						error={props.meta.touched && props.meta.error}
						mobileExtension={props.mobilextension}
						label={localization.mobileNumber}
						subcontainerStyle={{
							flexDirection:
								localization.getLanguage() === 'ar' ? 'row' : 'row-reverse'
						}}
					/>
				</ListItem>

				{/* {props.meta.touched &&
                    ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))} */}
			</View>
		)
	}
	getCountries(allcountries) {
		this.countries = allcountries.countries.map((item, index) => {
			return (
				// <Picker.Item key={item.id} label={item.name_en} value={item}

				// />
				{
					key: item.id,
					label: item.name_en,
					value: item.id,
					phoneCode: item.phonecode
				}
			)
		})
		this.setState({ countries: this.countries })
	}
	registerRowPolicy = () => {
		return (
			<View style={{ flex: 1 }}>
				<View
					style={{
						flex: 1,
						height: '100%',
						width: '100%',
						justifyContent: 'space-between',
						flexDirection: 'row'
					}}
				>
					<ListItem
						style={{
							marginTop: '5%',
							justifyContent: 'center',
							flexDirection: 'row'
						}}
						itemDivider={false}
					>
						<MyCheckbox
							label=''
							onChange={state => {
								this.setState({ policyChecked: state })
							}}
							style={{ alignSelf: 'center' }}
						/>
						<TouchableOpacity
							style={{
								alignSelf: 'center',
								justifyContent: 'center',
								alignContent: 'center'
							}}
							onPress={() => this.props.navigation.push('policy')}
						>
							<Text style={{ marginLeft: '2%', color: Colors.white }}>
								{localization.acceptPolicy}
							</Text>
						</TouchableOpacity>
					</ListItem>
					{this.saveButton}
				</View>
			</View>
		)
	}
	// renderPayment() {
	//     return (

	//         <View style={{flex:1}}>

	//             <ListItem   style={{backgroundColor:'white',width:'100%',marginRight:0,marginLeft:0,paddingHorizontal:10}}>
	//                 <Text style={{ color: Colors.orange,flex:1,fontWeight:'bold'}}>{localization.Subscription} </Text>
	//             </ListItem>
	//             <Card>
	//             <CardItem>
	//                     <Text style={{ textAlign: 'center', flex: 1 }}>{localization.moneyAmount}</Text>
	//                 </CardItem>
	//                 <CardItem style={{ flexDirection: 'row', alignContent: 'center', justifyContent:'center',flex: 1 }}>
	//                     <Left style={{ flexDirection: 'row' }}>
	//                         <Radio style={{ right: 5 }}  selected={this.state.sixMonthes} onPress={()=>this.setState({sixMonthes:true})} />
	//                         <Text>{localization.months6}</Text>
	//                     </Left>
	//                     <Right style={{ flexDirection: 'row' }}>
	//                         <Radio style={{ right: 5 }} selected={!this.state.sixMonthes}  onPress={()=>this.setState({sixMonthes:false})} />
	//                         <Text >{localization.months12}</Text>
	//                     </Right>
	//                 </CardItem>
	//             </Card>
	//             <Card style={{marginTop:5,justifyContent:'center',}}>
	//                 <CardItem>
	//                     <View style={{ flexDirection: 'row' }}>
	//                         <Radio style={{ right: 7 }} selected={this.state.Additional}  onPress={()=>this.setState({Additional:!this.state.Additional})}/>
	//                         <Text>{localization.Saudiriyals}</Text>
	//                     </View>
	//                 </CardItem>
	//                 {/* <CardItem>
	//                     <Button style={{ backgroundColor: 'red' }}><Text style={{ color: "white", textAlign: 'center', flex: 1 }}>{localization.pay}</Text></Button>
	//                 </CardItem> */}
	//             </Card>

	//         </View>
	//     )
	// }
	renderPayment() {
		return (
			<View style={{ flex: 1 }}>
				<ListItem
					style={{
						backgroundColor: 'white',
						width: '100%',
						marginRight: 0,
						marginLeft: 0,
						paddingHorizontal: 10
					}}
				>
					<Text style={{ color: Colors.orange, flex: 1, fontWeight: 'bold' }}>
						{localization.Subscription}{' '}
					</Text>
				</ListItem>
				<Card>
					<CardItem>
						<Text style={{ textAlign: 'center', flex: 1 }}>
							{localization.moneyAmount}
						</Text>
					</CardItem>
					<CardItem
						style={{
							flexDirection: 'row',
							alignContent: 'center',
							justifyContent: 'center',
							flex: 1
						}}
					>
						<Left style={{ flexDirection: 'row' }}>
							<Radio
								style={{ right: 5 }}
								selected={this.state.sixMonthes}
								onPress={() => this.setState({ sixMonthes: true })}
							/>
							<TouchableOpacity
								onPress={() => this.setState({ sixMonthes: true })}
							>
								<Text>{localization.months6}</Text>
							</TouchableOpacity>
						</Left>
						<Right style={{ flexDirection: 'row' }}>
							<Radio
								style={{ right: 5 }}
								selected={!this.state.sixMonthes}
								onPress={() => this.setState({ sixMonthes: false })}
							/>
							<TouchableOpacity
								onPress={() => this.setState({ sixMonthes: false })}
							>
								<Text>{localization.months12}</Text>
							</TouchableOpacity>
						</Right>
					</CardItem>
				</Card>
				<Card style={{ marginTop: 5, justifyContent: 'center' }}>
					<CardItem>
						<View style={{ flexDirection: 'row' }}>
							<Radio
								style={{ right: 7 }}
								selected={this.state.Additional}
								onPress={() =>
									this.setState({ Additional: !this.state.Additional })
								}
							/>
							<Text>{localization.Saudiriyals}</Text>
						</View>
					</CardItem>
					{/* <CardItem>
                        <Button style={{ backgroundColor: 'red' }}><Text style={{ color: "white", textAlign: 'center', flex: 1 }}>{localization.pay}</Text></Button>
                    </CardItem> */}
				</Card>
			</View>
		)
	}

	getCities = value => {
		this.cities = [].concat(...value.cities)
		this.cities = this.cities.map((item, index) => {
			return (
				// <Picker.Item key={item.id} label={item.name_en} value={item.id}

				// />
				{
					// key:item.id ,label:item.name_en,
					value: item.name_en
				}
			)
		})
		this.setState({ cities: this.cities })
	}

	getNationalities = allNationalities => {
		this.nationalities = allNationalities.nationalities.map((item, index) => {
			return (
				// <Picker.Item key={item.id} label={item.name_en} value={item.id}

				// />
				{
					key: item.id,
					label: item.name_en,
					value: item.id,
					phoneCode: item.phonecode
				}
			)
		})
		this.setState({ nationalities: this.nationalities })
	}
	constructor(props) {
		super(props)
		// debugger;
		this.state = {
			avatarSource: null,
			visible: false,
			image: null,
			country_id: null,
			city_id: null,
			nationality_id: null,
			policyChecked: false,
			errList: [],
			prefix: '',
			nationality: '',
			country: '',
			city: '',
			countries: [],
			nationalities: [],
			cities: [],
			Additional: false,
			sixMonthes: true,
			saveButtonPressed: false
		}
	}
	allCountriesLocal = null
	allCitiesLocal = null
	registerButton

	submitCenter = values => {
		// debugger;
		if (this.state.policyChecked) {
			this.setState({ saveButtonPressed: true })
			this.props.onRegisterCenter({
				name: values.name,
				department: values.department,
				manager: values.manager,
				establishment: values.establishment_year,
				country_id: values.country,
				city_id: values.city,
				courses1: values.courses1,
				courses2: values.courses2 || 'Comming Soon',
				courses3: values.courses3 || 'Comming Soon',
				courses4: values.courses4 || 'Comming Soon',
				courses5: values.courses5 || 'Comming Soon',
				courses6: values.courses6 || 'Comming Soon',
				professional_card: values.professional_card,
				email: values.email,
				prefix: this.prefix,
				phone: values.phone,
				password: values.password,
				confirmPassword: values.confirmPassword,
				image: this.state.image,
				domain: values.domain,
				fcmToken: LocalStorage.token
				//   modalContent:null
			})
		} else {
			this.refs.toast.show(localization.policyMessage)
		}

		//alert(`Validation success . Values= ${JSON.stringify(values)}`)
	}

	renderInputField = props => {
		return (
			<View style={{ flex: 0.4 }}>
				<ListItem>
					<CustomInput
						error={props.meta.touched && props.meta.error}
						placeholder={props.placeholder}
						secureTextEntry={props.secureTextEntry}
						text={props.input.value}
						changeText={props.input.onChange}
						containerStyle={props.containerStyle}
						label={props.label}
					/>
				</ListItem>

				{/* {props.meta.touched &&
                    ((props.meta.error && <AppText style={{ color: Colors.red }} text={props.meta.error} />))} */}
			</View>
		)
	}
	renderImagePicker() {
		return (
			<View
				style={{ flexDirection: 'row', width: '90%', justifyContent: 'center' }}
			>
				<View style={{ flex: 0.3, left: 10 }}>
					<TouchableOpacity
						style={{
							borderWidth: 1,
							borderColor: 'rgba(0,0,0,0.2)',
							alignItems: 'center',
							justifyContent: 'center',
							width: 100,
							height: 100,
							backgroundColor: '#fff',
							borderRadius: 100
						}}
						onPress={() => {
							ImagePicker.showImagePicker(options, response => {
								console.log('Response = ', response)
								if (response.didCancel) {
									console.log('User cancelled image picker')
								} else if (response.error) {
									console.log('ImagePicker Error: ' + response.error)
								}
								// source{{uri:'file:///storage/emulated/0/DCIM/IMG_20161201_125218.jpg'}}
								else {
									this.setState({ image: response.uri })
									this.setState({
										avatarSource: {
											uri: response.uri,
											type: 'image/jpg',
											name: 'image.jpg'
										}
									})
								}
							})
						}}
					>
						{this.state.avatarSource === null ? (
							<Text
								style={{ textAlign: 'center', flexWrap: 'wrap', width: '50%' }}
							>
								{localization.upladImage}
							</Text>
						) : (
							<Image
								style={{
									borderWidth: 1,
									borderColor: 'rgba(0,0,0,0.2)',
									alignItems: 'center',
									justifyContent: 'center',
									width: 100,
									height: 100,
									backgroundColor: '#fff',
									borderRadius: 100
								}}
								source={{ uri: this.state.avatarSource.uri }}
							/>
						)}
					</TouchableOpacity>
				</View>
				{/* <View style={{ flex: 0.4 }}>
                    <Image source={this.state.avatarSource} style={{ height: '40%', width: '70%', alignSelf: 'center', flex: 1 }} />
                </View> */}
				{/* <View style={{ flex: 0.3 }}>
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            borderColor: 'rgba(0,0,0,0.2)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 100,
                            height: 100,
                            backgroundColor: '#fff',
                            borderRadius: 100,
                        }}
                        onPress={() => {
                           // debugger;
                            this.setState({ visible: true });
                            //  this.renderModal(true)

                        }}

                    >
                        {this.state.avatarSource ? <Image source={this.state.avatarSource} /> :
                            <Text style={{ textAlign: 'center', flexWrap: 'wrap', width: '45%' }}>{localization.show}</Text>

                        }



                    </TouchableOpacity>



                </View>
           */}
			</View>
		)
	}
	renderSignUp() {
		return (
			<View style={{ flexDirection: 'row', marginBottom: 100 }}>
				<View style={{ flex: 0.7, flexDirection: 'row' }}>
					{this.registerRowPolicy()}
				</View>
				{this.registerButton}
			</View>
		)
	}

	componentDidMount() {
		this.props.getCountries()
		this.props.getNationalities()
	}
	componentWillReceiveProps(NewProps) {
		this.props = NewProps
		if (this.props.nationalities) {
			this.getNationalities(this.props.nationalities)
		}
		if (this.props.countries) {
			this.getCountries(this.props.countries)
		}

		if (this.props.cities) {
			this.getCities(this.props.cities)
		}
	}
	_toggleModal = () => this.setState({ visible: !this.state.visible })
	getAllNeededCountries(countries) {
		try {
			this.allCountriesLocal = countries.countries.map((item, index) => {
				if (typeof item !== 'undefined')
					return <Picker.Item key={item.id} label={item.name_en} value={item} />
			})
		} catch (error) {
			console.log('=============allcounterues=======================')
			console.log(error)
			console.log('====================================')
		}
	}

	render() {
		if (this.state.saveButtonPressed) {
			this.registerButton = <ActivityIndicator />
		} else {
			this.registerButton = (
				<CustomButton
					style={{
						marginRight: '5%',
						flex: 0.3,
						borderColor: Colors.black,
						borderWidth: 0.5,
						borderRadius: 10
					}}
					text={localization.Register}
					onPress={this.props.handleSubmit(this.submitCenter)}
				/>
			)
		}

		if (this.props.errorsList) {
			this.state.errList = []
			for (let err in this.props.errorsList) {
				this.state.errList.push(
					<AppText
						style={{ color: Colors.red }}
						text={this.props.errorsList[err][0]}
					/>
				)
			}
		}
		if (this.props.center && this.state.saveButtonPressed) {
			this.refs.toast.show(this.props.center.msg, 1500, () => {
				new LocalStorage().setVisits({
					id: this.props.center.data.user.id,
					num: 0
				})
				this.setState({ saveButtonPressed: true })
				this.props.navigation.navigate('RegistrationSuccess', {
					userType: 'center'
				})
			})
		}

		return (
			<Container style={{ flex: 1 }}>
				<HeaderScreen
					navigation={this.props.navigation}
					style={{ width: '100%' }}
				/>
				<Content contentContainerStyle={{ flex: 1 }}>
					<ScrollView style={{ backgroundColor: Colors.lightBlue }}>
						<Card>
							<CardItem style={{ backgroundColor: Colors.white }}>
								<Body>
									<Text style={{ color: Colors.orange, alignSelf: 'center' }}>
										{localization.RegisterCenter}
									</Text>
								</Body>
							</CardItem>
						</Card>
						<List>
							<ListItem
								style={{
									backgroundColor: 'white',
									width: '100%',
									marginRight: 0,
									marginLeft: 0,
									paddingHorizontal: 10
								}}
							>
								<Text
									style={{ color: Colors.orange, flex: 1, fontWeight: 'bold' }}
								>
									{localization.AbouttheCenter}
								</Text>
							</ListItem>

							<Field
								name='name'
								component={this.renderInputField}
								changeText={text => this.setState({ name: text })}
								text={this.state.name}
								placeholder={localization.placeholder50}
								label={localization.name}
							/>
							<Field
								label={localization.department}
								data={[
									{ value: localization.Cen },
									{ value: localization.instatue }
								]}
								placeholder={localization.character}
								name='department'
								component={this.renderPickerField}
								SetValue={value => {
									this.props.change('department', value)
								}}
							/>

							<Field
								component={this.renderInputField}
								name='manager'
								changeText={text => this.setState({ manager: text })}
								text={this.state.manager}
								label={localization.manager}
							/>

							<Field
								component={this.renderInputField}
								name='establishment_year'
								changeText={text => this.setState({ establishment: text })}
								text={this.state.establishment}
								label={localization.YearFounded}
							/>

							{/* Country Component */}

							<Field
								containerStyle={{ top: '4%' }}
								label={localization.country}
								data={this.state.countries}
								placeholder={localization.pickCountry}
								name='country'
								component={this.renderPickerField}
								SetValue={value => {
									let selectedObj = this.props.countries.countries.filter(
										arr => {
											return arr.id === value
										}
									)[0]
									this.setState({
										country: value,
										prefix: selectedObj.phonecode,
										cities: [{}]
									})
									this.props.change('prefix', selectedObj.phonecode)
									this.props.change('country', value)
									this.props.change('city', null)
									this.props.getcities(selectedObj)
								}}
							/>

							<Field
								label={localization.city}
								data={this.state.cities}
								placeholder={localization.pickCity}
								name='city'
								component={this.renderPickerField}
								SetValue={value => {
									let ALLCITIESDATA = [].concat(...this.props.cities.cities)

									let selectedObj = ALLCITIESDATA.filter(arr => {
										return arr.name_en === value
									})[0]
									this.props.change('city', selectedObj.id)
									this.setState({ city: value })
								}}
							/>

							<ListItem
								style={{
									backgroundColor: 'white',
									width: '100%',
									marginRight: 0,
									marginLeft: 0,
									paddingHorizontal: 10
								}}
							>
								<Text
									style={{ color: Colors.orange, flex: 1, fontWeight: 'bold' }}
								>
									{localization.ProfessionalInformation}
								</Text>
							</ListItem>

							<ListItem
								style={{
									backgroundColor: 'orange',
									width: '90%',
									alignSelf: 'center',
									marginTop: 10,
									bottom: '-2%',
									marginLeft: 0,
									marginRight: 0
								}}
							>
								<Text
									style={{
										color: Colors.white,
										flex: 1,
										fontWeight: 'bold',
										textAlign: 'center'
									}}
								>
									{localization.Areas}{' '}
								</Text>
							</ListItem>

							<Field
								name='courses1'
								component={this.renderInputField}
								changeText={text => this.setState({ courses1: text })}
								text={this.state.courses1}
								label='1'
								style={{ flex: 0.1 }}
								inputStyle={{ flex: 0.9 }}
							/>

							<Field
								name='courses2'
								component={this.renderInputField}
								label='2'
								changeText={text => this.setState({ courses2: text })}
								text={this.state.courses2}
								style={{ flex: 0.1 }}
								inputStyle={{ flex: 0.9 }}
								required={false}
							/>

							<Field
								name='courses3'
								component={this.renderInputField}
								label='3'
								changeText={text => this.setState({ courses3: text })}
								text={this.state.courses3}
								style={{ flex: 0.1 }}
								inputStyle={{ flex: 0.9 }}
							/>

							<Field
								name='courses4'
								component={this.renderInputField}
								label='4'
								changeText={text => this.setState({ courses4: text })}
								text={this.state.courses4}
								style={{ flex: 0.1 }}
								inputStyle={{ flex: 0.9 }}
							/>
							<Field
								name='courses5'
								component={this.renderInputField}
								label='5'
								changeText={text => this.setState({ courses5: text })}
								text={this.state.courses5}
								style={{ flex: 0.1 }}
								inputStyle={{ flex: 0.9 }}
							/>

							<Field
								name='courses6'
								component={this.renderInputField}
								label='6'
								changeText={text => this.setState({ courses6: text })}
								text={this.state.courses6}
								style={{ flex: 0.1 }}
								inputStyle={{ flex: 0.9 }}
							/>

							<Field
								name='professional_card'
								label={localization.ProfessionalCard}
								component={this.renderTextareaField}
								onChangeText={text =>
									this.setState({ professional_card: text })
								}
								value={this.state.professional_card}
								placeholder={localization.DesignCard}
							/>
							<ListItem
								style={{
									backgroundColor: 'white',
									width: '100%',
									marginRight: 0,
									marginLeft: 0,
									paddingHorizontal: 10
								}}
							>
								<Text
									style={{ color: Colors.orange, flex: 1, fontWeight: 'bold' }}
								>
									{localization.Meansofcommunication}
								</Text>
							</ListItem>

							<Field
								name='email'
								component={this.renderInputField}
								changeText={text => this.setState({ email: text })}
								text={this.state.email}
								label={localization.email}
								placeholder={localization.placeholder50}
							/>

							<Field
								type='text'
								name='phone'
								component={this.renderMobileField}
								mobilextension={this.state.prefix}
							/>

							<Field
								name='domain'
								component={this.renderInputField}
								changeText={text => this.setState({ domain: text })}
								text={this.state.domain}
								label={localization.website}
								placeholder='www.domain.com'
							/>

							<Field
								name='password'
								component={this.renderInputField}
								changeText={text => this.setState({ password: text })}
								text={this.state.password}
								label={localization.password}
								style={{ flex: 0.3 }}
								secureTextEntry={true}
							/>

							<Field
								name='confirmPassword'
								component={this.renderInputField}
								changeText={text => this.setState({ confirmPassword: text })}
								text={this.state.confirmPassword}
								secureTextEntry={true}
								label={localization.confirmPassword}
								style={{ flex: 0.3 }}
							/>
						</List>
						{this.renderPayment()}

						{this.renderImagePicker()}

						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center'
							}}
						>
							{this.state.errList}
						</View>
						{this.props.submitFailed && (
							<Text style={{ flex: 1, color: 'red', textAlign: 'center' }}>
								{localization.requiredFields}
							</Text>
						)}

						{this.renderSignUp()}
					</ScrollView>
					<Toast
						ref='toast'
						position='top'
						positionValue={200}
						fadeInDuration={750}
						fadeOutDuration={2000}
						// opacity={0.8}
						textStyle={{ color: 'white' }}
					/>
				</Content>
			</Container>
		)
	}
}
const styles = StyleSheet.create({})
//change
const RegisterCenterForm = reduxForm({
	form: 'RegisterCenter',
	validate
})(RegisterCenter)
const mapStateToProps = state => ({
	...state.centersReducers,
	...state.countryReducer
})
const mapDispatchToProps = dispatch => ({
	// onRegisterCenter: (newCenter) => dispatch(registerCenterAction(newCenter)),
	// getAllCountries: () => dispatch(allCountries()),
	// getAllNationalities: () => dispatch(allNationalities()),
	// getAllCities: (country_id) => dispatch(allCities(country_id)),
	// certainCity: (city_id) => dispatch(selectCity(city_id)),
	// certainCountry: (country_id) => dispatch(selectCountry(country_id)),
	// certainNationality: (nationality_id) => dispatch(selectNationality(nationality_id)),

	UpdatePrefix: prefix => dispatch(updatePrefix(prefix)),
	UpdateState: stateID => dispatch(updateState(stateID)),
	getCountries: () => dispatch(allCountries()),
	getcities: country => dispatch(allCities(country)),
	getNationalities: () => dispatch(allNationalities()),
	onRegisterCenter: newCenter => dispatch(registerCenterAction(newCenter))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RegisterCenterForm)
