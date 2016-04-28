import moment from 'moment'

export default () => (
	moment().format().slice(0, 19).replace('T', ' ')
)