import React, { Component } from 'react'
import Icon from 'antd/lib/icon'

import style from './detail.css'

export default class Detail extends Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		const {
			card,
			member,
			tag
		} = this.props

		return (
			<div className={style.detail}>
				<div className={style.header}>
					<div className={style.title}>
						{card.get('title')}
					</div>
					<div className={style.control}>
						<Icon className={style.icon} type="cross" />
					</div>
				</div>
				<div className={style.content}>
					<div className={style.main}>
						<div className={style.main}>
							<div className={style.feature}>
								<div className={style.member}>
									<div>Members</div>
									{card.get('member').map(v => (
										<img
											key={v}
											src={member.getIn([v, 'avatar'])}
										/>
									))}
								</div>
								<div className={style.tag}>
									<div>Labels</div>
									{card.get('tag').map(v => (
										<div key={v}
											className={"tag-" + tag.getIn([v, 'color'])}>
											{tag.getIn([v, 'title'])}
										</div>
									))}
								</div>
								<div className={style.dueDate}>
									<div>Due Date</div>
									{card.get('dueDate')}
								</div>
								<div className={style.lastUpdate}>
									<div>Last Update</div>
									{card.get('lastUpdate')}
								</div>
								<div className={style.desc}>
									<div>Description</div>
									{card.get('desc')}
								</div>
							</div>
							<div className={style.checkList}>
								{card.get('checkList') &&
									card.get('checkList').map(v => (
									<div key={v}>none</div>
								))}
							</div>
							<div className={style.comment}>
								<div>Add Comment</div>
								<textarea></textarea>
								<button>Send</button>
							</div>
							<div className={style.activity}>
								<div>Activity</div>
								{card.get('activity') &&
									card.get('activity').map(v => (
									<div key={v}></div>
								))}
							</div>
						</div>
					</div>
					<div className={style.sider}>
						<div>Members</div>
						<div>Labels</div>
						<div>CheckList</div>
						<div>Due Date</div>
					</div>
				</div>
			</div>
		)
	}
}