import { combineReducers } from 'redux'
import listReducer from './nameList'

const reducer = combineReducers({
  nameList: listReducer
})

export default reducer
