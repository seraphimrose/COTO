import React from 'react'
import Icon from 'antd/lib/icon'

import List from 'component/list'
import style from './board.css'

export default (props) => {
	const { board } = props
	return (
		<div className={style.board}>
			<div className={style.title}>
				<h1>{board.get('title')}</h1>
			</div>
			<div className={style.content}>
				{board.get('list') && 
					board.get('list').map(value => (
					<List
						{...props}
						key={value}
						list={props.list.get(value)}
					/>
				))}
				<div className={style.new}>
					<Icon className={style.icon} type="plus" />Add a list...
				</div>
			</div>
		</div>
	)

}