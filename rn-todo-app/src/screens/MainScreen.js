import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { ScreenContext } from '../context/screen/screenContext'
import { TodoContext } from '../context/todo/todoContext'
import { THEME } from '../theme'

export const MainScreen = () => {
	const { todos, removeTodo, addTodo, fetchTodos, loading, error } = useContext(TodoContext)
	const { changeScreen } = useContext(ScreenContext)
	const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

	// const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

	useEffect(() => {
		fetchTodos()
	}, [])

	useEffect(() => {
		const update = () => {
			const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
			setDeviceWidth(width)
		}
		Dimensions.addEventListener('change', update)

		return () => {
			Dimensions.removeEventListener('change', update)
		}
	}, [])

	let content = (
		<View style={{ deviceWidth }}>
			<FlatList
				keyExtractor={(item) => item.id.toString()}
				data={todos}
				renderItem={({ item }) => <Todo onRemove={removeTodo} todo={item} onOpen={changeScreen} />}
			/>
		</View>
	)

	if (todos.length === 0) {
		content = (
			<View style={styles.imgWrap}>
				<Image resizeMode={'contain'} style={styles.image} source={require('../../assets/no-items.png')} />
			</View>
		)
	}
	return (
		<View>
			<AddTodo onSubmit={addTodo} />
			{content}
		</View>
	)
}

const styles = StyleSheet.create({
	imgWrap: {
		alignItems: 'center',
		justifyContent: 'center',
		padding: 10,
		height: 300
	},
	image: {
		width: '100%',
		height: '100%'
	}
})
