import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
//import { useContext } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();


    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        const response = await mutate({ variables: { input: { username, password } } });
        if (response.data) {
            const token = response.data?.authorize?.accessToken;

            await authStorage.setAccessToken(token);

            apolloClient.resetStore();

        }
        return response;

    };

    return [signIn, result];
};

export default useSignIn;
