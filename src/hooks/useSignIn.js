import { useApolloClient, useMutation } from '@apollo/client';
import { AUTHORIZE } from '../graphql/mutations';
//import { useContext } from 'react';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();


    const [mutate, result] = useMutation(AUTHORIZE);

    const signIn = async ({ username, password }) => {
        const response = await mutate({ variables: { username, password } });
        if (response.data) {
            const token = response.data?.authorize?.accessToken;
            console.log("new token", token);
      
            await authStorage.setAccessToken(token);
      
            apolloClient.resetStore();
      
            return true;
          }
      
          return false;      
    };

    return [signIn, result];
};

export default useSignIn;
