import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { firebase, db } from "../../firebase";

const SignupForm = ({ navigation }) => {
  const SignupFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    username: Yup.string()
      .required()
      .min(3, "Your Username has to have at least 3 characters"),
    password: Yup.string()
      .required()
      .min(8, "Your password has to have at least 8 characters"),
  });

  const getRandomProfilePicture = async () => {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    return data.results[0].picture.large;
  };

  const onSignup = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      Alert.alert("The account was successfully Created");
      console.log("The account successfully Created");
      navigation.push("LoginScreen");
      db.collection("users")
        .doc(authUser.user.email)
        .set({
          owner_uid: authUser.user.uid,
          username: username,
          email: authUser.user.email,
          profile_picture: await getRandomProfilePicture(),
        });
    } catch (error) {
      Alert.alert("Oops...", error.message);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", username: "", password: "" }}
        onSubmit={(values) =>
          onSignup(values.email, values.password, values.username)
        }
        validationSchema={SignupFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
            {/* EMail Text Input */}
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || Validator.validate(values.email)
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#444"}
                placeholder="email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
            </View>
            {errors.email && values.email !== "" ? (
              <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>
                {errors.email}
              </Text>
            ) : null}
            {/* Username Text Input */}
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.username.length < 1 || values.username.length > 2
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#444"}
                placeholder="username"
                autoCapitalize="none"
                textContentType="username"
                autoFocus={true}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
                value={values.username}
              />
            </View>
            {errors.username && values.username !== "" ? (
              <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>
                {errors.username}
              </Text>
            ) : null}
            {/* Password Text Input */}
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || values.password.length > 7
                      ? "#ccc"
                      : "red",
                },
              ]}
            >
              <TextInput
                placeholderTextColor={"#444"}
                placeholder="Password"
                autoCapitalize="none"
                textContentType="password"
                secureTextEntry={true}
                autoCorrect={false}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
            </View>
            {errors.password && values.password !== "" ? (
              <Text style={{ fontSize: 14, color: "red", marginBottom: 10 }}>
                {errors.password}
              </Text>
            ) : null}
            <TouchableOpacity
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                Sign Up
              </Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text>Already have an acoount?</Text>
              <TouchableOpacity
                style={{ marginLeft: 3 }}
                onPress={() => navigation.push("LoginScreen")}
              >
                <Text style={{ color: "#6BB0F5" }}>Log in</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 12,
    backgroundColor: "#FAFAFA",
    borderWidth: 1,
    marginBottom: 10,
  },
  button: (isValid) => ({
    backgroundColor: isValid ? "#0096f6" : "#9acaf7",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 42,
    borderRadius: 4,
    marginTop: 20,
    // marginBottom: isValid ? 10 : 0,
  }),
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default SignupForm;
