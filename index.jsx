import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'

const localeCtx = React.createContext()
function LocaleProvider({ children }) {
	const [locale, setLocale] = useState('english')
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
