import entitySelector from './entitySelector'
import nextSelector from './nextSelector'
import detailSelector from './detailSelector'
import immutableSelector from './immutableSelector'

export default immutableSelector(
	entitySelector,
	nextSelector,
	detailSelector,
	(entity, next, detail) => ({
		...entity, next, ...detail
	})
)
