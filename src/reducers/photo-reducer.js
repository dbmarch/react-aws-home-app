import { LOGIN_USER, LOGOUT, FETCH_PHOTO_LIST } from '../actions/action-types'
import { combineReducers } from 'redux'

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
})
