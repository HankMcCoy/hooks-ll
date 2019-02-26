import * as React from 'react'
import ReactDOM from 'react-dom'

import { Root } from './root'

class Counter extends React.Component {
	state = { count: 0 }
	render() {
		return (
			<Root>
				<button onClick={() => this.setState(s => ({ count: s.count + 1 }))}>
					+
				</button>
				<button onClick={() => this.setState(s => ({ count: s.count - 1 }))}>
					-
				</button>
				<span>{this.state.count}</span>
			</Root>
		)
	}
}

ReactDOM.render(<Counter />, document.querySelector('#app'))
