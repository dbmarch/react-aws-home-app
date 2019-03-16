import { takeLatest, select, put, call } from 'redux-saga/effects'
import { LOGIN_USER, REGISTER_USER } from '../actions/action-types'
import { CognitoUserPool, CognitoUserAttribute, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'
import { getUser } from '../selectors'
import { setAuthenticated, setAuthFailed, setAuthorizedUser } from '../actions'
import Promise from 'bluebird'

const poolData = {
  UserPoolId: 'us-east-2_zyce4X8Kl',
  ClientId: '5r6jfap0vcv4ailbk7shd4i1pd'
}
var userPool = new CognitoUserPool(poolData)

//Documentation: https://github.com/aws-amplify/amplify-js/tree/master/packages/amazon-cognito-identity-js

// The user object should look like:
// const user = {
//   username: username,
//   email: email,
//   password: password
// }
// function getCredentialsAsync() {
//   AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: 'us-east-1:XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',
//     Logins: {
//       'cognito-idp.us-east-1.amazonaws.com/us-east-1_XXXXXXXXX':
//         result.getIdToken().getJwtToken()
//     }
//   });

//   AWS.config.credentials.get(function (err) {
//     if (err) {
//       alert(err);
//     }
//   });
// }

function confirmUserAsync(user, code) {
  const userData = {
    Username: user.username,
    Pool: userPool
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

function forgotPasswordAsync(user) {
  const userData = {
    Username: user.username,
    Pool: userPool
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
      }
    })
  )
}

function loginAsync(user) {
  const userData = {
    Username: user.username,
    Pool: userPool
  }
  const authenticationData = {
    Username: user.username,
    Password: user.password
  }

  const authenticationDetails = new AuthenticationDetails(authenticationData)
  const cognitoUser = new CognitoUser(userData)

  return new Promise((resolve, reject) =>
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function(result) {
        console.info('Login success! ', cognitoUser.getUsername())
        var accessToken = result.getAccessToken().getJwtToken()
        console.info('accessToken:', accessToken)
        resolve(accessToken)
      },

      onFailure: function(err) {
        console.info('Login fail!')
        reject(err)
      },
      mfaRequired: function(codeDeliveryDetails) {
        console.info('mfa required ....')
        var verificationCode = prompt('Please input verification code', '')
        cognitoUser.sendMFACode(verificationCode, this)
      }
    })
  )
}

function signupAsync(user) {
  return new Promise((resolve, reject) => {
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
    yield put(setAuthorizedUser(cognitoUser))
  } catch (err) {
    console.error('register failed ', err)
    console.info(JSON.stringify(err, null, 2))
    yield put(setAuthFailed({ error: err.code, description: err.message }))
  }
}

export function* doLoginUser() {
  console.info('doLoginUser')
  const user = yield select(getUser)
  if (!user.username && !user.password) {
    yield put(setAuthFailed('require username & password'))
    return
  }
  // const user = {
  //   username: username,
  //   email: email,
  //   password: password
  // }
  console.info('user', user)

  try {
    const accessToken = yield call(loginAsync, user)
    yield put(setAuthenticated(accessToken))
  } catch (err) {
    yield put(setAuthFailed({ error: err.code, description: err.text }))
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
