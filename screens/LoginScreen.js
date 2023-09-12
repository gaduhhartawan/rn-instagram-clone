import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LoginForm from "../components/loginScreen/LoginForm";

const INSTAGRAM_LOGO =
  "https://tse3.mm.bing.net/th?id=OIP.SLULbRcn8WhRf4Ko6GYmzgHaHa&pid=Api&P=0";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{ uri: INSTAGRAM_LOGO }}
          style={{ height: 100, width: 100 }}
        />
      </View>
      {/* Login Form */}
      <LoginForm navigation={navigation} />
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

export default LoginScreen;
