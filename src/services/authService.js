import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
  // CognitoUserSession
} from 'amazon-cognito-identity-js'
// import { User } from './user.model'
// import { CognitoIdentityCredentials } from 'aws-sdk'
// import * as AWS from 'aws-sdk/global'

// Client Id is in parameter store:
// HOME_APP_CLIENT_ID

const POOL_DATA = {
  UserPoolId: 'us-east-2_zyce4X8Kl',
  ClientId: '5r6jfap0vcv4ailbk7shd4i1pd'
}

var userPool = new CognitoUserPool(POOL_DATA)

export class AuthService {
  authIsLoading = new BehaviorSubject(false)
  authDidFail = new BehaviorSubject(false)
  authStatusChanged = new Subject()
  //:CognitoUser
  registeredUser
  authorizedUser

  // constructor(private router: Router) { }
  constructor(router) {}

  // signUp(username: string, email: string, password: string): void {

  signUp(username, email, password) {
    this.authIsLoading.next(true)

    // :User
    const user = {
      username: username,
      email: email,
      password: password
    }
    //: CognitoUserAttribute[]
    const attrList = []

    const emailAttribute = {
      Name: 'email',
      Value: user.email
    }
    attrList.push(new CognitoUserAttribute(emailAttribute))
    console.info(user, attrList)
    userPool.signUp(user.username, user.password, attrList, null, (err, result) => {
      if (err) {
        console.error(err)
        this.authDidFail.next(true)
        this.authIsLoading.next(false)
        return
      }
      this.authDidFail.next(false)
      this.authIsLoading.next(false)
      this.registeredUser = result.user
      console.info(`user name is ${this.registeredUser.getUsername()}`)
    })
    return
  }
  confirmUser(username, code) {
    this.authIsLoading.next(true)
    const userData = {
      Username: username,
      Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData)
    console.log(`confirming user ${cognitoUser}`)
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      this.authIsLoading.next(false)
      if (err) {
        console.error(err)
        this.authDidFail.next(true)
        return
      }
      console.log('registration Confirmed: ' + result)
      this.authDidFail.next(false)
      this.router.navigate([ '/' ])
    })
  }
  signIn(username, password) {
    this.authIsLoading.next(true)
    const authData = {
      Username: username,
      Password: password
    }

    this.authStatusChanged.next(true)
    const authenticationDetails = new AuthenticationDetails(authData)
    const userData = {
      Username: username,
      Pool: userPool
    }
    const cognitoUser = new CognitoUser(userData)
    this.authorizedUser = cognitoUser

    const vm = this
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        var accessToken = result.getAccessToken().getJwtToken()
        console.log('Logged in!', accessToken)
        vm.authStatusChanged.next(true)
        vm.authDidFail.next(false)
        vm.authIsLoading.next(false)
        console.log(result)
      },
      onFailure: (err) => {
        console.log(err)
        vm.authDidFail.next(true)
        vm.authIsLoading.next(false)
      }
    })
    return
  }

  getAuthenticatedUser() {
    return userPool.getCurrentUser()
  }
  logout() {
    this.getAuthenticatedUser().signOut()
    this.authStatusChanged.next(false)
  }

  isAuthenticated() {
    const user = this.getAuthenticatedUser()
    const obs = Observable.create((observer) => {
      if (!user) {
        observer.next(false)
      } else {
        user.getSession((err, session) => {
          if (err) {
            observer.next(false)
          } else {
            if (session.isValid()) {
              observer.next(true)
            } else {
              observer.next(false)
            }
          }
        })
      }
      observer.complete()
    })
    return obs
  }
  initAuth() {
    this.isAuthenticated().subscribe((auth) => this.authStatusChanged.next(auth))
  }
}
