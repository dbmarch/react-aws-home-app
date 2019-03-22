import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { getSignedInUser } from '../actions'
import { isAuthenticated, getAuthenticatedUser } from '../selectors'
import _ from 'lodash'

// import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation = ({ isAuthenticated, authenticatedUser }) => {
	return (
		<Navbar style={{ backgroundColor: '#e0e0e0' }} variant="light" expand="lg" fixed="top" sticky="top">
			<Navbar.Brand>D&L</Navbar.Brand>

			<Nav.Link as={NavLink} to="/" eventKey="1">
				Home{' '}
			</Nav.Link>

			<Nav.Link as={NavLink} to="/photos" eventKey="2">
				Photos
			</Nav.Link>

			<Nav.Link as={NavLink} to="/gallery" eventKey="3">
				Gallery
			</Nav.Link>

			{!isAuthenticated && (
				<Nav.Link as={NavLink} to="/login" eventKey="4" className="ml-auto mr-4">
					Sign-In
				</Nav.Link>
			)}
			{isAuthenticated && (
				<Nav.Link as={NavLink} to="/account" eventKey="4" className="ml-auto mr-4">
					{_.get(authenticatedUser, 'username', '---')}
				</Nav.Link>
			)}

			{/* <NavDropdown title="Sign In" id="nav-dropdown" className="ml-auto pr-5 mr-4">
        <NavDropdown.Item as={NavLink} to="/login" eventKey="4.1" className="mr-5">
          Login
        </NavDropdown.Item>
        <NavDropdown.Item eventKey="4.2" className="mr-2">
          Register
        </NavDropdown.Item>
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
		authenticatedUser: getAuthenticatedUser(state),
	}
}

const mapDispatchToProps = dispatch => ({
	getSignedInUser: () => dispatch(getSignedInUser(null)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Navigation)
