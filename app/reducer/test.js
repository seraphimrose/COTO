import { createReducer } from 'redux-act'

import * as actions from 'action/test'

const initialState = {
	test: 'testing'
}

export default createReducer({
	[actions.test]: state => state
}, initialState)