import React from 'react'
import { Formik } from 'formik'
import * as yup from 'yup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
//import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'

const Register = ({ registerUser, show, handleClose }) => {
	const submitForm = ({ username, password, email, phoneNumber }) => {
		const userData = {
			username,
			email,
			password,
			phoneNumber,
		}
		console.info('REGISTER: ', userData)
		registerUser(userData)
		handleClose()
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
			.required('Required'),
	})

	const registerForm = ({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
		<Form noValidate className="form-login my-3 mx-auto" onSubmit={handleSubmit}>
			<div>
				<Form.Group>
					<Form.Row>
						<Col sm={10}>
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
					</Form.Row>
					<Form.Row>
						<Col sm={10}>
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
					<Form.Row>
						<Col sm={10}>
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
				</Form.Group>

				<Form.Group>
					<Form.Row>
						<Col sm={10}>
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
						</Col>
					</Form.Row>
				</Form.Group>
			</div>

			<Modal.Footer>
				<Button variant="primary" type="submit">
					Register
				</Button>
			</Modal.Footer>
		</Form>
	)

	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>Register New Account</Modal.Title>
			</Modal.Header>

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
		</Modal>
	)
}

export default Register
