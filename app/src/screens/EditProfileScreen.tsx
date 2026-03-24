import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/theme';

export default function EditProfileScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Edit Profile</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.blue,
    },
});