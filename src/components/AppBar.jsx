import React from 'react';
import { View, StyleSheet, Text, ScrollView, Pressable, Alert } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from "react-router-native";

import { useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import { useApolloClient } from '@apollo/client';
import useAuthStorage from '../hooks/useAuthStorage';


const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: theme.colors.appBar,
        flexDirection: 'row'
    },
    text: {
        paddingVertical: 20,
        paddingHorizontal: 15,
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    }
});

const AppBar = () => {
    const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
        fetchPolicy: 'cache-and-network'
    });

    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();



    if (loading) {
        return <Text>Loading...</Text>;
    } else if (error) {
        return <Text>Error :(</Text>;
    }

    const logOut = async () => {
        await authStorage.removeAccessToken();
        Alert.alert('','signed out');
        return apolloClient.resetStore();
    };

    //console.log("data is:", data.authorizedUser);

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                <Link to="/">
                    <Text style={styles.text}>Repositories</Text>
                </Link>
                {data.authorizedUser == null ?
                    <>
                        <Link to="/login">
                            <Text style={styles.text}>Sign In</Text>
                        </Link>
                        <Link to="/signup">
                            <Text style={styles.text}>Sign Up</Text>
                        </Link>
                    </> :
                    <>
                        <Link to="/review">
                            <Text style={styles.text}>Create a review</Text>
                        </Link>
                        <Link to="/myreviews">
                            <Text style={styles.text}>My reviews</Text>
                        </Link>
                        <Pressable onPress={logOut}>
                            <Text style={styles.text}>Sign Out</Text>
                        </Pressable>
                    </>}

            </ScrollView>
        </View>
    );
};

export default AppBar;
