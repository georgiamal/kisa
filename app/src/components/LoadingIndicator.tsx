import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { colors } from '../styles/theme';

export default function LoadingIndicator() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color={colors.orange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});