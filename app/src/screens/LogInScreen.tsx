import { Image } from 'expo-image';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../navigation';
import { colors, fontSizes } from '../styles/theme';
import { useState } from 'react';
import { validateEmail, validatePassword } from '../utilities/validation';
import { supabase } from '../lib/supabase';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;
const logo = require('../../assets/logo.png');

type FormErrors = {
    email: string | null;
    password: string | null;
};

export default function LogInScreen() {
	const navigation = useNavigation<NavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>({
        email: null,
        password: null,
    });

    const handleLogin = () => {
        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== null);
        if (hasErrors) return;

        supabase.auth.signInWithPassword({
            email,
            password,
        });
    };

	return (
	<View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}>Log In</Text>
        </View>

        <View style={styles.modalContainer}>
            <Text style={styles.inputLabel}>Enter your email:</Text>
            <TextInput 
                placeholder='Email'
                value={email}
                onChangeText={(text) => {
                    setEmail(text);
                    setErrors(prev => ({ ...prev, email: null }));
                }}
                style={[
                    styles.inputField,
                    errors.email && styles.inputError
                ]}
                keyboardType="email-address"
                autoCapitalize="none"
                />
                {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                )}
            <Text style={styles.inputLabel}>Enter your password:</Text>
                <TextInput
                    secureTextEntry
                    placeholder="Password"
                    value={password}
                    onChangeText={(text) => {
                        setPassword(text);
                        setErrors(prev => ({ ...prev, password: null }));
                    }}
                    style={[
                        styles.inputField,
                        errors.password && styles.inputError
                    ]}
                />
                {errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                )}
            </View>

		<View style={styles.buttonContainer}>
			<Button label="Log In" onPress={handleLogin}/>
            {/* <Button label="Log in using Google" /> */}
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
        flex: 1.5,
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
    inputError: {
        borderColor: colors.orange,
    },
    errorText: {
        width: '100%',
        alignSelf: 'flex-start',
        color: colors.orange,
        fontSize: fontSizes.sm,
        marginBottom: 16,
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