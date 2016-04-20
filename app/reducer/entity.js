import { fromJS } from 'immutable'
import data from 'config/data'

const initialState = fromJS(data)

export default function entity(state=initialState, action) {
	return state
}