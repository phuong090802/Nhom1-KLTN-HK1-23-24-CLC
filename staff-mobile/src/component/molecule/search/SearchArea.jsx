import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../atomic/my-icon";

export const SearchArea = ({ onClose, keyword, setKeyword }) => {
  return (
    <View>
      <View style={{ position: "relative" }}>
        <View style={styles.searchIcon}>
          <MyIcon
            iconPackage="Ionicons"
            name={"search"}
            size={32}
            color={colors.black75}
          />
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Tìm kiếm ..."
          value={keyword}
          onChangeText={setKeyword}
        />
        <View style={styles.exitIcon}>
          <TouchableOpacity activeOpacity={0.4} onPress={onClose}>
            <MyIcon
              iconPackage="MaterialIcons"
              name={"exit-to-app"}
              size={32}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: colors.white,
    marginTop: 16,
    paddingHorizontal: 48,
    paddingVertical: 8,
    borderRadius: 16,
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
  },
  searchIcon: {
    position: "absolute",
    bottom: 5,
    left: 12,
    zIndex: 2,
  },
  exitIcon: {
    position: "absolute",
    bottom: 5,
    right: 12,
    zIndex: 2,
  },
});
