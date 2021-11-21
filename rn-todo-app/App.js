import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'

import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

async function loadApplication() {
	await Font.loadAsync({
		'roboto-lightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
		'roboto-thinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf')
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)
	const [todoId, setTodoId] = useState(null)
	const [currentScreen, setCurrentScreen] = useState(null)
	const [todos, setTodos] = useState([
		{
			id: '1',
			title: 'Test1'
		}
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

	const updateTodo = (id, title) => {
		setTodos((prev) =>
			prev.map((todo) => {
				if (todo.id === id) {
					todo.title = title
				}
				return todo
			})
		)
	}

	const handleBack = () => {
		setTodoId(null)
	}

	useEffect(() => {
		if (todoId) {
			const selectedTodo = todos.find((todo) => todo.id === todoId)
			setCurrentScreen(<TodoScreen onSave={updateTodo} onRemove={removeTodo} goBack={handleBack} todo={selectedTodo} />)
		} else {
			setCurrentScreen(<MainScreen todos={todos} addTodo={addTodo} removeTodo={removeTodo} openTodo={setTodoId} />)
		}
	}, [todoId, todos])

	return isReady ? (
		<ScrollView>
			<Navbar title="Todo App" />
			<View style={styles.container}>{currentScreen}</View>
		</ScrollView>
	) : (
		<AppLoading startAsync={loadApplication} onError={(err) => console.log(err)} onFinish={() => setIsReady(true)} />
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 20
	}
})
