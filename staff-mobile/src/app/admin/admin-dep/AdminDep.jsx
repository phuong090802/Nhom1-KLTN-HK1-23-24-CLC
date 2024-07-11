import React from "react";
import { AdminDepProvider } from "./AdminDepProvider";
import { AdminDepContent } from "./AdminDepContent";

const AdminDep = () => {
  return (
    <AdminDepProvider>
      <AdminDepContent />
    </AdminDepProvider>
  );
};

export default AdminDep;
