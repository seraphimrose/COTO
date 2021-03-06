import React, { Component } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import moment from 'moment'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Tooltip from 'antd/lib/tooltip'
import Popover from 'antd/lib/popover'
import Timeline from 'antd/lib/timeline'
import DatePicker from 'antd/lib/date-picker'

import { today } from 'api/date'
import { toggleDetail, editingCardTitle, editingDesc } from 'action/detail'
import { editCardTitle, addMember, addTag, changeDueDate, editDesc, addComment, addNewTag, removeTag } from 'action/entity'

import style from './detail.css'

class Edit extends Component {
	constructor(props) {
		super(props)
		this.confirm = this.confirm.bind(this)
		this.error = this.error.bind(this)
		this.change = this.change.bind(this)
	}

	componentDidMount() {
		this.refs.cardTitle.focus()
	}

	confirm() {
		if (this.refs.cardTitle.value) {
			this.props.dispatch(editCardTitle({
				title: this.refs.cardTitle.value,
				index: this.props.index,
				user: this.props.user
			}))
			this.props.cancel()
		} else {
			this.error()
		}
	}

	error() {
		this.refs.cardTitle.style.border = "1px solid red"
	}

	change() {
		this.props.dispatch(editingCardTitle(this.refs.cardTitle.value))
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
					ref="cardTitle"
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

class EditDesc extends Component {
	constructor(props) {
		super(props)
		this.change = this.change.bind(this)
		this.save = this.save.bind(this)
	}

	componentDidMount() {
		this.refs.desc.focus()
	}

	change() {
		this.props.dispatch(editingDesc(this.refs.desc.value))
	}

	save() {
		this.props.dispatch(editDesc({
			index: this.props.index,
			desc: this.refs.desc.value,
			user: this.props.user
		}))
		this.props.edit()
	}

	render() {
		const {
			tempDesc,
			edit
		} = this.props
		return (
			<div className={style.editDesc}>
				<textarea
					ref="desc"
					value={tempDesc}
					onChange={this.change}
				></textarea>
				<Button type="primary" onClick={this.save}>Save</Button>
				<Button type="ghost" onClick={edit}>cancel</Button>
			</div>
		)
	}
}

class EditTag extends Component {
	constructor(props) {
		super(props)
		this.add = this.add.bind(this)
		this.error = this.error.bind(this)
	}

	componentDidMount() {
		this.refs.tag.focus()
	}

	add() {
		if (this.refs.tag.value) {
			this.props.dispatch(addNewTag({
				tag: {
					[this.props.next.get('tag')]: {
						title: this.refs.tag.value,
						color: this.props.color.get(this.props.next.get('tag'))
					}
				}
			}))
			this.props.cancel()
		} else {
			this.error()
		}
	}

	error() {
		this.refs.tag.style.border = "1px solid #eb5a46"
	}

	render() {
		return (
			<div className="add-tag">
				<input ref="tag" type="text" />
				<Icon className="icon ok" onClick={this.add} type="check" />
				<Icon className="icon cancel" onClick={this.props.cancel} type="cross" />
			</div>
		)
	}
}

export default class Detail extends Component {
	constructor(props) {
		super(props)
		this.state = {isEditing: false, isDesc: false, isTag: false}
		this.editTitle = this.editTitle.bind(this)
		this.cancelEdit = this.cancelEdit.bind(this)
		this.addMembers = this.addMembers.bind(this)
		this.addTags = this.addTags.bind(this)
		this.addDueDate = this.addDueDate.bind(this)
		this.addDesc = this.addDesc.bind(this)
		this.addCmt = this.addCmt.bind(this)
		this.cancelDueDate = this.cancelDueDate.bind(this)
		this.dueDateChange = this.dueDateChange.bind(this)
		this.editDescription = this.editDescription.bind(this)
		this.deleteDesc = this.deleteDesc.bind(this)
		this.toggleTag = this.toggleTag.bind(this)
		this.delTag = this.delTag.bind(this)
	}

	editTitle() {
		this.setState({isEditing: true})
		this.props.dispatch(editingCardTitle(this.props.card.get('title')))
	}

	cancelEdit() {
		this.setState({isEditing: false})
	}

	addMembers(e) {
		const {
			dispatch,
			card,
			index,
			member,
			user
		} = this.props

		const key = e.target.id.split('-')[1]

		let flag

		let members  = card.get('member') ? card.get('member').toJS() : []
		if (members.indexOf(key) !== -1) {
			members.splice(members.indexOf(key), 1)
			flag = 0
		} else {
			members.push(key)
			flag = 1
		}

		dispatch(addMember({index, members, user, key, flag}))
	}

	addTags(e) {
		const {
			dispatch,
			card,
			index,
			tag,
			user
		} = this.props

		const key = e.target.id.split('-')[1]

		let flag

		let tags = card.get('tag') ?card.get('tag').toJS() : []
		if (tags.indexOf(key) !== -1) {
			tags.splice(tags.indexOf(key), 1)
			flag = 0
		} else {
			tags.push(key)
			flag = 1
		}

		dispatch(addTag({index, tags, user, key, flag}))
	}

	addDueDate() {
		const dueDate = today()
		const {
			dispatch,
			index,
			card,
			user
		} = this.props

		if (!card.get('dueDate')) {
			dispatch(changeDueDate({index, dueDate, user}))
		}
	}

	cancelDueDate() {
		const {
			dispatch,
			index,
			user
		} = this.props

		dispatch(changeDueDate({index, dueDate: null, user, flag: 1}))
	}

	dueDateChange(value) {
		const dueDate = moment(value).format().slice(0, 10)
		const {
			dispatch,
			index,
			user
		} = this.props

		dispatch(changeDueDate({index, dueDate, user}))
	}

	addDesc() {
		if (!this.props.card.get('desc')) {
			this.props.dispatch(editingDesc("Write some description"))
			this.props.dispatch(editDesc({
				index: this.props.index,
				desc: "Write some description",
				user: this.props.user
			}))
			this.setState({"isDesc": true})
		}
	}

	addCmt() {
		const cmt = document.getElementById('comment')
		if (cmt.value) {
			this.props.dispatch(addComment({
				user: this.props.user,
				index: this.props.index,
				comment: cmt.value
			}))
			cmt.value = ""
		}
	}

	editDescription() {
		this.setState({"isDesc": !this.state.isDesc})
		this.props.dispatch(editingDesc(this.props.card.get('desc')))
	}

	deleteDesc() {
		this.props.dispatch(editDesc({
			index: this.props.index,
			desc: null,
			user: this.props.user,
			flag: 1
		}))
	}

	toggleTag() {
		this.setState({isTag: !this.state.isTag})
	}

	delTag(e) {
		this.props.dispatch(removeTag({
			index: e.target.id.split('-')[1],
			cardIndex: this.props.index
		}))
	}

	render() {
		const {
			card,
			member,
			tag,
			user,
			height,
			dispatch,
			index,
			tempCardTitle,
			tempDesc
		} = this.props

		const Members = (
			<div>
				{member && member.map((v, k) => (
					<div className="wrapper" key={k}>
						<img
							id={"member-" + k}
							onClick={this.addMembers}
							src={v.get('avatar')}
							title={v.get('name')}
						/>
						{card.get('member') && card.get('member').indexOf(k) !== -1
						&& (<Icon className="selected" type="check-circle" />)}
					</div>
				))}
			</div>
		)

		const Tags = (
			<div>
				<div>
					{tag.map((v, k) => (
						<div className="wrapper" key={k}>
							<div
								id={"tag-" + k}
								className={"tag tag-" + v.get('color')}
								onClick={this.addTags}
							>
								{v.get('title')}
							</div>
							<Icon className="del" type="delete" id={"deltag-" + k} onClick={this.delTag}/>
							{card.get('tag') && card.get('tag').indexOf(k) !== -1
							&& (<Icon className="selected" type="check-circle" />)}
						</div>
					))}
				</div>
				<div>
					{this.state.isTag ? (
						<EditTag {...this.props} cancel={this.toggleTag}/>
					) : (
						<div className="new-tags" onClick={this.toggleTag}>
							Add new tags...
						 </div>
					)}
				</div>
			</div>
		)

		return (
			<div className={style.detail}>
				<div className={style.header}>
					<div className={style.title}>
						<Icon className={style.hintIcon} type="home"/>
						{this.state.isEditing ? (
							<Edit
								{...this.props}
								title={card.get('title')}
								cancel={this.cancelEdit}
								tempTitle={tempCardTitle}
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
				<Scrollbars
					autoHide
					autoHeight
					autoHeightMin={300}
					autoHeightMax={height - 150}
					style={{width: 730}}
				>
					<div className={style.content}>
						<div className={style.main}>
							<div className={style.feature}>
								{card.get('member') && !card.get('member').isEmpty() && (
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
										<Popover
											overlay={Members}
											overlayClassName={style.members}
											title="Members"
											placement="bottom"
											trigger="click"
										>
											<Icon className="icon-add" type="plus-square" />
										</Popover>
									</div>
								)}
								{card.get('tag') && !card.get('tag').isEmpty() && (
									<div className={style.tag}>
										<div className={style.label}>Tags</div>
										{card.get('tag').map(v => (
											<div key={v}
												 className={"tag tag-" + tag.getIn([v, 'color'])}>
												{tag.getIn([v, 'title'])}
											</div>
										))}
										<Popover
											overlay={Tags}
											overlayClassName={style.tags}
											title="Tags"
											placement="rightTop"
											trigger="click"
										>
											<Icon className="icon-add" type="plus-square" />
										</Popover>
									</div>
								)}
								{card.get('dueDate') && (
									<div className={style.dueDate}>
										<div className={style.label}>
											Deadline
											<span
												className="cancel"
												onClick={this.cancelDueDate}
											>cancel</span>
										</div>
										<DatePicker
											defaultValue={card.get('dueDate')}
											onChange={this.dueDateChange}
										/>
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
										{this.state.isDesc ? (
											<EditDesc
												index={index}
												tempDesc={tempDesc}
												dispatch={dispatch}
												user={user}
												edit={this.editDescription}
											/>
										) : (
											<div>
												<div className={style.label}>
													Description
													<Icon 
														className="edit"
														onClick={this.editDescription} 
														type="edit" 
													/>
													<Icon 
														className="delete"
														onClick={this.deleteDesc}
														type="delete" 
													/>
												</div>
												{card.get('desc')}
											</div>
										)}
									</div>
								)}
							</div>
							{card.get('checkList') && !card.get('checkList').isEmpty() && (
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
								<textarea id="comment"></textarea>
								<Button type="primary" onClick={this.addCmt}>Send</Button>
							</div>
							{card.get('activity') && !card.get('activity').isEmpty() && (
								<div className={style.activity}>
									<Icon className={style.hintIcon} type="notification"/>
									<h3>Activity</h3>
									<Timeline className="timeLine">
										{card.get('activity').reverse().map((v, k) => (
											v.get('type') === "comment" ? (
												<Timeline.Item key={k} color={v.get('color')}>
													<div className="cmt">
														<img src={v.get('avatar')} />
														<span className="name">{v.get('name')}</span>
														<div className="action">{v.get('action')}</div>
														<div className="time">{v.get('time')}</div>
													</div>
												</Timeline.Item>
											) : (
												<Timeline.Item key={k} color={v.get('color')}>
													<img src={v.get('avatar')} />
													<span className="name">{v.get('name')}</span>
													<span className="action">{v.get('action')}</span>
													<span className="time">{v.get('time')}</span>
												</Timeline.Item>
											)
										))}
									</Timeline>
								</div>
							)}
						</div>
						<div className={style.sider}>
							<Popover
								overlay={Members}
								overlayClassName={style.members}
								title="Members"
								placement="left"
								trigger="click"
							>
								<div className="item"><Icon type="team"/>Members</div>
							</Popover>
							<Popover
								overlay={Tags}
								overlayClassName={style.tags}
								title="Tags"
								placement="leftTop"
								trigger="click"
							>
								<div className="item"><Icon type="tags-o"/>Tags</div>
							</Popover>

							{/*<div className="item"><Icon type="book"/>CheckList</div>*/}
							<div className="item" onClick={this.addDueDate}>
								<Icon type="clock-circle-o"/>Deadline
							</div>
							<div className="item" onClick={this.addDesc}>
								<Icon type="edit"/>Description
							</div>
						</div>
					</div>
				</Scrollbars>
			</div>
		)
	}
}