import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log(authUser);
      if (authUser) {
        navigation.navigate("Home");
      }
    });

    return unsubscribe;
  }, []);

  const Login = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error));
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.InputContainer}>
        <Input
          type="email"
          autoFocus
          placeholder="Enter your Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          type="password"
          secureTextEntry
          placeholder="Enter your Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          onSubmitEditing={Login}
        />
      </View>
      <Button containerStyle={styles.button} onPress={Login} title="Login" />

      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        type="outline"
        title="Register Here"
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  InputContainer: {
    width: 300,
    marginTop: 12,
  },
  button: {
    marginBottom: 10,
    width: 200,
  },
});

export default LoginScreen;
