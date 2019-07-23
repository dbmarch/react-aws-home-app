import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'
import Navigation from './navigation/navigation'
import { Route, Switch, withRouter, Redirect } from 'react-router-dom'
import { isAuthenticated } from './selectors'

import Home from './containers/pages/home-page'
import LoginPage from './containers/pages/login-page'
import UserAccountPage from './containers/pages/user-account-page'
import PhotoPage from './containers/pages/photo-page'
import GalleryPage from './containers/pages/image-gallery-page'
import TestPage from './containers/pages/test-page'

class App extends Component {
	render() {
		return (
			<div className="page">
				<Navigation />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route
						path="/photos"
						render={() => (this.props.isAuthenticated ? <PhotoPage /> : <Redirect to="/login" />)}
					/>
					<Route
						path="/gallery"
						render={() => (this.props.isAuthenticated ? <GalleryPage /> : <Redirect to="/login" />)}
					/>
					<Route path="/login" component={LoginPage} />
					<Route path="/account" component={UserAccountPage} />
					<Route path="/test" render={() => <TestPage />} />

					<Route component={Home} />
				</Switch>
			</div>
		)
	}
}
const mapStateToProps = state => {
	return {
		isAuthenticated: isAuthenticated(state),
	}
}

export default withRouter(
	connect(
		mapStateToProps,
		null
	)(App)
)
