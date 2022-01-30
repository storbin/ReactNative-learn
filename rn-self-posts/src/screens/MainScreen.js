import React from 'react'
import { View, Text, StyleSheet, Button, FlatList } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { DATA } from '../data'
import { Post } from '../components/Post'

export const MainScreen = ({ navigation: { navigate } }) => {
	const { colors } = useTheme()
	const openPostHandler = (post) => {
		navigate('PostScreen', { postId: post.id, date: post.date, booked: post.booked })
	}
	return (
		<View style={styles.wrapper}>
			<FlatList
				data={DATA}
				keyExtractor={(post) => post.id.toString()}
				renderItem={({ item }) => <Post post={item} onOpen={openPostHandler} />}
			></FlatList>
		</View>
	)
}

const styles = StyleSheet.create({
	wrapper: {
		padding: 10
	}
})
