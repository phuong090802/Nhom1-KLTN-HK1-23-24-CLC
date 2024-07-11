import { ruleList as rule } from "../../../molecule/my-form";

const formInitData = {
  id: "forgot-password-form",
  inputs: [
    {
      label: "Nhập email của bạn",
      name: "email",
      type: "email",
      rules: [rule.isRequired(), rule.isEmail()],
    },
  ],
};
const OTPformInitData = {
  id: "otp-confirm-form",
  inputs: [
    {
      label: "Nhập OTP",
      name: "otp",
      type: "number",
      rules: [rule.isRequired()],
    },
  ],
};
const ResetPassFormInitData = {
  id: "reset-password-form",
  inputs: [
    {
      label: "Nhập mật khẩu",
      name: "password",
      type: "password",
      rules: [rule.isRequired(), rule.minLength(6)],
    },
    {
      label: "Xác nhận mật khẩu",
      name: "confirmPassword",
      type: "password",
      rules: [rule.isRequired(), rule.isConfirm("password")],
    },
  ],
};

export { formInitData, OTPformInitData, ResetPassFormInitData };
