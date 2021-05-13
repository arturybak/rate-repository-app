import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';

import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import useSignIn from '../hooks/useSignIn';
import { useHistory } from "react-router-dom";


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
        marginTop: 10
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
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="username" placeholder="Username" />
            <FormikTextInput name="password" placeholder="Password" secureTextEntry />

            <Pressable onPress={onSubmit} style={styles.button}>
                <Text style={styles.submit}>Sign In</Text>
            </Pressable>
        </View>
    );
};



const SignIn = () => {
    const [signIn] = useSignIn();
    let history = useHistory();

    const onSubmit = async (values) => {
        const { username, password } = values;

        try {
            const response = await signIn({ username, password });
            if (response) {
                history.push('/');
            }

        } catch (error) {
            console.log('login error', error);

        }
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export default SignIn;
