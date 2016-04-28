import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import { Scrollbars } from 'react-custom-scrollbars'

import List from 'component/list'
import style from './board.css'

import { addList, editBoardTitle } from 'action/entity'
import { editingBoardTitle } from 'action/detail'

class AddList extends Component {

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
			listShowed,
			next,
			dispatch,
			cancel
		} = this.props

		const value = this.refs.myInput.value
		if (value) {
			const data = {
				board: {
					list: [...listShowed, next]
				},

				list: {
					[next]: {
						title: value,
						card: []
					}
				}
			}
			dispatch(addList(data))
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
							type="primary" size="large">Add</Button>
					<Button onClick={cancel}
							type="ghost" size="large">Cancel</Button>
				</div>
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

	change() {
		this.props.dispatch(editingBoardTitle(this.refs.title.value))
	}

	confirm() {
		if (this.refs.title.value) {
			this.props.dispatch(editBoardTitle({title: this.refs.title.value}))
			this.props.cancel()
		} else {
			this.error()
		}
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

export default class Board extends Component {
	constructor(props) {
		super(props)
		this.state = {isAdding: false, isEditing: false}
		this.addList = this.addList.bind(this)
		this.cancelAdd = this.cancelAdd.bind(this)
		this.editTitle = this.editTitle.bind(this)
		this.cancelEdit = this.cancelEdit.bind(this)

	}

	addList() {
		this.setState({isAdding: true})
	}

	cancelAdd() {
		this.setState({isAdding: false})
	}

	editTitle() {
		this.props.dispatch(editingBoardTitle(this.props.board.get('title')))
		this.setState({isEditing: true})
	}

	cancelEdit() {
		this.setState({isEditing: false})
	}

	render() {
		const {
			board,
			list,
			dispatch,
			next,
			height,
			width,
			tempBoardTitle
		} = this.props

		return (
			<div className={style.board}>
				<div className={style.title}>
					{this.state.isEditing ? (
						<Edit
							title={board.get('title')}
							cancel={this.cancelEdit}
							dispatch={dispatch}
							tempTitle={tempBoardTitle}
						/>
					) : (
						<h1 onClick={this.editTitle}>
							{board.get('title')}
						</h1>
					)}
				</div>
				<Scrollbars
					autoHide
					autoWidth
					autoWidthMax={width}
					style={{height: height - 75}}
				>
					<div className={style.content}>
						{board.get('list').map(value => (
							<List
								{...this.props}
								key={value}
								index={value}
								list={list.get(value)}
								rawList={list}
							/>
						))}
						{this.state.isAdding ? (
							<AddList
								listShowed={board.get('list').toJS()}
								cancel={this.cancelAdd}
								dispatch={dispatch}
								next={next.get('list')}
							/>
						) : (
							<div onClick={this.addList} className={style.new}>
								<Icon className={style.icon} type="plus"/>Add a list...
							</div>
						)}
					</div>
				</Scrollbars>
			</div>
		)
	}
}