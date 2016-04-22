import entitySelector from './entitySelector'
import nextSelector from './nextSelector'
import showSelector from './showSelector'
import immutableSelector from './immutableSelector'

export default immutableSelector(
	entitySelector,
	nextSelector,
	showSelector,
	(entity, next, show) => ({
		entity, next, show
	})
)
