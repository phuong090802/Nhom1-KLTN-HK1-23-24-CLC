import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyButton from "../../../component/atomic/my-button";
import ModalLayout from "../../../component/molecule/modal-layout";
import { adminAddDepSv } from "../../../service/admin/adminDepartment.sv";
import { AdminDepContext } from "./AdminDepProvider";

export const AddDepModal = () => {
  const { showAddDepModal, setShowAddDepModal, addDep } =
    useContext(AdminDepContext);
  const [departmentName, setDepartmentName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddDep = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await addDep(departmentName);
      setDepartmentName("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setDepartmentName("");
  }, [showAddDepModal]);

  return (
    <ModalLayout
      visible={showAddDepModal}
      onClose={() => setShowAddDepModal(false)}
      title="Thêm khoa"
    >
      <View style={styles.container}>
        <Text style={styles.label}>Tên khoa</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={departmentName}
          onChangeText={setDepartmentName}
        />
        <MyButton
          activeOpacity={0.5}
          style={[
            {
              marginTop: 16,
              backgroundColor: loading ? colors.lightGray : colors.black,
            },
          ]}
          buttonText={"Thêm"}
          onPress={handleAddDep}
        />
      </View>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: { fontFamily: fonts.BahnschriftRegular, fontSize: 16 },
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
  },
});
