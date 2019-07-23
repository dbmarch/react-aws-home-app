import { combineReducers } from 'redux'
import auth from './auth-reducer'
import photo from './photo-reducer'
import album from './album-reducer'

const reducer = combineReducers({
	auth,
	photo,
	album,
})

export default reducer
