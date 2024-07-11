import React, { useContext, useState } from "react";
import ModalLayout from "../../../component/molecule/modal-layout";
import { DepheadCounsellorContext } from "./DepheadCounsellorProvider";
import { StyleSheet, Text, TextInput, ToastAndroid, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MyButton from "../../../component/atomic/my-button";
import { depheadAddCounsellorSv } from "../../../service/dephead/depheadCounsellor.sv";
import { initParams } from "./constance";

export const AddCounsellorModal = () => {
  const { showAddCounsellorModal, setShowAddCounsellorModal, getCounsellors } =
    useContext(DepheadCounsellorContext);

  const initCounsellorData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  };

  const [counsellorData, setCounsellorData] = useState(initCounsellorData);

  const [loading, setLoading] = useState(false);

  const handleOnChange = (value, name) => {
    setCounsellorData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddCounsellor = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await depheadAddCounsellorSv({
        ...counsellorData,
        confirmPassword: counsellorData.password,
      });
      ToastAndroid.show(
        response?.message || "Thêm tư vấn viên thành công",
        ToastAndroid.SHORT
      );
      setCounsellorData(initCounsellorData);
      getCounsellors();
    } catch (error) {
      ToastAndroid.show(
        error?.message || "Lỗi khi thêm tư vấn viên",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ModalLayout
      visible={showAddCounsellorModal}
      onClose={() => setShowAddCounsellorModal(false)}
      title={"Thêm tư vấn viên"}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Họ & Tên</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={counsellorData.fullName}
          onChangeText={(value) => handleOnChange(value, "fullName")}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={counsellorData.email}
          onChangeText={(value) => handleOnChange(value, "email")}
        />
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={counsellorData.phoneNumber}
          onChangeText={(value) => handleOnChange(value, "phoneNumber")}
        />
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          secureTextEntry
          value={counsellorData.password}
          onChangeText={(value) => handleOnChange(value, "password")}
        />

        <MyButton
          activeOpacity={0.5}
          style={[
            {
              marginTop: 8,
              backgroundColor: false ? colors.lightGray : colors.black,
            },
          ]}
          buttonText={"Thêm"}
          onPress={handleAddCounsellor}
        />
      </View>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16 },
  label: { fontFamily: fonts.BahnschriftRegular, fontSize: 16 },
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
    marginBottom: 8,
  },
});
