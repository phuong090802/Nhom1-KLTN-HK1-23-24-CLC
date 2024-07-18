import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import IconInput from "../../../molecule/icon-input";

import { colors } from "../../../../constant";
import MyButton from "../../../atom/my-button";
import { loginSv } from "../../../services/guest/author.sv";
import { DataContext } from "../../../store/Store";
import { formStyle, initLoginData } from "./const";

const LoginForm = ({ navigation }) => {
  const { setUser } = useContext(DataContext);
  const [loginData, setLoginData] = useState(initLoginData);

  const handleInputChange = (name, value) => {
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    try {
      console.log("loginData", loginData);
      const response = await loginSv(loginData);
      if (response.user.role === "USER") {
        await AsyncStorage.setItem("accessToken", response.token);
        setUser({ ...response.user, isLoggedIn: true });
        navigation.navigate("AppHome");
      } else {
        Alert.alert(
          "Bạn là nhân viên hệ thống. Vui lòng sử dụng ứng dụng dành cho nhân viên!!"
        );
      }
    } catch (error) {
      Alert.alert(error.message || "Đăng nhập không thành công");
    }
  };

  return (
    <View style={formStyle.container}>
      <IconInput
        iconPackage={"Feather"}
        icon={"phone"}
        placeholder={"Số điện thoại"}
        name={"username"}
        onChange={handleInputChange}
        value={loginData.username}
      />
      <IconInput
        iconPackage={"Feather"}
        icon={"lock"}
        placeholder={"Mật khẩu"}
        name={"password"}
        onChange={handleInputChange}
        value={loginData.password}
        secureTextEntry={true}
      />
      <MyButton title={"Đăng nhập"} onPress={login} color={colors.primary} />
      <View style={formStyle.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={formStyle.footerLink}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={formStyle.footerLink}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
