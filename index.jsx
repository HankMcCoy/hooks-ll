import React, { useState, useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'

// Courtesy of Dan Abramov
// https://overreacted.io/making-setinterval-declarative-with-react-hooks/
function useInterval(callback, delay) {
	const savedCallback = useRef()

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback
	})

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current()
		}
		if (delay !== null) {
			let id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}

function IntervalExample() {
	const [timeElapsed, setTimeElapsed] = useState(0)
	useInterval(() => {
		setTimeElapsed(timeElapsed + 1)
	}, 1000)

	return <div>Time elapsed in seconds: {timeElapsed}</div>
}

ReactDOM.render(<IntervalExample />, document.querySelector('#app'))
