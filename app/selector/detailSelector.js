import immutableSelector from './immutableSelector'

export default immutableSelector(
	(state) => state.detail.get('showDetail'),
	(state) => state.detail.get('detailIndex'),
	(showDetail, detailIndex) => ({
		showDetail, detailIndex
	})
)