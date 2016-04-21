import React from 'react'
import Icon from 'antd/lib/icon'

import Card from 'component/card'
import style from './list.css'

export default (props) => {
	const { list } = props
	return (
		<div className={style.list}>
			<div className={style.title}>
				<h3>{list.get('title')}</h3>
			</div>
			<div className={style.content}>
				{list.get('card') &&
					list.get('card').map(value => (
					<Card
						{...props}
						key={value}
						card={props.card.get(value)}
					/>
				))}
				<div className={style.new}>
					<Icon className={style.icon} type="plus" />Add a card...
				</div>
			</div>
		</div>
	)
}