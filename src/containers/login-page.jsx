import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert'

import { isAuthenticated, getAuthenticatedUser, getAuthError, getUser } from '../selectors'
import {
	getSignedInUser,
	registerUser,
	loginUser,
	resendConfirmationCode,
	confirmUser,
	forgotPassword,
} from '../actions'

import LoginForm from '../components/login-form'
import RegisterForm from '../components/register-form'
import ConfirmUserForm from '../components/confirm-user-form'
import PasswordReset from '../components/password-reset'
import Spacer from '../components/spacer'

const LoginPage = ({
	user,
	isAuthenticated,
	authenticatedUser,
	authError,
	loginUser,
	registerUser,
	resendConfirmationCode,
	confirmUser,
	resetPassword,
	history,
}) => {
	const [passwordReset, showPasswordReset] = useState(false)
	const [registerUserModal, showRegisterUserModal] = useState(false)
	const [confirmUserModal, showConfirmUserModal] = useState(false)
	useEffect(() => {
		if (isAuthenticated) {
			console.info('redirect to home')
			history.push('/')
		}
	}, [isAuthenticated])

	console.info('authenticatedUser', authenticatedUser)
	console.info('authError', authError)

	return (
		<Container>
			<h3 className="mx-auto my-3 form-login">Login</h3>
			<LoginForm authError={authError} isAuthenticate={isAuthenticated} onLogin={loginUser} />

			<PasswordReset
				show={passwordReset}
				handleClose={() => showPasswordReset(false)}
				resetPassword={userData => resetPassword(userData)}
			/>
			<RegisterForm
				show={registerUserModal}
				handleClose={() => showRegisterUserModal(false)}
				registerUser={registerUser}
			/>

			<ConfirmUserForm
				show={confirmUserModal}
				handleClose={() => showConfirmUserModal(false)}
				resendConfirmationCode={resendConfirmationCode}
				confirmUser={confirmUser}
			/>
			<Spacer lines={2} />
			<Container>
				<Row>
					<Col xs sm="1" />
					<Col xs sm="3">
						<div className="form-text">Forgot your password?</div>
					</Col>
					<Col xs sm="2">
						<Button variant="link" size="sm" onClick={() => showPasswordReset(true)}>
							Reset Password
						</Button>
					</Col>
				</Row>
				<Row>
					<Col xs sm="1" />
					<Col xs sm="3">
						<div className="form-text"> No Account?</div>
					</Col>
					<Col xs sm="2">
						<Button variant="link" size="sm" onClick={() => showRegisterUserModal(true)}>
							Create Account
						</Button>
					</Col>
				</Row>
				<Row>
					<Col xs sm="1" />
					<Col xs sm="3">
						<div className="form-text">Have a confirmation code?</div>
					</Col>
					<Col xs sm="2">
						<Button variant="link" size="sm" onClick={() => showConfirmUserModal(true)}>
							Confirm Account
						</Button>
					</Col>
				</Row>
			</Container>
			{authError && (
				<Alert variant="danger">
					<div>ERROR: {authError.error} </div>
					<div>DESCRIPTION: {authError.description}</div>
				</Alert>
			)}
		</Container>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
		authenticatedUser: getAuthenticatedUser(state),
		authError: getAuthError(state),
		user: getUser(state),
	}
}

const mapDispatchToProps = dispatch => ({
	getSignedInUser: () => dispatch(getSignedInUser(null)),
	loginUser: user => dispatch(loginUser(user)),
	registerUser: userData => dispatch(registerUser(userData)),
	resendConfirmationCode: username => dispatch(resendConfirmationCode(username)),
	confirmUser: confirmationData => dispatch(confirmUser(confirmationData)),
	resetPassword: userData => dispatch(forgotPassword(userData)),
})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LoginPage)
)
