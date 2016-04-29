import immutableSelector from './immutableSelector'

const boardSelector = state => state.entity.get('board')
const listSelector = state => state.entity.get('list')
const cardSelector = state => state.entity.get('card')
const tagSelector = state => state.entity.get('tag')
const memberSelector = state => state.entity.get('member')
const colorSelector = state => state.entity.get('color')

export default immutableSelector(
	boardSelector,
	listSelector,
	cardSelector,
	tagSelector,
	memberSelector,
	colorSelector,
	(board, list, card, tag, member, color) => ({
		board, list, card, tag, member, color
	})
)