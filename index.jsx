import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { Root } from './root'
import jsonXhr from './json-xhr'

function useFetch(url) {
	const [result, setResult] = useState()
	useEffect(() => {
		let xhrInFlight = jsonXhr({ method: 'GET', url }).then(data => {
			setResult(data)
			xhrInFlight = null
		})
		return () => {
			if (xhrInFlight) {
				xhrInFlight.cancel()
			}
		}
	}, [url])
	return result
}

function OnlineUsers() {
	const users = useFetch('/online-users')
	const [selectedUserId, setSelectedUserId] = useState()

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
	const userDetail = useFetch(`/users/${id}`)

	return (
		<div>
			<h2>{name}</h2>
			<p>{userDetail ? userDetail.summary : 'Loading...'}</p>
		</div>
	)
}

ReactDOM.render(<OnlineUsers />, document.querySelector('#app'))
