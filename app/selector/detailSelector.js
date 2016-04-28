import immutableSelector from './immutableSelector'

export default immutableSelector(
	(state) => state.detail.get('showDetail'),
	(state) => state.detail.get('detailIndex'),
	(state) => state.detail.get('user'),
	(state) => state.detail.get('tempBoardTitle'),
	(state) => state.detail.get('tempListTitle'),
	(state) => state.detail.get('tempCardTitle'),
	(showDetail, detailIndex, user, tempBoardTitle, tempListTitle, tempCardTitle) => ({
		showDetail, detailIndex, user, tempBoardTitle, tempListTitle, tempCardTitle
	})
)