import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { colors, fonts, paths, validate } from "../../../constance";
import MyButton from "../../component/atomic/my-button";
import MyInput from "../../component/atomic/my-input";
import { initLoginData } from "./constance";
import { loginSv } from "../../service/author/author.sv";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../AppProvider";

const Login = () => {
  const { saveUserData, isLoggedIn } = useContext(AppContext);

  useEffect(() => {
    if (isLoggedIn) router.push(paths.dashboard);
  }, [isLoggedIn]);

  const [loginData, setLoginData] = useState(initLoginData);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (value, name) => {
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    // router.push(paths.dashboard);
    // return;
    if (validate.required(loginData.username)) {
      Alert.alert(validate.required(loginData.username, "Số điện thoại"));
      return;
    }
    if (validate.required(loginData.password)) {
      Alert.alert(validate.required(loginData.password, "Mật khẩu"));
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const response = await loginSv(loginData);
      AsyncStorage.setItem("accessToken", response?.token);
      saveUserData(response?.user);
      router.push(paths.dashboard);
    } catch (error) {
      Alert.alert(error?.message || "Đăng nhập không thành công");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text
          style={[
            styles.text,
            {
              marginTop: -16,
            },
          ]}
        >
          Vui lòng đăng nhập để tiếp tục
        </Text>
      </View>
      <View style={styles.loginformcontainer}>
        <View style={styles.loginform}>
          <MyInput
            variants="default"
            placeholder="Số điện thoại"
            onChangeText={handleInputChange}
            name={"username"}
          />
          <MyInput
            variants="default"
            placeholder="Mật khẩu"
            secureTextEntry
            onChangeText={handleInputChange}
            name={"password"}
          />
          <Text style={[{ alignSelf: "flex-end" }, styles.text]}>
            Quên mật khẩu
          </Text>
          <MyButton
            activeOpacity={0.5}
            style={{ backgroundColor: "#000" }}
            buttonText={"Đăng nhập"}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#ADD8E6",
    height: "100%",
  },
  title: {
    fontFamily: fonts.Bungee,
    fontSize: 28,
    color: colors.black,
  },
  text: {
    color: colors.black,
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16,
  },
  loginform: {
    gap: 16,
  },
  loginformcontainer: {
    paddingBottom: 128,
    width: "100%",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: "#F5F5F5",
    paddingTop: 32,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
});

export default Login;
