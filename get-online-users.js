import P from 'bluebird'

P.config({
	cancellation: true,
})

export default function getOnlineUsers() {
	return new P(resolve => {
		setTimeout(() => {
			resolve([
				{ id: 1, name: 'Appa' },
				{ id: 2, name: 'Katara' },
				{ id: 3, name: 'Toph' },
				{ id: 4, name: 'Iroh' },
			])
		}, 800)
	})
}
