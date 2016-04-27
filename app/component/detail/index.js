import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Tooltip from 'antd/lib/tooltip'

import { toggleDetail } from 'action/detail'
import { editCardTitle } from 'action/entity'

import style from './detail.css'

class Edit extends Component {
	constructor(props) {
		super(props)
		this.confirm = this.confirm.bind(this)
		this.error = this.error.bind(this)
	}

	componentDidMount() {
		this.refs.title.focus()
	}

	confirm() {
		if (this.refs.title.value) {
			this.props.dispatch(editCardTitle({
				title: this.refs.title.value,
				index: this.props.index
			}))
			this.props.cancel()
		} else {
			this.error()
		}
	}

	error() {
		this.refs.title.style.border = "1px solid red"
	}

	render() {
		const { cancel } = this.props

		return (
			<div className={style.edit}>
				<input type="text" ref="title"/>
				<Icon className="icon icon-ok" type="check"
					  onClick={this.confirm}/>
				<Icon className="icon icon-cancel" type="cross"
					  onClick={cancel}/>
			</div>
		)
	}
}

export default class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {isEditing: false}
		this.editTitle = this.editTitle.bind(this)
		this.cancelEdit = this.cancelEdit.bind(this)
	}

	editTitle() {
		this.setState({isEditing: true})
	}

	cancelEdit() {
		this.setState({isEditing: false})
	}
	
	render() {
		const {
			card,
			member,
			tag,
			user,
			dispatch,
			index
		} = this.props

		return (
			<div className={style.detail}>
				<div className={style.header}>
					<div className={style.title}>
						<Icon className={style.hintIcon} type="home"/>
						{this.state.isEditing ? (
							<Edit
								title={card.get('title')}
								cancel={this.cancelEdit}
								dispatch={dispatch}
								index={index}
							/>
						) : (
							<h2 onClick={this.editTitle}>
								{card.get('title')}
							</h2>
						)}
					</div>
					<div className={style.control}>
						<Icon
							className={style.icon}
							type="cross"
							onClick={() => dispatch(toggleDetail({}))}
						/>
					</div>
				</div>
				<div className={style.content}>
					<div className={style.main}>
						<div className={style.feature}>
							{card.get('member') && (
								<div className={style.member}>
									<div className={style.label}>Members</div>
									{card.get('member').map(v => (
										<Tooltip
											key={v}
											placement="bottom"
											title={member.getIn([v, 'name'])}
										>
											<img src={member.getIn([v, 'avatar'])} />
										</Tooltip>
									))}
									<Icon className="icon-add" type="plus-square" />
								</div>
							)}
							{card.get('tag') && (
								<div className={style.tag}>
									<div className={style.label}>Labels</div>
									{card.get('tag').map(v => (
										<div key={v}
											 className={"tag tag-" + tag.getIn([v, 'color'])}>
											{tag.getIn([v, 'title'])}
										</div>
									))}
									<Icon className="icon-add" type="plus-square" />
								</div>
							)}
							{card.get('dueDate') && (
								<div className={style.dueDate}>
									<div className={style.label}>Due Date</div>
									<div className="dueDate">{card.get('dueDate')}</div>
								</div>
							)}
							{card.get('lastUpdate') && (
								<div className={style.lastUpdate}>
									<div className={style.label}>Last Update</div>
									<div className="lastUpdate">{card.get('lastUpdate')}</div>
								</div>
							)}
							{card.get('desc') && (
								<div className={style.desc}>
									<div className={style.label}>Description</div>
									{card.get('desc')}
								</div>
							)}
						</div>
						{card.get('checkList') && (
							<div className={style.checkList}>
								<Icon className={style.hintIcon} type="bars"/>
								{card.get('checkList').map(v => (
									<div key={v}>none</div>
								))}
							</div>
						)}

						<div className={style.comment}>
							<Icon className={style.hintIcon} type="message"/>
							<img className="user" src={member.getIn([user, 'avatar'])} />
							<h3>Add Comment</h3>
							<textarea></textarea>
							<Button type="primary" size="large">Send</Button>
						</div>
						{card.get('activity') && (
							<div className={style.activity}>
								<Icon className={style.hintIcon} type="notification"/>
								<h3>Activity</h3>
								{card.get('activity').map(v => (
									<div key={v}></div>
								))}
							</div>
						)}
					</div>
					<div className={style.sider}>
						<div><Icon type="team"/>Members</div>
						<div><Icon type="tags-o"/>Labels</div>
						<div><Icon type="book"/>CheckList</div>
						<div><Icon type="clock-circle-o"/>Due Date</div>
						<div><Icon type="edit"/>Description</div>
					</div>
				</div>
			</div>
		)
	}
}