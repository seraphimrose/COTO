import { fromJS } from 'immutable'
import { createReducer } from 'redux-act'
import * as actions from 'action/detail'

const initialState = fromJS({
	showDetail: false,
	detailIndex: null,
	user: "1",
	tempBoardTitle: null,
	tempListTitle: null,
	tempCardTitle: null
})

export default createReducer({
	[actions.toggleDetail]: (state, data) =>
		state.set('showDetail', !state.get('showDetail'))
			.set('detailIndex', data.get('index')),
	
	[actions.editingBoardTitle]: (state, data) => state.set('tempBoardTitle', data),
	[actions.editingListTitle]: (state, data) => state.set('tempListTitle', data),
	[actions.editingCardTitle]: (state, data) => state.set('tempCardTitle', data)
}, initialState)