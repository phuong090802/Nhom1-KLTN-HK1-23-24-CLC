import React, { useContext, useEffect, useState } from "react";
import ModalLayout from "../../../component/molecule/modal-layout";
import { AdminUserContext } from "./AdminUserProvider";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, fonts } from "../../../../constance";
import blank_avatar from "../../../../assets/images/blank_avatar.jpg";
import { MaterialIcons } from "@expo/vector-icons";

const user = {
  avatar: null, // Đường dẫn đến ảnh avatar của người dùng, null nếu không có
  email: "vinhlv@hcmute.edu.vn",
  fullName: "TS. Lê Văn Vinh",
  isEnabled: true,
  occupation: "Khác",
  phoneNumber: "0915755166",
  role: "COUNSELLOR",
};

const UserProfile = ({ user }) => (
  <View style={styles.profileContainer}>
    <View style={styles.avatarWrapper}>
      {user.avatar ? (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      ) : (
        <MaterialIcons name="account-circle" size={120} color="#ccc" />
      )}
    </View>
    <Text style={styles.userName}>{user.fullName}</Text>
    <View style={styles.infoContainer}>
      <View style={styles.infoRow}>
        <MaterialIcons name="email" size={24} color="black" />
        <Text style={styles.infoText}>{user.email}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="phone" size={24} color="black" />
        <Text style={styles.infoText}>{user.phoneNumber}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="work" size={24} color="black" />
        <Text style={styles.infoText}>{user.occupation}</Text>
      </View>
      <View style={styles.infoRow}>
        <MaterialIcons name="verified-user" size={24} color="black" />
        <Text style={styles.infoText}>{user.role}</Text>
      </View>
    </View>
  </View>
);

export const DetailUserModal = () => {
  const { showDetailUserModal, setShowDetailUserModal, selectUser } =
    useContext(AdminUserContext);

  // useEffect(() => {
  //   console.log(selectUser);
  // }, [selectUser]);
  return (
    <ModalLayout
      visible={showDetailUserModal}
      onClose={() => setShowDetailUserModal(false)}
      title={"Thông tin người dùng"}
    >
      <View style={styles.container}>
        <UserProfile user={selectUser} />
      </View>
      {/* <View style={styles.container}>
        <View
          style={{
            width: "100%",
            alignItems: "center",
          }}
        >
          <View
            style={{
              borderWidth: 2,
              borderRadius: 16,
              borderColor: colors.primary,
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <Image
              source={
                selectUser?.avatar === null
                  ? blank_avatar
                  : { uri: selectUser.avatar }
              }
              style={{ width: 66, height: 66 }}
            />
          </View>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Họ & Tên:
          </Text>
          <Text style={styles.text}>
            {selectUser?.fullName || "Tên người dùng"}
          </Text>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Email:
          </Text>
          <Text style={styles.text}>
            {selectUser?.email || "Email người dùng"}
          </Text>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Số điện thoại:
          </Text>
          <Text style={styles.text}>
            {selectUser?.phoneNumber || "Số điện thoại"}
          </Text>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Nghề nghiệp:
          </Text>
          <Text style={styles.text}>
            {selectUser?.occupation || "Nghề nghiệp"}
          </Text>
        </View>
        <View style={styles.infor}>
          <Text style={[styles.text, { fontFamily: fonts.BahnschriftBold }]}>
            Chức vụ:
          </Text>
          <Text style={styles.text}>{selectUser?.role || "Chức vụ"}</Text>
        </View>
      </View> */}
    </ModalLayout>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 8,
//     gap: 8,
//     borderWidth: 0.5,
//     padding: 16,
//     borderRadius: 16,
//   },
//   infor: { flexDirection: "row", gap: 8 },
//   text: { fontFamily: fonts.BahnschriftRegular, fontSize: 18 },
// });

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 8,
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: colors.black25
  },
  profileContainer: {
    width: "100%",
    // backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 5
  },
  avatarWrapper: {
    marginBottom: 20,
    borderRadius: 60,
    overflow: "hidden",
    width: 120,
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#ddd",
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  infoContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  infoText: {
    fontSize: 18,
    color: "#555",
    marginLeft: 10,
  },
});
