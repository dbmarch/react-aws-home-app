import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

import { isAuthLoading, isAuthFailed } from '../selectors'
import { registerUser, loginUser } from '../actions'

const Register = ({ isAuthLoading, authError, registerUser, loginUser }) => {
	const submitForm = ({ username, password, email, firstName, lastName }) => {
		const userData = {
			username,
			email,
			password,
			firstName,
			lastName,
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
		firstName: yup
			.string()
			.min(2, 'Too short')
			.max(50, 'Too long')
			.required('Required'),
		lastName: yup
			.string()
			.min(2, 'Too short')
			.max(50, 'Too long')
			.required('Required'),
		email: yup
			.string()
			.email('Invalid email')
			.required('Required'),
	})

	const registerForm = ({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
		<Form noValidate className="form-login my-3 mx-auto" onSubmit={handleSubmit}>
			<div>
				<Form.Group>
					<Form.Row>
						<Col>
							<Form.Group controlId="first-name">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									name="firstName"
									type="text"
									placeholder="First Name"
									value={values.firstName}
									onChange={handleChange}
									isValid={touched.firstName && !errors.firstName}
									isInvalid={touched.firstName && errors.firstName}
									onBlur={handleBlur}
								/>
								{errors.firstName && (
									<Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="last-name">
								<Form.Label>First Name</Form.Label>
								<Form.Control
									name="lastName"
									type="text"
									placeholder="Last Name"
									value={values.lastName}
									onChange={handleChange}
									isValid={touched.lastName && !errors.lastName}
									isInvalid={touched.lastName && errors.lastName}
									onBlur={handleBlur}
								/>
								{errors.lastName && (
									<Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
								)}
							</Form.Group>
						</Col>
					</Form.Row>
				</Form.Group>

				<Form.Group>
					<Form.Row>
						<Col>
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
						</Col>
					</Form.Row>
					<Form.Text className="text-muted">Choose a username and password</Form.Text>
				</Form.Group>
			</div>
			<Form.Group>
				<Form.Row>
					<Col>
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
					</Col>
					<Col>
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
					</Col>
				</Form.Row>
			</Form.Group>

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
					email: '',
				}}
			>
				{registerForm}
			</Formik>
			{authError && (
				<div>
					<div>ERROR: {authError.error} </div>
					<div>DESCRIPTION: {authError.description}</div>
				</div>
			)}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isAuthLoading: isAuthLoading(state),
		authError: isAuthFailed(state),
	}
}

const mapDispatchToProps = dispatch => ({
	registerUser: user => dispatch(registerUser(user)),
	loginUser: user => dispatch(loginUser(user)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register)
