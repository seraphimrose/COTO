import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'

import List from 'component/list'
import style from './board.css'

import { addList } from 'action/entity'

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

export default class Board extends Component {
	constructor(props) {
		super(props)
		this.state = {isAdding: false}
		this.add = this.add.bind(this)
		this.cancel = this.cancel.bind(this)
		
	}

	add() {
		this.setState({isAdding: true})
	}

	cancel() {
		this.setState({isAdding: false})
	}

	render() {
		const {
			board,
			list,
			dispatch,
			next
		} = this.props

		return (
			<div className={style.board}>
				<div className={style.title}>
					<h1>{board.get('title')}</h1>
				</div>
				<div className={style.content}>
					{board.get('list').map(value => (
						<List
							{...this.props}
							key={value}
							index={value}
							list={list.get(value)}
						/>
					))}
					{this.state.isAdding ? (
						<AddList
							listShowed={board.get('list').toJS()}
							cancel={this.cancel}
							dispatch={dispatch}
							next={next.get('list')}
						/>
					) : (
						<div onClick={this.add} className={style.new}>
							<Icon className={style.icon} type="plus"/>Add a list...
						</div>
					)}
				</div>
			</div>
		)
	}
}