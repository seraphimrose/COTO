import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'

import { addCard } from 'action/entity'
import Card from 'component/card'
import style from './list.css'

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
		const { cardShowed, index, next, dispatch, cancel } = this.props
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
						title: value
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

export default class List extends Component {
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
		const { list, card, dispatch, next, index } = this.props

		return (
			<div className={style.list}>
				<div className={style.title}>
					<h3>{list.get('title')}</h3>
				</div>
				<div className={style.content}>
					{list.get('card').map(value => (
						<Card
							{...this.props}
							key={value}
							card={card.get(value)}
						/>
					))}
					{this.state.isAdding ? (
						<AddCard
							cardShowed={list.get('card').toJS()}
							index={index}
							cancel={this.cancel}
							dispatch={dispatch}
							next={next.get('card')}
						/>
					) : (
						<div onClick={this.add} className={style.new}>
							<Icon className={style.icon} type="plus" />Add a card...
						</div>
					)}
				</div>
			</div>
		)
	}
}