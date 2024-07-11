import { router } from "expo-router";
import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, fonts } from "../../../../../constance";
import MyIcon from "../../../../component/atomic/my-icon";
import { InforBox } from "./InforBox";
import { DepartmentStatisticContext } from "./DepartmentStatisticProvider";
import DepModal from "./DepModal";

export const DepartmentStatisticScreen = () => {
  const { depStatictis } = useContext(DepartmentStatisticContext);

  return (
    <View style={styles.container}>
      <DepModal />
      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
      >
        <MyIcon
          iconPackage="Feather"
          name={"arrow-left"}
          size={30}
          color={colors.black75}
        />
      </TouchableOpacity>
      <Text style={styles.title}>Thống kê khoa</Text>
      <ScrollView
        style={{ marginTop: 16, gap: 8 }}
        showsVerticalScrollIndicator={false}
      >
        {depStatictis &&
          depStatictis.map((statistic) => {
            return <InforBox key={statistic._id} data={statistic} />;
          })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.BahnschriftBold,
    color: colors.black75,
    marginTop: 8,
  },
});
