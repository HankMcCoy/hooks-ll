import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

function IntervalExample() {
	const [timeElapsed, setTimeElapsed] = useState(0)
	useEffect(() => {
		setInterval(() => {
			setTimeElapsed(timeElapsed + 1)
		}, 1000)
	}, [])

	return <div>Time elapsed in seconds: {timeElapsed}</div>
}

ReactDOM.render(<IntervalExample />, document.querySelector('#app'))
