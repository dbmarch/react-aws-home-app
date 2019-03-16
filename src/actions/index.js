import * as action from './actionTypes'
const actionCreator = (type) => (payload) => ({ type, payload })

export const setUser = actionCreator(action.SET_USER)
export const setSession = actionCreator(action.SET_SESSION)
export const setAuthorizedUser = actionCreator(action.SET_AUTHORIZED_USER)
export const setAuthLoading = actionCreator(action.SET_AUTH_LOADING)
export const setAuthFailed = actionCreator(action.SET_AUTH_FAILED)
export const registerUser = actionCreator(action.REGISTER_USER)
export const setUserPool = actionCreator(action.SET_USER_POOL)
export const loginUser = actionCreator(action.LOGIN_USER)
export const logoutUser = actionCreator(action.LOGOUT_USER)
