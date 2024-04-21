import { toast } from "sonner";
import MyForm from "../../../molecule/my-form";
import { addDepSv } from "../../../service/admin/adminDepartment.sv";
import ModalLayout from "../../../template/modal-layout";
import { formAddDep, formUpdateDep } from "./constance";
import { useContext } from "react";
import { AdminDepartmentContext } from "./AdminDepartmentStore";

export const AddDeparmentModal = ({ title }) => {
  const { hiddenAddDep, setHiddenAddDep, getDepartment } = useContext(
    AdminDepartmentContext
  );
  const addDeparment = async (data) => {
    try {
      const response = await addDepSv(data);
      toast.success(response.message || "Thêm khoa thành công");
      getDepartment();
    } catch (error) {
      toast.success(error.message || "Xảy ra lỗi trong quá trình thêm khoa");
    }
  };

  return (
    <ModalLayout
      hidden={hiddenAddDep}
      title={title}
      onClose={() => setHiddenAddDep(true)}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm
          formInitData={formAddDep}
          submitTitle={"Thêm"}
          onSubmit={addDeparment}
        />
      </div>
    </ModalLayout>
  );
};
