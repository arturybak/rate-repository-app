import { useApolloClient, useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';
//import { useContext } from 'react';

const useSignUp = () => {
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
        const response = await mutate({ variables: { input: { username, password } } });
        if (response.data) {
            //const token = response.data?.authorize?.accessToken;

            //await authStorage.setAccessToken(token);

            apolloClient.resetStore();

        }
        return response;

    };

    return [signUp, result];
};

export default useSignUp;
