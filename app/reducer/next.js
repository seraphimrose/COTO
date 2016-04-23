import { fromJS } from 'immutable'
import { createReducer } from 'redux-act'

import next from 'config/next'
import * as actions from 'action/entity'

const initialState = fromJS(next)

export default createReducer({
	[actions.addList]: (state, data) =>
		state.set('list', (parseInt(data.get('id')) + 1).toString())
}, initialState)