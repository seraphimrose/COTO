import React from 'react'
import { connect } from 'react-redux'

import createFlexContainer from 'api/createFlexContainer'
import App from 'component/app'
import appSelector from 'selector/appSelector'

const AppContainer = createFlexContainer()(App)

export default connect(state => ({
	board: state.entity.get('board'),
	list: state.entity.get('list'),
	card: state.entity.get('card'),
	tag: state.entity.get('tag'),
	member: state.entity.get('member'),
	next: state.next,
	listShowed: state.entity.getIn(['board', 'list']).toJS()
}))(AppContainer)