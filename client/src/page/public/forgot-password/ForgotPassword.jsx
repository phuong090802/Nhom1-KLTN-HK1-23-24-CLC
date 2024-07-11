import React from "react";
import { ForgotPasswordStore } from "./ForgotPasswordStore";
import { ForgotPasswordContent } from "./ForgotPasswordContent";

const ForgotPassword = () => {
  return (
    <ForgotPasswordStore>
      <ForgotPasswordContent />
    </ForgotPasswordStore>
  );
};

export default ForgotPassword;
