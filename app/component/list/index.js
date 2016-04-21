import React from 'react'

import Card from 'component/card'
import style from './list.css'

export default (props) => {
	const { list } = props
	return (
		<div className={style.list}>
			<div className={style.title}>
				<h5>{list.get('title')}</h5>
			</div>
			<div className={style.content}>
				{list.get('card').map(value => (
					<Card
						{...props}
						key={value}
						card={props.card.get(value)}
					/>
				))}
			</div>
			<div className={style.new}>
				Add a card...
			</div>
		</div>
	)
}