import React, { useContext } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts } from "../../../../../constance";
import MyIcon from "../../../../component/atomic/my-icon";
import { DepartmentStatisticContext } from "./DepartmentStatisticProvider";
import { Chart } from "./Chart";
// import { DashboardContext } from "../../../app-home/dashboard/DashboardProvider";

const DepModal = () => {
  const { visibleDepModal, setVisibleDepModal, chosenDep } = useContext(
    DepartmentStatisticContext
  );

  console.log(chosenDep);

  return (
    <Modal
      style={styles.modal}
      transparent
      visible={visibleDepModal}
      animationType="slide"
    >
      <View style={styles.modalContainer}>
        <View style={styles.contentContainer}>
          <TouchableOpacity
            style={styles.closeArea}
            onPress={() => setVisibleDepModal(false)}
          >
            <MyIcon iconPackage="Octicons" name={"chevron-down"} />
          </TouchableOpacity>
          <View style={styles.content}>
            <Text style={styles.departmentName}>
              {chosenDep.departmentName || "Tên khoa"}
            </Text>
            <Chart />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {},
  modalContainer: {
    flex: 1,
    // backgroundColor: colors.black25,
    flexDirection: "column-reverse",
  },
  contentContainer: {
    height: "45%",
    backgroundColor: colors.white,
    borderRadius: 24,
    borderWidth: 0.5,
    borderColor: colors.black25,
    overflow: "hidden",
    // paddingHorizontal: 16,
  },
  closeArea: {
    borderBottomWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary20,
    paddingVertical: 2,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  departmentName: {
    fontSize: 20,
    fontFamily: fonts.BahnschriftBold,
    color: colors.black75,
    marginBottom: 8,
  },
});

export default DepModal;
