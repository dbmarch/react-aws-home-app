import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
// import FormGroup from 'react-bootstrap/FormGroup'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { isAuthLoading, isAuthFailed } from '../selectors'
import { registerUser, loginUser } from '../actions'

const Login = ({ isAuthLoading, isAuthFailed, registerUser, loginUser }) => {
  const [ loginType, setLoginType ] = useState('login')
  const [ email, setEmail ] = useState('')
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const submitForm = (event) => {
    event.preventDefault()
    console.info(event)
    if (loginType === 'login') {
      const userData = {
        username,
        email,
        password
      }
      console.info('LOGIN: ', userData)
      loginUser(userData)
    } else {
      const userData = {
        username,
        email,
        password
      }
      console.info('REGISTER: ', userData)
      registerUser(userData)
    }
  }

  return (
    <div>
      <Form className="form-login my-3 mx-auto" onSubmit={submitForm}>
        <Form.Group>
          <ToggleButtonGroup name="signin" defaultValue={loginType} onChange={setLoginType}>
            <Form.Check value="login" inline id="form-select-login" type="radio" label="Login" />
            <Form.Check value="register" inline id="form-select-register" type="radio" label="Register" />
          </ToggleButtonGroup>
        </Form.Group>
        {loginType === 'register' && (
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </Form.Row>
          </Form.Group>
        )}
        {loginType === 'login' && (
          <Form.Text className="text-muted">Login with either user name or email address</Form.Text>
        )}
        <Form.Group>
          <Form.Row>
            <Col>
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Col>
            <Col>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </Form.Group>
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Group>
          <Form.Row>
            <Button variant="primary" type="submit">
              {loginType === 'login' ? 'Login' : 'Register'}
            </Button>
          </Form.Row>
        </Form.Group>
      </Form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    isAuthLoading: isAuthLoading(state),
    isAuthFailed: isAuthFailed(state)
  }
}

const mapDispatchToProps = (dispatch) => ({
  registerUser: (user) => dispatch(registerUser(user)),
  loginUser: (user) => dispatch(loginUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
