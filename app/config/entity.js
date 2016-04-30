export default {
	board: {
		title: "饿了么网上订餐",
		list: ['1', '2', '3', '4']
	},

	list: {
		1: {
			title: "To do",
			card: ['1', '2', '3', '11']
		},
		2: {
			title: "Doing",
			card: ['4', '5', '6', '7']
		},
		3: {
			title: "Finish",
			card: ['8', '9', '10']

		},
		4: {
			title: "建议",
			card: []
		}
	},
	
	card: {
		1: {
			title: "移动平台APP UI设计",
			tag: ['6'],
			member: ['3', '7']
		},
		2: {
			title: "线下店家营业执照认证，实地考察卫生状况",
			tag: ['1'],
			member: ['3', '4']
		},
		3: {
			title: "部署服务器升级",
			tag: ['4']
		},
		4: {
			title: "饿了么主站Web页开发",
			tag: ['1', '3', '4'],
			member: ['1', '2']
		},
		5: {
			title: "线下店家合作（上海市区）",
			tag: ['2', '5'],
			member: ['3', '4']
		},
		6: {
			title: "大学校园宣传海报设计",
			tag: ['3', '6'],
			member: ['7']
		},
		7: {
			title: "技术部招聘——笔试题策划",
			member: ['2']
		},
		8: {
			title: "线上问卷调查 “点外卖时你最常吃哪种类型的食物”等",
			member: ['5', '6']
		},
		9: {
			title: "华师大校园线下推广",
			tag: ['5'],
			member: ['6']
		},
		10: {
			title: "饿了么主站Web页设计",
			tag: ['1', '6'],
			member: ['7']
		},
		11: {
			title: "建立微信公众号",
			tag: ["5"],
			member: ["1", "5", "6"]
		}

	},

	tag: {
		1: {
			color: 'red',
			title: '重要'
		},
		2: {
			color: 'blue',
			title: '长期计划'
		},
		3: {
			color: 'yellow',
			title: '本周任务'
		},
		4: {
			color: 'green',
			title: '技术相关'
		},
		5: {
			color: 'orange',
			title: '业务推广'
		},
		6: {
			color: 'purple',
			title: '产品 & 设计'
		}
	},

	member: {
		1: {
			name: '技术—王明',
			avatar: 'static/img/avatar1.jpg'
		},
		2: {
			name: '技术—刘杰',
			avatar: 'static/img/avatar4.jpg'
		},
		3: {
			name: '业务—张林',
			avatar: 'static/img/avatar3.jpg'
		},
		4: {
			name: '业务—陈晨',
			avatar: 'static/img/avatar2.jpg'
		},
		5: {
			name: '市场—李华',
			avatar: 'static/img/avatar5.jpg'
		},
		6: {
			name: '市场—周亮',
			avatar: 'static/img/avatar6.jpg'
		},
		7: {
			name: '设计—徐婷',
			avatar: 'static/img/avatar7.jpg'
		}
	},

	color: {
		1: "red",
		2: "blue",
		3: "yellow",
		4: "green",
		5: "orange",
		6: "purple",
		7: "pink",
		8: "black"
	}
}