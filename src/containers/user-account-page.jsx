import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import { isAuthenticated, getAuthenticatedUser } from '../selectors'
import { logout, deleteAccount } from '../actions'
import Button from 'react-bootstrap/Button'
import PasswordChange from '../components/password-change'

/// this is the page where we would change password , add attributes, etc.
const UserAccountPage = ({ isAuthenticated, authenticatedUser, logout, deleteAccount, history }) => {
	const [passwordModal, showPasswordModal] = useState(false)
	useEffect(() => {
		if (!isAuthenticated) {
			console.info('redirect to login')
			history.push('/login')
		}
	}, [isAuthenticated])

	const resetPassword = (oldPassword, newPassword) => {
		console.info(`Change password ${oldPassword} ${newPassword}`)
		showPasswordModal(false)
	}
	return (
		<div>
			<PasswordChange
				show={passwordModal}
				handleClose={() => showPasswordModal(false)}
				resetPassword={resetPassword}
			/>
			<Form className="form-login my-3 mx-auto">
				<Form.Group>
					<Button variant="outline-primary" type="button" onClick={() => showPasswordModal(true)}>
						CHANGE PASSWORD
					</Button>
				</Form.Group>
				<Form.Group>
					<Button variant="danger" type="button" onClick={deleteAccount}>
						DELETE ACCOUNT
					</Button>
				</Form.Group>
			</Form>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
		authenticatedUser: getAuthenticatedUser(state)
	}
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logout(null)),
	deleteAccount: () => dispatch(deleteAccount(null))
})

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(UserAccountPage)
)
