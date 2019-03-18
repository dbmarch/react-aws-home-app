import * as AWS from 'aws-sdk/global'
import { takeLatest, select, put, call } from 'redux-saga/effects'
import {
	LOGIN_USER,
	REGISTER_USER,
	CONFIRM_USER,
	RESEND_CONFIRMATION_CODE,
	GET_SIGNED_IN_USER,
	LOGOUT,
} from '../actions/action-types'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { getUser, getUserCode } from '../selectors'
import { setAuthorized, setAuthError, setAuthenticatedUser, setSession } from '../actions'
import { idTokenSelector } from '../selectors/authSelectors'
import Promise from 'bluebird'

const AWS_REGION = 'us-east-2'
const IDENTITY_POOL_ID = 'us-east-2:50a30db4-26a5-4258-bb50-95faaeff762c'
const APP_CLIENT_ID = '5r6jfap0vcv4ailbk7shd4i1pd'
const USER_POOL_ID = 'us-east-2_zyce4X8Kl'

const poolData = {
	UserPoolId: USER_POOL_ID,
	ClientId: APP_CLIENT_ID,
}

const userPool = new CognitoUserPool(poolData)

//Documentation: https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js

// The user object should look like:
// const user = {
//   username: username,
//   email: email,
//   password: password
// }

const resendConfirmationCodeAsync = user => {
	const userData = {
		Username: user.username,
		Pool: userPool,
	}
	const cognitoUser = new CognitoUser(userData)
	return new Promise((resolve, reject) =>
		cognitoUser.resendconfirmationCode((err, result) => {
			if (err) {
				reject(err)
				return
			}
			resolve(result)
		})
	)
}

const confirmUserAsync = (user, code) => {
	const userData = {
		Username: user.username,
		Pool: userPool,
	}
	const cognitoUser = new CognitoUser(userData)
	return new Promise((resolve, reject) =>
		cognitoUser.confirmRegistration(code, true, function(err, result) {
			if (err) {
				reject(err)
				return
			}
			resolve(result)
			console.log('call result: ' + result)
		})
	)
}

function* doConfirmUser() {
	console.info('doConfirmUser')
	const user = yield select(getUser)
	const userCode = yield select(getUserCode)
	if (!user.username || !userCode) {
		yield put(setAuthError('require username & Confirmation code'))
		return
	}

	try {
		const result = yield call(confirmUserAsync, user, userCode)
		console.info('confirmation returns ', result)
	} catch (err) {
		yield put(setAuthError({ error: err.code, description: err.text }))
	}
}

function forgotPasswordAsync(user) {
	const userData = {
		Username: user.username,
		Pool: userPool,
	}
	const cognitoUser = new CognitoUser(userData)

	return new Promise((resolve, reject) =>
		cognitoUser.forgotPassword({
			onSuccess: function(result) {
				console.log('call result: ' + result)
			},
			onFailure: function(err) {
				alert(err)
			},
			inputVerificationCode() {
				var verificationCode = prompt('Please input verification code ', '')
				var newPassword = prompt('Enter new password ', '')
				cognitoUser.confirmPassword(verificationCode, newPassword, this)
			},
		})
	)
}

const loginAsync = user => {
	const userData = {
		Username: user.username,
		Pool: userPool,
	}
	const authenticationData = {
		Username: user.username,
		Password: user.password,
	}

	const authenticationDetails = new AuthenticationDetails(authenticationData)
	const cognitoUser = new CognitoUser(userData)

	return new Promise((resolve, reject) =>
		cognitoUser.authenticateUser(authenticationDetails, {
			onSuccess: function(session) {
				console.info('Login success! ', cognitoUser.getUsername())
				resolve(session)
			},

			onFailure: function(err) {
				console.info('Login fail!')
				reject(err)
			},
			mfaRequired: function(codeDeliveryDetails) {
				console.info('mfa required ....')
				var verificationCode = prompt('Please input verification code', '')
				cognitoUser.sendMFACode(verificationCode, this)
			},
		})
	)
}

const obtainCredentialsAsync = idToken => {
	AWS.config.region = AWS_REGION

	return new Promise((resolve, reject) => {
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: IDENTITY_POOL_ID, // your identity pool id here
			Logins: {
				// [`cognito-idp.${AWS_REGION}.amazonaws.com/${USER_POOL_ID}`]: idToken,
				'cognito-idp.us-east-2.amazonaws.com/us-east-2_zyce4X8Kl': idToken,
			},
		})
		//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
		AWS.config.credentials.refresh(error => {
			if (error) {
				console.error(error)
				reject(error)
			} else {
				// Instantiate aws sdk service objects now that the credentials have been updated.
				// example: var s3 = new AWS.S3();
				resolve()
				console.log('Successfully logged!')
			}
		})
	})
}

const obtainSessionAsync = () => {
	const cognitoUser = userPool.getCurrentUser()
	console.info('cognitoUser:', cognitoUser)
	return new Promise((resolve, reject) => {
		if (!cognitoUser) {
			reject(new Error('invalid user'))
			return
		}
		cognitoUser.getSession(function(err, session) {
			if (err) {
				reject(err)
				console.error(err.message || JSON.stringify(err))
				return
			}
			console.log('session validity: ' + session.isValid())
			resolve(session)
		})
	})
}

export function* doLoginUser() {
	console.info('doLoginUser')
	const user = yield select(getUser)
	if (!user.username && !user.password) {
		yield put(setAuthError('require username & password'))
		return
	}
	console.info('user', user)

	try {
		const session = yield call(loginAsync, user)
		yield put(setSession(session))
		yield put(setAuthenticatedUser(userPool.getCurrentUser()))
		const idToken = yield select(idTokenSelector)
		yield call(obtainCredentialsAsync, idToken)
		yield put(setAuthorized(session.isValid()))
		console.info('Session: ', session)
	} catch (err) {
		yield put(setAuthError({ error: err.code, description: err.text }))
	}
}

const signupAsync = user => {
	return new Promise((resolve, reject) => {
		const attributeList = []

		const dataEmail = {
			Name: 'email',
			Value: user.email,
		}
		// var dataPhoneNumber = {
		//   Name: 'phone_number',
		//   Value: '...' // your phone number here with +country code and no delimiters in front
		// };
		var attributeEmail = new CognitoUserAttribute(dataEmail)
		// var attributePhoneNumber =
		// new AmazonCognitoIdentity.CognitoUserAttribute(dataPhoneNumber);

		attributeList.push(attributeEmail)
		// attributeList.push(attributePhoneNumber);

		let cognitoUser
		userPool.signUp(user.username, user.password, attributeList, null, function(err, result) {
			if (err) {
				reject(err)
				console.info('signup returns err')
				return
			}

			cognitoUser = result.user
			resolve(cognitoUser)
			// console.info('signup returns ', cognitoUser)
			console.log('user name is ' + cognitoUser.getUsername())
		})
	})
}

export function* doRegisterUser() {
	console.info('doRegisterUser')
	const user = yield select(getUser)

	if (!user.username && !user.password && !user.email) {
		console.error('unable to register user ', user)
		return
	}

	try {
		const cognitoUser = yield call(signupAsync, user)
		console.info('signupAsync returned', cognitoUser)
		yield put(setAuthenticatedUser(cognitoUser))
	} catch (err) {
		console.error('register failed ', err)
		console.info(JSON.stringify(err, null, 2))
		yield put(setAuthError({ error: err.code, description: err.message }))
	}
}

export function* doResendConfirmationCode() {
	console.info('doResendConfirmationCode')
	const user = yield select(getUser)

	if (!user.username) {
		console.error('user name is required ', user)
		return
	}

	try {
		const result = yield call(resendConfirmationCodeAsync, user)
		console.info('resendConfirmationCode returned', result)
	} catch (err) {
		console.error('register failed ', err)
		yield put(setAuthError({ error: err.code, description: err.message }))
	}
}

export function* doGetSignedInUser() {
	console.info('doGetSignedInUser')
	const user = yield select(getUser)

	if (!user.username) {
		console.error('user name is required ', user)
		return
	}

	try {
		const session = yield call(obtainSessionAsync)
		console.info('Session', session)
		yield put(setSession(session))
		yield put(setAuthorized(session.isValid()))
		console.info('currentUser = ', userPool.getCurrentUser())
	} catch (err) {
		console.error('Get signed in user failed ', err)
		yield put(setAuthError({ error: err.code, description: err.message }))
	}
}

function* doLogout() {
	console.info('doLogout')

	try {
		userPool.getCurrentUser().signOut()
	} catch (err) {
		console.info(err)
	}
	try {
		yield put(setAuthorized(false))
		yield put(setSession({}))
		yield put(setSession({}))
	} catch (err) {
		console.info(err)
	}
}

export function* loginUser() {
	console.info('Saga-loginUser')
	yield takeLatest(LOGIN_USER, doLoginUser)
}

export function* registerUser() {
	console.info('Saga-registerUser')
	yield takeLatest(REGISTER_USER, doRegisterUser)
}

export function* confirmUser() {
	console.info('Saga-confirmUser')
	yield takeLatest(CONFIRM_USER, doConfirmUser)
}

export function* resendConfirmationCode() {
	console.info('Saga-resendConfirmationCode')
	yield takeLatest(RESEND_CONFIRMATION_CODE, doResendConfirmationCode)
}

export function* getSignedInUser() {
	console.info('Saga-getSignedInUser')
	yield takeLatest(GET_SIGNED_IN_USER, doGetSignedInUser)
}

export function* logout() {
	console.info('Saga-getSignedInUser')
	yield takeLatest(LOGOUT, doLogout)
}
