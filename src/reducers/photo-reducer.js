import { LOGIN_USER, LOGOUT, FETCH_PHOTO_LIST, SET_PHOTO_URL_LIST } from '../actions/action-types'
import { combineReducers } from 'redux'

const photoUrlList = (state = [], action = {}) => {
	switch (action.type) {
		case SET_PHOTO_URL_LIST:
			return action.payload
		default:
			return state
	}
}

const photoList = (state = [], action = {}) => {
	switch (action.type) {
		case FETCH_PHOTO_LIST:
			return action.payload

		case LOGIN_USER:
		case LOGOUT:
			return []

		default:
			return state
	}
}

export default combineReducers({
	photoList,
	photoUrlList,
})
