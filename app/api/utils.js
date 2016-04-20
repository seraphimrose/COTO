import { fromJS } from 'immutable'

export const mapGetter = (map, value) => {
	if (typeof map === 'undefined') {
		return fromJS({})
	} else {
		return map.get(value)
	}
} 