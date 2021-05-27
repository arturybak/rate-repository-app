import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';

import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import { useHistory } from 'react-router-dom';

import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';


const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white'
    },
    button: {
        height: 45,
        borderRadius: 5,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    submit: {
        color: 'white',
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold
    }
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirm: ''
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(1)
        .max(30),
    password: yup
        .string()
        .required('Password is required')
        .min(5)
        .max(50),
    passwordConfirm: yup
        .string()
        .required('Password Confirmation is required')
        .oneOf([yup.ref('password'), null]),
});

export const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />
            <FormikTextInput name="passwordConfirm" placeholder="Password Confirmation" secureTextEntry/>
            <Pressable
                onPress={onSubmit}
                style={styles.button}
            >
                <Text style={styles.submit}>Sign Up</Text>
            </Pressable>
        </View>
    );
};


const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            await signUp({ username, password });
            await signIn({ username, password });

            history.push('/');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default SignUp;
