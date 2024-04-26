import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { links } from "../../../constance";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-primary/25 w-full z-0 h-screen fixed flex justify-center items-center">
      <div className="-mt-[14px] bg-white w-96 rounded-2xl flex flex-col justify-center items-center text-black75 shadow-md pb-4">
        <div className="pt-8 pb-4 text-3xl font-bold font-title text-[#2E3192] self-start ml-8">
          Đăng nhập
          <p className="text-xs font-medium text-black50 w-3/4">
            Chào mừng trở lại! Vui lòng đăng nhập để sử dụng các chức năng tính
            năng của trang tư vấn
          </p>
        </div>
        <LoginForm />
        <div className="flex justify-between w-full px-8 text-sm text-primary font-semibold">
          <p
            className="hover:text-primary/75 cursor-pointer"
            onClick={() => navigate(links.public.register)}
          >
            Đăng ký
          </p>
          <p className="hover:text-primary/75 cursor-pointer">Quên mật khẩu</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
