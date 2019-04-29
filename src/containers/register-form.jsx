import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'

import { isAuthLoading, getAuthError } from '../selectors'
import { registerUser, loginUser } from '../actions'

const Register = ({ isAuthLoading, authError, registerUser, loginUser }) => {
	const submitForm = ({ username, password, email, firstName, lastName }) => {
		const userData = {
			username,
			email,
			password,
			firstName,
			lastName
		}
		console.info('REGISTER: ', userData)
		registerUser(userData)
	}
	const schema = yup.object({
		username: yup
			.string()
			.min(2, 'Too short')
			.max(50, 'Too long')
			.required('Required'),
		password: yup
			.string()
			.min(6, 'Too short')
			.required('Required'),
		phoneNumber: yup
			.string()
			.min(7, 'Too short')
			.required('Required'),

		email: yup
			.string()
			.email('Invalid email')
			.required('Required')
	})

	const registerForm = ({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
		<Form noValidate className="form-login my-3 mx-auto" onSubmit={handleSubmit}>
			<div>
				<Form.Group>
					<Form.Row>
						<Form.Group controlId="username">
							<Form.Label>Username</Form.Label>
							<Form.Control
								name="username"
								type="text"
								placeholder="Enter username"
								value={values.username}
								onChange={handleChange}
								isValid={touched.username && !errors.username}
								isInvalid={touched.username && errors.username}
								onBlur={handleBlur}
							/>
							{errors.username && (
								<Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
							)}
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Form.Control
								name="password"
								type="password"
								placeholder="Enter password"
								value={values.password}
								onChange={handleChange}
								isValid={touched.password && !errors.password}
								isInvalid={touched.password && errors.password}
								onBlur={handleBlur}
							/>
							{errors.password && (
								<Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
							)}
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>Email address</Form.Label>
							<Form.Control
								name="email"
								type="email"
								placeholder="Enter email"
								value={values.email}
								onChange={handleChange}
								isValid={touched.email && !errors.email}
								isInvalid={touched.email && errors.email}
								onBlur={handleBlur}
							/>
							{errors.email && (
								<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
							)}
						</Form.Group>
					</Form.Row>
				</Form.Group>

				<Form.Group>
					<Form.Row>
						<Form.Group controlId="formBasicPhoneNumber">
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								name="phoneNumber"
								type="tel"
								placeholder="Enter Phone Number"
								value={values.phoneNumber}
								onChange={handleChange}
								isValid={touched.phoneNumber && !errors.phoneNumber}
								isInvalid={touched.phoneNumber && errors.phoneNumber}
								onBlur={handleBlur}
							/>
							{errors.email && (
								<Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
							)}
						</Form.Group>
					</Form.Row>
				</Form.Group>
			</div>

			<Form.Group>
				<Form.Row>
					<Button variant="primary" type="submit">
						Register
					</Button>
				</Form.Row>
			</Form.Group>
		</Form>
	)

	return (
		<div>
			<Formik
				validationSchema={schema}
				onSubmit={submitForm}
				initialValues={{
					firstName: '',
					lastName: '',
					username: '',
					password: '',
					email: ''
				}}
			>
				{registerForm}
			</Formik>
			{authError && (
				<Alert variant="danger">
					<div>ERROR: {authError.error} </div>
					<div>DESCRIPTION: {authError.description}</div>
				</Alert>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isAuthLoading: isAuthLoading(state),
		authError: getAuthError(state)
	}
}

const mapDispatchToProps = dispatch => ({
	registerUser: user => dispatch(registerUser(user)),
	loginUser: user => dispatch(loginUser(user))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register)
