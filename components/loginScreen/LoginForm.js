import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";

import { Formik } from "formik";
import * as Yup from "yup";
import Validator from "email-validator";

import { firebase } from "../../firebase";

const LoginForm = ({ navigation }) => {
  const LoginFormSchema = Yup.object().shape({
    email: Yup.string().email().required("An email is required"),
    password: Yup.string()
      .required()
      .min(8, "Your password has to have at least 8 characters"),
  });

  const onLogin = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log("Firebase log in successfully!", email, password);
    } catch (error) {
      Alert.alert(
        "Oops...",
        error.message + "\n\nPlease check it carefully..."
      );
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => onLogin(values.email, values.password)}
        validationSchema={LoginFormSchema}
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
                placeholder="username or email"
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
            <View style={{ alignItems: "flex-end", marginBottom: 30 }}>
              <Text style={{ color: "#6BB0F5" }}>Forgot Password?</Text>
            </View>
            <TouchableOpacity
              style={styles.button(isValid)}
              onPress={handleSubmit}
              disabled={!isValid}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
                Log In
              </Text>
            </TouchableOpacity>
            <View style={styles.signupContainer}>
              <Text>Don't have an acoount?</Text>
              <TouchableOpacity
                style={{ marginLeft: 3 }}
                onPress={() => navigation.push("SignupScreen")}
              >
                <Text style={{ color: "#6BB0F5" }}>Sign Up</Text>
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
    // marginBottom: isValid ? 10 : 0,
  }),
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 50,
  },
});

export default LoginForm;
