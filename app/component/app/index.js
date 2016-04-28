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
					{...props}
					card={props.card.get(props.detailIndex)}
					index={props.detailIndex}
				/>
				<div id="mask" onClick={() => props.dispatch(toggleDetail({}))}></div>
			</div>
		)}
	</div>
)