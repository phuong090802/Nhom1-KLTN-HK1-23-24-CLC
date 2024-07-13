import AuthLayout from '../../../template/auth-layout/AuthLayout';
import LoginForm from './LoginForm';

const Login = ({ navigation }) => {
  return (
    <AuthLayout
      title={'Đăng nhập'}
      onBack={() => navigation.navigate('AppHome')}
    >
      <LoginForm navigation={navigation} />
    </AuthLayout>
  );
};

export default Login;
