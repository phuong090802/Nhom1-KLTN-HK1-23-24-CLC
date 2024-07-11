import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import Filter from "../../molecule/filter";
import Sort from "../../molecule/sort";

const SortFilter = ({ setParams, sortData, filterData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>Filter</Text>
        <Filter data={filterData} setParams={setParams} />
      </View>
      <View style={styles.button}>
        <Text style={styles.text}>Sort</Text>
        <Sort data={sortData} setParams={setParams} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "49%",
    paddingTop: 8,
    paddingHorizontal: 16,
    // backgroundColor: colors.primary20,
    borderBottomColor: colors.black50,
    borderBottomWidth: 1,
  },
});

export default SortFilter;
