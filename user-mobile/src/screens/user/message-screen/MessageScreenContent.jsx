import React, { useContext } from "react";
import { FlatList, Text, View } from "react-native";
import TitleBar from "../../../molecule/title-bar";
import { useNavigation } from "@react-navigation/native";
import { MessageScreenContext } from "./MessageScreenStore";
import { ConversationItem } from "./ConversationItem";

export const MessageScreenContent = () => {
  const navigation = useNavigation();

  const { conversations } = useContext(MessageScreenContext);

  return (
    <View style={{ marginTop: 16, paddingHorizontal: 16, marginBottom: 100 }}>
      <TitleBar
        title={"Danh sách các cuộc hội thoại"}
        onBack={() => navigation.navigate("AppHome")}
      />
      <FlatList
        data={conversations}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ConversationItem data={item} />}
      />
    </View>
  );
};
