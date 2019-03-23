import * as action from './action-types'
const actionCreator = type => payload => ({ type, payload })

export const setUser = actionCreator(action.SET_USER)
export const setUserCode = actionCreator(action.SET_USER_CODE)
export const setSession = actionCreator(action.SET_SESSION)
export const setIdToken = actionCreator(action.SET_ID_TOKEN)
export const setAccessToken = actionCreator(action.SET_ACCESS_TOKEN)
export const setAuthenticatedUser = actionCreator(action.SET_AUTHENTICATED_USER)
export const setAuthLoading = actionCreator(action.SET_AUTH_LOADING)
export const setAuthError = actionCreator(action.SET_AUTH_ERROR)
export const setAuthorized = actionCreator(action.SET_AUTHORIZED)
export const registerUser = actionCreator(action.REGISTER_USER)
export const setUserPool = actionCreator(action.SET_USER_POOL)
export const loginUser = actionCreator(action.LOGIN_USER)
export const logoutUser = actionCreator(action.LOGOUT_USER)
export const confirmUser = actionCreator(action.CONFIRM_USER)
export const resendConfirmationCode = actionCreator(action.RESEND_CONFIRMATION_CODE)
export const getSignedInUser = actionCreator(action.GET_SIGNED_IN_USER)
export const logout = actionCreator(action.LOGOUT)
export const forgotPassword = actionCreator(action.FORGOT_PASSWORD)
export const changePassword = actionCreator(action.CHANGE_PASSWORD)
export const deleteAccount = actionCreator(action.DELETE_ACCOUNT)
export const setNewPassword = actionCreator(action.SET_NEW_PASSWORD)

export const fetchPhotoList = actionCreator(action.FETCH_PHOTO_LIST)
export const setPhotoUrlList = actionCreator(action.SET_PHOTO_URL_LIST)
