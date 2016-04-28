import { createAction } from 'redux-act'
import { fromJS } from 'immutable'

export const toggleDetail = createAction("Show card detail", data => fromJS(data))

export const editingBoardTitle = createAction("Editing board title")

export const editingListTitle = createAction("Editing board title")

export const editingCardTitle = createAction("Editing board title")

export const editingDesc = createAction("Editing the description")