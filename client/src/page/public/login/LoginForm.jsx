import Cookies from "js-cookie";
import MyForm from "../../../molecule/my-form";
import { loginSv } from "../../../service/public/auth.sv";
import { formInitData } from "./constance";
import { useContext } from "react";
import { DataContext } from "../../../store";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { links } from "../../../constance";

const LoginForm = () => {
  const navigate = useNavigate();

  const { setUser, setIsLoggedIn } = useContext(DataContext);

  const forwardLoggedInUser = (role) => {
    switch (role) {
      case "USER":
        navigate(links.public.home);
        break;
      case "COUNSELLOR":
        navigate(links.counsellor.questions);
        break;
      case "DEPARTMENT_HEAD":
        navigate(links.dephead.home);
        break;
      case "SUPERVISOR":
        navigate(links.supervisor.home);
        break;
      case "ADMIN":
        navigate(links.admin.home);
        break;
      default:
        navigate(links.public.home);
        break;
    }
  };

  const loginSubmit = async (data) => {
    try {
      const response = await loginSv(data);
      Cookies.set("accessToken", response.token);
      console.log("loginData", response);
      setUser(response.user);
      setIsLoggedIn(true);
      toast.success("Đăng nhập thành công");
      setTimeout(() => {
        forwardLoggedInUser(response.user.role || "GUEST");
      }, 1000);
    } catch (error) {
      toast.error(error.message || "Đăng nhập không thành công");
    }
  };

  return (
    <div className="px-8 pb-8 w-96">
      <MyForm formInitData={formInitData} onSubmit={loginSubmit} submitTitle={"Đăng nhập"}/>
    </div>
  );
};
export default LoginForm;
