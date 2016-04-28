import React, { Component } from 'react'
import Tooltip from 'antd/lib/tooltip'
import Icon from 'antd/lib/icon'
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom'

import { removeCard, moveCard } from 'action/entity'
import { toggleDetail } from 'action/detail'
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

		const target = findDOMNode(component).getBoundingClientRect()
		const targetMiddleY = target.top + (target.bottom - target.top) / 2;
		const cursor = monitor.getClientOffset()

		let upFlag
		if (cursor.y < targetMiddleY) {
			upFlag = 1
		} else {
			upFlag = 0
		}

		let fromList
		props.rawList.forEach((v, k) => {
			if (v.get('card').indexOf(monitor.getItem().index) !== -1) {
				fromList = k
			}
		})

		props.dispatch(moveCard({
			fromList: fromList,
			toList: props.listIndex,
			index: monitor.getItem().index,
			hoverIndex: props.index,
			upFlag: upFlag,
			user: props.user
		}))
	}
}

function dragCollect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
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
			dispatch
		} = this.props

		return connectDropTarget(connectDragSource(
			<div className={style.card}>
				<div className={style.tag}>
					{card.get('tag') && card.get('tag').map(value => (
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
				<div className={style.content} onClick={() => dispatch(toggleDetail({index}))}>
					<div className={style.title}>
						{card.get('title')}
					</div>
					<div className={style.hint}>
						{card.get('desc') &&
							(<div>
								<Icon title="This card has a description" type="exception" />
							</div>)}
						{card.get('cmtcnt') &&
							(<div>
								<Icon title="Comments" type="message" />
								{card.get('cmtcnt')}
							</div>)}
						{card.get('checkList') && !card.get('checkList').isEmpty()
							(<div>
								<Icon title="CheckList Items" type="bars" />
								{card.get('checkFinish') + "/" + card.get('checkNum')}
							</div>)}
						{card.get('dueDate') &&
							(<div>
								<Icon title="Due Date" type="clock-circle-o" />
								{card.get('dueDate')}
							</div>)}
					</div>
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
			</div>
		))
	}
}