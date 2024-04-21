import { AdminDepartmentContent } from "./AdminDepartmentContent";
import AdminDepartmentStore from "./AdminDepartmentStore";

const AdminDepartment = () => {
  return (
    <AdminDepartmentStore>
      <AdminDepartmentContent />
    </AdminDepartmentStore>
  );
};

export default AdminDepartment;
