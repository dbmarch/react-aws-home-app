import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'

const Login = ({ authError, isAuthenticated, onLogin }) => {
	const submitForm = ({ username, password }) => {
		const userData = {
			username,
			password
		}
		console.info('LOGIN: ', userData)
		onLogin(userData)
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
			.required('Required')
	})

	const loginForm = ({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
		<div>
			<Form noValidate className="form-login my-3 mx-auto" onSubmit={handleSubmit}>
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
				</Form.Group>

				<Button variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	)

	return (
		<Container>
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
				{loginForm}
			</Formik>
			{authError && (
				<Alert variant="danger">
					<div>ERROR: {authError.error} </div>
					<div>DESCRIPTION: {authError.description}</div>
				</Alert>
			)}
		</Container>
	)
}

export default Login
