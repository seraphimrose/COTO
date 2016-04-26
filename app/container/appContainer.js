import React, { Component } from 'react'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import createFlexContainer from 'api/createFlexContainer'
import App from 'component/app'
import appSelector from 'selector/appSelector'

@DragDropContext(HTML5Backend)
@createFlexContainer()
@connect(appSelector)
export default class AppContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <App {...this.props} />
	}
}