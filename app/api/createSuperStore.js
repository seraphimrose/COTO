import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'

const createStoreWithMiddleware = compose(
	applyMiddleware(thunk),
	window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

export default function createSuperStore(rootReducer, initialState) {
	const store = createStoreWithMiddleware(rootReducer, initialState)

	return store
}
