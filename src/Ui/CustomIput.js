import { Label, Input, Item } from 'native-base'
import React, { Component } from 'react'

import {
	View,
	StyleSheet,
	Text,
	Modal,
	ScrollView,
	Image,
	Dimensions
} from 'react-native'

const CustomInput = props => {
	return (
		<View
			style={[
				{ flexDirection: 'row', flex: 1, width: '90%', alignSelf: 'center' },
				props.containerStyle
			]}
		>
			{props.label && (
				<Label
					style={[
						{
							backgroundColor: 'orange',
							color: 'white',
							paddingHorizontal: 5,
							flex: 0.3,
							placeholder: 5,
							// height: Dimensions.get('screen').height * 0.07,
							textAlign: 'center',
							borderRadius: 5,
							marginHorizontal: 10,
							textAlignVertical: 'center',
							paddingTop: Dimensions.get('screen').height * 0.02,
							// paddingVertical: Dimensions.get('screen').height * 0.02,
							height: Dimensions.get('screen').height * 0.07
						},
						props.style
					]}
				>
					{props.label}
				</Label>
			)}
			<Input
				onBlur={props.onBlur}
				secureTextEntry={props.secureTextEntry}
				underlineColorAndroid='transparent'
				onChangeText={props.changeText}
				value={props.text}
				style={[
					{
						borderRadius: 5,
						flex: props.label ? 0.7 : 1,
						backgroundColor: 'white',
						borderRadius: 1,
						borderWidth: 1,
						borderColor: props.error ? 'red' : 'transparent',
						fontWeight: 'normal',
						borderRadius: 5
					},
					props.inputStyle
				]}
				placeholder={props.placeholder}
				placeholderTextColor='#8e8e8e'
			/>
		</View>
	)
}
export default CustomInput
