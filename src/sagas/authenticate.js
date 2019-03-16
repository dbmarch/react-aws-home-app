import { put, takeEvery, takeLatest, all, select } from 'redux-saga/effects'
import _ from 'lodash'
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserSession
} from 'amazon-cognito-identity-js'
import { getUser } from '../selectors'

import { CognitoIdentityCredentials } from 'aws-sdk'
import * as AWS from 'aws-sdk/global'

const poolData = {
  UserPoolId: 'us-east-2_zyce4X8Kl',
  ClientId: '5r6jfap0vcv4ailbk7shd4i1pd'
}
var userPool = new CognitoUserPool(poolData)

function* registerUser() {
  const user = yield select(getUser)
  // user should have
  // const user = {
  //   username: username,
  //   email: email,
  //   password: password
  // }
  if (user.username && user.password) {
    const attributeList = []

    const dataEmail = {
      Name: 'email',
      Value: user.email
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
        console.error(err)
        return
      }
      console.info('signup returns ', cognitoUser)
      cognitoUser = result.user
      console.log('user name is ' + cognitoUser.getUsername())
    })
  } else {
    console.error('Unable to register user.', user)
  }
}
function* loginUser() {
  const user = yield select(getUser)
  // user should have
  // const user = {
  //   username: username,
  //   email: email,
  //   password: password
  // }
  if (user.username && user.password) {
    const attributeList = []
    var userData = {
      Username: user.username,
      Pool: userPool
    }
    var authenticationData = {
      Username: user.username,
      Password: user.password
    }
    var authenticationDetails = new AuthenticationDetails(authenticationData)

    var cognitoUser = new CognitoUser(userData)
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.info('Login success!')
        var accessToken = result.getAccessToken().getJwtToken()
      },

      onFailure: function(err) {
        console.info('Login fail!')
        alert(err)
      },
      mfaRequired: function(codeDeliveryDetails) {
        console.info('mfa required ....')
        var verificationCode = prompt('Please input verification code', '')
        cognitoUser.sendMFACode(verificationCode, this)
      }
    })
  } else {
    console.error('Unable to login user.', user)
  }
}

function* authenticate() {
  yield all([ takeLatest('LOGIN_USER', loginUser), takeLatest('REGISTER_USER', registerUser) ])
}

export default authenticate
