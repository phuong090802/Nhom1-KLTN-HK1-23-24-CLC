import { ruleList as rule } from "../../../molecule/my-form";

const formInitData = {
  id: "login-form",
  inputs: [
    {
      label: "Họ & Tên",
      name: "fullName",
      type: "text",
      rules: [rule.isRequired()],
    },
    {
      label: "Nhập số điện thoại",
      name: "phoneNumber",
      type: "tel",
      rules: [rule.isRequired(), rule.isMobilePhone()],
    },

    {
      label: "Email",
      name: "email",
      type: "email",
      rules: [rule.isRequired(), rule.isEmail],
    },
    {
      label: "Mật khẩu",
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

export { formInitData };
