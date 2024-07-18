import React, { useState } from "react";
import { AdminFieldStore } from "./AdminFieldStore";
import { AdminFieldContent } from "./AdminFieldContent";

const AdminField = () => {

  return (
    <AdminFieldStore>
      <AdminFieldContent />
    </AdminFieldStore>
  );
};

export default AdminField;
