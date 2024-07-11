import React from "react";
import { AdminUserContent } from "./AdminUserContent";
import { AdminUserProvider } from "./AdminUserProvider";

const AdminUser = () => {
  return (
    <AdminUserProvider>
      <AdminUserContent />
    </AdminUserProvider>
  );
};

export default AdminUser;
