import React, { Component, PureComponent } from 'react'
import { Picker, Label } from 'native-base'
import { View, Platform, Dimensions } from 'react-native'
import localization from '../localization/localization'
import { Colors } from '../assets/colors'
import Icon from 'react-native-vector-icons/Ionicons'
import { Dropdown } from 'react-native-material-dropdown'
export class CustomPicker extends PureComponent {
	constructor(props) {
		super(props)
		this.state = {
			type: '',
			data: [],
			value: ''
		}
	}
	componentWillReceiveProps(NewProps) {
		this.setState({ type: NewProps.placeholder })
		this.props = NewProps
		if (NewProps.data != this.state.data && NewProps.data.length > 0) {
			this.setState({ data: NewProps.data })
			if (NewProps.type === 'city') {
				this.setState({ value: '' })
			}
		}
	}
	render() {
		props = this.props
		return (
			<View
				style={[
					{
						flexDirection: 'row',
						flex: 1,
						alignSelf: 'center',
						width: '90%'
					},
					props.containerStyle
				]}
			>
				{this.props.label && (
					<Label
						style={[
							{
								backgroundColor: 'orange',
								color: 'white',
								flex: 0.3,
								height: Dimensions.get('screen').height * 0.07,
								flexWrap: 'wrap',
								textAlign: 'center',
								textAlignVertical: 'center',
								borderRadius: 5,
								marginHorizontal: 10,
								paddingTop: Dimensions.get('screen').height * 0.02
							},
							props.labelStyle
						]}
					>
						{props.label}
					</Label>
				)}

				<View style={{ flex: this.props.label ? 0.7 : 1 }}>
					<Dropdown
						containerStyle={{
							flex: 1,
							justifyContent: 'center',
							backgroundColor: Colors.white,
							borderRadius: 5,
							borderWidth: 1,
							borderColor: props.error ? 'red' : 'transparent'
						}}
						placeholder={props.placeholder}
						dropdownOffset={{ top: 0, left: 0, right: 0 }}
						animationDuration={0}
						delayPressIn={0}
						style={{
							height: '100%',
							width: '100%',
							paddingHorizontal: 10
						}}
						baseColor='transparent'
						value={this.state.value || ''}
						onChangeText={text => {
							this.setState({ value: text })
							this.props.SetValue(text)
							console.log('kkkkkkosm' + text)
						}}
						data={this.state.data}
					/>
				</View>
			</View>
		)
	}
}
