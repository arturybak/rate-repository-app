import React from 'react';
import { format } from 'date-fns';
import { View, StyleSheet, Text, Pressable, Alert } from 'react-native';
import theme from '../theme';
import useDeleteReview from '../hooks/useDeleteReview';
import { useHistory } from 'react-router-dom';

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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        backgroundColor: theme.colors.primary,
        margin: 10,
        padding: 15,
        flexGrow: 0,
        borderRadius: 5,
        alignItems: 'center',
        fontWeight: theme.fontWeights.bold
    },

    rating: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.appBar
    },
    ratingContainer: {
        flexGrow: 0,
        marginRight: 15,
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        borderColor: theme.colors.appBar,
        borderWidth: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        flexGrow: 1,
        flexDirection: 'column',
        width: 0
    },
    important: {
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
        color: theme.colors.textPrimary
    },
    secondary: {
        fontSize: theme.fontSizes.body,
        color: theme.colors.textSecondary,
        paddingBottom: 5
    },
    buttonText: {
        color: 'white',
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold

    }

});

const ReviewItem = ({ review, userView = false }) => {
    return (
        <View style={styles.card}>
            <CardHeader review={review} userView={userView} />
        </View>
    )
};

const CardHeader = ({ review, userView }) => {
    const date = new Date(review.createdAt);
    var formattedDate = format(date, "dd.MM.yyyy");
    const history = useHistory();

    const [deleteReview] = useDeleteReview();

    const confirmDeletion = () =>
        Alert.alert(
            "Delete review",
            "Are you sure you want to delete this review?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => deleteReview(review.id) }
            ],
            { cancelable: false }
        );


    return (
        <>
            <View style={styles.container}>
                <View style={styles.ratingContainer}>
                    <Text style={styles.rating}>{review.rating}</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.important} >{userView ? review.repository.id : review.user.username}</Text>
                    <Text style={styles.secondary} > {formattedDate}</Text>
                    <Text>{review.text}</Text>
                </View>


            </View>
            <View style={styles.buttons}>
                {userView &&
                    <>
                        <Pressable style={styles.button} onPress={() => history.push(`/repo/${review.repository.id}`)} >
                            <Text style={styles.buttonText} >View Repository</Text>
                        </Pressable>
                        <Pressable style={styles.button} onPress={confirmDeletion} >
                            <Text style={styles.buttonText} >Delete Review</Text>
                        </Pressable></>}
            

        {/* <Button title='View repository' />
        <Button title='Delete review' /> */}
            </View>
        </>
    );
};


export default ReviewItem;
