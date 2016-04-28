import { fromJS } from 'immutable'
import { createAction } from 'redux-act'

export const addList = createAction("Add a new list", data => fromJS(data))

export const addCard = createAction("Add a new card", data => fromJS(data))

export const removeList = createAction("Remove a list", data => fromJS(data))

export const removeCard = createAction("Remove a card", data => fromJS(data))

export const moveCard = createAction("Move a card", data => fromJS(data))

export const pushCard = createAction("Push a card to end of List", data => fromJS(data))

export const editBoardTitle = createAction("Edit board title", data => fromJS(data))

export const editListTitle = createAction("Edit list title", data => fromJS(data))

export const editCardTitle = createAction("Edit card title", data => fromJS(data))

export const addMember = createAction("Add members to card", data => fromJS(data))

export const addTag = createAction("Add tags to card", data => fromJS(data))

export const changeDueDate = createAction("Change due date", data => fromJS(data))

export const editDesc = createAction("Edit the description", data => fromJS(data))