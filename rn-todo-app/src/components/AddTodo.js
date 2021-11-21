import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { THEME } from '../theme'

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('')

	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value)
			setValue('')
			Keyboard.dismiss()
		} else {
			Alert.alert('Название дела не может быть пустым')
		}
	}

	return (
		<View style={styles.block}>
			<TextInput
				keyboardType={'default'}
				style={styles.input}
				onChangeText={setValue}
				value={value}
				placeholder="Type..."
				autoCorrect={false}
			/>

			<AntDesign.Button name="plus" size={24} color={THEME.MAIN_BLUE_COLOR} onPress={pressHandler}>
				Add
			</AntDesign.Button>
			{/* <Button title="Add" onPress={pressHandler} /> */}
		</View>
	)
}

const styles = StyleSheet.create({
	block: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	},
	input: {
		width: '70%',
		padding: 10,
		borderStyle: 'solid',
		borderBottomWidth: 2,
		borderBottomColor: THEME.MAIN_BLUE_COLOR
	}
})
