import React, { Component } from 'react'
import Tooltip from 'antd/lib/tooltip'
import Icon from 'antd/lib/icon'
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'

import { removeCard, addSlot, removeSlot } from 'action/entity'
import style from './card.css'

const cardDragSource = {
	beginDrag(props) {
		return {
			index: props.index
		}
	}
}

const cardDropTarget = {
	hover(props, monitor, component) {
		if (props.index === monitor.getItem().index) {
			return ;
		}
		const target = findDOMNode(component).getBoundingClientRect();
		const targetMiddleY = (target.bottom - target.top) / 2;
		const cursor = monitor.getClientOffset();

		const cur = props.list.get('card')
		const ind = cur.indexOf(props.index)

		props.board.get('list').forEach(v => {
			props.dispatch(removeSlot({
				listIndex: v
			}))
		})

		if (cursor.y < targetMiddleY) {
			props.dispatch(addSlot({
				listIndex: props.listIndex,
				'new': cur.splice(ind, 0, 'slot')
			}))
		} else {
			props.dispatch(addSlot({
				listIndex: props.listIndex,
				'new': cur.splice(ind + 1, 0, 'slot')
			}))
		}
	}
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
			list,
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