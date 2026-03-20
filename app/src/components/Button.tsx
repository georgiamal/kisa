import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
    label: string;
    onPress?: () => void;
};

export default function Button({ label, onPress }: Props) {
    return (
    <View style={styles.buttonContainer}>
        <Pressable 
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed
            ]} 
            onPress={onPress}>
            <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    </View>
    );
    }

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    button: {
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
        buttonLabel: {
        color: '#000',
        fontSize: 16,
    },
    pressed: {
        opacity: 0.7,
    },
});
