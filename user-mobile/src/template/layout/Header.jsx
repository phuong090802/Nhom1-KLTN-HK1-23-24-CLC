import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import user_avatar from "../../../assets/images/user_avatar.jpg";
import { colors } from "../../../constant";
import MyButton from "../../atom/my-button";
import Octicon from "../../atom/octicon";
import { getMeSv } from "../../services/guest/author.sv";
import { DataContext } from "../../store/Store";
import { headerStyles } from "./const";
import { useAuthorSocketHook } from "../../hooks/useAuthorSocketHook";

const Header = () => {
  const { user, setUser, clearUserData, newNoti, setNewNoti } =
    useContext(DataContext);

  const navigation = useNavigation();

  const { authorSocket, connected } = useAuthorSocketHook();

  useEffect(() => {
    if (!authorSocket) return;
    if (connected && user.isLoggedIn) {
      authorSocket.on(`${user._id}:notification:read`, (data) => {
        console.log(`${user._id}:notification:read`, data);
        setNewNoti(true);
      });
    }
  }, [connected, user]);

  const getMe = async () => {
    try {
      const response = await getMeSv();
      setUser({ ...response.user, isLoggedIn: true });
    } catch (error) {
      await AsyncStorage.clear();
      clearUserData();
    }
  };

  const logOut = async () => {
    await AsyncStorage.clear();
    clearUserData();
  };

  useEffect(() => {
    getMe();
  }, []);

  return (
    <TouchableOpacity
      style={headerStyles.container}
      onPress={() => {
        if (user.isLoggedIn) {
          navigation.navigate("UserMenu");
        } else {
          navigation.navigate("Login");
        }
      }}
    >
      <View style={headerStyles.userInforContainer}>
        <View style={headerStyles.avatarContainer}>
          <Image
            source={user?.avatar ? { uri: user.avatar } : user_avatar}
            style={headerStyles.avatar}
          />
        </View>
        <Text style={headerStyles.text}>
          {user.fullName ? user.fullName : "Xin chào bạn!!!"}
        </Text>
      </View>
      <View style={headerStyles.function}>
        {user.isLoggedIn ? (
          <View style={{ flexDirection: "row", gap: 16 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Message");
                // setNewNoti(false);
              }}
            >
              <Octicon name={"comment-discussion"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Noti");
                setNewNoti(false);
              }}
            >
              <Octicon name={"bell"} />
              {newNoti && (
                <View
                  style={{
                    borderWidth: 5,
                    position: "absolute",
                    borderColor: colors.error,
                    borderRadius: 999,
                    right: 0,
                    top: -3,
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={logOut}>
              <Octicon name={"sign-out"} />
            </TouchableOpacity>
          </View>
        ) : (
          <MyButton
            title={"Đăng nhập"}
            color={colors.secondary}
            onPress={() => navigation.navigate("Login")}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Header;
