import { LOGIN_USER, LOGOUT, SET_PHOTO_LIST, ADD_PHOTO_SRC_LIST, FETCH_PHOTO_LIST } from '../actions/action-types'
import { combineReducers } from 'redux'

const photoSrcList = (state = [], action = {}) => {
	switch (action.type) {
		case LOGIN_USER:
		case FETCH_PHOTO_LIST:
			return []

		case ADD_PHOTO_SRC_LIST:
			return state.concat(action.payload)

		default:
			return state
	}
}

const photoList = (state = [], action = {}) => {
	switch (action.type) {
		case SET_PHOTO_LIST:
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
	photoSrcList,
})
