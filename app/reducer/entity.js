import { fromJS } from 'immutable'
import { createReducer } from 'redux-act'

import entity from 'config/entity'
import * as actions from 'action/entity'

const initialState = fromJS(entity)

export default createReducer({
	[actions.addList]: (state, data) => state.mergeDeep(data),
	[actions.addCard]: (state, data) => state.mergeDeep(data)
}, initialState)