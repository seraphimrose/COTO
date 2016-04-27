import { fromJS } from 'immutable'
import { createReducer } from 'redux-act'
import * as actions from 'action/detail'

const initialState = fromJS({
	showDetail: false,
	detailIndex: null,
	user: "1"
})

export default createReducer({
	[actions.toggleDetail]: (state, data) =>
		state.set('showDetail', !state.get('showDetail'))
			.set('detailIndex', data.get('index'))
}, initialState)