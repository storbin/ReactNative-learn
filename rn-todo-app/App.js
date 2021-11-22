import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { MainLayout } from './src/MainLayout'
import { TodoState } from './src/context/todo/TodoState'

async function loadApplication() {
	await Font.loadAsync({
		'roboto-lightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
		'roboto-thinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf')
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)

	return isReady ? (
		<TodoState>
			<MainLayout />
		</TodoState>
	) : (
		<AppLoading startAsync={loadApplication} onError={(err) => console.log(err)} onFinish={() => setIsReady(true)} />
	)
}
