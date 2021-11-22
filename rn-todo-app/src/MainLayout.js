import React, { useState, useEffect, useContext } from 'react'
import { View, StyleSheet } from 'react-native'
import { Navbar } from './components/Navbar'
import { TodoContext } from './context/todo/todoContext'
import { MainScreen } from './screens/MainScreen'
import { TodoScreen } from './screens/TodoScreen'
import { THEME } from './theme'

export const MainLayout = () => {
	const { todos, addTodo, updateTodo, removeTodo } = useContext(TodoContext)
	const [currentScreen, setCurrentScreen] = useState(null)
	const [todoId, setTodoId] = useState(null)

	// const removeTodo = (id) => {
	// 	const todo = todos.find((t) => t.id === id)
	// 	Alert.alert(
	// 		'Remove Element',
	// 		`Delete todo ${todo.title} ?`,
	// 		[
	// 			{
	// 				text: 'Cancel',
	// 				style: 'cancel'
	// 			},
	// 			{
	// 				text: 'Delete',
	// 				style: 'destructive',
	// 				onPress: () => {
	// 					setTodoId(null)
	// 					setTodos((prev) => prev.filter((todo) => todo.id !== id))
	// 				}
	// 			}
	// 		],
	// 		{ cancelable: false }
	// 	)
	// }

	const handleBack = () => {
		setTodoId(null)
	}

	useEffect(() => {
		if (todoId) {
			const selectedTodo = todos.find((todo) => todo.id === todoId)
			setCurrentScreen(<TodoScreen onSave={updateTodo} onRemove={removeTodo} goBack={handleBack} todos={selectedTodo} />)
		} else {
			setCurrentScreen(<MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId} />)
		}
	}, [todoId, todos])

	return (
		<View>
			<Navbar title="Todo App" />
			<View style={styles.container}>{currentScreen}</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: THEME.PADDING_HORIZONTAL,
		paddingVertical: 20
	}
})
