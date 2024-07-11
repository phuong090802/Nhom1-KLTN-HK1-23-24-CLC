import React from "react";
import { AdminNewsProvider } from "./AdminNewsProvider";
import { AdminNewsContent } from "./AdminNewsContent";

const AdminNews = () => {
  return (
    <AdminNewsProvider>
      <AdminNewsContent />
    </AdminNewsProvider>
  );
};

export default AdminNews;
