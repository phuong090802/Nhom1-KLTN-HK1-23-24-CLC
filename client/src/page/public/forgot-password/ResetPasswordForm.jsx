import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { links } from '../../../constance';
import MyForm from '../../../molecule/my-form';
import { resetPasswordSv } from '../../../service/public/auth.sv';
import { ResetPassFormInitData } from './constance';
import { ForgotPasswordContext } from './ForgotPasswordStore';

export const ResetPasswordForm = () => {
  const { setStep, setResetPasswordToken, resetPasswordToken, setEmail } =
    useContext(ForgotPasswordContext);

  const navigate = useNavigate();

  const resetPassword = async (data) => {
    try {
      const response = await resetPasswordSv(resetPasswordToken, data);
      setResetPasswordToken('');
      setEmail('');
      setStep(1);
      toast.success(response?.message || 'Đặt lại mật khẩu thành công');
      navigate(links.public.login);
    } catch (error) {
      toast.error(error?.message || 'Lỗi xảy ra khi đặt lại mật khẩu');
    }
  };

  return (
    <div className="px-8 pb-8 w-96">
      <MyForm
        formInitData={ResetPassFormInitData}
        submitTitle={'Đặt lại mật khẩu'}
        onSubmit={resetPassword}
      />
    </div>
  );
};
