import { fork } from 'redux-saga/effects'
import { registerUser, loginUser, confirmUser, resendConfirmationCode, getSignedInUser } from './authenticate'

export default function* rootSaga() {
	yield fork(registerUser)
	yield fork(loginUser)
	yield fork(confirmUser)
	yield fork(resendConfirmationCode)
	yield fork(getSignedInUser)
}
