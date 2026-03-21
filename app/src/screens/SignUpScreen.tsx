import { Image } from 'expo-image';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { colors, fontSizes } from '../styles/theme';
import { useState } from 'react';
import { validateConfirmPassword, validateEmail, validatePassword } from '../utilities/validation';
import { supabase } from '../lib/supabase';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
const logo = require('../../assets/logo.png');

type FormErrors = {
    email: string | null;
    password: string | null;
    confirmPassword: string | null;
};

export default function SignUpScreen() {
	const navigation = useNavigation<NavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState<FormErrors>({
        email: null,
        password: null,
        confirmPassword: null,
    });

    const [loading, setLoading] = useState(false);

    const handleSignUp = async () => {
        const newErrors = {
            email: validateEmail(email),
            password: validatePassword(password),
            confirmPassword: validateConfirmPassword(password, confirmPassword),
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(error => error !== null);
        if (hasErrors) return;

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                // Handle specific error types
                if (error.message.includes('already registered')) {
                    setErrors(prev => ({ ...prev, email: 'This email is already registered' }));
                } else {
                    setErrors(prev => ({ ...prev, email: error.message }));
                }
                return;
            }

            if (data.user && !data.session) {
                // Email confirmation required
                alert('Please check your email for a confirmation link');
                navigation.navigate('Login');
            } else if (data.session) {
                // Auto-confirmed, user is logged in
                alert('Account created successfully!');
                // Navigation will happen automatically via auth state change
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, email: 'An unexpected error occurred' }));
        } finally {
            setLoading(false);
        }
    };

	return (
	<View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image source={logo} style={styles.logo}/>
            <Text style={styles.title}>Create account</Text>
        </View>

        <View style={styles.modalContainer}>
            <Text style={styles.inputLabel}>Enter email:</Text>
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

            <Text style={styles.inputLabel}>Enter password:</Text>
            <TextInput 
                placeholder='Password'
                value={password}
                onChangeText={(text) => {
                    setPassword(text);
                    setErrors(prev => ({ ...prev, password: null }));
                }}
                secureTextEntry
                style={[
                    styles.inputField,
                    errors.password && styles.inputError
                ]}
            />
            {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <Text style={styles.inputLabel}>Confirm password:</Text>
            <TextInput 
                secureTextEntry
                placeholder='Confirm Password' 
                value={confirmPassword}
                onChangeText={(text) => {
                    setConfirmPassword(text);
                    setErrors(prev => ({ ...prev, confirmPassword: null }));
                }}
                style={[
                    styles.inputField,
                    errors.confirmPassword && styles.inputError
                ]}
            />
            {errors.confirmPassword && (
                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

        </View>
		<View style={styles.buttonContainer}>
			<Button 
                label={loading ? "Creating Account..." : "Sign Up"} 
                onPress={handleSignUp}
                disabled={loading}
            />
            <Pressable 
                onPress={() => navigation.navigate('Login')} 
                style={({ pressed }) => [
                    pressed && styles.linkPressed
                ]}
                disabled={loading}
            >
                <Text style={styles.link}>Already have an account? Log in</Text>
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
        flex: 2,
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