import { Text, TouchableOpacity, View } from 'react-native';
import { formStyle } from './const';
import IconInput from '../../../molecule/icon-input';
import MyButton from '../../../atom/my-button';
import { useState } from 'react';

const ForgotPasswordForm = ({ navigation }) => {
  const [step, setStep] = useState(1);

  return (
    <View style={formStyle.container}>
      <IconInput icon={'email'} placeholder={'Email'} />
      {step === 2 && <IconInput icon={'lock-outline'} placeholder={'OTP'} />}
      <MyButton
        title={'Tiếp tục'}
        onPress={() => {
          setStep(2);
        }}
      />
      <View style={formStyle.footer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={formStyle.footerLink}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={formStyle.footerLink}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ForgotPasswordForm;
