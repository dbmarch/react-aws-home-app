import * as t from '../actions/actionTypes'
import { combineReducers } from 'redux'

const isLoading = (state = false, action = {}) => {
  switch (action.type) {
    case t.SET_AUTH_LOADING:
      return action.payload
    default:
      return state
  }
}

const isFailed = (state = false, action = {}) => {
  switch (action.type) {
    case t.SET_AUTH_FAILED:
      return action.payload
    default:
      return state
  }
}

const session = (state = {}, action = {}) => {
  switch (action.type) {
    case t.SET_SESSION:
      return action.payload

    default:
      return state
  }
}

const user = (state = {}, action = {}) => {
  switch (action.type) {
    case t.SET_USER:
      return action.payload

    default:
      return state
  }
}

const authorizedUser = (state = {}, action = {}) => {
  switch (action.type) {
    case t.SET_AUTHORIZED_USER:
      return action.payload
    default:
      return state
  }
}

const userPool = (state = {}, action = {}) => {
  switch (action.type) {
    case t.SET_USER_POOL:
      return action.payload

    default:
      return state
  }
}
export default combineReducers({ isLoading, isFailed, session, user, authorizedUser, userPool })
