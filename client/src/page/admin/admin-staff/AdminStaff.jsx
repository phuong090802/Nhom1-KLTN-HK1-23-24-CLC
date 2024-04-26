import { AdminStaffContent } from "./AdminStaffContent";
import { AdminStaffStore } from "./AdminStaffStore";

const AdminStaff = () => {
  return (
    <AdminStaffStore>
      <AdminStaffContent />
    </AdminStaffStore>
  );
};
export default AdminStaff;
