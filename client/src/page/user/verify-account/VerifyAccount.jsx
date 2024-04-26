import React from "react";
import { VerifyAccountStore } from "./VerifyAccountStore";
import { VerifyAccountContent } from "./VerifyAccountContent";

const VerifyAccount = () => {
  return (
    <VerifyAccountStore>
      <VerifyAccountContent />
    </VerifyAccountStore>
  );
};

export default VerifyAccount;
