import React from 'react';
import { FlatList, View, StyleSheet, Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import { useParams } from "react-router-native";
import theme from '../theme';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
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

});


const ItemSeparator = () => <View style={styles.separator} />;



const repositoryDetailed = () => {
    const { id } = useParams();
    const first = 4;  
  
    const { repository, fetchMore } = useRepository(id, first);

    const onEndReach = () => {
        fetchMore();
        console.log('fetching more reviews');
      };
    
    if (repository == undefined) { return null }

    const reviews = repository && repository.reviews.edges
        ? repository.reviews.edges.map(edge => edge.node)
        : [];

    return (
        <FlatList
            ListHeaderComponent={() => <RepositoryItem item={repository} isDetailed={true} />}
            data={reviews}
            renderItem={({ item }) => <ReviewItem review={item} />}
            keyExtractor={({ id }) => id}
            onEndReached={onEndReach}
            onEndReachedThreshold={0.5}      
            ItemSeparatorComponent={ItemSeparator}
        />

    )
};


export default repositoryDetailed;
