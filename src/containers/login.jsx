import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import { isAuthLoading, isAuthFailed } from '../selectors'
import { registerUser } from '../actions'

const Login = ({ isAuthLoading, isAuthFailed, registerUser }) => {
  const [ loginType, setLoginType ] = useState('login')
  const input = useRef(React.createRef())
  const onSubmit = (username, email, password) => {
    console.info('onSubmit - Signup ', username, email, password)
    registerUser(username, email, password)
  }

  return (
    <div>
      <Form className="form-login my-3 mx-auto">
        <ToggleButtonGroup name="signin" defaultValue={loginType} onChange={setLoginType}>
          <Form.Check value="login" inline id="form-select-login" type="radio" label="Login" />
          <Form.Check value="register" inline id="form-select-register" type="radio" label="Register" />
        </ToggleButtonGroup>
      </Form>
      <Form className="form-login my-3 mx-auto">
        {loginType === 'register' && (
          <Form.Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="First Name" />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Last Name" />
            </Col>
          </Form.Row>
        )}
        {loginType === 'login' && (
          <Form.Text className="text-muted">Login with either user name or email address</Form.Text>
        )}
        <Form.Row>
          <Col>
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
          </Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Button variant="primary" type="submit">
            {loginType === 'login' ? 'Login' : 'Register'}
          </Button>
        </Form.Row>
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
  registerUser: (user) => dispatch(registerUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
