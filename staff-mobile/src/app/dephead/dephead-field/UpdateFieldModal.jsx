import React, { useContext, useEffect, useState } from "react";
import { DepheadFieldContext } from "./DepheadFieldProvider";
import ModalLayout from "../../../component/molecule/modal-layout";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyButton from "../../../component/atomic/my-button";

export const UpdateFieldModal = () => {
  const {
    showUpdateFieldModal,
    setShowUpdateFieldModal,
    updateField,
    selectedField,
  } = useContext(DepheadFieldContext);
  const [loading, setLoading] = useState(false);
  const [fieldName, setFieldName] = useState("");

  const hanldeUpdate = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await updateField(fieldName);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setFieldName(selectedField?.fieldName);
  }, [selectedField]);

  return (
    <ModalLayout
      title={"Cập nhật lĩnh vực"}
      visible={showUpdateFieldModal}
      onClose={() => setShowUpdateFieldModal(false)}
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
          buttonText={"Cập nhật"}
          onPress={hanldeUpdate}
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
