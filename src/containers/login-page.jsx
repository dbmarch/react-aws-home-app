import React, { useState } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { isAuthLoading, isAuthFailed, isAuthenticated, getAuthenticatedUser } from '../selectors'
import LoginForm from './login-form'
import RegisterForm from './register-form'

const LoginPage = ({ isAuthenticated, authenticatedUser }) => {
	const [loginType, setLoginType] = useState('login')

	return (
		<div>
			<Form className="form-login my-3 mx-auto">
				<Form.Group>
					<ToggleButtonGroup name="signin" defaultValue={loginType} onChange={value => setLoginType(value)}>
						<Form.Check value="login" inline id="form-select-login" type="radio" label="Login" />
						<Form.Check value="register" inline id="form-select-register" type="radio" label="Register" />
					</ToggleButtonGroup>
				</Form.Group>
			</Form>

			{loginType === 'login' && <LoginForm />}
			{loginType === 'register' && <RegisterForm />}
			<p>Authenticated={isAuthenticated}</p>
			<p>AuthenticatedUser ={authenticatedUser}</p>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
		isAuthLoading: isAuthLoading(state),
		isAuthFailed: isAuthFailed(state),
		authenticatedUser: getAuthenticatedUser(state),
	}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(LoginPage)
