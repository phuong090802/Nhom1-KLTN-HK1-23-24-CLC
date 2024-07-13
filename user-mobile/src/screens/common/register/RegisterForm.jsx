import { useCallback, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import IconInput from '../../../molecule/icon-input';
import MyButton from '../../../atom/my-button';
import MySelect from '../../../molecule/my-select';
import { registerSv } from '../../../services/guest/author.sv';
import { formStyle, initRegisterData, selectData } from './const';
import {
  confirmPasswordValidate,
  emailValidate,
  fullNameValidate,
  passwordValidate,
  phoneNumberValidate,
} from './validate';

const RegisterForm = ({ step, setStep, navigation }) => {
  const handleStepChange = useCallback(
    (value) => {
      if (!setStep) return;
      setStep(value);
    },
    [setStep]
  );

  const [error, setError] = useState({});

  const [registerData, setRegisterData] = useState(initRegisterData);

  const handleInputChange = (name, value) => {
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const register = async () => {
    if (
      passwordValidate(registerData.password, setError) &&
      confirmPasswordValidate(
        registerData.password,
        registerData.confirmPassword,
        setError
      )
    ) {
      try {
        const response = await registerSv(registerData);
        console.log(response);
        Alert.alert(response.message || 'Tạo tài khoản thành công');
        navigation.navigate('Login');
        setRegisterData(initRegisterData);
        setError({});
      } catch (error) {
        console.log(error);
        Alert.alert(error.message || 'Tạo tài khoản không thành công');
      }
    }
  };

  const handleForm1 = () => {
    if (
      phoneNumberValidate(registerData.phoneNumber, setError) &&
      fullNameValidate(registerData.fullName, setError)
    )
      handleStepChange(2);
  };

  const handleForm2 = () => {
    if (emailValidate(registerData.email, setError)) {
      handleStepChange(3);
    }
  };

  return (
    <View style={formStyle.container}>
      {step === 1 && (
        <>
          <IconInput
            iconPackage={'Feather'}
            name={'phoneNumber'}
            icon={'phone'}
            placeholder={'Số điện thoại'}
            onChange={handleInputChange}
            value={registerData.phoneNumber}
            errorMessage={error.phoneNumber}
            onBlur={() =>
              phoneNumberValidate(registerData.phoneNumber, setError)
            }
          />
          <IconInput
            iconPackage={'Octicons'}
            name={'fullName'}
            icon={'id-badge'}
            placeholder={'Họ và tên'}
            onChange={handleInputChange}
            value={registerData.fullName}
            errorMessage={error.fullName}
            onBlur={() => fullNameValidate(registerData.fullName, setError)}
          />
          <MyButton title={'Tiếp tục'} onPress={handleForm1} />
        </>
      )}
      {step === 2 && (
        <>
          <IconInput
            iconPackage={'Feather'}
            name={'email'}
            icon={'mail'}
            placeholder={'Email'}
            onChange={handleInputChange}
            value={registerData.email}
            errorMessage={error.email}
            onBlur={() => emailValidate(registerData.email, setError)}
          />

          <MySelect
            name={'occupation'}
            data={selectData}
            defaultOption={{ key: 'Sinh viên', value: 'Sinh viên' }}
            onChange={handleInputChange}
            iconName={'work-outline'}
            iconPackage={'MaterialIcons'}
            iconSize={24}
          />
          <MyButton title={'Tiếp tục'} onPress={handleForm2} />
        </>
      )}
      {step === 3 && (
        <>
          <IconInput
            name={'password'}
            iconPackage={'Feather'}
            icon={'lock'}
            placeholder={'Mật khẩu'}
            onChange={handleInputChange}
            secureTextEntry={true}
            value={registerData.password}
            errorMessage={error.password}
            onBlur={() => passwordValidate(registerData.password, setError)}
          />
          <IconInput
            name={'confirmPassword'}
            iconPackage={'Feather'}
            icon={'lock'}
            placeholder={'Xác nhận mật khẩu'}
            onChange={handleInputChange}
            secureTextEntry={true}
            value={registerData.confirmPassword}
            errorMessage={error.confirmPassword}
            onBlur={() =>
              confirmPasswordValidate(
                registerData.password,
                registerData.confirmPassword,
                setError
              )
            }
          />
          <MyButton title={'Đăng ký'} onPress={register} />
        </>
      )}

      <View style={formStyle.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={formStyle.footerLink}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={formStyle.footerLink}>Quên mật khẩu</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;
