import React, { useContext, useEffect } from 'react';
import MyForm from '../../../molecule/my-form';
import { OTPformInitData } from './constance';
import { ForgotPasswordContext } from './ForgotPasswordStore';
import { OTPConfirmSv } from '../../../service/public/auth.sv';
import useTimer from '../../../hooks/useTimer';

export const OTPConfirmForm = () => {
  const { setStep, setResetPasswordToken, email } = useContext(
    ForgotPasswordContext
  );

  const { isActive, pauseTimer, startTimer, resetTimer, seconds } =
    useTimer(60);

  const OTPConfirm = async (data) => {
    try {
      const response = await OTPConfirmSv(data);
      setResetPasswordToken(response?.resetPasswordToken);
      setStep(3);
    } catch (error) {
      toast.error(error?.message || 'Lỗi xảy ra khi xác thực OTP');
    }
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <div className="px-8 pb-8 w-96">
      <MyForm formInitData={OTPformInitData} onSubmit={OTPConfirm} />
      <div className="flex flex-col items-center mt-2">
        <p className="text-sm">OTP đã được gửi tới {email}</p>
        <p className="text-xs">Thời gian còn lại {seconds}</p>
      </div>
    </div>
  );
};
