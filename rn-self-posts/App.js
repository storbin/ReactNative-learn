import React, { useState } from 'react'
import { Text, View } from 'react-native'
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap'

export default function App() {
	const [isReady, setIsReady] = useState(false)

	return isReady ? (
		<View>
			<Text>Open up App.js to start working on your app!</Text>
		</View>
	) : (
		<AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)} />
	)
}
