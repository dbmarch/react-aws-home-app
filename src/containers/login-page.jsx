import React from 'react'
import { connect } from 'react-redux'
import { isAuthLoading, isAuthFailed, isAuthenticated, getAuthenticatedUser } from '../selectors'
import LoginForm from './login-form'

const LoginPage = (props) => {
  const { isAuthenticated, authenticatedUser } = props
  return (
    <div>
      <LoginForm />
      <p>Authenticated={isAuthenticated}</p>
      <p>AuthenticatedUser ={authenticatedUser}</p>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    isAuthLoading: isAuthLoading(state),
    isAuthFailed: isAuthFailed(state),
    authenticatedUser: getAuthenticatedUser(state)
  }
}

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
