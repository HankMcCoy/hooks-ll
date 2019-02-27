import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Root } from './root'
import getOnlineUsers from './get-online-users'

function OnlineUsers() {
	const [users, setUsers] = useState()

	useEffect(() => {
		const inFlightPromise = getOnlineUsers().then(u => setUsers(u))
		return () => {
			if (inFlightPromise) {
				inFlightPromise.cancel()
			}
		}
	}, [])

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

ReactDOM.render(<OnlineUsers />, document.querySelector('#app'))
