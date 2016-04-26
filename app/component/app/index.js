import React from 'react'

import Board from 'component/board'
import Detail from 'component/detail'

import './app.css'

export default (props) => (
	<div>
		<Board {...props}/>
		{props.showDetail && (
			<div>
				<Detail
					card={props.card.get(props.detailIndex)}
					tag={props.tag}
					member={props.member}
				/>
				<div id="mask"></div>
			</div>
		)}
	</div>
)