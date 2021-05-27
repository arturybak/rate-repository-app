import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, first) => {
    let variables = {id, first}
    const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
        fetchPolicy: 'cache-and-network',
        variables
    });

    const handleFetchMore = () => {
        const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) {
            return;
        }

        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
        });
    };

    //let repository = null;


    return { repository: data ? data.repository : undefined, error, loading, fetchMore: handleFetchMore };
};


export default useRepository;
