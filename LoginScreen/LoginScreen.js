import React, { useState, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  Text,
  TouchableOpacity,
} from "react-native";

SplashScreen.preventAutoHideAsync();

export default function LoginScreen({ changeScreen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
  });

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onLogin = () => {
    if (!email || !password) {
      alert("Please make sure all fields are filled in correctly");
      return;
    }
    setIsShowKeyboard(false);
    Alert.alert("Credentials", `${email} + ${password}`);
    setEmail("");
    setPassword("");
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setIsFocusedEmail(false);
    setIsFocusedPassword(false);
  };

  const onFocusEmail = () => {
    setIsShowKeyboard(true);
    setIsFocusedEmail(true);
  };
  const onFocusPassword = () => {
    setIsShowKeyboard(true);
    setIsFocusedPassword(true);
    true;
  };
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  const showPassword = () => alert(`Your password is: ${password}`);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          <View style={styles.backGroundFrame}>
            <View style={styles.form}>
              <Text style={styles.textRegistration}>Login</Text>

              <TextInput
                value={email}
                onChangeText={emailHandler}
                placeholder="Email address"
                onFocus={onFocusEmail}
                style={{
                  ...styles.input,
                  borderColor: isFocusedEmail ? "#FF6C00" : "#E8E8E8",
                }}
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  value={password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  onFocus={onFocusPassword}
                  secureTextEntry={true}
                  style={{
                    ...styles.inputPass,
                    marginBottom: isShowKeyboard ? 32 : 43,
                    borderColor: isFocusedPassword ? "#FF6C00" : "#E8E8E8",
                  }}
                />
                <TouchableOpacity
                  style={styles.showPassword}
                  activeOpacity={0.7}
                  onPress={showPassword}
                >
                  <Text style={styles.showPasswordTitle}>Show</Text>
                </TouchableOpacity>
              </View>
              {isShowKeyboard ? (
                ""
              ) : (
                <View>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={onLogin}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.buttonTitle}>Enter</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.loginLink}
                    activeOpacity={0.7}
                    onPress={() => changeScreen(true)}
                  >
                    <Text style={styles.textTitle}>
                      Already have an account? Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
  },
  input: {
    height: 50,
    width: 343,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingBottom: 15,
    paddingTop: 16,
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  inputPass: {
    height: 50,
    width: 343,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingBottom: 15,
    paddingTop: 16,
    backgroundColor: "#F6F6F6",
    color: "#212121",
    fontFamily: "Roboto-Regular",
  },
  showPasswordTitle: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    color: "#1B4371",
  },
  showPassword: {
    right: 16,
    top: 16,
    position: "absolute",
  },
  passwordContainer: {
    position: "relative",
  },
  backGroundFrame: {
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  form: { marginHorizontal: 16, alignItems: "center" },
  button: {
    backgroundColor: "#FF6C00",
    marginBottom: 16,
    borderRadius: 100,
    height: 51,
    justifyContent: "center",
    width: 343,
  },
  buttonTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    textAlign: "center",
  },
  textTitle: {
    color: "#1B4371",
    fontSize: 16,
    marginBottom: 144,
    textAlign: "center",
    fontFamily: "Roboto-Regular",
  },
  textRegistration: {
    marginTop: 32,
    marginBottom: 33,
    fontSize: 30,
    textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontWeight: "500",
    lineHeight: 35,
  },
});
