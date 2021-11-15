import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
	const [todoId, setTodoId] = useState('2')
	const [currentScreen, setCurrentScreen] = useState(null)
	const [todos, setTodos] = useState([
		{ id: '1', title: 'First' },
		{ id: '2', title: 'Second' }
	])

	const addTodo = (title) => {
		const newTodo = {
			id: Date.now().toString(),
			title
		}

		setTodos((prev) => [...prev, newTodo])
	}

	const removeTodo = (id) => {
		const todo = todos.find((t) => t.id === id)
		Alert.alert(
			'Remove Element',
			`Delete todo ${todo.title} ?`,
			[
				{
					text: 'Cancel',
					style: 'cancel'
				},
				{
					text: 'Delete',
					style: 'destructive',
					onPress: () => {
						setTodoId(null)
						setTodos((prev) => prev.filter((todo) => todo.id !== id))
					}
				}
			],
			{ cancelable: false }
		)
	}

	const handleBack = () => {
		setTodoId(null)
	}

	useEffect(() => {
		if (todoId) {
			const selectedTodo = todos.find((todo) => todo.id === todoId)
			setCurrentScreen(<TodoScreen onRemove={removeTodo} goBack={handleBack} todo={selectedTodo} />)
		} else {
			setCurrentScreen(<MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId} />)
		}
	}, [todoId, todos])

	return (
		<ScrollView>
			<Navbar title="Todo App" />
			<View style={styles.container}>{currentScreen}</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 20
	}
})
