import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import NavDropdown from 'react-bootstrap/NavDropdown'

const Navigation = () => {
  return (
    <Navbar style={{ backgroundColor: '#e0e0e0' }} variant="light" expand="lg" fixed="top" sticky="top">
      <Navbar.Brand>D&L</Navbar.Brand>

      <Nav.Link as={NavLink} to="/" eventKey="1">
        Home{' '}
      </Nav.Link>

      <Nav.Link as={NavLink} to="/photos" eventKey="2">
        Photos
      </Nav.Link>

      <Nav.Link as={NavLink} to="/login" eventKey="4" className="ml-auto mr-4">
        Sign-In
      </Nav.Link>

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

export default Navigation
