import Octicons from '@expo/vector-icons/Octicons';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/theme';

export default function UserProfileScreen() {
    const navigation = useNavigation();

    return (
        <View>
            <Octicons name="feed-person" size={64} color={colors.blue} />
        </View>
    );
}

