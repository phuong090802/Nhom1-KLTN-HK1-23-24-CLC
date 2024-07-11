import React, { useContext } from "react";
import MyForm from "../../../molecule/my-form";
import { formInitData } from "./constance";
import { forgotPasswordSv } from "../../../service/public/auth.sv";
import { toast } from "sonner";
import { ForgotPasswordContext } from "./ForgotPasswordStore";

export const ForgotPasswordForm = () => {
  const { setStep } = useContext(ForgotPasswordContext);

  const forgotPassword = async (data) => {
    try {
      const response = await forgotPasswordSv(data);
      // toast.success(response?.message || "Đã gửi tin nhắn OTP đến email của bạn")
      setStep(2);
    } catch (error) {
      toast.error(error?.message || "Lỗi xảy ra khi lấy lại mật khẩu");
    }
  };

  return (
    <div className="px-8 pb-8 w-96">
      <MyForm
        formInitData={formInitData}
        submitTitle={"Lấy lại mật khẩu"}
        onSubmit={forgotPassword}
      />
    </div>
  );
};
