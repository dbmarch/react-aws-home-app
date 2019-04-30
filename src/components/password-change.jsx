import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

// To change your password, you need to provide the old and new password.
// We initiate the CHANGE_PASSWORD action / saga.
// We should be able to provide this data directly to the SAGA w/o saving in our store.
// We don't want to save the password in the store.

const PasswordChange = ({ show, handleClose, resetPassword }) => {
	const [oldPassword, setOldPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')

	console.info('password Reset: show=', show)
	return (
		<Modal show={show} onHide={handleClose} backdrop="static">
			<Modal.Header closeButton>
				<Modal.Title>Change your Password</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					<Form.Row>
						<Form.Group controlId="old-password">
							<Form.Label>Old Password</Form.Label>
							<Form.Control
								name="password"
								type="password"
								placeholder="Enter old password"
								value={oldPassword}
								onChange={evt => setOldPassword(evt.target.value)}
							/>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group controlId="new-password">
							<Form.Label>New Password</Form.Label>
							<Form.Control
								name="new-password"
								type="password"
								placeholder="Enter new password"
								value={newPassword}
								onChange={evt => setNewPassword(evt.target.value)}
							/>
						</Form.Group>
					</Form.Row>
				</Form>
			</Modal.Body>

			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Cancel
				</Button>
				<Button variant="primary" onClick={() => resetPassword(oldPassword, newPassword)}>
					Reset Password
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default PasswordChange
