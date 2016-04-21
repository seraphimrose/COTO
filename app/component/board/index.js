import React from 'react'

import List from 'component/list'
import style from './board.css'

export default (props) => {
	const { board } = props
	return (
		<div className={style.board}>
			<div className={style.title}>
				{board.get('title')}
			</div>
			<div className={style.content}>
				{board.get('list').map(value => (
					<List
						{...props}
						key={value}
						list={props.list.get(value)}
					/>
				))}
			</div>
			<div className={style.new}>
				Add a list...
			</div>
		</div>
	)

}