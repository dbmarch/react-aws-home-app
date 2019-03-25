import { fork } from 'redux-saga/effects'
import {
	registerUserSaga,
	loginUserSaga,
	confirmUserSaga,
	resendConfirmationCodeSaga,
	getSignedInUserSaga,
	logoutSaga
} from './authenticate'
import { fetchPhotoListSaga } from './photos'
import { changePasswordSaga, forgotPasswordSaga, deleteAccountSaga } from './account'

export default function* rootSaga() {
	yield fork(registerUserSaga)
	yield fork(loginUserSaga)
	yield fork(confirmUserSaga)
	yield fork(resendConfirmationCodeSaga)
	yield fork(getSignedInUserSaga)
	yield fork(logoutSaga)
	yield fork(changePasswordSaga)
	yield fork(forgotPasswordSaga)
	yield fork(deleteAccountSaga)
	yield fork(fetchPhotoListSaga)
}
