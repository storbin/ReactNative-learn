import React, { useReducer } from 'react'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'
import { TodoContext } from './todoContext'
import { todoReducer } from './todoReducer'

export const TodoState = ({ children }) => {
	const initialSate = {
		todos: [{ id: '1', title: 'Test Store' }]
	}

	const [state, dispatch] = useReducer(todoReducer, initialSate)

	const addTodo = (title) => dispatch({ type: ADD_TODO, title })

	const updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

	const removeTodo = (id) => dispatch({ type: REMOVE_TODO, id })

	return <TodoContext.Provider value={{ todos: state.todos, addTodo, updateTodo, removeTodo }}>{children}</TodoContext.Provider>
}
