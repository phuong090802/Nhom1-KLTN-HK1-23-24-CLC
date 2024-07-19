import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import user_avatar from "../../../../assets/images/user_avatar.jpg";

import { colors, fonts } from "../../../../constant";
import MyIcon from "../../../atom/my-icon/MyIcon";
import { DataContext } from "../../../store/Store";
import { Message } from "./Message";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import MyRichText from "../../../atom/my-rich-text";
import { getConversationByIdSv } from "../../../services/guest/notification.sv";
import { initMessageParams } from "./const";
import { useAuthorSocketHook } from "../../../hooks/useAuthorSocketHook";
import { createRef } from "react";

export const DetailConversation = () => {
  const [messages, setMessages] = useState([]);

  const {
    selectedConversationId,
    setSelectedConversationId,

    selectedConversation,
  } = useContext(DataContext);

  const [params, setParams] = useState(initMessageParams);

  const { user } = useContext(DataContext);

  const navigation = useNavigation();

  const { authorSocket, connected } = useAuthorSocketHook();

  const [messageContent, setMessageContent] = useState("");

  const _editor = createRef();

  const sendMessage = async () => {
    if (messageContent === "" || !connected) return;
    const response = await authorSocket.emitWithAck("message:create", {
      conversationId: selectedConversationId,
      messageContent: messageContent,
    });
    if (response.success) {
      _editor.current.setContents([{ insert: "\n" }]);
      setMessages((prev) => [
        ...prev,
        {
          _id: response.id,
          content: messageContent,
          sender: user._id,
        },
      ]);
    }
  };

  const getMessages = async () => {
    try {
      const response = await getConversationByIdSv(
        selectedConversationId,
        params
      );
      setMessages(response.messages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!selectedConversationId) return;
    getMessages();
  }, [selectedConversationId, params]);

  const handleHtmlChange = (data) => {
    setMessageContent(data.html);
  };

  useEffect(() => {
    if (!authorSocket) return;
    if (connected && user.isLoggedIn) {
      authorSocket.on(`${user._id}:message:read`, (data) => {
        if (response.latestConversation._id === selectedConversationId) {
          setMessages((prev) => [...prev, data.latestConversation.lastMessage]);
        }
      });
    }
  }, [connected, user]);

  return (
    <>
      <StatusBar />
      <View
        style={{ justifyContent: "space-between", flex: 1, paddingTop: 24 }}
      >
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Message");
              }}
            >
              <MyIcon
                iconPackage="Ionicons"
                name={"chevron-back"}
                color={"#fff"}
                size={32}
              />
            </TouchableOpacity>
            <Image
              source={
                selectedConversation?.otherUser?.avatar !== null
                  ? { uri: selectedConversation?.otherUser?.avatar !== null }
                  : user_avatar
              }
              style={styles.avatar}
            />
            <Text style={styles.title}>
              {selectedConversation.otherUser.fullName}
            </Text>
          </View>
          <MyIcon
            iconPackage="Ionicons"
            name={"search"}
            color={"#fff"}
            size={32}
          />
        </View>
        <ScrollView style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
          {messages?.map((message) => {
            return (
              <Message
                sender={message.sender !== user._id}
                key={message._id}
                content={message.content}
              />
            );
          })}
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            borderWidth: 1,
            borderColor: colors.primary,
          }}
        >
          <MyRichText
            minHeight={48}
            editorRef={_editor}
            setValue={handleHtmlChange}
          />
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 48,
              borderLeftWidth: 1,
              borderLeftColor: colors.primary,
              backgroundColor: "#fff",
            }}
            onPress={sendMessage}
          >
            <MyIcon
              iconPackage="Feather"
              name={"send"}
              size={30}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  title: {
    color: colors.white,
    fontFamily: fonts.BahnschriftBold,
    fontSize: 22,
    marginLeft: 8,
  },
  text: {},
  fontBahnschriftBold: {
    fontFamily: fonts.BahnschriftBold,
  },
  fontBahnschrifd: {
    fontFamily: fonts.BahnschriftRegular,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
