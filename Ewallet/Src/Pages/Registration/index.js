import axios from 'axios';
import {Formik} from 'formik';
import React from 'react';
import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import * as Yup from 'yup';

export default function Register() {
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').label('Name'),
    email: Yup.string()
      .email('Please enter valid email')
      .required('Email is required')
      .label('Email'),
    password: Yup.string()
      .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
      .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
      .matches(/\d/, 'Password must have a number')
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required')
      .label('Password'),

    noHandphone: Yup.string()
      .matches(/(0)(\d){8}\b/, 'Enter a valid phone number')
      .required('Phone number is required'),
  });
  {
    /* confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is required'),*/
  }

  return (
    <>
      <Text>REGISTER</Text>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          // confirmPassword: '',
          noHandphone: '',
        }}
        validationSchema={validationSchema}
        // onSubmit={async value => {
        //   const data = {
        //     email: value.email,
        //     password: value.password,
        //     nama: value.name,
        //     nomor_handphone: value.noHandphone,
        //   };
        // }}
        //  await axios.post('https://emoneydti.basicteknologi.co.id/index.php/api/users/registrasi',data);
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#000000"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              autoCorrect={false}
              style={styles.textInput}
            />
            {errors.name && touched.name && (
              <Text style={styles.error}>{errors.name}</Text>
            )}
            <TextInput
              placeholder="Email"
              placeholderTextColor="#000000"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              autoCapitalize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              textContentType="emailAddress"
              value={values.email}
              style={styles.textInput}
            />
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}
            <TextInput
              placeholder="No Handpone"
              placeholderTextColor="#000000"
              onChangeText={handleChange('noHandphone')}
              onBlur={handleBlur('noHandphone')}
              autoCorrect={false}
              keyboardType="numeric"
              value={values.noHandphone}
              style={styles.textInput}
            />
            {errors.noHandphone && touched.noHandphone && (
              <Text style={styles.error}>{errors.noHandphone}</Text>
            )}
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000000"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              autoCapitalize="none"
              secureTextEntry
              textContentType="password"
              value={values.password}
              style={styles.textInput}
            />
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}
            {/*
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#000000"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              autoCapitalize="none"
              secureTextEntry
              textContentType="confirmPassword"
              value={values.confirmPassword}
              style={styles.textInput}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}
            */}
            <Button onPress={handleSubmit} title="Submit" />
          </View>
        )}
      </Formik>
    </>
  );
}
const styles = StyleSheet.create({
  textInput: {
    color: '#000000',
  },
  error: {
    color: 'red',
  },
});
