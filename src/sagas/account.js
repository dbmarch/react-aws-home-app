// import * as AWS from 'aws-sdk/global'
import * as AwsAppSettings from '../aws/config'
import { takeLatest, select, put, call } from 'redux-saga/effects'
import { CHANGE_PASSWORD, DELETE_ACCOUNT, FORGOT_PASSWORD } from '../actions/action-types'

import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'
import { getUser, getNewPassword } from '../selectors'
// import { accessTokenSelector } from '../selectors/authSelectors'
import { setAuthError } from '../actions'
import Promise from 'bluebird'
import get from 'lodash/get'

const userPool = new CognitoUserPool(AwsAppSettings.poolData)

//Documentation: https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js

// And this link: https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html

// const updateUserAttributesAsync = (user, attribute) => {
// 	const userData = {
// 		Username: user.username,
// 		Pool: userPool,
// 	}
// 	const cognitoUser = new CognitoUser(userData)
// 	var attributeList = []
// 	// var attribute = {
// 	//   Name: 'nickname',
// 	//   Value: 'joe'
// 	// };
// 	attributeList.push(new CognitoUserAttribute(attribute))

// 	return new Promise((resolve, reject) => {
// 		cognitoUser.updateAttributes(attributeList, function(err, result) {
// 			if (err) {
// 				alert(err.message || JSON.stringify(err))
// 				return reject(err)
// 			}
// 			console.log('call result: ' + result)
// 			return resolve(result)
// 		})
// 	})
// }

// const deleteUserAttributesAsync = (user, attribute) => {
// 	const userData = {
// 		Username: user.username,
// 		Pool: userPool
// 	}
// 	const cognitoUser = new CognitoUser(userData)
// 	var attributeList = []
// 	attributeList.push('nickname')
// 	return new Promise((resolve, reject) => {
// 		cognitoUser.deleteAttributes(attributeList, function(err, result) {
// 			if (err) {
// 				alert(err.message || JSON.stringify(err))
// 				return reject(err)
// 			}
// 			console.log('call result: ' + result)
// 			return resolve(result)
// 		})
// 	})
// }

const deleteAccountAsync = user => {
	const userData = {
		Username: user.username,
		Pool: userPool,
	}

	const cognitoUser = new CognitoUser(userData)
	console.info(cognitoUser)
	return new Promise((resolve, reject) => {
		cognitoUser.deleteUser((err, result) => {
			if (err) {
				alert(err.message || JSON.stringify(err))
				return reject(err)
			}
			console.log('call result: ' + result)
			return resolve(result)
		})
	})
}

const resetPasswordAsync = (userName, newPassword) => {
	const userData = {
		Username: userName,
		Pool: userPool,
	}

	console.info(`RESET PASSWORD ${userName} ${newPassword}`)
	const cognitoUser = new CognitoUser(userData)

	try {
		return new Promise((resolve, reject) => {
			cognitoUser.forgotPassword({
				onSuccess: function(result) {
					console.log('call result: ' + result)
					resolve(result)
				},
				onFailure: function(err) {
					console.info('resetPassword returns onFailure', err.code, err.message)
					reject(err)
				},
				inputVerificationCode() {
					const userCode = prompt('Please input verification code ', '')
					cognitoUser.confirmPassword(userCode, newPassword, this)
				},
			})
		})
	} catch (err) {
		console.info('exception: ', err)
	}
}

const changePasswordAsync = user => {
	const userData = {
		Username: user.username,
		Pool: userPool,
	}
	const cognitoUser = new CognitoUser(userData)

	return new Promise((resolve, reject) => {
		cognitoUser.changePassword('oldPassword', 'newPassword', (err, result) => {
			if (err) {
				alert(err.message || JSON.stringify(err))
				return reject(err)
			}
			console.log('call result: ' + result)
			return resolve(result)
		})
	})
}

export function* doChangePassword(action) {
	console.info('doChangePassword', action)
	const user = yield select(getUser)
	const newPassword = yield select(getNewPassword)

	if (!user.username) {
		console.error('user name is required ', user)
		return
	}

	try {
		const result = yield call(changePasswordAsync, user, newPassword)
		console.info('changePasswordAsync returned', result)
	} catch (err) {
		console.error('changePasswordAsync failed ', err)
		yield put(setAuthError({ error: err.code, description: err.message }))
	}
}

export function* doDeleteAccount() {
	console.info('doDeleteAccount')
	const user = yield select(getUser)

	if (!user.username) {
		console.error('user name is required ', user)
		return
	}

	try {
		const result = yield call(deleteAccountAsync, user)
		console.info('deleteAccountAsync returned', result)
	} catch (err) {
		console.error('deleteAccountAsync failed ', err)
		yield put(setAuthError({ error: err.code, description: err.message }))
	}
}

export function* doResetPassword(action) {
	console.info('doResetPassword', action)
	const username = get(action.payload, 'username', '')
	const password = get(action.payload, 'newPassword', '')
	try {
		const result = yield call(resetPasswordAsync, username, password)
		console.info('resetPasswordAsync returned', result)
	} catch (err) {
		console.error('resetPasswordAsync failed ', err)
		yield put(setAuthError({ error: err.code, description: err.message }))
	}
}
export function* changePasswordSaga() {
	console.info('Saga-changePassword')
	yield takeLatest(CHANGE_PASSWORD, doChangePassword)
}

export function* deleteAccountSaga() {
	console.info('Saga-deleteAccount')
	yield takeLatest(DELETE_ACCOUNT, doDeleteAccount)
}

export function* forgotPasswordSaga() {
	console.info('Saga-forgotPassword')
	yield takeLatest(FORGOT_PASSWORD, doResetPassword)
}
