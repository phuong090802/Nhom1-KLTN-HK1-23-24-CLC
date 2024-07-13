import AuthLayout from '../../../template/auth-layout/AuthLayout';
import ForgotPasswordForm from './ForgotPasswordForm';

const ForgotPassword = ({ navigation }) => {
  return (
    <AuthLayout title={'Quên mật khẩu'}>
      <ForgotPasswordForm navigation={navigation} />
    </AuthLayout>
  );
};

export default ForgotPassword;
