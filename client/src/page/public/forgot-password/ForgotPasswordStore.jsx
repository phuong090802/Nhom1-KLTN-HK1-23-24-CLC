import { createContext, useState } from "react";

export const ForgotPasswordContext = createContext();

export const ForgotPasswordStore = ({ children }) => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");

  const [resetPasswordToken, setResetPasswordToken] = useState("");

  return (
    <ForgotPasswordContext.Provider
      value={{ step, setStep, email, setEmail, resetPasswordToken, setResetPasswordToken }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};
