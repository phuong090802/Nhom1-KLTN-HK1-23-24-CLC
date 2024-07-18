import React, { useEffect, useState } from "react";
import MyInput from "../../../atom/my-input";
import MyButton from "../../../atom/my-button";
import { passwordChangeSv } from "../../../service/user/userProfile.sv";
import { validate } from "../../../constance";
import clsx from "clsx";
import { toast } from "sonner";

export const PasswordChangeContent = () => {
  const [passwordChangeData, setPasswordChangeData] = useState({
    password: "",
    confirmPassword: "",
    currentPassword: "",
  });

  const [error, setError] = useState({ password: "", confirmPassword: "" });

  const [updating, setUpdating] = useState(false);

  const inputChange = (e) => {
    setPasswordChangeData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const passwordChange = async () => {
    if (!validatePassword() || !validateConfirmPassword()) return;

    try {
      const response = await passwordChangeSv(passwordChangeData);
      setUpdating(false);
      toast.success(response.message || "Đổi mật khẩu thành công");
    } catch (error) {
      console.log("passwordChange", error);
      toast.error(error?.message || "Đổi mật khẩu thất bại");
    }
  };

  const validatePassword = () => {
    const errorMessage =
      validate.required(passwordChangeData.password, "Mật khẩu") ||
      validate.minLength(passwordChangeData.password, 6, "Mật khẩu");
    setError((prev) => ({ ...prev, password: errorMessage }));
    return !!errorMessage ? false : true;
  };
  const validateConfirmPassword = () => {
    const errorMessage =
      validate.required(
        passwordChangeData.confirmPassword,
        "Xác nhận mật khẩu"
      ) ||
      validate.confirm(
        passwordChangeData.confirmPassword,
        passwordChangeData.password,
        "mật khẩu"
      );
    setError((prev) => ({ ...prev, confirmPassword: errorMessage }));
    return !!errorMessage ? false : true;
  };

  useEffect(() => {
    if (!updating) {
      setError({ password: "", confirmPassword: "" });
      setPasswordChangeData({
        password: "",
        confirmPassword: "",
        currentPassword: ""
      });
    }
  }, [updating]);

  return (
    <div className="mt-2 mb-4">
      <div className="bg-white px-4 shadow-black50 shadow-lg py-4 rounded-2xl border">
        <p className="font-bold text-2xl mb-2 px-4 text-black75">
          Đổi mật khẩu
        </p>
        <div className="mt-4 px-4">
          <p className="font-bold text-primary text-xl mb-2">
            Mật khẩu hiện tại
          </p>
          <MyInput
            inputHeight={48}
            value={passwordChangeData.currentPassword}
            name="currentPassword"
            onChange={inputChange}
            type="password"
            // onBlur={validatePassword}
            disabled={!updating}
          />
        </div>
        <div className="mt-4 px-4">
          <p className="font-bold text-primary text-xl mb-2">Mật khẩu mới</p>
          <div className="relative">
            <MyInput
              inputHeight={48}
              value={passwordChangeData.password}
              name="password"
              onChange={inputChange}
              type="password"
              onBlur={validatePassword}
              disabled={!updating}
            />
            {error.password && (
              <p className="absolute text-xs text-error">{error.password}</p>
            )}
          </div>
        </div>
        <div className="mt-6 px-4">
          <p className="font-bold text-primary text-xl mb-2">
            Xác nhận mật khẩu
          </p>
          <div>
            <MyInput
              inputHeight={48}
              value={passwordChangeData.confirmPassword}
              name="confirmPassword"
              onChange={inputChange}
              type="password"
              onBlur={validateConfirmPassword}
              disabled={!updating}
            />
            {error.confirmPassword && (
              <p className="absolute text-xs text-error">
                {error.confirmPassword}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 mb-4 flex flex-row-reverse px-4 gap-2">
          <MyButton
            className={clsx(
              updating
                ? "bg-error hover:bg-error/75"
                : "bg-primary hover:bg-primary/75"
            )}
            size={"lg"}
            onClick={() => setUpdating(!updating)}
          >
            {updating ? "Hủy" : "Chỉnh sửa"}
          </MyButton>
          <MyButton
            className={clsx("bg-success hover:bg-success/75")}
            size={"lg"}
            onClick={passwordChange}
            hidden={!updating}
          >
            Cập nhật
          </MyButton>
        </div>
      </div>
    </div>
  );
};
