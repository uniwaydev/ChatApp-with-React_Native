import React, { useState, useLayoutEffect } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useLayoutEffect(() => {
    // applyed for just IOS
    navigation.setOptions({
      headerBackTitle: "Back to Home",
    });
  }, [navigation]);

  const register = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: name,
          photoURL:
            imageUrl ||
            "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
        });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text h4 style={{ marginBottom: 60 }}>
        Create a Signal Account Here
      </Text>

      <View style={styles.InputContainer}>
        <Input
          onChangeText={(text) => setName(text)}
          value={name}
          type="text"
          autoFocus
          placeholder="Enter your Name "
        />
        <Input
          onChangeText={(text) => setEmail(text)}
          value={email}
          type="email"
          placeholder="Type your Email Id "
        />
        <Input
          type="password"
          secureTextEntry
          placeholder="Enter your Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          onChangeText={(text) => setImageUrl(text)}
          value={imageUrl}
          type="text"
          placeholder="Paste your ImageUrl (Opional)"
          onSubmitEditing={register}
        />
      </View>
      <Button
        containerStyle={styles.button}
        title="Register"
        onPress={register}
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  InputContainer: { width: 300 },
  button: { width: 200 },
});
