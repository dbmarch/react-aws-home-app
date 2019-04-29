import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
// import NavDropdown.Item from 'react-bootstrap/NavDropdown.Item'
import { getSignedInUser } from '../actions'
import { isAuthenticated, getAuthenticatedUser } from '../selectors'
import get from 'lodash/get'
import { logout, deleteAccount } from '../actions'

// import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation = ({ isAuthenticated, authenticatedUser, logout }) => {
	return (
		<Navbar style={{ backgroundColor: '#e0e0e0' }} variant="light" expand="lg" fixed="top" sticky="top">
			<Navbar.Brand>D&L</Navbar.Brand>

			<Nav.Link as={NavLink} to="/" eventKey="1">
				Home{' '}
			</Nav.Link>

			<Nav.Link as={NavLink} to="/photos" eventKey="2">
				Photos
			</Nav.Link>

			{/* <Nav.Link as={NavLink} to="/gallery" eventKey="3">
				Gallery
			</Nav.Link> */}

			{!isAuthenticated && (
				<Nav.Link as={NavLink} to="/login" eventKey="4" className="ml-auto mr-4">
					Sign-In
				</Nav.Link>
			)}

			{isAuthenticated && (
				<NavDropdown
					id="nav-account"
					title={get(authenticatedUser, 'username', '---')}
					className="ml-auto mr-4"
				>
					<NavDropdown.Item eventKey="4.1">
						<Nav.Link as={NavLink} to="/account" eventKey="4" className="ml-auto mr-4">
							Manage Account
						</Nav.Link>
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item eventKey="4.2" onClick={logout}>
						Logout
					</NavDropdown.Item>
				</NavDropdown>
			)}

			{/* <NavDropdown title="Sign In" id="nav-dropdown" className="ml-auto pr-5 mr-4">
        
        <NavDropdown.Divider />
        <NavDropdown.Item eventKey="4.4" className=" mr-2">
          Logout
        </NavDropdown.Item>
      </NavDropdown> */}
		</Navbar>
	)
}
const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
		authenticatedUser: getAuthenticatedUser(state)
	}
}

const mapDispatchToProps = dispatch => ({
	getSignedInUser: () => dispatch(getSignedInUser(null)),
	logout: () => dispatch(logout(null))
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navigation)
