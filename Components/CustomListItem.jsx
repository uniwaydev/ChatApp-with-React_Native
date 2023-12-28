import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import { db, auth } from "../firebase";

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);
  useEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(snapshot.docs.map((doc) => doc.data()))
      );

    return unsubscribe;
  }, []);

  return (
    <TouchableOpacity activeOpacity={0.5}>
      <ListItem key={id} bottomDivider onPress={() => enterChat(id, chatName)}>
        <Avatar
          rounded
          source={{
            uri:
              chatMessages[0]?.photoURL ||
              "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
          }}
        />

        <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "bold" }}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            {chatMessages[0]?.displayName}: {chatMessages[0]?.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
