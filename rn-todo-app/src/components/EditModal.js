import React, { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Modal, Alert } from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
	const [title, setTitle] = useState(value)
	const saveHandler = () => {
		if (title.trim().length < 3) {
			Alert.alert('Warning', `min length 3. Now ${title.trim().length}`)
		} else {
			onSave(title)
		}
	}
	return (
		<Modal visible={visible} animationType="slide" transparent={false}>
			<View style={styles.wrap}>
				<TextInput
					value={title}
					onChangeText={setTitle}
					style={styles.input}
					placeholder="Type Name"
					maxLength={64}
					autoCorrect={false}
					autoCapitalize
				/>
				<View>
					<Button title="Cancel" onPress={onCancel} color={THEME.DANGER_COLOR}></Button>
					<Button title="Save" onPress={saveHandler}></Button>
				</View>
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	wrap: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	input: {
		padding: 10,
		borderBottomColor: THEME.MAIN_BLUE_COLOR,
		borderBottomWidth: 2,
		width: '80%'
	},
	buttons: {
		width: '100%',
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	}
})
