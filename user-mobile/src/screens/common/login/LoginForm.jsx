import { useContext, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IconInput from '../../../molecule/icon-input';

import { formStyle, initLoginData } from './const';
import MyButton from '../../../atom/my-button';
import { loginSv } from '../../../services/guest/author.sv';
import { DataContext } from '../../../store/Store';
import { colors } from '../../../../constant';

const LoginForm = ({ navigation }) => {
  const { setUser } = useContext(DataContext);
  const [loginData, setLoginData] = useState(initLoginData);

  const handleInputChange = (name, value) => {
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const login = async () => {
    try {
      console.log(loginData);
      const response = await loginSv(loginData);
      await AsyncStorage.setItem('accessToken', response.token);
      setUser({ ...response.user, isLoggedIn: true });
      navigation.navigate('AppHome');
    } catch (error) {
      Alert.alert(error.message || 'Đăng nhập không thành công');
    }
  };

  return (
    <View style={formStyle.container}>
      <IconInput
        iconPackage={'Feather'}
        icon={'phone'}
        placeholder={'Số điện thoại'}
        name={'username'}
        onChange={handleInputChange}
        value={loginData.username}
      />
      <IconInput
        iconPackage={'Feather'}
        icon={'lock'}
        placeholder={'Mật khẩu'}
        name={'password'}
        onChange={handleInputChange}
        value={loginData.password}
        secureTextEntry={true}
      />
      <MyButton title={'Đăng nhập'} onPress={login} color={colors.primary} />
      <View style={formStyle.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={formStyle.footerLink}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={formStyle.footerLink}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginForm;
