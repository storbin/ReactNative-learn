import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert } from 'react-native'

export const AddTodo = ({ onSubmit }) => {
	const [value, setValue] = useState('')

	const pressHandler = () => {
		if (value.trim()) {
			onSubmit(value)
			setValue('')
		} else {
			Alert.alert('Название дела не может быть пустым')
		}
	}

	return (
		<View style={styles.block}>
			<TextInput
				keyboardType={'number-pad'}
				style={styles.input}
				onChangeText={setValue}
				value={value}
				placeholder="Type..."
				autoCorrect={false}
			/>
			<Button title="Add" onPress={pressHandler} />
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
		borderBottomColor: '#3949ab'
	}
})
