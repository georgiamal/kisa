import { Image } from 'expo-image';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation';
import { colors, fontSizes } from '../styles/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
const logo = require('../../assets/logo.png');

type Props = {
	setIsGuest: (isGuest: boolean) => void;
};

export default function WelcomeScreen({ setIsGuest }: Props) {
	const navigation = useNavigation<NavigationProp>();

	const handleGuestMode = async () => {
		await AsyncStorage.setItem('guest_mode', 'true');
		setIsGuest(true);
	};

	return (
	<View style={styles.container}>
		<Image source={logo} style={styles.logo}/>
		<View style={styles.buttonContainer}>
			<Button label="Log In" onPress={() => navigation.navigate('Login')}/>
			<Button label="Sign up" onPress={() => navigation.navigate('SignUp')}/>
		</View>
			<Pressable 
				onPress={handleGuestMode} 
				style={({ pressed }) => [
					pressed && styles.linkPressed
				]}>
				<Text style={styles.link}>Continue as guest..</Text>
			</Pressable>
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
		color: colors.blue,
	},
	buttonContainer: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingBottom: 10,
		paddingTop: 20,	
	},
	link: {
        color: colors.blue,
    },
    linkPressed: {
        opacity: 0.6,
    },
});