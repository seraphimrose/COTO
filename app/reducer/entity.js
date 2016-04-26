import { fromJS, List } from 'immutable'
import { createReducer } from 'redux-act'

import entity from 'config/entity'
import * as actions from 'action/entity'

const initialState = fromJS(entity)

export default createReducer({
	[actions.addList]: (state, data) => state.mergeDeep(data),
	[actions.addCard]: (state, data) => state.mergeDeep(data),

	[actions.removeList]: (state, data) =>
		state.deleteIn(['board', 'list', state.getIn(['board', 'list']).indexOf(data.get('index'))]),
	[actions.removeCard]: (state, data) =>
		state.deleteIn(['list', data.get('listIndex'), 'card',
			state.getIn(['list', data.get('listIndex'), 'card']).indexOf(data.get('index'))]),

	[actions.moveCard]: (state, data) => {
		const sourcePos = state.getIn(['list', data.get('fromList'), 'card']).indexOf(data.get('index'))
		let insertPos = state.getIn(['list', data.get('toList'), 'card']).indexOf(data.get('hoverIndex'))
		if (!data.get('upFlag')) {
			insertPos++
		}
		const newState = state.deleteIn(['list', data.get('fromList'), 'card', sourcePos])
		const rawCard = newState.getIn(['list', data.get('toList'), 'card'])
		return newState.setIn(['list', data.get('toList'), 'card'], rawCard.splice(insertPos, 0, data.get('index')))
	},

	[actions.pushCard]: (state, data) => {
		if (data.get('fromList') === data.get('toList')) {
			return state
		}
		const sourcePos = state.getIn(['list', data.get('fromList'), 'card']).indexOf(data.get('index'))
		return state.deleteIn(['list', data.get('fromList'), 'card', sourcePos])
			.setIn(['list', data.get('toList'), 'card'],
				state.getIn(['list', data.get('toList'), 'card']).push(data.get('index')))
	}

}, initialState)