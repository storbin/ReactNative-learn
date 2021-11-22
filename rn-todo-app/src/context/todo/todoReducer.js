import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'

export const todoReducer = (state, action) => {
	switch (action.type) {
		case ADD_TODO:
			return { ...state, todos: [...state.todos, { id: Date.now().toString(), title: action.title }] }
		case UPDATE_TODO:
			return {
				...state,
				todos: state.todos.map((todo) => {
					if (todo.id === action.id) {
						todo.title = action.title
					}
					return todo
				})
			}
		case REMOVE_TODO:
			return { ...state, todos: state.todos.filter((t) => t.id !== action.id) }
		default:
			return state
	}
}
