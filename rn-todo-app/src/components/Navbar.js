import React from 'react'
import { View, Text, StyleSheet, Platform } from 'react-native'
import { THEME } from '../theme'
import { AppText } from './ui/AppText'

export const Navbar = ({ title }) => {
	return (
		<View style={{ ...styles.navbar, ...Platform.select({ ios: styles.navbarIOS, android: styles.navbarAndroid }) }}>
			<AppText style={styles.text}>{title}</AppText>
		</View>
	)
}

const styles = StyleSheet.create({
	navbar: {
		height: 70,
		alignItems: 'center',
		justifyContent: 'flex-end',
		paddingBottom: 10
	},
	navbarAndroid: {
		backgroundColor: THEME.MAIN_BLUE_COLOR
	},
	navbarIOS: {
		borderBottomColor: THEME.MAIN_BLUE_COLOR,
		borderBottomWidth: 1,
		marginTop: 5
	},
	text: {
		color: Platform.select({ ios: THEME.MAIN_BLUE_COLOR, android: '#fff' }),
		fontSize: 20
	}
})
