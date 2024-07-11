import { useContext, useState } from "react";
import ModalLayout from "../../../component/molecule/modal-layout";
import { AdminUserContext } from "./AdminUserProvider";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import MySelect from "../../../component/atomic/my-select/MySelect";
import MyButton from "../../../component/atomic/my-button";
import MyInput from "../../../component/atomic/my-input";

export const AddUserModal = () => {
  const { setShowAddUserModal, showAddUserModal, AddUser } =
    useContext(AdminUserContext);
  const initUserData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  };

  const [userData, setUserData] = useState(initUserData);

  const [loading, setLoading] = useState(false);

  const handleOnChange = (value, name) => {
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddUser = async () => {
    if (loading) return;
    setLoading(false);
    try {
      const confirmPassword = userData.password;
      await AddUser({ ...userData, confirmPassword });
      setUserData(initUserData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalLayout
      visible={showAddUserModal}
      onClose={() => {
        setShowAddUserModal(false);
      }}
      title={"Thêm nhân sự"}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Họ & Tên</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={userData.fullName}
          onChangeText={(value) => handleOnChange(value, "fullName")}
        />
        <Text style={styles.label}>Chức vụ</Text>
        <MySelect
          data={[
            { key: "Tư vấn viên", value: "COUNSELLOR" },
            { key: "Giám sát viên", value: "SUPERVISOR" },
          ]}
          onSelect={(selectedItem) =>
            handleOnChange(selectedItem.value, "role")
          }
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={userData.email}
          onChangeText={(value) => handleOnChange(value, "email")}
        />
        <Text style={styles.label}>Số điện thoại</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={userData.phoneNumber}
          onChangeText={(value) => handleOnChange(value, "phoneNumber")}
        />
        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          secureTextEntry
          value={userData.password}
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
          onPress={handleAddUser}
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
