// screens/Animation.js
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

export default function Animation({ navigation }) {
  useEffect(() => {
    // After animation finishes, go to Login
    const timer = setTimeout(() => {
      navigation.replace("Login"); // replace so splash is not in back stack
    }, 3000); // match animation duration

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/Pizza.json")} // your Lottie file
        autoPlay
        loop={false}
        style={{ width: 300, height: 300,backgroundColor:'snow' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "snow", // pastel theme
    justifyContent: "center",
    alignItems: "center",
  },
});
