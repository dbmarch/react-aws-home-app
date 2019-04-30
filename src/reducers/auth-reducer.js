import {
	SET_AUTH_ERROR,
	SET_AUTHORIZED,
	SET_SESSION,
	SET_USER,
	SET_USER_CODE,
	REGISTER_USER,
	LOGIN_USER,
	SET_AUTHENTICATED_USER,
	LOGOUT,
	SET_NEW_PASSWORD
} from '../actions/action-types'
import { combineReducers } from 'redux'

// Saves the access token
const isAuthenticated = (state = false, action = {}) => {
	switch (action.type) {
		case LOGIN_USER:
		case REGISTER_USER:
		case LOGOUT:
			return false

		case SET_AUTHORIZED:
			return action.payload
		default:
			return state
	}
}

// Saves the error
const authError = (state = null, action = {}) => {
	switch (action.type) {
		case SET_AUTH_ERROR:
			return action.payload
		default:
			return state
	}
}

const session = (state = {}, action = {}) => {
	switch (action.type) {
		case SET_SESSION:
			return action.payload
		case LOGOUT:
			return {}
		default:
			return state
	}
}

const user = (state = { username: null, email: null, password: null }, action = {}) => {
	switch (action.type) {
		case REGISTER_USER:
		case LOGIN_USER:
			const { username, email, password } = action.payload
			return { username, email, password }
		case SET_USER:
			return action.payload

		default:
			return state
	}
}

const userCode = (state = '', action = {}) => {
	switch (action.type) {
		case REGISTER_USER:
		case LOGIN_USER:
			return ''
		case SET_USER_CODE:
			return action.payload

		default:
			return state
	}
}

const authenticatedUser = (state = {}, action = {}) => {
	switch (action.type) {
		case SET_AUTHENTICATED_USER:
			return action.payload
		case LOGOUT:
			return {}
		default:
			return state
	}
}

const newPassword = (state = '', action = {}) => {
	switch (action.type) {
		case SET_NEW_PASSWORD:
			return action.payload
		case LOGIN_USER:
		case LOGOUT:
			return {}
		default:
			return state
	}
}

export default combineReducers({
	authError,
	isAuthenticated,
	session,
	user,
	userCode,
	authenticatedUser,
	newPassword
})
