import { fromJS, List } from 'immutable'
import { createReducer } from 'redux-act'

import Now from 'api/getNow'
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
						.setIn(['card', data.get('index'), 'lastUpdate'], Now())
	},

	[actions.pushCard]: (state, data) => {
		if (data.get('fromList') === data.get('toList')) {
			return state
		}
		const sourcePos = state.getIn(['list', data.get('fromList'), 'card']).indexOf(data.get('index'))
		return state.deleteIn(['list', data.get('fromList'), 'card', sourcePos])
			.setIn(['list', data.get('toList'), 'card'],
				state.getIn(['list', data.get('toList'), 'card']).push(data.get('index')))
			.setIn(['card', data.get('index'), 'lastUpdate'], Now())
	},
	
	[actions.editBoardTitle]: (state, data) => state.setIn(['board', 'title'], data.get('title')),
	[actions.editListTitle]: (state, data) => state.setIn(['list', data.get('index'), 'title'], data.get('title')),
	[actions.editCardTitle]: (state, data) =>
		state.setIn(['card', data.get('index'), 'title'], data.get('title'))
			.setIn(['card', data.get('index'), 'lastUpdate'], Now()),

	[actions.addMember]: (state, data) =>
		state.setIn(['card', data.get('index'), 'member'], data.get('members'))
			.setIn(['card', data.get('index'), 'lastUpdate'], Now()),
	[actions.addTag]: (state, data) =>
		state.setIn(['card', data.get('index'), 'tag'], data.get('tags'))
			.setIn(['card', data.get('index'), 'lastUpdate'], Now()),
	[actions.changeDueDate]: (state, data) =>
		state.setIn(['card', data.get('index'), 'dueDate'], data.get('dueDate'))
			.setIn(['card', data.get('index'), 'lastUpdate'], Now()),
	
	[actions.editDesc]: (state, data) =>
		state.setIn(['card', data.get('index'), 'desc'], data.get('desc'))
			.setIn(['card', data.get('index'), 'lastUpdate'], Now()),
}, initialState)