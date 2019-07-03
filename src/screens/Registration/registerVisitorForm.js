import React, { Component } from 'react'
import {
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	TouchableOpacity
} from 'react-native'
import { Field, reduxForm } from 'redux-form'
import CustomInput from '../../Ui/CustomIput'
import { ListItem, Button, CheckBox, Picker } from 'native-base'
import { CustomPicker } from '../../Ui/customPicker'
import { connect } from 'react-redux'
import {
	allCountries,
	allNationalities,
	allCities
} from '../../store/Actions/actions/country'
import Mobile from '../../Ui/Mobile'
import { Colors } from '../../assets/colors'
import { CustomButton } from '../../Ui/customButon'
import localization from '../../localization/localization'
import { AppText } from '../../Ui/appText'
import Toast from 'react-native-easy-toast'
import { RegisterVisitorRequest } from '../../store/Actions/actions/visitor'
import { LocalStorage } from '../../helpers/localStorage'

import MyCheckbox from './Components/CheckBok/checkbox'

const validate = values => {
	// debugger;
	console.log(values)
	const errors = {}
	if (!values.fullname) {
		errors.fullname = localization.required
	}
	if (!values.email) {
		errors.email = localization.required
	}
	if (values.email) {
		var emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const emailChecked = emailValidation.test(values.email.toLowerCase())
		if (!emailChecked) errors.email = localization.emailValidation
	}
	if (!values.phone) {
		errors.phone = localization.required
	}
	if (values.phone) {
		if (values.phone.length < 8 && values.phone.length > 15)
			errors.phone = localization.phoneValidation
		else if (isNaN(values.phone)) {
			errors.phone = localization.mobileValidation
		}
	}
	if (!values.country) {
		errors.country = localization.required
	}
	if (!values.city) {
		errors.city = localization.required
	}
	if (!values.nationality) {
		errors.nationality = localization.required
	}
	if (!values.password) {
		errors.password = localization.required
	}
	if (values.password) {
		if (values.password.length < 6)
			errors.password = localization.passwordValidation
	}
	if (!values.confirmPassword) {
		errors.confirmPassword = localization.required
	}
	if (values.confirmPassword && values.password) {
		if (values.confirmPassword !== values.password) {
			errors.confirmPassword = localization.exactPassword
		}
	}
	return errors
}

class VisitorComponentForm extends Component {
	state = {
		policyChecked: false,
		countries: [],
		nationalities: [],
		cities: [],
		prefix: '',
		nationality: '',
		country: '',
		city: '',
		name: '',
		email: '',
		phone: '',
		saveButtonPressed: false
	}
	countries
	nationalities
	cities
	prefix
	saveButton
	errors = []

	constructor(props) {
		super(props)
		// debugger;
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
							//     onPress={(event) => {
							//     this.setState({ policyChecked: !this.state.policyChecked })
							// }
							// }
							// style={{color:'transparent',}}
							//     checked={this.state.policyChecked}
							//      color={this.state.policyChecked?Colors.orange:Colors.black} />

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

	mysubmit = values => {
		if (this.state.policyChecked) {
			//  alert("values: " + values);
			this.props.Register({
				name: values.fullname,
				email: values.email,
				prefix: this.state.prefix,
				phone: values.phone,
				password: values.password,
				confirmPassword: values.confirmPassword,
				countryID: values.country,
				stateID: values.city,
				cityID: values.city,
				nationality: values.nationality,
				fcmToken: LocalStorage.token
			})
			this.setState({ saveButtonPressed: true })
		} else {
			this.refs.toast.show(localization.policyMessage)
		}
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
	renderPickerField = props => {
		return (
			<View style={{ flex: 0.4 }}>
				<ListItem>
					<CustomPicker
						containerStyle={props.containerStyle}
						placeholder={props.placeholder}
						value={props.input.value}
						data={props.data}
						label={props.label}
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

	render() {
		if (this.state.saveButtonPressed) {
			this.saveButton = (
				<ListItem style={{ flex: 0.5, width: 100, height: 100 }}>
					<ActivityIndicator />
				</ListItem>
			)
		} else {
			this.saveButton = (
				<ListItem style={{ flex: 0.5, width: 100, height: 200 }}>
					<CustomButton
						style={{
							marginRight: '5%',
							flex: 1,
							borderColor: Colors.black,
							borderWidth: 0.5,
							borderRadius: 10
						}}
						text={localization.Register}
						onPress={this.props.handleSubmit(this.mysubmit)}
					/>
				</ListItem>
			)
		}

		if (this.state.saveButtonPressed && this.props.visitor) {
			if (this.props.visitor.status) {
				this.refs.toast.show(this.props.visitor.msg, 2000, () => {
					this.props.navigation.navigate('RegistrationSuccess', {
						userType: 'visitor'
					})
				})
			} else {
				this.errors = []
				for (var property in this.props.visitor.data.errors) {
					this.errors.push(
						<AppText
							style={{ color: Colors.red }}
							text={this.props.visitor.data.errors[property][0]}
						/>
					)
				}
			}
			this.setState({ saveButtonPressed: false })
		}
		console.log('allProps', this.props)
		return (
			<View>
				<Field
					type='text'
					label={localization.name}
					containerStyle={{ top: '2%' }}
					name='fullname'
					component={this.renderInputField}
					type='text'
				/>
				<Field
					data={this.state.nationalities}
					containerStyle={{ top: '3%' }}
					label={localization.nationality}
					placeholder={localization.pickNationality}
					name='nationality'
					type='text'
					SetValue={value => {
						this.setState({ nationality: value })
						this.props.change('nationality', value)
					}}
					component={this.renderPickerField}
				/>

				<Field
					containerStyle={{ top: '4%' }}
					label={localization.country}
					data={this.state.countries}
					placeholder={localization.pickCountry}
					name='country'
					component={this.renderPickerField}
					SetValue={value => {
						let selectedObj = this.props.countries.countries.filter(arr => {
							return arr.id === value
						})[0]
						this.setState({
							country: value,
							prefix: selectedObj.phonecode,
							cities: [{}]
						})
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

				<Field
					type='text'
					label={localization.email}
					name='email'
					component={this.renderInputField}
				/>

				<Field
					type='text'
					name='phone'
					component={this.renderMobileField}
					mobilextension={this.state.prefix}
				/>

				<Field
					type='text'
					label={localization.password}
					secureTextEntry={true}
					containerStyle={{ top: '2%' }}
					name='password'
					component={this.renderInputField}
					type='text'
				/>

				<Field
					type='text'
					name='confirmPassword'
					label={localization.confirmPassword}
					secureTextEntry={true}
					containerStyle={{ top: '2%' }}
					component={this.renderInputField}
					type='text'
				/>

				<View>
					{this.errors}
					{this.props.submitFailed && (
						<Text style={{ flex: 1, color: 'red', textAlign: 'center' }}>
							{localization.requiredFields}
						</Text>
					)}
				</View>

				{this.registerRowPolicy()}

				<Toast
					ref='toast'
					position='bottom'
					positionValue={160}
					fadeInDuration={750}
					fadeOutDuration={1000}
					opacity={0.8}
					textStyle={{ color: 'white' }}
				/>
			</View>
		)
	}
}

const mapStateToProps = state => {
	return {
		...state.visitorReducer,
		...state.countryReducer
	}
}
const mapDispatchToProps = dispatch => {
	return {
		UpdatePrefix: prefix => dispatch(updatePrefix(prefix)),
		UpdateState: stateID => dispatch(updateState(stateID)),
		Register: data => dispatch(RegisterVisitorRequest(data)),
		getCountries: () => dispatch(allCountries()),
		getcities: country => dispatch(allCities(country)),
		getNationalities: () => dispatch(allNationalities())
	}
}

const VisitorForm = reduxForm({
	// a unique name for the form
	initialValues: {
		//         fullname:'ehs',
		// email:'ebrahimhassan1121@gmail.com',
		// prefix:20,
		// phone:1275266459,
		// password:'123456',
		// confirmPassword:'123456',
		// country_id:64,
		// city_id:1054,
		// nationality_id:64
	},
	form: 'visitor',
	validate
})(VisitorComponentForm)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(VisitorForm)
