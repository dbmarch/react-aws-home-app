import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import { isAuthLoading, getAuthError, getUser } from '../selectors'
import { getSignedInUser, confirmUser, resendConfirmationCode } from '../actions'

const ConfirmUserForm = ({ show, handleClose, user, confirmUser, resendConfirmationCode, authError }) => {
	const username = user.username ? user.username : ''
	const submitConfirmation = ({ username, usercode }) => {
		const userData = {
			username,
			usercode
		}
		console.info('Confirm User: ', userData)
		confirmUser(userData)
	}
	const schema = yup.object({
		username: yup
			.string()
			.min(2, 'Too short')
			.max(50, 'Too long')
			.required('Required'),
		usercode: yup
			.string()
			.min(2, 'Too short')
			.required('Required')
	})

	const confirmUserForm = ({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
		<div>
			<Form noValidate className="form-login my-3 mx-auto" onSubmit={handleSubmit}>
				<Form.Row>
					<Col xs={10}>
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
					<Col xs={10}>
						<Form.Group controlId="usercode">
							<Form.Label>Verification Code</Form.Label>
							<Form.Control
								name="usercode"
								type="text"
								placeholder="Enter usercode"
								value={values.usercode}
								onChange={handleChange}
								isValid={touched.usercode && !errors.usercode}
								isInvalid={touched.usercode && errors.usercode}
								onBlur={handleBlur}
							/>
							{errors.usercode && (
								<Form.Control.Feedback type="invalid">{errors.usercode}</Form.Control.Feedback>
							)}
						</Form.Group>
					</Col>
				</Form.Row>
				<Modal.Footer>
					<Button variant="primary" type="button" onClick={() => resendConfirmationCode()}>
						Resend Code
					</Button>
					<Button variant="success" type="submit">
						Confirm Account
					</Button>
				</Modal.Footer>
			</Form>
		</div>
	)

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Confirm New Account</Modal.Title>
			</Modal.Header>

			<Formik
				validationSchema={schema}
				onSubmit={submitConfirmation}
				initialValues={{
					username,
					usercode: ''
				}}
			>
				{confirmUserForm}
			</Formik>
			{authError && (
				<Alert variant="danger">
					<div>ERROR: {authError.error} </div>
					<div>DESCRIPTION: {authError.description}</div>
				</Alert>
			)}
		</Modal>
	)
}

const mapStateToProps = state => {
	return {
		isAuthLoading: isAuthLoading(state),
		authError: getAuthError(state),
		user: getUser(state)
	}
}

const mapDispatchToProps = dispatch => ({
	getSignedInUser: () => dispatch(getSignedInUser(null)),
	confirmUser: () => confirmUser(),
	resendConfirmationCode: () => dispatch(resendConfirmationCode(null))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConfirmUserForm)
