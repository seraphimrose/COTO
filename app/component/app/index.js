import React from 'react'

import Board from 'component/board'

import './app.css'

export default (props) => (
	<div>
		<Board {...props}/>
		<div id="mask"></div>
	</div>
)