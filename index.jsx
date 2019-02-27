import * as React from 'react'
import ReactDOM from 'react-dom'

import { Root } from './root'
import getOnlineUsers from './get-online-users'

class OnlineUsers extends React.Component {
	state = { users: undefined }
	render() {
		const { users } = this.state
		return users === undefined ? (
			'Loading...'
		) : (
			<Root>
				<ul>
					{users.map(u => (
						<li key={u.id}>{u.name}</li>
					))}
				</ul>
			</Root>
		)
	}

	componentDidMount() {
		this.inFlightPromise = getOnlineUsers().then(users => {
			this.setState({ users })
			this.inFlightPromise = null
		})
	}

	componentWillUnmount() {
		if (this.inFlightPromise) {
			this.inFlightPromise.cancel()
		}
	}
}

ReactDOM.render(<OnlineUsers />, document.querySelector('#app'))
