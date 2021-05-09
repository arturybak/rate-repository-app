import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';

import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

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
    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
        </Formik>
    );
};


export default SignIn;
