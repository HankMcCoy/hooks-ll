import React, { useReducer, useContext } from 'react'
import ReactDOM from 'react-dom'

const localeCtx = React.createContext()
function localeReducer(state, action) {
	switch (action.type) {
		case 'set-locale':
			return action.payload
		default:
			throw new Error('Invalid action')
	}
}

function LocaleProvider({ children }) {
	const [locale, dispatch] = useReducer(localeReducer, 'english')
	const setLocale = l => dispatch({ type: 'set-locale', payload: l })
	return (
		<localeCtx.Provider value={{ locale, setLocale }}>
			{children}
		</localeCtx.Provider>
	)
}

function LocalePicker() {
	const { locale, setLocale } = useContext(localeCtx)

	return (
		<select value={locale} onChange={e => setLocale(e.target.value)}>
			<option value="english">English</option>
			<option value="spanish">Spanish</option>
		</select>
	)
}

function Hello() {
	const { locale } = useContext(localeCtx)
	switch (locale) {
		case 'english':
			return <b>Hello</b>
		case 'spanish':
			return <i>Hola</i>
	}
}

function App() {
	return (
		<LocaleProvider>
			<LocalePicker />
			<Hello />
		</LocaleProvider>
	)
}

ReactDOM.render(<App />, document.querySelector('#app'))
