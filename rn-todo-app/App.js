import React, { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { MainLayout } from './src/MainLayout'
import { TodoState } from './src/context/todo/TodoState'
import { ScreenState } from './src/context/screen/ScreenState'

async function loadApplication() {
	await Font.loadAsync({
		'roboto-lightItalic': require('./assets/fonts/Roboto-LightItalic.ttf'),
		'roboto-thinItalic': require('./assets/fonts/Roboto-ThinItalic.ttf')
	})
}

export default function App() {
	const [isReady, setIsReady] = useState(false)

	return isReady ? (
		<ScreenState>
			<TodoState>
				<MainLayout />
			</TodoState>
		</ScreenState>
	) : (
		<AppLoading startAsync={loadApplication} onError={(err) => console.log(err)} onFinish={() => setIsReady(true)} />
	)
}
