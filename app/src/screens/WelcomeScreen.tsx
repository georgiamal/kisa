import { Image } from 'expo-image';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors, fontSizes } from '../styles/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const logo = require('../../assets/logo.png');
export default function WelcomeScreen() {
	const navigation = useNavigation<NavigationProp>();
	return (
	<View style={styles.container}>
		<Image source={logo} style={styles.logo}/>
		<Text style={styles.text}>Welcome!</Text>
		<View style={styles.buttonContainer}>
			<Button label="Log In" />
			<Button label="Sign up" />
			<Button label="Continue as guest.." onPress={() => navigation.navigate('Listings')}/>
		</View>
	</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.white,
	},
	logo: {
        width: 200,
        height: 200,
        marginBottom: 20,
		tintColor: colors.blue,
    },
	text: {
		fontSize: fontSizes.h1,
		fontWeight: 'bold',
		color: colors.darkblue,
	},
	buttonContainer: {
		flex: 1 / 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
});