import { fromJS } from 'immutable'
import { createAction } from 'redux-act'

export const addList = createAction("Add a new list", data => fromJS(data))

export const addCard = createAction("Add a new card", data => fromJS(data))