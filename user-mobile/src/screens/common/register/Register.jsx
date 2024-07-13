import { useState } from 'react';
import RegisterForm from './RegisterForm';
import AuthLayout from '../../../template/auth-layout/AuthLayout';

const Register = ({ navigation }) => {
  const [step, setStep] = useState(1);

  const onBack = () => {
    if (step !== 1) {
      setStep(step - 1);
    } else {
      navigation.navigate('AppHome');
    }
  };
  return (
    <AuthLayout title={'Đăng ký'} onBack={onBack}>
      <RegisterForm step={step} setStep={setStep} navigation={navigation} />
    </AuthLayout>
  );
};

export default Register;
