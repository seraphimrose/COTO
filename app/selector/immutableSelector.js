import { createSelectorCreator, defaultMemoize } from 'reselect'
import Immutable from 'immutable'

export default createSelectorCreator(
	defaultMemoize,
	Immutable.is
)