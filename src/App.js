import React, { Component } from 'react'
import './App.css'
import Navigation from './navigation/navigation'
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from './containers/home-page'
import LoginPage from './containers/login-page'
import PhotoPage from './containers/photo-page'

class App extends Component {
  render() {
    return (
      <div className="page">
        <Navigation />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/photos" component={PhotoPage} />
          <Route path="/login" component={LoginPage} />
          <Route component={Home} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
