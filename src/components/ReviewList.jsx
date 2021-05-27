import React from 'react';
import useUser from '../hooks/useUser';
import { FlatList, View, StyleSheet } from 'react-native';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = () => {
    const first = 4;
    const includeReviews = true;
    const { authorizedUser, fetchMore } = useUser(first, includeReviews);

    if (authorizedUser === undefined) { return (<></>); }

    const onEndReach = () => {
        fetchMore();
    };

    const reviews = authorizedUser && authorizedUser.reviews.edges
        ? authorizedUser.reviews.edges.map(edge => edge.node)
        : [];

    return (

        <FlatList
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} userView={true}/>}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={ItemSeparator}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}
        />
    );
};


export default ReviewList;
