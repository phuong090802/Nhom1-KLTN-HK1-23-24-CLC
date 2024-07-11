// import { router } from "expo-router";
// import React, { useContext, useState } from "react";
// import { Image, StyleSheet, View } from "react-native";
// import blank_avatar from "../../../../assets/images/blank_avatar.jpg";
// import { paths } from "../../../../constance";
// import MyButton from "../../../component/atomic/my-button";
// import { AppContext } from "../../AppProvider";
// import { UserInforModal } from "./UserInforModal";

// const User = () => {
//   const { deleteUserData, user } = useContext(AppContext);

//   const [showUserInforModal, setShowUserInforModal] = useState(false);

//   return (
//     <View style={styles.container}>
//       <UserInforModal
//         visible={showUserInforModal}
//         onClose={() => {
//           setShowUserInforModal(false);
//         }}
//       />
//       <View style={{ justifyContent: "center", alignItems: "center" }}>
//         <Image
//           source={user.avatar === null ? blank_avatar : { uri: user.avatar }}
//           style={{ width: 100, height: 100, borderRadius: 16 }}
//         />
//       </View>

//       <MyButton
//         buttonText={"Thông tin cá nhân"}
//         onPress={() => {
//           setShowUserInforModal(true);
//         }}
//         style={{ marginTop: 16 }}
//       />
//       <MyButton
//         buttonText={"Chế độ tối"}
//         onPress={() => {}}
//         style={{ marginTop: 16 }}
//       />
//       <MyButton
//         buttonText={"Tin nhắn"}
//         onPress={() => {
//           router.push(paths.counsellor.conversations);
//         }}
//         style={{ marginTop: 16 }}
//       />
//       <MyButton
//         buttonText={"Đăng xuất"}
// onPress={() => {
//   deleteUserData();
//   setTimeout(() => {
//     router.replace(paths.login);
//   }, 1000);
// }}
//         style={{ marginTop: 16, backgroundColor: "#000" }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingHorizontal: 16 },
// });

// export default User;

import React, { useContext, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, fonts, paths } from "../../../../constance";
import MyIcon from "../../../component/atomic/my-icon";
import AppProvider, { AppContext } from "../../AppProvider";
import { UserInforModal } from "./UserInforModal";
import { router } from "expo-router";
import blank_avatar from "../../../../assets/images/blank_avatar.jpg";

const UserProfile = ({ name, avatar, onProfile, onLogout }) => (
  <View style={styles.profileContainer}>
    <View style={styles.avatarWrapper}>
      <Image
        source={avatar ? { uri: avatar } : blank_avatar}
        style={styles.avatar}
      />
    </View>
    <Text style={styles.userName}>{name}</Text>
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={onProfile}
    >
      <MyIcon name={"user"} iconPackage="Feather" size={30} color={"#fff"} />
      <Text style={styles.buttonText}>Xem thông tin cá nhân</Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.button}
      onPress={() => router.push(paths.counsellor.conversations)}
    >
      <MyIcon
        name={"message-circle"}
        iconPackage="Feather"
        size={30}
        color={"#fff"}
      />
      <Text style={styles.buttonText}>Tin nhắn</Text>
    </TouchableOpacity>
    <TouchableOpacity
      activeOpacity={0.6}
      style={[styles.button]}
      onPress={onLogout}
    >
      <MyIcon name={"log-out"} iconPackage="Feather" size={30} color={"#fff"} />
      <Text style={styles.buttonText}>Đăng xuất</Text>
    </TouchableOpacity>
  </View>
);

const User = () => {
  const [showUserInforModal, setShowUserInforModal] = useState(false);

  const { user, deleteUserData } = useContext(AppContext);

  const logout = () => {
    deleteUserData();
    setTimeout(() => {
      router.replace(paths.login);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <UserInforModal
        visible={showUserInforModal}
        onClose={() => {
          setShowUserInforModal(false);
        }}
      />
      <UserProfile
        name={user?.fullName}
        avatar={user?.avatar}
        onProfile={() => setShowUserInforModal(true)}
        onLogout={logout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  profileContainer: {
    width: "100%",
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
    borderRadius: 50,
    overflow: "hidden",
    width: 120,
    height: 120,
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
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 15, // Tăng padding trên dưới
    paddingHorizontal: 20, // Tăng padding trái phải
    borderRadius: 30, // Làm cho các góc nút mềm mại hơn
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "white",
    fontSize: 18, // Tăng kích thước chữ trong nút
    marginLeft: 10,
    fontFamily: fonts.BahnschriftBold,
  },
});

export default User;
