import React, { Component } from 'react'
import Tooltip from 'antd/lib/tooltip'
import Icon from 'antd/lib/icon'
import { DragSource, DropTarget } from 'react-dnd';

import { removeCard } from 'action/entity'
import style from './card.css'

const cardDragSource = {
	beginDrag(props) {
		return {
			index: props.index
		}
	}
}

const cardDropTarget = {

}

function dragCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	}
}

function dropCollect(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

@DropTarget('card', cardDropTarget, dropCollect)
@DragSource('card', cardDragSource, dragCollect)
export default class Card extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {
			card,
			tag,
			member,
			index,
			listIndex,
			connectDragSource,
			connectDropTarget,
			isDragging,
			dispatch
		} = this.props

		return connectDropTarget(connectDragSource(
			<div
				style={{
					//transform: isDragging && "rotate(10deg)",
					display: isDragging && "none"
				}}
				className={style.card}
			>
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
				<div className={style.control}>
					<Icon
						type="cross"
						onClick={() => dispatch(removeCard({listIndex, index}))}
					/>
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
		))
	}
}