import { DefaultTheme } from '@react-navigation/native'

export const MyTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		main: '#303f9f',
		danger: '#d81b60'
	}
}
