import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../../component/atomic/my-icon/MyIcon";
import { router } from "expo-router";

export const HomePageButton = ({ item }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.4}
      onPress={() => {
        if (item.link) {
          console.log(item.link);
          router.push(item.link);
        }
      }}
    >
      <MyIcon
        iconPackage={item.iconPackage || "Ionicons"}
        name={item.iconName || "business-outline"}
        size={36}
        color={colors.primary}
      />
      <Text style={styles.text}>{item?.text || "Title"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primary20,
    borderRadius: 16,
  },
  text: {
    fontFamily: fonts.BahnschriftBold,
    color: colors.primary,
    fontSize: 20,
    marginTop: 12,
  },
});


