import React, { Component } from 'react'
import { connect } from 'react-redux'
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

import createFlexContainer from 'api/createFlexContainer'
import App from 'component/app'
import appSelector from 'selector/appSelector'

@DragDropContext(HTML5Backend)
@createFlexContainer()
@connect(state => ({
	board: state.entity.get('board'),
	list: state.entity.get('list'),
	card: state.entity.get('card'),
	tag: state.entity.get('tag'),
	member: state.entity.get('member'),
	next: state.next
}))
export default class AppContainer extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return <App {...this.props} />
	}
}