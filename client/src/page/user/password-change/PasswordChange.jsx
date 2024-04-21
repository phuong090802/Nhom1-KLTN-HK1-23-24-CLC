import React from "react";
import { PasswordChangeStore } from "./PasswordChangeStore";
import { PasswordChangeContent } from "./PasswordChangeContent";

const PasswordChange = () => {
  return (
    <PasswordChangeStore>
      <PasswordChangeContent />
    </PasswordChangeStore>
  );
};

export default PasswordChange;
