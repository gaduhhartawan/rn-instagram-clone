import { View, Image, StyleSheet } from "react-native";
import React from "react";
import SignupForm from "../components/signupScreen/SignupForm";

const INSTAGRAM_LOGO =
  "https://tse3.mm.bing.net/th?id=OIP.SLULbRcn8WhRf4Ko6GYmzgHaHa&pid=Api&P=0";

const SignupScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: INSTAGRAM_LOGO }}
          style={{ height: 100, width: 100 }}
        />
      </View>
      {/* Signup Form */}
      <SignupForm navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 50,
    paddingHorizontal: 12,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
});

export default SignupScreen;
