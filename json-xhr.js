import getOnlineUsers from './get-online-users'
import getUserDetail from './get-user-detail'
export default function jsonXhr({ url }) {
	if (url === '/online-users') {
		return getOnlineUsers()
	} else {
		const id = +url.split('/')[2]
		return getUserDetail(id)
	}
}
