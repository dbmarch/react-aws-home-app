import { ADD_ALBUM, REMOVE_ALBUM } from '../actions/action-types'
import { combineReducers } from 'redux'

const initialValue = {
	album: [{ name: 'album 1' }, { name: 'album 2' }, { name: 'album 3' }, { name: 'album 4' }, { name: 'album 5' }],
}
const albums = (state = initialValue.album, action = {}) => {
	switch (action.type) {
		case ADD_ALBUM:
			return state.concat(action.payload)

		case REMOVE_ALBUM:
			return state.album

		default:
			return state
	}
}

export default combineReducers({
	albums,
})
