import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)

export default (reducers, initialState) =>
	createStoreWithMiddleware(reducers, initialState)