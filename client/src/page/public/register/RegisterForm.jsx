import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { links } from '../../../constance';
import MyForm from '../../../molecule/my-form';
import { registerSv } from '../../../service/public/auth.sv';
import { formInitData } from './constance';

export const RegisterForm = () => {
  // const loginFormRef = useRef();

  const navigate = useNavigate();

  const register = async (data) => {
    try {
      const submitData = { ...data, occupation: 'Sinh viên' };
      console.log('submitData', submitData);
      const response = await registerSv(submitData);
      // console.log(response);
      toast.success(response?.message || 'Đăng ký thành công');
      navigate(links.public.login);
    } catch (error) {
      toast.error(error?.message || 'Lõi xảy ra khi tạo tài khoản');
    }
  };

  return (
    <div className="px-8 pb-8 w-96">
      <MyForm
        formInitData={formInitData}
        onSubmit={register}
        submitTitle={'Đăng ký'}
      />
    </div>
  );
};
