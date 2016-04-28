import React from 'react'

import Board from 'component/board'
import Detail from 'component/detail'
import { toggleDetail } from 'action/detail'

import './app.css'

export default (props) => (
	<div>
		<Board {...props}/>
		{props.showDetail && (
			<div>
				<Detail
					user={props.user}
					height={props.height}
					card={props.card.get(props.detailIndex)}
					index={props.detailIndex}
					tag={props.tag}
					member={props.member}
					dispatch={props.dispatch}
					tempCardTitle={props.tempCardTitle}
					tempDesc={props.tempDesc}
				/>
				<div id="mask" onClick={() => props.dispatch(toggleDetail({}))}></div>
			</div>
		)}
	</div>
)