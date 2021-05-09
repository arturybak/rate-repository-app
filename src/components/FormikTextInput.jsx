import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
    input: {
        height: 45,
        borderColor: theme.colors.background,
        color: theme.colors.textSecondary,
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
        paddingLeft: 20
    },
    inputError: {
        borderColor: theme.colors.error,
    },
    errorText: {
        marginBottom: 10,
        color: theme.colors.error
    },
});


const FormikTextInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);

    // Check if the field is touched and the error message is present
    const showError = meta.touched && meta.error;

    const inputStyles = [
        styles.input,
        showError && styles.inputError
      ];
    
    return (
        <>
            <TextInput
                style={inputStyles}
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                {...props}
            />
            {/* Show the error message if the value of showError variable is true  */}
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;
