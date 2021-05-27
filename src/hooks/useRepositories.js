import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (sortBy, search, first) => {
    let variables = { first, search };
    switch (sortBy) {
        case 'highest':
            variables = { ...variables, "order": "RATING_AVERAGE", "dir": "DESC" };
            break;
        case 'lowest':
            variables = { ...variables, "order": "RATING_AVERAGE", "dir": "ASC" };
            break;
        default:
            variables = { ...variables, "order": "CREATED_AT", "dir": "DESC" };
    }

    const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network', variables
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repositories.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    return { repositories: data ? data.repositories : undefined, error, loading, fetchMore: handleFetchMore };
};

export default useRepositories;
