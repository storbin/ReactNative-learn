import React, { useState, useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { EditModal } from '../components/EditModal'
import { AppButton } from '../components/ui/AppButton'
import { AppCard } from '../components/ui/AppCard'
import { AppText } from '../components/ui/AppText'
import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = () => {
	const { todos, updateTodo, removeTodo } = useContext(TodoContext)
	const { todoId, changeScreen } = useContext(ScreenContext)
	const [modal, setModal] = useState(false)

	const todo = todos.find((t) => t.id === todoId)

	const saveHandler = async (title) => {
		await updateTodo(todo.id, title)
		setModal(false)
	}

	return (
		<View>
			<EditModal value={todo.title} visible={modal} onSave={saveHandler} onCancel={() => setModal(false)} />
			<AppCard style={styles.card}>
				<AppText style={styles.title}>{todo.title}</AppText>
				<AppButton color={THEME.MAIN_BLUE_COLOR} onPress={() => setModal(true)}>
					<FontAwesome name={'edit'} size={20} />
				</AppButton>
			</AppCard>
			<View style={styles.buttons}>
				<View style={styles.button}>
					<AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
						<AntDesign name="back" size={20} />
					</AppButton>
				</View>
				<View style={styles.button}>
					<AppButton color={THEME.DANGER_COLOR} onPress={() => removeTodo(todo.id)}>
						<FontAwesome name="remove" size={20} color="#fff" />
					</AppButton>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	card: {
		marginBottom: 20,
		padding: 15
	},
	button: {
		// width: Dimensions.get('window').width / 3
		width: Dimensions.get('window').width > 400 ? 150 : 100
	},
	title: {
		fontSize: 20
	}
})
