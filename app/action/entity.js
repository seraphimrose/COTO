import { fromJS } from 'immutable'
import { createAction } from 'redux-act'

export const addList = createAction("Add a new list", data => fromJS(data))

export const addCard = createAction("Add a new card", data => fromJS(data))

export const removeList = createAction("Remove a list", data => fromJS(data))

export const removeCard = createAction("Remove a card", data => fromJS(data))

export const moveCard = createAction("Move a card", data => fromJS(data))