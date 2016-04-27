import immutableSelector from './immutableSelector'

export default immutableSelector(
	(state) => state.detail.get('showDetail'),
	(state) => state.detail.get('detailIndex'),
	(state) => state.detail.get('user'),
	(showDetail, detailIndex, user) => ({
		showDetail, detailIndex, user
	})
)