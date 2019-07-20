import React from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import * as yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Col from 'react-bootstrap/Col'
import { isAuthLoading, getAuthError, getUser } from '../../selectors'
import { getSignedInUser, confirmUser, resendConfirmationCode } from '../../actions'

const ConfirmUserForm = ({ user, confirmUser, authError, resendConfirmationCode }) => {
	const username = user.username ? user.username : ''
	const submitConfirmation = ({ username, usercode }) => {
		const userData = {
			username,
			usercode,
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
			.required('Required'),
	})

	const confirmUserForm = ({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => (
		<div>
			<Form noValidate className="form-login my-3 mx-auto" onSubmit={handleSubmit}>
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
				</Form.Row>
				<Form.Row>
					<Col xs={2}>
						<Form.Group>
							<Button variant="outline-primary" type="button" onClick={() => resendConfirmationCode()}>
								Resend Code
							</Button>
						</Form.Group>
					</Col>

					<Col>
						<Form.Group>
							<Button variant="primary" type="submit">
								Verification Code
							</Button>
						</Form.Group>
					</Col>
				</Form.Row>
			</Form>
		</div>
	)

	return (
		<div>
			<Formik
				validationSchema={schema}
				onSubmit={submitConfirmation}
				initialValues={{
					username,
					usercode: '',
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
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isAuthLoading: isAuthLoading(state),
		authError: getAuthError(state),
		user: getUser(state),
	}
}

const mapDispatchToProps = dispatch => ({
	getSignedInUser: () => dispatch(getSignedInUser(null)),
	confirmUser: () => confirmUser(),
	resendConfirmationCode: () => dispatch(resendConfirmationCode(null)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ConfirmUserForm)
