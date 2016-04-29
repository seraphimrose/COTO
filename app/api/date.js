import moment from 'moment'

export const now = () => (
	moment().format().slice(0, 19).replace('T', ' ')
)

export const today = () => (
	moment().format().slice(0, 10)
)

export const isPast = (date) => (
	moment(date).isBefore(today())
)