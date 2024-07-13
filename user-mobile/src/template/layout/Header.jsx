import { Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect } from "react";

import user_avatar from "../../../assets/images/user_avatar.jpg";
import { headerStyles } from "./const";
import Octicon from "../../atom/octicon";
import MyButton from "../../atom/my-button";
import { colors } from "../../../constant";
import { DataContext } from "../../store/Store";
import { getMeSv } from "../../services/guest/author.sv";

const Header = () => {
  const { user, setUser, clearUserData } = useContext(DataContext);
  const navigation = useNavigation();

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
      onPress={() => navigation.navigate("UserMenu")}
    >
      <View style={headerStyles.userInforContainer}>
        <View style={headerStyles.avatarContainer}>
          <Image
            source={user.avatar || user_avatar}
            style={headerStyles.avatar}
          />
        </View>
        <Text style={headerStyles.text}>
          {user.fullName ? user.fullName : "Xin chào bạn!!!"}
        </Text>
      </View>
      <View style={headerStyles.function}>
        {user.isLoggedIn ? (
          <View style={{flexDirection: "row", gap: 16}}>
            <TouchableOpacity>
              <Octicon name={"comment-discussion"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Noti")}>
              <Octicon name={"bell"} />
              <View
                style={{
                  borderWidth: 5,
                  position: "absolute",
                  borderColor: colors.error,
                  borderRadius: 999,
                  right: 0,
                  top: -3
                }}
              ></View>
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
