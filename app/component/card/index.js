import React, { Component } from 'react'
import Tooltip from 'antd/lib/tooltip'
import { DragSource } from 'react-dnd';

import style from './card.css'

const cardSource = {
	beginDrag(props) {
		return {}
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

@DragSource('card', cardSource, collect)
export default class Card extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {
			card,
			tag,
			member,
			connectDragSource,
			isDragging
		} = this.props

		return connectDragSource(
			<div className={style.card}>
				<div className={style.tag}>
					{card.get('tag').map(value => (
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
					{card.get('member').map(value => (
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
}