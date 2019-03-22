import * as AWS from 'aws-sdk/global'
import * as AwsAppSettings from '../aws/config'
import { takeLatest, select, put, call } from 'redux-saga/effects'
import { FETCH_PHOTO_LIST } from '../actions/action-types'

import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { getUser, getUserCode } from '../selectors'
import { setAuthorized, setAuthError, setAuthenticatedUser, setSession } from '../actions'
import { idTokenSelector } from '../selectors/authSelectors'
import Promise from 'bluebird'

const userPool = new CognitoUserPool(AwsAppSettings.poolData)

const fetchPhotoListAsync = user => {
	const userData = {
		Username: user.username,
		Pool: userPool,
	}
	const cognitoUser = new CognitoUser(userData)

	return new Promise((resolve, reject) => {
		resolve([])
		// cognitoUser.changePassword('oldPassword', 'newPassword', (err, result) => {
		// 	if (err) {
		// 		alert(err.message || JSON.stringify(err))
		// 		return reject(err)
		// 	}
		// 	console.log('call result: ' + result)
		// 	return resolve(result)
		// })
	})
}

export function* doFetchPhotoList() {
	console.info('doFetchPhotoList')
	const user = yield select(getUser)

	if (!user.username) {
		console.error('user name is required ', user)
		return
	}

	try {
		//   const result = yield call(deleteAccountAsync, user)
		//   console.info('deleteAccountAsync returned', result)
	} catch (err) {
		//   console.error('deleteAccountAsync failed ', err)
		//   yield put(setAuthError({ error: err.code, description: err.message }))
	}
}

export function* fetchPhotoListSaga() {
	console.info('Saga-fetchPhotoList')
	yield takeLatest(FETCH_PHOTO_LIST, doFetchPhotoList)
}
