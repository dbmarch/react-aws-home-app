import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

// A password reset is performed by passing in the user name
// A code is sent to the user's email or phone.
// A dialog accepting the code and new password is provided.

// The form below needs to be reworked.

const PasswordReset = ({ show, handleClose, resetPassword }) => {
	const [email, setEmail] = useState('')

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Reset your Password</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Row>
						<Col sm={10}>
							<Form.Group controlId="email">
								<Form.Label>Email Address</Form.Label>
								<Form.Control
									name="email"
									type="email"
									placeholder="Enter your email address"
									value={email}
									onChange={evt => setEmail(evt.target.value)}
								/>
							</Form.Group>
						</Col>
					</Form.Row>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="primary" onClick={() => resetPassword(email)}>
					Reset Password
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default PasswordReset
