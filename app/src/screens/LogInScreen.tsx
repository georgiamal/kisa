import { Image } from 'expo-image';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors, fontSizes } from '../styles/theme';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const logo = require('../../assets/logo.png');
export default function LogInScreen() {
	const navigation = useNavigation<NavigationProp>();
	return (
	<View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}>Log In</Text>
        </View>
        <View style={styles.modalContainer}>
            <Text style={styles.inputLabel}>Enter your email:</Text>
            <TextInput placeholder='Email' style={styles.inputField}/>
            <Text style={styles.inputLabel}>Enter your password:</Text>
            <TextInput placeholder='Password' secureTextEntry style={styles.inputField}/>
        </View>
		<View style={styles.buttonContainer}>
			<Button label="Log In" />
            <Button label="Log in using Google" />
            <Pressable onPress={() => navigation.navigate('SignUp')} 
                style={({ pressed }) => [
                    pressed && styles.linkPressed
                ]}>
                <Text style={styles.link}>Don't have an account? Sign up</Text>
            </Pressable>
		</View>
	</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: colors.white,
	},
    logoContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        gap: 10,
    },
	logo: {
        width: 100,
        height: 100,
		tintColor: colors.blue,
    },
    modalContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    inputField: {
        width: '100%',
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    inputLabel: {
        alignSelf: 'flex-start',
        marginBottom: 10,
        fontSize: fontSizes.sm,
        color: colors.darkblue,
    },
    title: {
        fontSize: fontSizes.h4,
        fontWeight: 'bold',
        color: colors.blue,
    },
	buttonContainer: {
		flex: 2,
		justifyContent: 'flex-start',
		alignItems: 'center',
        width: '100%',
        paddingTop: 20,
	},
    link: {
        color: colors.blue,
    },
    linkPressed: {
        opacity: 0.6,
    },
});