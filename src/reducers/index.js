import { combineReducers } from 'redux'
import auth from './auth-reducer'
import photo from './photo-reducer'

const reducer = combineReducers({
	auth,
	photo,
})

export default reducer
