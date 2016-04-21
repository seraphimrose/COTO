export default {
	board: {
		title: "Test",
		list: ['l1', 'l2']
	},
	
	list: {
		l1: {
			title: "Test",
			card: ['l1_c1', 'l1_c2']
		},
		l2: {
			title: "Test Another",
			card: ['l2_c1']
		}
	},
	
	card: {
		l1_c1: {
			title: "testing",
			tag: ['t1', 't2'],
			member: ['m1', 'm2']
		},
		l1_c2: {
			title: "test233",
			tag: ['t3'],
			member: ['m1']
		},
		l2_c1: {
			title: "tryTest",
			tag: ['t2'],
			member: ['m2']
		}
	},

	tag: {
		t1: {
			color: 'red',
			title: 'do red'
		},
		t2: {
			color: 'blue',
			title: 'do blue'
		},
		t3: {
			color: 'yellow',
			title: 'do yel'
		}
	},

	member: {
		m1: {
			name: 'Sera',
			avatar: 'static/img/avatar3.jpg'
		},
		m2: {
			name: 'Baka',
			avatar: 'static/img/avatar4.jpg'
		}
	}
}