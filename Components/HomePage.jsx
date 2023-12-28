import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Avatar, Tooltip, Text } from "react-native-elements";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons, Feather } from "@expo/vector-icons";
import CustomListItem from "./CustomListItem";

const HomePage = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          chat: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  const singOutUser = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => alert(error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chats",
      headerStyle: { backgroundColor: "#2C6BED" },
      headerTitleStyle: { color: "white" },

      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity activeOpacity={0.5} onPress={singOutUser}>
            <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 110,
            marginRight: 17,
          }}
        >
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name="camera" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.5}>
            <Feather name="search" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("AddChat")}
          >
            {/* <Tooltip popover={<Text>Creat Your Own ChatRoom</Text>}> */}
            <SimpleLineIcons name="pencil" size={24} color="white" />
            {/* </Tooltip> */}
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);
  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        {chats.map(({ chat: { chatName }, id }) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
