import React from 'react';
import { View, Text, Image } from 'react-native';

const Footer = () => {
    return (
        <View style={styles.container}>
            
            <Text style={styles.contact}>Contact: example@example.com</Text>
            <Text style={styles.legal}>Legal information: Lorem ipsum dolor sit amet</Text>
        </View>
    );
}

const styles = {
    container: {
        backgroundColor: '#f2f2f2',
        padding: 10,
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    contact: {
        fontSize: 16,
        marginBottom: 5,
    },
    legal: {
        fontSize: 12,
        color: 'gray',
    },
};

export default Footer;
