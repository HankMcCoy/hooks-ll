import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Root } from './root'
import getOnlineUsers from './get-online-users'
import getUserDetail from './get-user-detail'

function OnlineUsers() {
	const [users, setUsers] = useState()
	const [selectedUserId, setSelectedUserId] = useState()

	useEffectWithCancel(() => getOnlineUsers().then(u => setUsers(u)), [])

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

function User({ id, name }) {
	const [userDetail, setUserDetail] = useState()
	useEffectWithCancel(() => {
		setUserDetail(undefined)
		return getUserDetail(id).then(ud => setUserDetail(ud))
	}, [id])

	return (
		<div>
			<h2>{name}</h2>
			<p>{userDetail ? userDetail.summary : 'Loading...'}</p>
		</div>
	)
}

function useEffectWithCancel(createEffect, deps) {
	useEffect(() => {
		let inFlightPromise = createEffect().then(() => {
			inFlightPromise = null
		})
		return () => {
			if (inFlightPromise) {
				inFlightPromise.cancel()
			}
		}
	}, deps)
}

ReactDOM.render(<OnlineUsers />, document.querySelector('#app'))
