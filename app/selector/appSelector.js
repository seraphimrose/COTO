import entitySelector from './entitySelector'
import nextSelector from './nextSelector'
import immutableSelector from './immutableSelector'

export default immutableSelector(
	entitySelector,
	nextSelector,
	(entity, next) => ({
		entity, next
	})
)
