import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

export default function App() {
	const [todoId, setTodoId] = useState(null)
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
		setTodos((prev) => prev.filter((todo) => todo.id !== id))
	}

	const handleBack = () => {
		setTodoId(null)
	}

	useEffect(() => {
		if (todoId) {
			const selectedTodo = todos.find((todo) => todo.id === todoId)
			setCurrentScreen(<TodoScreen goBack={handleBack} todo={selectedTodo} />)
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
