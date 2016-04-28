import immutableSelector from './immutableSelector'

export default immutableSelector(
	(state) => state.detail.get('showDetail'),
	(state) => state.detail.get('detailIndex'),
	(state) => state.detail.get('user'),
	(state) => state.detail.get('tempBoardTitle'),
	(state) => state.detail.get('tempListTitle'),
	(state) => state.detail.get('tempCardTitle'),
	(state) => state.detail.get('tempDesc'),
	(showDetail, detailIndex, user, tempBoardTitle, tempListTitle, tempCardTitle, tempDesc) => ({
		showDetail,
		detailIndex,
		user,
		tempBoardTitle,
		tempListTitle,
		tempCardTitle,
		tempDesc
	})
)