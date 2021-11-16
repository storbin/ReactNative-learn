import React from 'react'
import { StyleSheet, View, FlatList, Text, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
	let content = (
		<FlatList
			keyExtractor={(item) => item.id.toString()}
			data={todos}
			renderItem={({ item }) => <Todo onRemove={removeTodo} todo={item} onOpen={openTodo} />}
		/>
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
