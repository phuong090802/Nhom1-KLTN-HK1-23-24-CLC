import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyIcon from "../../../component/atomic/my-icon";
import BackArrow from "../../../component/molecule/back-arrow";
import Search from "../../../component/molecule/search";
import { AdminDepContext } from "./AdminDepProvider";

export const Header = () => {
  const { params, setParams, setShowAddDepModal } = useContext(AdminDepContext);

  return (
    <View style={styles.container}>
      <BackArrow text={"Quản lý khoa"} />
      <Text style={styles.text}>Quản lý khoa</Text>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Search params={params} setParams={setParams} />
        <TouchableOpacity
          activeOpacity={0.4}
          onPress={() => setShowAddDepModal(true)}
        >
          <MyIcon iconPackage="Feather" name={"plus-circle"} size={32} />
        </TouchableOpacity>
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
