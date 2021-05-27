import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';


const useReview = () => {
    const [mutate, result] = useMutation(CREATE_REVIEW);
    const apolloClient = useApolloClient();

    const createReview = async ({ repoOwner, repoName, rating, review }) => {
        // call the mutate function here with the right arguments
        const myResult = await mutate({ variables: { input: { "repositoryName": repoName, "ownerName": repoOwner, "rating": parseInt(rating), "text": review } } });
        apolloClient.resetStore();
        return myResult;
    };

    return [createReview, result];
};

export default useReview;
