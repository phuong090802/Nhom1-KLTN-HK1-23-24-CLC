import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BackArrow from "../back-arrow";
import Search from "../search";
import MyIcon from "../../atomic/my-icon";
import { colors, fonts } from "../../../../constance";

const ScreenHeader = ({ params, setParams, onAdd, title }) => {
  const addButtonComponent = useMemo(() => {
    return (
      !!onAdd && (
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => {
            if (onAdd) onAdd();
          }}
        >
          <MyIcon iconPackage="Feather" name={"plus-circle"} size={32} />
        </TouchableOpacity>
      )
    );
  }, [onAdd]);

  return (
    <View style={styles.container}>
      <BackArrow text={"Quản lý khoa"} />
      <Text style={styles.text}>{title || "Title"}</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Search params={params} setParams={setParams} />
        {addButtonComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.BahnschriftBold,
    color: colors.primary,
  },
});
export default ScreenHeader;
