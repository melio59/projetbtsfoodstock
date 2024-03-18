import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>VivaStock</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightgray',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Footer;