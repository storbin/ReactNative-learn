import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

export const TodoState = ({ children }) => {
	const initialSate = {
		todos: [],
		loading: false,
		error: null
	}

	const { changeScreen } = useContext(ScreenContext)

	const [state, dispatch] = useReducer(todoReducer, initialSate)

	const addTodo = async (title) => {
		const response = await fetch('https://reactnative-todo-app-5d242-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ title })
		})

		response.json().then((data) => {
			dispatch({ type: ADD_TODO, title, id: data.name })
		})
	}

	const fetchTodos = async () => {
		const response = await fetch('https://reactnative-todo-app-5d242-default-rtdb.europe-west1.firebasedatabase.app/todos.json', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
		const data = await response.json()
		console.log('fetch data', data)
		const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }))
		dispatch({ type: FETCH_TODOS, todos })
	}

	const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

	const showLoader = () => dispatch({ type: SHOW_LOADER })

	const hideLoader = () => dispatch({ type: HIDE_LOADER })

	const showError = (error) => dispatch({ type: SHOW_ERROR, error })

	const clearError = () => dispatch({ type: CLEAR_ERROR })

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

	return (
		<TodoContext.Provider
			value={{ todos: state.todos, addTodo, updateTodo, removeTodo, fetchTodos, loading: state.loading, error: state.error }}
		>
			{children}
		</TodoContext.Provider>
	)
}
