import React, { Component } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

export default (store, routes) => {
	class Root extends Component {
		render() {
			return (
				<Provider store={store}>
					<Router>
						{routes}
					</Router>
				</Provider>
			)
		}
	}
	return Root
}