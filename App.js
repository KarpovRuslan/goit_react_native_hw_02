import React, { useState } from "react";
import { StyleSheet, View, ImageBackground, Dimensions } from "react-native";
import LoginScreen from "./LoginScreen/LoginScreen";
import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";

const imageBack = require("./assets/images/photo.jpg");

export default function App() {
  const [activeScreen, setActiveScreen] = useState(false);
  const changeScreen = (value) => {
    setActiveScreen(value);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={imageBack} style={styles.image}>
        {activeScreen === false ? (
          <LoginScreen changeScreen={changeScreen} />
        ) : (
          <RegistrationScreen changeScreen={changeScreen} />
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    // flex: 1,
    // resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    //justifyContent: "flex-end",
  },
});
