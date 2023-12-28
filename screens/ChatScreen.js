import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  TextInput,
} from "react-native";
import { Avatar, Text } from "react-native-elements";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import { db, auth } from "../firebase";
import firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${route.params.chatName}`,
      headerTitleStyle: { color: "black" },
      headerTitle: () => (
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Avatar
            rounded
            source={{
              uri:
                messages[0]?.data.photoURL ||
                "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
            }}
          />
          <Text style={{ color: "white", fontWeight: "700", marginLeft: 10 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 110,
            marginRight: 14,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <Entypo name="dots-three-vertical" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    db.collection("chats").doc(route.params.id).collection("messages").add({
      message: input,
      displayName: auth.currentUser.displayName,
      emailId: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  useEffect(() => {
    db.collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={80}
      >
        <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
          {messages.map(({ id, data }) =>
            data.emailId === auth.currentUser.email ? (
              <View key={id} style={styles.sendMessages}>
                <Avatar
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    right: -5,
                  }}
                  position="absolute"
                  rounded
                  bottom={-15}
                  right={-5}
                  size={20}
                  source={{ uri: data.photoURL }}
                />
                <Text style={styles.sendMessagesText}>{data.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.receiveMessages}>
                <Avatar
                  // for web
                  containerStyle={{
                    position: "absolute",
                    bottom: -15,
                    left: -5,
                  }}
                  position="absolute"
                  rounded
                  bottom={-15}
                  right={-5}
                  size={20}
                  source={{ uri: data.photoURL }}
                />
                <Text style={styles.receiveMessagesText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="Signal Message"
            value={input}
            autoFocus
            onChangeText={(text) => setInput(text)}
            style={styles.textInput}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={sendMessage}
            disabled={!input}
          >
            <Ionicons name="send" size={24} color="#2B68E6" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  footer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    padding: 15,
  },

  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    padding: 10,
    borderRadius: 20,
    color: "grey",
  },
  sendMessages: {
    alignSelf: "flex-end",
    padding: 15,
    backgroundColor: "#ECECEC",
    borderRadius: 20,
    marginRight: 20,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 40,
  },
  receiveMessages: {
    alignSelf: "flex-start",
    padding: 15,
    backgroundColor: "#2B68E6",
    borderRadius: 20,
    marginLeft: 20,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
    marginBottom: 40,
  },

  sendMessagesText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
  },
  receiveMessagesText: {
    color: "white",
    left: 10,
    paddingRight: 10,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 7,
    color: "white",
  },
});

export default ChatScreen;
