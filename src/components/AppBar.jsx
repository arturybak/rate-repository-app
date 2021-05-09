import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from "react-router-native";



const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
        flexDirection: 'row'
    },
    text: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    }
});

const AppBar = () => {
    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.text}>Repositories</Text>
                </Link>

                <Link to="/login">
                    <Text style={styles.text}>Sign In</Text>
                </Link>
                
            </ScrollView>
        </View>
    );
};

export default AppBar;
