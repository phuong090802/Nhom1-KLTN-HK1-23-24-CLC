import React, { useContext } from "react";
import { Text, View } from "react-native";
import { MessageScreenContext } from "./MessageScreenStore";

export const DetailConversation = () => {
  const {} = useContext(MessageScreenContext);

  return <Text>DetailConversation</Text>;
};
