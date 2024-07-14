import { useNavigate } from 'react-router-dom';
import { links } from '../../../constance';
import { RegisterForm } from './RegisterForm';

export const RegisterContent = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary/25 w-full z-0 h-screen fixed flex justify-center items-center">
      <div className="-mt-[14px] bg-white w-96 rounded-2xl flex flex-col justify-center items-center text-black75 shadow-md pb-4">
        <div className="pt-8 pb-4 text-3xl font-bold font-title text-[#2E3192] self-start ml-8">
          Đăng ký
          <p className="text-xs font-medium text-black50 w-3/4">
            Tạo một tài khoản để sử dụng các chức năng của trang tư vấn
          </p>
        </div>
        <RegisterForm />
        <div className="flex justify-between w-full px-8 text-sm text-primary font-semibold">
          <p
            className="hover:text-primary/75 cursor-pointer"
            onClick={() => navigate(links.public.login)}
          >
            Đăng nhập
          </p>
          <p
            className="hover:text-primary/75 cursor-pointer"
            onClick={() => navigate(links.public.forgotPassword)}
          >
            Quên mật khẩu
          </p>
        </div>
      </div>
    </div>
  );
};
