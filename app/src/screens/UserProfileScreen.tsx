import Octicons from '@expo/vector-icons/Octicons';
import { View, Text, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/theme';

export default function UserProfileScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.details}>
                {/* <Octicons name="feed-person" size={64} color={colors.blue} /> */}
                <Text style={styles.name}>Full Name</Text>
                <Text>Phone number</Text>
                <View>
                    <Text>Address, Postcode, Area</Text>
                </View>
                <View style={styles.editButton}>
                    <Button label="Edit profile" variant="medium" onPress={() => {}}/>
                </View>
            </View>
            <View style={styles.cats}>
                <View style={styles.top}>
                    <Text style={styles.catsTitle}>Your cats</Text>
                    <Button label="Add cat" variant="small" onPress={() => {}}/>
                </View>
                <View style={styles.catContainer}>
                    <Text>Cat Container</Text>
                    {/* TODO: Add cat pictures / cards here */}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },
    details: {
        flex: 1,
        width: '95%',
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 10,
        gap: 5,
    },
    editButton: {
        margin: 5,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cats: {
        flex: 2,
        width: '95%',
        borderWidth: 1,
        borderColor: colors.grey,
        borderRadius: 5,
    },
    top: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 10,
    },
    catsTitle: {
        flexGrow: 5,
        fontSize: 18,
        fontWeight: 'bold',
    },
    addButton: {
        flexShrink: 3,
    },
    catContainer: {
        backgroundColor: colors.grey,
        padding: 10,
        margin: 10,
    }
});