import { fromJS, List } from 'immutable'
import { createReducer } from 'redux-act'

import { now } from 'api/date'
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
						.setIn(['card', data.get('index'), 'lastUpdate'], now())
	},

	[actions.pushCard]: (state, data) => {
		if (data.get('fromList') === data.get('toList')) {
			return state
		}
		const sourcePos = state.getIn(['list', data.get('fromList'), 'card']).indexOf(data.get('index'))
		return state.deleteIn(['list', data.get('fromList'), 'card', sourcePos])
			.setIn(['list', data.get('toList'), 'card'],
				state.getIn(['list', data.get('toList'), 'card']).push(data.get('index')))
			.setIn(['card', data.get('index'), 'lastUpdate'], now())
	},
	
	[actions.moveLog]: (state, data) => (
		state.updateIn(['card', data.get('index'), 'activity'], list => list.push(fromJS({
			avatar: state.getIn(['member', data.get('user'), 'avatar']),
			name: state.getIn(['member', data.get('user'), 'name']),
			action: "move this card to List " + state.getIn(['list', data.get('toList'), 'title']) + " at",
			time: now(),
			color: "blue"
		})))
	),
	
	[actions.editBoardTitle]: (state, data) => state.setIn(['board', 'title'], data.get('title')),
	[actions.editListTitle]: (state, data) => state.setIn(['list', data.get('index'), 'title'], data.get('title')),
	[actions.editCardTitle]: (state, data) =>
		state.setIn(['card', data.get('index'), 'title'], data.get('title'))
			.setIn(['card', data.get('index'), 'lastUpdate'], now())
			.updateIn(['card', data.get('index'), 'activity'], list => list.push(fromJS({
				avatar: state.getIn(['member', data.get('user'), 'avatar']),
				name: state.getIn(['member', data.get('user'), 'name']),
				action: "edit this card title to " + data.get('title') + " at",
				time: now(),
				color: "blue"
			}))),

	[actions.addMember]: (state, data) =>
		state.setIn(['card', data.get('index'), 'member'], data.get('members'))
			.setIn(['card', data.get('index'), 'lastUpdate'], now())
			.updateIn(['card', data.get('index'), 'activity'], list => list.push(fromJS({
				avatar: state.getIn(['member', data.get('user'), 'avatar']),
				name: state.getIn(['member', data.get('user'), 'name']),
				action: (data.get('flag') ? "add the new member " : "remove the member ") +
					state.getIn(['member', data.get('key'), 'name']) +
					(data.get('flag') ? " to this card at" : " from this card at"),
				time: now(),
				color: data.get('flag') ? "green" : "red"
			}))),
	[actions.addTag]: (state, data) =>
		state.setIn(['card', data.get('index'), 'tag'], data.get('tags'))
			.setIn(['card', data.get('index'), 'lastUpdate'], now())
			.updateIn(['card', data.get('index'), 'activity'], list => list.push(fromJS({
				avatar: state.getIn(['member', data.get('user'), 'avatar']),
				name: state.getIn(['member', data.get('user'), 'name']),
				action: (data.get('flag') ? "add the new tag " : "remove the tag ") +
				state.getIn(['tag', data.get('key'), 'title']) +
				(data.get('flag') ? " to this card at" : " from this card at"),
				time: now(),
				color: data.get('flag') ? "green" : "red"
			}))),
	[actions.changeDueDate]: (state, data) =>
		state.setIn(['card', data.get('index'), 'dueDate'], data.get('dueDate'))
			.setIn(['card', data.get('index'), 'lastUpdate'], now())
			.updateIn(['card', data.get('index'), 'activity'], list => list.push(fromJS({
				avatar: state.getIn(['member', data.get('user'), 'avatar']),
				name: state.getIn(['member', data.get('user'), 'name']),
				action: data.get('flag') ? "remove the deadline at":
					("edit the deadline " + data.get('dueDate') + " in this card at"),
				time: now(),
				color: data.get('flag') ? "red" : "blue"
			}))),
	[actions.editDesc]: (state, data) =>
		state.setIn(['card', data.get('index'), 'desc'], data.get('desc'))
			.setIn(['card', data.get('index'), 'lastUpdate'], now())
			.updateIn(['card', data.get('index'), 'activity'], list => list.push(fromJS({
				avatar: state.getIn(['member', data.get('user'), 'avatar']),
				name: state.getIn(['member', data.get('user'), 'name']),
				action: data.get('flag') ? "delete the description at" : "edit the description at",
				time: now(),
				color: data.get('flag') ? "red" : "blue"
			}))),

	[actions.addComment]: (state, data) =>
		state.setIn(['card', data.get('index'), 'lastUpdate'], now())
			.updateIn(['card', data.get('index'), 'cmtcnt'], cnt => cnt === undefined ? 1 : cnt + 1)
			.updateIn(['card', data.get('index'), 'activity'], list => list.push(fromJS({
				avatar: state.getIn(['member', data.get('user'), 'avatar']),
				name: state.getIn(['member', data.get('user'), 'name']),
				action: data.get('comment'),
				time: now(),
				color: "green",
				type: "comment"
			}))),

	[actions.addNewTag]: (state, data) => state.mergeDeep(data),
	[actions.removeTag]: (state, data) =>
		state.deleteIn(['tag', data.get('index')])
			.deleteIn(['card', data.get('cardIndex'), 'tag'], state.getIn(['card', data.get('cardIndex'), 'tag']).indexOf(data.get('index')))
}, initialState)