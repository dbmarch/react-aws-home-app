import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'

import { isAuthenticated, getAuthenticatedUser } from '../selectors'
import { getSignedInUser, registerUser, loginUser } from '../actions'

import LoginForm from '../components/login-form'
import RegisterForm from '../components/register-form'
import ConfirmUserForm from '../components/confirm-user-form'
import PasswordReset from '../components/password-reset'
import Spacer from '../components/spacer'

const LoginPage = ({ isAuthenticated, authenticatedUser, authError, loginUser, registerUser, history }) => {
	const [passwordReset, showPasswordReset] = useState(false)
	const [registerUserModal, showRegisterUserModal] = useState(false)
	const [confirmUserModal, showConfirmUserModal] = useState(false)
	useEffect(() => {
		if (isAuthenticated) {
			console.info('redirect to home')
			history.push('/')
		}
	}, [isAuthenticated])

	const resetPassword = email => {
		console.info(`LOGIN PAGE: reset Password for email ${email}`)
		showPasswordReset(false)
	}

	// login page should let you log in
	return (
		<Container>
			<h3 className="mx-auto my-3 form-login">Login</h3>
			<LoginForm authError={authError} isAuthenticate={isAuthenticated} onLogin={loginUser} />

			<PasswordReset
				show={passwordReset}
				handleClose={() => showPasswordReset(false)}
				resetPassword={resetPassword}
			/>
			<RegisterForm show={registerUserModal} handleClose={() => showRegisterUserModal(false)} />
			<ConfirmUserForm show={confirmUserModal} handleClose={() => showConfirmUserModal(false)} />
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
		</Container>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
		authenticatedUser: getAuthenticatedUser(state)
	}
}

const mapDispatchToProps = dispatch => ({
	getSignedInUser: () => dispatch(getSignedInUser(null)),
	loginUser: user => dispatch(loginUser(user)),
	registerUser: user => dispatch(registerUser(user))
})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(LoginPage)
)
