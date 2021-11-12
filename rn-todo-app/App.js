import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, FlatList } from 'react-native'
import { AddTodo } from './src/AddTodo'
import { Navbar } from './src/Navbar'
import { Todo } from './src/Todo'

export default function App() {
	const [todos, setTodos] = useState([])

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

	return (
		<ScrollView>
			<Navbar title="Todo App" />
			<View style={styles.container}>
				<AddTodo onSubmit={addTodo} />

				<FlatList
					keyExtractor={(item) => item.id.toString()}
					data={todos}
					renderItem={({ item }) => <Todo onRemove={removeTodo} todo={item} />}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 30,
		paddingVertical: 20
	}
})
