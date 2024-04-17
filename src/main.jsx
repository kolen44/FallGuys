import { insertCoin } from 'playroomkit'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

await insertCoin({
	skipLobby: true,
	gameId: 'n3Wzy1iAYECqJzpXkmeM',
	discord: true,
}).then(() =>
	ReactDOM.createRoot(document.getElementById('root')).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>
	)
)
