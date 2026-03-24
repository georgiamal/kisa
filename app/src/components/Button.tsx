import { StyleSheet, View, Pressable, Text } from 'react-native';
import { colors, fontSizes } from '../styles/theme';

type Props = {
    label: string;
    onPress?: () => void;
    disabled?: boolean;
    variant?: 'default' | 'small' | 'medium';
};

export default function Button({ label, onPress, disabled, variant = 'default' }: Props) {
    return (
    <View >
        <Pressable 
            style={({ pressed }) => [
                styles.button,
                variant === 'small' && styles.smallButton,
                variant === 'medium' && styles.mediumButton,
                pressed && styles.pressed,
                disabled && styles.disabled
            ]} 
            onPress={onPress}>
            <Text style={[
                styles.buttonLabel,
                variant === 'small' && styles.smallButtonLabel,
                variant === 'medium' && styles.mediumButtonLabel
            ]}>{label}</Text>
        </Pressable>
    </View>
    );
    }

const styles = StyleSheet.create({
    button: {
        borderRadius: 13,
        borderWidth: 1,
        backgroundColor: colors.white,
        borderColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 14,
        paddingHorizontal: 24,
    },
    mediumButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    smallButton: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    buttonLabel: {
        color: colors.black,
        fontSize: fontSizes.lg,
    },
    smallButtonLabel: {
        fontSize: fontSizes.sm,
    },
    mediumButtonLabel: {
        fontSize: fontSizes.md,
    },
    pressed: {
        opacity: 0.5,
        backgroundColor: colors.grey,
    },
    disabled: {
        opacity: 0.5,
    },
});
