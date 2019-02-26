import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import { Root } from './root'

function Counter() {
	const [count, setCount] = useState(0)
	return (
		<Root>
			<button onClick={() => setCount(count + 1)}>+</button>
			<button onClick={() => setCount(count - 1)}>-</button>
			<span>{count}</span>
		</Root>
	)
}

ReactDOM.render(<Counter />, document.querySelector('#app'))
