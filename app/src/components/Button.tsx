import { StyleSheet, View, Pressable, Text } from 'react-native';
import { colors, fontSizes } from '../styles/theme';

type Props = {
    label: string;
    onPress?: () => void;
    disabled?: boolean;
};

export default function Button({ label, onPress, disabled }: Props) {
    return (
    <View style={styles.buttonContainer}>
        <Pressable 
            style={({ pressed }) => [
                styles.button,
                pressed && styles.pressed,
                disabled && styles.disabled
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
        backgroundColor: colors.white,
        borderColor: colors.darkblue,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
        buttonLabel: {
        color: colors.black,
        fontSize: fontSizes.lg,
    },
    pressed: {
        opacity: 0.6,
    },
    disabled: {
        opacity: 0.5,
    },
});
