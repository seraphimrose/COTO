export default {
	board: {
		title: "Test",
		list: ['1', '2']
	},
	
	list: {
		1: {
			title: "Test",
			card: ['1', '2']
		},
		2: {
			title: "Test Another",
			card: ['3']
		}
	},
	
	card: {
		1: {
			title: "testing",
			tag: ['1', '2'],
			member: ['1', '2'],
			dueDate: "2016-04-29",
			lastUpdate: "2016-04-27 10:12:44",
			desc: "测试测试",
		},
		2: {
			title: "test233",
			tag: ['3'],
			member: ['1']
		},
		3: {
			title: "tryTest",
			tag: ['2'],
			member: ['2']
		}
	},

	tag: {
		1: {
			color: 'red',
			title: 'do red'
		},
		2: {
			color: 'blue',
			title: 'do blue'
		},
		3: {
			color: 'yellow',
			title: 'do yel'
		}
	},

	member: {
		1: {
			name: 'Sera',
			avatar: 'static/img/avatar3.jpg'
		},
		2: {
			name: 'Baka',
			avatar: 'static/img/avatar4.jpg'
		}
	}
}