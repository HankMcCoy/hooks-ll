import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Root } from './root'
import getOnlineUsers from './get-online-users'
import getUserDetail from './get-user-detail'

function OnlineUsers() {
	const [users, setUsers] = useState()
	const [selectedUserId, setSelectedUserId] = useState()

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
				{users.map(({ id, name }) => (
					<li key={id} onClick={() => setSelectedUserId(id)}>
						{name}
					</li>
				))}
			</ul>
			{selectedUserId ? <User id={selectedUserId} /> : null}
		</Root>
	)
}

function User({ id }) {
	const [userDetail, setUserDetail] = useState()
	useEffect(() => {
		setUserDetail(undefined)
		const inFlightPromise = getUserDetail(id).then(ud => setUserDetail(ud))
		return () => {
			if (inFlightPromise) {
				inFlightPromise.cancel()
			}
		}
	}, [id])
	return (
		<div>
			<h2>{name}</h2>
			<p>{userDetail ? userDetail.summary : 'Loading...'}</p>
		</div>
	)
}

ReactDOM.render(<OnlineUsers />, document.querySelector('#app'))
