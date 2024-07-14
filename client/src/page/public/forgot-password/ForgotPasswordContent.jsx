import { useContext } from 'react';
import { ForgotPasswordForm } from './ForgotPasswordForm';
import { ForgotPasswordContext } from './ForgotPasswordStore';
import { OTPConfirmForm } from './OTPConfirmForm';
import { ResetPasswordForm } from './ResetPasswordForm';

export const ForgotPasswordContent = () => {
  const { step } = useContext(ForgotPasswordContext);

  return (
    <div className="bg-primary/25 w-full z-0 h-screen fixed flex justify-center items-center">
      <div className="-mt-[14px] bg-white w-96 rounded-2xl flex flex-col justify-center items-center text-black75 shadow-md pb-4">
        <div className="pt-8 pb-4 text-3xl font-bold font-title text-[#2E3192] self-start ml-8">
          Quên mật khẩu
          <p className="text-xs font-medium text-black50 w-3/4">
            Lấy lại mật khẩu của bạn
          </p>
        </div>
        {step === 1 ? (
          <ForgotPasswordForm />
        ) : step === 2 ? (
          <OTPConfirmForm />
        ) : (
          step === 3 && <ResetPasswordForm />
        )}
      </div>
    </div>
  );
};
