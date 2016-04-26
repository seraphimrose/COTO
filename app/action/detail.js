import { createAction } from 'redux-act'
import { fromJS } from 'immutable'

export const toggleDetail = createAction("Show card detail", data => fromJS(data))