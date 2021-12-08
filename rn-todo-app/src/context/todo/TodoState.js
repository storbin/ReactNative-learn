import React, { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { http } from '../../http'
import { ScreenContext } from '../screen/screenContext'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, UPDATE_TODO, SHOW_LOADER } from '../types'
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
		const data = await http.post('https://reactnative-todo-app-5d242-default-rtdb.europe-west1.firebasedatabase.app/todos.json', { title })
		dispatch({ type: ADD_TODO, title, id: data.name })
	}

	const fetchTodos = async () => {
		showLoader()
		clearError()
		try {
			const data = await http.get('https://reactnative-todo-app-5d242-default-rtdb.europe-west1.firebasedatabase.app/todos.json')
			let todos
			if (data) {
				todos = Object.keys(data).map((key) => ({ ...data[key], id: key }))
			} else {
				todos = []
			}
			dispatch({ type: FETCH_TODOS, todos })
		} catch (error) {
			showError('Something wrong try again')
			console.log(error)
		} finally {
			hideLoader()
		}
	}

	const updateTodo = async (id, title) => {
		clearError()
		try {
			await http.patch(`https://reactnative-todo-app-5d242-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, { title })
			dispatch({ type: UPDATE_TODO, id, title })
		} catch (error) {
			showError('Something wrong try again')
			console.log(error)
		} finally {
			hideLoader()
		}
	}

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
					onPress: async () => {
						changeScreen(null)
						await http.delete(`https://reactnative-todo-app-5d242-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`)
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
