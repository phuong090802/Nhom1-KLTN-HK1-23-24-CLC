import React, { useCallback, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../../../../constance";
import MyIcon from "../../../../component/atomic/my-icon";
import { LinearGradient } from "expo-linear-gradient";
import { DepartmentStatisticContext } from "./DepartmentStatisticProvider";

export const InforBox = ({ data }) => {
  const { setChosenDep, setVisibleDepModal } = useContext(
    DepartmentStatisticContext
  );

  const handleInforBox = useCallback(() => {
    setVisibleDepModal(true);
    setChosenDep({ departmentName: data.departmentName, _id: data._id });
  }, [data]);

  return (
    <LinearGradient
      style={[styles.container]}
      colors={["#0396FF", "#ABDCFF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ flex: 10 }}>
        <Text style={styles.title}>{data.departmentName || "Tên khoa"} </Text>
        <View style={{ flexDirection: "column", gap: 8, marginLeft: 16 }}>
          <Infor
            iconPackage={"Feather"}
            name={"layers"}
            infor={`${data.fieldCount || 0} lĩnh vực`}
          />
          <Infor
            iconPackage={"Feather"}
            name={"users"}
            infor={`${data.staffCount || 0} nhân viên`}
          />
          <Infor
            iconPackage={"Octicons"}
            name={"question"}
            infor={`${data.questionCount || 0} câu hỏi`}
          />
        </View>
      </View>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}
      >
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={handleInforBox}
        >
          <MyIcon
            iconPackage="FontAwesome"
            name={"chevron-right"}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const Infor = ({ iconPackage, name, infor }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        borderRadius: 16,
      }}
    >
      <MyIcon
        iconPackage={iconPackage}
        name={name}
        size={24}
        color={colors.white}
      />
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.BahnschriftRegular,
          color: colors.white,
        }}
      >
        {infor}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontFamily: fonts.BahnschriftBold,
    color: colors.white,
  },
});
