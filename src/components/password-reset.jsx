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
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')

	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>Reset your Password</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Row>
						<Col sm={10}>
							<Form.Group controlId="username">
								<Form.Label>Username</Form.Label>
								<Form.Control
									name="username"
									type="text"
									placeholder="Enter your username"
									value={username}
									onChange={evt => setUsername(evt.target.value)}
								/>
							</Form.Group>
						</Col>
					</Form.Row>

					<Form.Row>
						<Col sm={10}>
							<Form.Group controlId="password">
								<Form.Label>New Password</Form.Label>
								<Form.Control
									name="password"
									type="password"
									placeholder="Enter a new password"
									value={password}
									onChange={evt => setPassword(evt.target.value)}
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
				<Button variant="primary" onClick={() => resetPassword({ username, password })}>
					Reset Password
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default PasswordReset
