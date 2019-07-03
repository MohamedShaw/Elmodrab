import React, { Component } from 'react'
import ImagePicker from 'react-native-image-picker'
import CustomInput from '../../Ui/CustomIput'
import { connect } from 'react-redux'
import Mobile from '../../Ui/Mobile'
import { registerTrainerAction } from '../../store/Actions/actions/Trainers'
import {
	Image,
	View,
	StyleSheet,
	Text,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	ImageBackground
} from 'react-native'
import {
	Picker,
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
	Container,
	Content,
	CheckBox,
	Icon
} from 'native-base'
import {
	allCountries,
	allNationalities,
	allCities,
	selectCity,
	selectCountry,
	selectNationality
} from '../../store/Actions/actions/country'
import { Colors } from '../../assets/colors'
import localization from '../../localization/localization'
import { HeaderScreen } from '../../Ui/Header'
import Modal from 'react-native-modal'
import { Field, reduxForm } from 'redux-form'
import { CustomButton } from '../../Ui/customButon'
import { AppText } from '../../Ui/appText'
const uri = 'https://facebook.github.io/react-native/docs/assets/favicon.png'
import { RenderCustomPicker } from '../../Ui/NewcustomPicker'
import { RenderCustomPicker1 } from '../../Ui/NewcustomPicker1'
import { LocalStorage } from '../../helpers/localStorage'
import Toast, { DURATION } from 'react-native-easy-toast'
import { Avatar } from '../../Ui/avatar'
import { CustomPicker } from '../../Ui/customPicker'
import MyCheckbox from './Components/CheckBok/checkbox'

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
	if (!values.fullname) {
		errors.fullname = localization.required
	}
	// if (!values.sex) {
	//     errors.sex = localization.required;
	// }

	if (!values.country) {
		errors.country = localization.required
	}
	if (!values.city) {
		errors.city = localization.required
	}
	//  if (!values.nationality) {
	//     errors.nationality = localization.required;
	// }
	if (!values.role_id) {
		errors.role_id = localization.required
	}
	if (!values.credit) {
		errors.credit = localization.required
	}

	if (!values.trainerField) {
		errors.trainerField = localization.required
	}
	if (!values.courses1) {
		errors.courses1 = localization.required
	}
	if (!values.courses2) {
		errors.courses2 = localization.required
	}
	if (!values.courses2) {
		errors.courses3 = localization.required
	}

	if (!values.professionalCard) {
		errors.professionalCard = localization.required
	}
	if (!values.email) {
		errors.email = localization.required
	}
	if (values.email) {
		var emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		const emailChecked = emailValidation.test(values.email.toLowerCase())
		if (!emailChecked) {
			errors.email = localization.emailValidation
		}
	}
	if (!values.phone) {
		errors.phone = localization.required
	}
	if (values.phone) {
		if (values.phone.length < 8 || values.phone.length > 15)
			errors.phone = localization.phoneValidation
		else if (isNaN(values.phone)) {
			errors.phone = localization.mobileValidation
		}
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
	if (values.confirmPassword) {
		if (values.confirmPassword !== values.password)
			errors.confirmPassword = localization.exactPassword
	}
	return errors
}
class RegisterTrainer extends Component {
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
	state = {
		visible: false,
		avatarSource: null,
		image: null,
		errList: [],
		policyChecked: false,
		checkColor: 'black',
		selectedCity: null,
		prefix: '',
		nationality: '',
		country: '',
		city: '',
		countries: [],
		nationalities: [],
		cities: [],
		sixMonthes: true,
		Additional: false,
		saveButtonPressed: false
	}
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		this.props.getCountries()
		this.props.getNationalities()
		// let od={
		//     city_id: 14991,
		//    confirmPassword: "123456",
		//    country_id: 64,
		//    courses1: "Yoga",
		//    courses2: "React",
		//    courses3: "Php",
		//    credit: "Microsoft 😂",
		//    email: "F5faa1ec24441@mailboxy.fun",
		//    image: "content://media/external/images/media/21824",
		//    name: "Opama",
		//    nationality_id: 194,
		//    password: "123456",
		//    phone: "12435677775",
		//    prefix: "20",
		//    professional_card: "Ggygg",
		//    role_id: "4",
		//    sex: "male",
		//    trainer_field: "القيادة والتخطيط ",
		//            }
		//            this.props.onRegisterTrainer(od)
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
	allCountriesLocal
	allCitiesLocal
	allgenders
	allNationalitiesLocal
	prefix
	registerButton

	getAllNeededCountries(countries) {
		this.allCountriesLocal = countries.countries.map((item, index) => {
			return (
				<Picker.Item
					key={item.id.toString()}
					label={item.name_en}
					value={item}
				/>
			)
		})
	}
	_toggleModal = () => this.setState({ visible: !this.state.visible })

	renderCard() {
		return (
			<Card>
				<CardItem style={{ backgroundColor: 'white' }}>
					<Body>
						<Text style={{ color: 'orange', alignSelf: 'center' }}>
							{localization.registerTrainer}
						</Text>
					</Body>
				</CardItem>
			</Card>
		)
	}

	renderList() {
		return (
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
					<Text style={{ color: Colors.orange, flex: 1, fontWeight: 'bold' }}>
						{localization.personalData}{' '}
					</Text>
				</ListItem>

				<Field
					label={localization.name}
					name='fullname'
					containerStyle={{ top: '2%' }}
					component={this.renderInputField}
					type='text'
				/>
				{/* un commit */}
				<Field
					label={localization.sex}
					data={[{ value: localization.male }, { value: localization.female }]}
					placeholder={localization.sex}
					name='sex'
					component={this.renderPickerField}
					SetValue={value => {
						this.props.change(
							'sex',
							value === localization.male ? 'male' : 'female'
						)
					}}
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
				<Field
					label={localization.character}
					data={[
						{ value: localization.Trainer },
						{ value: localization.Consultant }
					]}
					placeholder={localization.character}
					name='role_id'
					component={this.renderPickerField}
					SetValue={value => {
						this.props.change(
							'role_id',
							value === localization.Trainer ? '2' : '5'
						)
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
					<Text style={{ color: Colors.orange, flex: 1, fontWeight: 'bold' }}>
						{localization.ProfessionalInformation}{' '}
					</Text>
				</ListItem>
				<ListItem
					style={{
						backgroundColor: 'orange',
						width: '90%',
						alignSelf: 'center',
						marginTop: 10,
						bottom: '-4.4%',
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
					containerStyle={{ top: 0 }}
					listSyle={{ marginTop: 0 }}
					data={[
						{ value: 'القيادة والتخطيط ' },
						{ value: ' الإدارية والمالية' },
						{ value: 'الترببة والتعليم' },
						{ value: 'إدارة المشاريع والهندسة ' },
						{ value: 'الجودة والتميز المؤسسي' },
						{ value: 'ريادة الأعمال' },
						{ value: 'الموارد البشرية والتدريب' },
						{ value: 'العلاقات العامة والسياحة والإعلام' },
						{ value: 'الموهبة والإبداع والابتكار' },
						{ value: 'التسويق والمبيعات وخدمة العملاء' },
						{ value: 'المشتريات والمخازن' },
						{ value: 'السلامة والصحة المهنية' },
						{ value: 'المصارف والتأمين' },
						{ value: 'تكنولوجيا المعلومات والاتصالات' },
						{ value: 'النفط والغاز' },
						{ value: 'التنمية البشرية وتطوير الذات' },
						{ value: 'الحاسب الآلي وتقنية المعلومات' },
						{ value: 'الاحتياجات الخاصة ' },
						{ value: 'الاقتصاد والتجارة' },
						{ value: 'البرمجة اللغوية العصبية' },
						{ value: 'الصحة والطب' },
						{ value: 'القانونية والتحكيم' },
						{ value: 'الرياضة واللياقة البدنية' },
						{ value: 'غير ذلك' }
					]}
					placeholder={localization.Areas}
					name='trainerField'
					component={this.renderPickerField}
					SetValue={value => {
						this.props.change('trainerField', value)
					}}
				/>

				<Field
					name='credit'
					label={localization.primaryAccreditation}
					placeholder={localization.primaryAccreditation}
					component={this.renderTextareaField}
				/>

				<ListItem
					style={{
						backgroundColor: 'orange',
						width: '90%',
						marginRight: 0,
						marginLeft: 0,
						alignSelf: 'center'
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
						{localization.trainingTours}{' '}
					</Text>
				</ListItem>

				<Field
					label='1'
					name='courses1'
					component={this.renderInputField}
					type='text'
				/>

				<Field
					label='2'
					name='courses2'
					component={this.renderInputField}
					type='text'
				/>

				<Field
					label='3'
					name='courses3'
					component={this.renderInputField}
					type='text'
				/>

				<Field
					name='professionalCard'
					label={localization.ProfessionalCard}
					placeholder={localization.DesignCard}
					component={this.renderTextareaField}
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

				{this.renderPayment()}
			</List>
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
	submitTrainer = values => {
		// debugger;
		if (this.state.policyChecked) {
			this.setState({ saveButtonPressed: true })
			let obj = {
				name: values.fullname,
				sex: values.sex,
				nationality_id: values.nationality,
				country_id: values.country,
				city_id: values.city,
				role_id: values.role_id,
				trainer_field: values.trainerField,
				professional_card: values.professionalCard,
				phone: values.phone,
				password: values.password,
				confirmPassword: values.confirmPassword,
				email: values.email,
				credit: values.credit,
				courses1: values.courses1,
				courses2: values.courses2,
				courses3: values.courses3,
				image: this.state.image,
				prefix: this.state.prefix
			}
			console.log('obj', obj)
			this.props.onRegisterTrainer(obj)
			// this.props.onRegisterTrainer({
			//     name: values.fullname,
			//     sex: values.sex,
			//     character: values.character,
			//     nationality_id: values.nationality,
			//     country_id: values.country.id,
			//     city_id: values.city.id,
			//     role_id:values.role_id,
			//     trainer_field: values.trainerField,
			//     professional_card: values.professionalCard,
			//     phone: values.phone,
			//     password: values.password,
			//     confirmPassword: values.confirmPassword,
			//     email: values.email,
			//     credit: values.credit,
			//     courses1: values.courses1,
			//     courses2: values.courses2,
			//     courses3: values.courses3,
			//     image: this.state.image,
			//     prefix: this.prefix,

			//     fcmToken: LocalStorage.token
			// })
		} else {
			this.refs.toast.show(localization.policyMessage)
		}
	}

	renderImageSourceModal() {
		return (
			<Modal
				style={{ alignSelf: 'center', width: '80%', height: '80%' }}
				//  backdropColor='white'
				isVisible={this.state.visible}
			>
				<TouchableOpacity onPress={this._toggleModal}>
					<Icon name='md-close' style={{ color: 'white' }} />
				</TouchableOpacity>
				<View style={{ width: '100%', height: '20%' }}>
					<Image
						source={this.state.avatarSource}
						style={{
							width: '70%',
							height: '70%',
							flex: 1,
							alignSelf: 'center'
						}}
					/>
				</View>
			</Modal>
		)
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
					onPress={this.props.handleSubmit(this.submitTrainer)}
				/>
			)
		}

		if (this.props.trainer && this.state.saveButtonPressed) {
			this.refs.toast.show(this.props.trainer.msg, 1500, () => {
				new LocalStorage().setVisits({
					id: this.props.trainer.data.user.id,
					num: 0
				})
				this.setState({ saveButtonPressed: false })
				this.props.navigation.navigate('RegistrationSuccess', {
					userType: 'trainer'
				})
			})
		} else {
			console.log(this.props.errorsList)
			if (this.props.errorsList && this.state.saveButtonPressed) {
				this.setState({ saveButtonPressed: false })
				this.state.errList = []
				// debugger;
				if (this.props.errorsList === 'TypeError:Network request failed') {
					this.refs.toast(localization.internetConnection)
				}
				for (let err in this.props.errorsList) {
					this.state.errList.push(
						<AppText
							style={{ color: Colors.red }}
							text={this.props.errorsList[err][0]}
						/>
					)
				}
			}
		}

		return (
			<Container style={{ flex: 1, backgroundColor: Colors.lightBlue }}>
				<HeaderScreen navigation={this.props.navigation} />

				<Content contentContainerStyle={{ flex: 1 }}>
					<ScrollView
						style={{ backgroundColor: Colors.lightBlue, width: '100%' }}
					>
						{this.renderCard()}

						<Text style={{ textAlign: 'center', width: '90%', color: 'red' }}>
							{localization.requiredFields}
						</Text>
						{this.renderList()}
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
const mapStateToProps = state => {
	return {
		...state.trainersReducers,
		...state.countryReducer
	}
}
const mapDispatchToProps = dispatch => {
	return {
		onRegisterTrainer: newTrainer =>
			dispatch(registerTrainerAction(newTrainer)),
		// getAllCountries: () => dispatch(allCountries()),
		// getAllNationalities: () => dispatch(allNationalities()),
		// getAllCities: (country_id) => dispatch(allCities(country_id)),
		// certainCity: (city_id) => dispatch(selectCity(city_id)),
		// certainCountry: (country_id) => dispatch(selectCountry(country_id)),
		// certainNationality: (nationality_id) => dispatch(selectNationality(nationality_id))
		UpdatePrefix: prefix => dispatch(updatePrefix(prefix)),
		UpdateState: stateID => dispatch(updateState(stateID)),
		// Register: (data) => dispatch(RegisterVisitorRequest(data)),
		getCountries: () => dispatch(allCountries()),
		getcities: country => dispatch(allCities(country)),
		getNationalities: () => dispatch(allNationalities())
	}
}
const registerTrainerForm = reduxForm({
	form: 'registerTrainer',
	validate
})(RegisterTrainer)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(registerTrainerForm)
