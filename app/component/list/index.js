import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'

import Card from 'component/card'
import style from './list.css'

class AddCard extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.refs.myInput.focus()
	}

	render() {
		const { cancel } = this.props
		return (
			<div className={style.add}>
				<input ref="myInput" type="text" placeholder="title"/>
				<div className={style.control}>
					<Button onClick={cancel}
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
		const { list, card } = this.props
		return (
			<div className={style.list}>
				<div className={style.title}>
					<h3>{list.get('title')}</h3>
				</div>
				<div className={style.content}>
					{list.get('card') &&
					list.get('card').map(value => (
						<Card
							{...this.props}
							key={value}
							card={card.get(value)}
						/>
					))}
					{this.state.isAdding ? (
						<AddCard
							cancel={this.cancel}
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