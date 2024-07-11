import { router } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, paths } from "../../../../constance";
import DepModal from "../../admin/statistic/department-statistic/DepModal";
import { CardButton } from "./CardButton";
import { Chart } from "./Chart";
import { DashboardContext } from "./DashboardProvider";
import AppProvider, { AppContext } from "../../AppProvider";

export const DashboardScreen = () => {
  const { systemStatictis } = useContext(DashboardContext);
  const { user, isLoggedIn } = useContext(AppContext);

  return (
    <View style={styles.container}>
      {isLoggedIn && (
        <Text style={styles.title}>
          {user.role === "COUNSELLOR"
            ? "Câu hỏi đã trả lời"
            : "Biểu đồ câu hỏi"}
        </Text>
      )}
      <Chart />
      {user.role === "ADMIN" && (
        <>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <CardButton
              iconPackage={"MaterialIcons"}
              iconName={"business"}
              title={"Thống kê khoa"}
              text={`${systemStatictis.countOfDepartments} khoa`}
              onPress={() => {
                router.push(paths.adminDepartmentStatistic);
              }}
            />
            <CardButton
              iconPackage={"Feather"}
              iconName={"layers"}
              title={"Thống kê lĩnh vực"}
              text={`${systemStatictis.countOfFields} lĩnh vực`}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}
          >
            <CardButton
              iconPackage={"Octicons"}
              iconName={"question"}
              title={"Thống kê câu hỏi"}
              text={`${systemStatictis.countOfQuestions} câu hỏi`}
            />
            <CardButton
              iconPackage={"Feather"}
              iconName={"users"}
              title={"Thống kê Người dùng"}
              text={`${systemStatictis.countOfUsers} người dùng`}
            />
          </View>
        </>
      )}
      {user.role === "DEPARTMENT_HEAD" && (
        <>
          <View
            style={{
              flexDirection: "row",
              gap: 8,
            }}
          >
            <CardButton
              iconPackage={"Octicons"}
              iconName={"question"}
              title={"Thống kê câu hỏi"}
              text={`${systemStatictis.countOfFAQs} câu hỏi`}
            />
            <CardButton
              iconPackage={"Feather"}
              iconName={"users"}
              title={"Thống kê Người dùng"}
              text={`${systemStatictis.countOfUsers} người dùng`}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.BahnschriftBold,
    color: colors.lightPrimary,
  },
});
