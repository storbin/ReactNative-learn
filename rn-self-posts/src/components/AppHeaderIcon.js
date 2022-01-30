import React from 'react'
import { HeaderButton } from 'react-navigation-header-buttons'
import { Platform } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

export const AppHeaderIcon = (props) => {
	const { colors } = useTheme()
	return <HeaderButton {...props} iconSize={24} color={Platform.OS === 'android' ? '#fff' : colors.main} IconComponent={Ionicons} />
}
