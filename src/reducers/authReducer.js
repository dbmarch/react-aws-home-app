import {
  SET_AUTH_LOADING,
  SET_AUTH_FAILED,
  SET_SESSION,
  SET_USER,
  REGISTER_USER,
  LOGIN_USER,
  SET_USER_POOL,
  SET_AUTHORIZED_USER
} from '../actions/actionTypes'
import { combineReducers } from 'redux'

const isLoading = (state = false, action = {}) => {
  switch (action.type) {
    case SET_AUTH_LOADING:
      return action.payload
    default:
      return state
  }
}

const isFailed = (state = false, action = {}) => {
  switch (action.type) {
    case SET_AUTH_FAILED:
      return action.payload
    default:
      return state
  }
}

const session = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_SESSION:
      return action.payload

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

const authorizedUser = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_AUTHORIZED_USER:
      return action.payload
    default:
      return state
  }
}

const userPool = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_USER_POOL:
      return action.payload

    default:
      return state
  }
}
export default combineReducers({ isLoading, isFailed, session, user, authorizedUser, userPool })
