import { AdminHomeContent } from "./AdminHomeContent";
import { AdminHomeStore } from "./AdminHomeStore";

const AdminHome = () => {
  return (
    <AdminHomeStore>
      <AdminHomeContent />
    </AdminHomeStore>
  );
};
export default AdminHome;
