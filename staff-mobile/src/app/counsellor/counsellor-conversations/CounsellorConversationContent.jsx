import React, { useContext } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../../component/atomic/my-icon";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";
import blank_avatar from "../../../../assets/images/blank_avatar.jpg";
import { Conversation } from "./Conversation";
import { CounsellorConversationContext } from "./CounsellorConversationProvider";

export const CounsellorConversationContent = () => {
  const { conversations } = useContext(CounsellorConversationContext);

  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <MyIcon
            iconPackage="Ionicons"
            name={"chevron-back"}
            color={"#fff"}
            size={32}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Hộp thoại</Text>
        <MyIcon
          iconPackage="Ionicons"
          name={"search"}
          color={"#fff"}
          size={32}
        />
      </View>
      <ScrollView>
        {conversations.length !== 0 &&
          conversations.map((conversation) => {
            return <Conversation key={conversation._id} data={conversation} />;
          })}
      </ScrollView>
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
  },
  text: {},
  fontBahnschriftBold: {
    fontFamily: fonts.BahnschriftBold,
  },
  fontBahnschrifd: {
    fontFamily: fonts.BahnschriftRegular,
  },
});
