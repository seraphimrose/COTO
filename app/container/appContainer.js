import React from 'react'
import { connect } from 'react-redux'

import Board from 'component/board'
import createFlexContainer from 'api/createFlexContainer'
import { mapGetter } from 'api/utils'


const App = (props) => ( <Board {...props}/> )

const AppContainer =  createFlexContainer()(App)

export default connect(state => ({
	board: mapGetter(state.entity, 'board'),
	list: mapGetter(state.entity, 'list'),
	card: mapGetter(state.entity, 'card'),
	tag: mapGetter(state.entity, 'tag'),
	member: mapGetter(state.entity, 'member')
}))(AppContainer)