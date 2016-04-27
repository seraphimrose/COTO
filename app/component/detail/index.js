import React, { Component } from 'react'
import Icon from 'antd/lib/icon'
import Button from 'antd/lib/button'
import Tooltip from 'antd/lib/tooltip'

import { toggleDetail } from 'action/detail'

import style from './detail.css'

export default class Detail extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		const {
			card,
			member,
			tag,
			user,
			dispatch
		} = this.props

		return (
			<div className={style.detail}>
				<div className={style.header}>
					<div className={style.title}>
						<Icon className={style.hintIcon} type="home"/>
						<h2>{card.get('title')}</h2>
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
							<div className={style.dueDate}>
								<div className={style.label}>Due Date</div>
								<div className="dueDate">{card.get('dueDate')}</div>
							</div>
							<div className={style.lastUpdate}>
								<div className={style.label}>Last Update</div>
								<div className="lastUpdate">{card.get('lastUpdate')}</div>
							</div>
							<div className={style.desc}>
								<div className={style.label}>Description</div>
								{card.get('desc')}
							</div>
						</div>
						<div className={style.checkList}>
							<Icon className={style.hintIcon} type="bars"/>
							<h3>Check List</h3>
							{card.get('checkList') &&
							card.get('checkList').map(v => (
								<div key={v}>none</div>
							))}
						</div>
						<div className={style.comment}>
							<Icon className={style.hintIcon} type="message"/>
							<img className="user" src={member.getIn([user, 'avatar'])} />
							<h3>Add Comment</h3>
							<textarea></textarea>
							<Button type="primary" size="large">Send</Button>
						</div>
						<div className={style.activity}>
							<Icon className={style.hintIcon} type="notification"/>
							<h3>Activity</h3>
							{card.get('activity') &&
							card.get('activity').map(v => (
								<div key={v}></div>
							))}
						</div>
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