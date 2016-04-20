import React from 'react'

import style from './card.css'

export default (props) => {
	const { card, tag, member } = props
	return (
		<div className={style.card}>
			<div className={style.tag}>
				{card.get('tag').map(value => (
					<span
						key={value}
						className={'tag tag-' + tag.getIn([value, 'color'])}
					>
					</span>
				))}
			</div>
			<div className={style.title}>
				{card.get('title')}
			</div>
			<div className={style.hint}></div>
			<div className={style.member}>
				{card.get('member').map(value => (
					<img
						key={value}
						src={member.getIn([value, 'avatar'])}
					/>
				))}
			</div>
		</div>
	)
}