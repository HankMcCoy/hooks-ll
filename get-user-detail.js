import P from 'bluebird'

P.config({
	cancellation: true,
})

const getData = id => {
	switch (id) {
		case 1:
			return { summary: 'A flying bison!' }
		case 2:
			return { summary: 'A member of the southern water tribe' }
		case 3:
			return { summary: 'One of the greatest characters ever' }
		case 4:
			return { summary: 'Also one of the greatest characters ever' }
	}
}
export default function getUserDetail(id) {
	console.log('Fetching user detail', id)

	return new P(resolve => {
		setTimeout(() => {
			resolve(getData(id))
		}, 800)
	})
}
