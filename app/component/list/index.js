import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import { Scrollbars } from 'react-custom-scrollbars'
import { DropTarget } from 'react-dnd'

import Now from 'api/getNow'
import { addCard, removeList, pushCard, editListTitle, moveLog } from 'action/entity'
import { editingListTitle } from 'action/detail'

import Card from 'component/card'
import style from './list.css'

const dropTarget = {
	hover(props, monitor) {
		let fromList
		props.rawList.forEach((v, k) => {
			if (v.get('card').indexOf(monitor.getItem().index) !== -1) {
				fromList = k
			}
		})

		props.dispatch(pushCard({
			index: monitor.getItem().index,
			fromList: fromList,
			toList: props.index,
			user: props.user
		}))
	},

	drop(props, monitor) {
		props.dispatch(moveLog({
			user: props.user,
			index: monitor.getItem().index,
			toList: props.listIndex
		}))
	}
}

function collect(connect) {
	return {
		connectDropTarget: connect.dropTarget()
	}
}

class AddCard extends Component {

	constructor(props) {
		super(props)
		this.add = this.add.bind(this)
		this.error = this.error.bind(this)
	}

	componentDidMount() {
		this.refs.myInput.focus()
	}

	add() {
		const {
			cardShowed,
			index,
			next,
			dispatch,
			cancel,
			user,
			member
		} = this.props

		const value = this.refs.myInput.value
		if (value) {
			const data = {
				list: {
					[index] : {
						card: [...cardShowed, next]
					}
				},

				card: {
					[next]: {
						title: value,
						lastUpdate: Now(),
						activity: [{
							avatar: member.getIn([user, 'avatar']),
							name: member.getIn([user, 'name']),
							action: "created this card at",
							time: Now(),
							color: "green"
						}]
					}
				}
			}
			dispatch(addCard(data))
			cancel()
		} else {
			this.error()
		}
	}

	error() {
		this.refs.myInput.style.border = "1px solid #f08080"
	}

	render() {
		const { cancel } = this.props
		return (
			<div className={style.add}>
				<input ref="myInput" type="text" placeholder="title"/>
				<div className={style.control}>
					<Button onClick={this.add}
							type="primary" size="small">Add</Button>
					<Button onClick={cancel}
							type="ghost" size="small">Cancel</Button>
				</div>
			</div>
		)
	}
}

@DropTarget('card', dropTarget, collect)
class Add extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {
			add,
			connectDropTarget
		} = this.props
		return connectDropTarget(
			<div onClick={add} className={style.new}>
				<Icon className={style.icon} type="plus" />Add a card...
			</div>
		)
	}
}

class Edit extends Component {
	constructor(props) {
		super(props)
		this.confirm = this.confirm.bind(this)
		this.error = this.error.bind(this)
		this.change = this.change.bind(this)
	}

	componentDidMount() {
		this.refs.title.focus()
	}

	confirm() {
		if (this.refs.title.value) {
			this.props.dispatch(editListTitle({
				title: this.refs.title.value,
				index: this.props.index
			}))
			this.props.cancel()
		} else {
			this.error()
		}
	}

	change() {
		this.props.dispatch(editingListTitle(this.refs.title.value))
	}

	error() {
		this.refs.title.style.border = "1px solid red"
	}

	render() {
		const {
			cancel,
			tempTitle
		} = this.props

		return (
			<div className={style.edit}>
				<input
					type="text"
					ref="title"
					value={tempTitle}
					onChange={this.change}
				/>
				<Icon className="icon icon-ok" type="check"
					  onClick={this.confirm}/>
				<Icon className="icon icon-cancel" type="cross"
					  onClick={cancel}/>
			</div>
		)
	}
}

export default class List extends Component {
	constructor(props) {
		super(props)
		this.state = {isAdding: false, isEditing: false}
		this.add = this.add.bind(this)
		this.cancel = this.cancel.bind(this)
		this.editTitle = this.editTitle.bind(this)
		this.cancelEdit = this.cancelEdit.bind(this)
	}

	editTitle() {
		this.setState({isEditing: true})
		this.props.dispatch(editingListTitle(this.props.list.get('title')))
	}

	cancelEdit() {
		this.setState({isEditing: false})
	}

	add() {
		this.setState({isAdding: true})
	}

	cancel() {
		this.setState({isAdding: false})
	}

	render() {
		const { 
			list,
			card,
			dispatch,
			next,
			index, 
			height,
			rawList,
			tempListTitle
		} = this.props

		return (
			<div className={style.list}>
				<div className={style.title}>
					{this.state.isEditing ? (
						<Edit
							title={list.get('title')}
							cancel={this.cancelEdit}
							dispatch={dispatch}
							index={index}
							tempTitle={tempListTitle}
						/>
					) : (
						<h2 onClick={this.editTitle}>
							{list.get('title')}
						</h2>
					)}
				</div>
				<div className={style.listControl}>
					<Icon
						type="cross"
						onClick={() => dispatch(removeList({index}))}
					/>
				</div>
				<div className={style.content}>
					<Scrollbars
						autoHide
						autoHeight
						autoHeightMax={height - 230}
						style={{width: 270}}
					>
						{list.get('card').map(value => (
							<Card
								{...this.props}
								key={value}
								index={value}
								listIndex={index}
								card={card.get(value)}
							/>
						))}
					</Scrollbars>
					{this.state.isAdding ? (
						<AddCard
							{...this.props}
							cardShowed={list.get('card').toJS()}
							index={index}
							cancel={this.cancel}
							dispatch={dispatch}
							next={next.get('card')}
						/>
					) : (
						<Add
							add={this.add}
							index={index}
							rawList={rawList}
							dispatch={dispatch}
						/>
					)}
				</div>
			</div>
		)
	}
}