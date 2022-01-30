import { useTheme } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, Button, ScrollView, Alert } from 'react-native'
import { DATA } from '../data'

export const PostScreen = ({ navigation, route }) => {
	const { colors } = useTheme()
	const postId = route.params.postId

	const post = DATA.find((post) => post.id === postId)

	// useEffect(() => {
	// 	navigation.setOptions({ booked: post.booked })
	// }, [])

	const removeHandler = () => {
		Alert.alert('Delete post ?', '', [
			{
				text: 'Cancel',
				onPress: () => console.log('Cancel Pressed'),
				style: 'cancel'
			},
			{ text: 'Delete', onPress: () => console.log('OK Pressed'), style: 'destructive' }
		])
	}
	return (
		<ScrollView style={styles.center}>
			<Image style={styles.image} source={{ uri: post.img }} />
			<View style={styles.textWrap}>
				<Text style={styles.title}>{post.text}</Text>
			</View>
			<Button title="Delete" color={colors.danger} onPress={removeHandler}></Button>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200
	},
	textWrap: {
		padding: 10
	},
	title: {
		fontFamily: 'open-regular'
	}
})
