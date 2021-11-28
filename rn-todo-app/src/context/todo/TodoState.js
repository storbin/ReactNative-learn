import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

export const TodoState = ({ children }) => {
	const initialSate = {
		todos: [{ id: '1', title: 'Test Store' }]
	}

	const { changeScreen } = useContext(ScreenContext)

	const [state, dispatch] = useReducer(todoReducer, initialSate)

	const addTodo = (title) => dispatch({ type: ADD_TODO, title })

	const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

	const removeTodo = (id) => {
		const todo = state.todos.find((t) => t.id === id)
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
						changeScreen(null)
						dispatch({ type: REMOVE_TODO, id })
					}
				}
			],
			{ cancelable: false }
		)
	}

	return <TodoContext.Provider value={{ todos: state.todos, addTodo, updateTodo, removeTodo }}>{children}</TodoContext.Provider>
}
