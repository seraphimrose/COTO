import { fromJS } from 'immutable'
import { createReducer } from 'redux-act'

import entity from 'config/entity'
import * as actions from 'action/entity'

const initialState = fromJS(entity)

export default createReducer({
	[actions.addList]: (state, data) => state.mergeDeep(data),
	[actions.addCard]: (state, data) => state.mergeDeep(data),

	[actions.removeCard]: (state, data) =>
		state//.deleteIn(['card', data.get('index')]) // <-- unnecessary?
			.deleteIn(['list', data.get('listIndex'), 'card',
				state.getIn(['list', data.get('listIndex'), 'card']).indexOf(data.get('index'))]),

	[actions.addSlot]: (state, data) =>
		state.setIn(['list', data.get('listIndex'), 'card'], data.get('new')),
	[actions.removeSlot]: (state, data) => {
		const index = state.getIn(['list', data.get('listIndex'), 'card']).indexOf('slot')
		return index !== -1 ? state.deleteIn(['list', data.get('listIndex'), 'card', index]) : state
	},


	[actions.moveCard]: (state, data) =>
		state.deleteIn(['list', data.get('fromListIndex'), 'card',
			state.getIn(['list', data.get('fromListIndex'), 'card']).indexOf(data.get('index'))])
			.setIn(['list', data.get('toListIndex'), 'card'], data.get('new'))
}, initialState)