import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import { bootstrap } from './src/bootstrap'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainScreen } from './src/screens/MainScreen'
import { AboutScreen } from './src/screens/AboutScreen'
import { BookedScreen } from './src/screens/BookedScreen'
import { PostScreen } from './src/screens/PostScreen'
import { MyTheme } from './src/theme'
import { Platform } from 'react-native'
import { AppHeaderIcon } from './src/components/AppHeaderIcon'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

const Stack = createNativeStackNavigator()

const Tab = createBottomTabNavigator()

const BookedNavigation = () => {
	return ()
}

export default function App() {
	const [isReady, setIsReady] = useState(false)

	return isReady ? (
		<NavigationContainer theme={MyTheme}>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: Platform.OS === 'android' ? MyTheme.colors.main : '#fff'
					},
					headerTintColor: Platform.OS === 'android' ? '#fff' : MyTheme.colors.main,
					headerTitleStyle: {
						// fontWeight: 'bold'
					}
				}}
			>
				<Stack.Screen
					name="MainScreen"
					component={MainScreen}
					options={{
						headerRight: () => (
							<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
								<Item title="Take photo" iconName="ios-camera" />
							</HeaderButtons>
						),
						headerLeft: () => (
							<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
								<Item title="Take photo" iconName="ios-menu" />
							</HeaderButtons>
						)
					}}
				/>
				<Stack.Screen name="AboutScreen" component={AboutScreen} />
				<Stack.Screen name="BookedScreen" component={BookedScreen} />
				<Stack.Screen
					name="PostScreen"
					component={PostScreen}
					options={({ navigation, route }) => {
						// const postId = route.params.postId
						const date = new Date(route.params.date).toLocaleDateString()
						const booked = route.params.booked
						const iconName = booked ? 'ios-star' : 'ios-star-outline'
						return {
							headerTitle: `Post on ${date}`,
							headerRight: () => {
								return (
									<HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
										<Item title="Take photo" iconName={iconName} />
									</HeaderButtons>
								)
							}
						}
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	) : (
		<AppLoading startAsync={bootstrap} onFinish={() => setIsReady(true)} onError={(err) => console.log(err)} />
	)
}
