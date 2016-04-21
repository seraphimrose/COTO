import React from 'react'
import Tooltip from 'antd/lib/tooltip'

import style from './card.css'

export default (props) => {
	const { card, tag, member } = props

	return (
		<div className={style.card}>
			<div className={style.tag}>
				{card.get('tag') &&
					card.get('tag').map(value => (
					<Tooltip
						key={value}
						placement="top"
						title={tag.getIn([value, 'title'])}
					>
						<span className={'tag tag-' + tag.getIn([value, 'color'])}>
						</span>
					</Tooltip>
				))}
			</div>
			<div className={style.title}>
				{card.get('title')}
			</div>
			<div className={style.hint}></div>
			<div className={style.member}>
				{card.get('member') && card.get('member').map(value => (
					<Tooltip
						key={value}
						placement="top"
						title={member.getIn([value, 'name'])}
					>
						<img src={member.getIn([value, 'avatar'])} />
					</Tooltip>
				))}
			</div>
		</div>
	)
}