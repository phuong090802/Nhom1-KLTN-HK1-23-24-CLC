import React, { useContext, useState } from "react";
import { DepheadFieldContext } from "./DepheadFieldProvider";
import ModalLayout from "../../../component/molecule/modal-layout";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyButton from "../../../component/atomic/my-button";

export const AddFieldModal = () => {
  const { showAddFieldModal, setShowAddFieldModal, addField } =
    useContext(DepheadFieldContext);
  const [loading, setLoading] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const handleAddField = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await addField(fieldName);
      setFieldName("");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <ModalLayout
      title={"Thêm lĩnh vực"}
      visible={showAddFieldModal}
      onClose={() => setShowAddFieldModal(false)}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Tên lĩnh vực</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={fieldName}
          onChangeText={setFieldName}
        />
        <MyButton
          activeOpacity={0.5}
          style={[
            {
              marginTop: 16,
              backgroundColor: colors.black,
            },
          ]}
          buttonText={"Thêm"}
          onPress={handleAddField}
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
