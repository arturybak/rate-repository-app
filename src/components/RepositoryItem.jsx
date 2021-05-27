import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import theme from '../theme';
import * as Linking from 'expo-linking';



const styles = StyleSheet.create({
    card: {
        flex: 1,
        justifyContent: 'center',
        padding: 12,
        backgroundColor: 'white'
    },
    container: {
        flexDirection: 'row',
        flexGrow: 1,

    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 5,
    },
    avatarContainer: {
        flexGrow: 0,
        paddingRight: 18,
    },
    infoContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    tagContainer: {
        backgroundColor: theme.colors.primary,
        marginVertical: 10,
        padding: 5,
        flexGrow: 0,
        borderRadius: 5,

    },
    tag: {
        color: 'white',
        fontSize: theme.fontSizes.body,

    },
    important: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary
    },
    secondary: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textSecondary
    },
    footerContainer: {
        flexDirection: 'row',
        flexGrow: 1,
        justifyContent: 'space-around',

    },
    footerElement: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: theme.colors.primary,
        marginTop: 15,
        padding: 15,
        flexGrow: 0,
        borderRadius: 5,
        alignItems: 'center',
        fontWeight: theme.fontWeights.bold
    },
    buttonText: {
        color: 'white',
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold

    }
});
const convertNumber = (number) => {
    if (number > 1000) {
        const roundedNumber = Math.round(number / 100) / 10;
        return `${roundedNumber.toString()}k`;
    } else {
        return number;
    }
};

const CardHeader = ({ item }) => {
    return (
        <View style={styles.container}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={{ uri: item.ownerAvatarUrl }} />
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.important} testID="fullName" >{item.fullName}</Text>
                <Text style={styles.secondary} testID="description">{item.description}</Text>
                <View style={styles.tagContainer}>
                    <Text style={styles.tag} testID="language">{item.language}</Text>
                </View>

            </View>

        </View>
    );
};

const CardFooter = ({ item, isDetailed }) => {
    handlePress = () => {
        Linking.openURL(item.url);
    }
    return (
        <>
            <View style={styles.footerContainer}>
                <View style={styles.footerElement}>
                    <Text style={styles.important} testID="stargazersCount">{convertNumber(item.stargazersCount)}</Text>
                    <Text style={styles.secondary}>Stars</Text>
                </View>
                <View style={styles.footerElement} >
                    <Text style={styles.important} testID="forksCount">{convertNumber(item.forksCount)}</Text>
                    <Text style={styles.secondary}>Forks</Text>
                </View>
                <View style={styles.footerElement} >
                    <Text style={styles.important} testID="reviewCount">{convertNumber(item.reviewCount)}</Text>
                    <Text style={styles.secondary}>Reviews</Text>
                </View>
                <View style={styles.footerElement}>
                    <Text style={styles.important} testID="ratingAverage" >{convertNumber(item.ratingAverage)}</Text>
                    <Text style={styles.secondary}>Rating</Text>
                </View>
            </View>
            {isDetailed &&
                <Pressable style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText} >Open in Github</Text>
                </Pressable>}


        </>
    );
};

const RepositoryItem = ({ item, isDetailed }) => {

    return (
        <View style={styles.card}>
            <CardHeader item={item} />
            <CardFooter item={item} isDetailed={isDetailed} />
        </View>
    )

};

export default RepositoryItem;