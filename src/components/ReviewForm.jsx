import React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import FormikTextInput from './FormikTextInput';

import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import { useHistory } from 'react-router-dom';

import useReview from '../hooks/useReview';


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
    repoOwner: '',
    repoName: '',
    rating: '',
    review: ''
};

const validationSchema = yup.object().shape({
    repoOwner: yup
        .string()
        .required('Repository owner name is required'),
    repoName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .integer('Rating must be an integer')
        .min(0, 'Rating must be at least 0')
        .max(100, 'Rating must be at most 100'),
    review: yup
        .string()
});

export const ReviewForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput name="repoOwner" placeholder="Repository owner name" />
            <FormikTextInput name="repoName" placeholder="Repository name" />
            <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
            <FormikTextInput name="review" placeholder="Review" multiline={true} />
            <Pressable
                onPress={onSubmit}
                style={styles.button}
            >
                <Text style={styles.submit}>Create a review</Text>
            </Pressable>
        </View>
    );
};


const CreateReview = () => {
    const [createReview] = useReview();
    const history = useHistory();

    const onSubmit = async (values) => {
        const { repoOwner, repoName, rating, review } = values;

        try {
            const result = await createReview({ repoOwner, repoName, rating, review });
            history.push(`/repo/${result.data.createReview.repositoryId}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
            {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
        </Formik>
    );
};

export default CreateReview;
