import { useContext, useMemo } from "react";
import ModalLayout from "../../../template/modal-layout";
import { AdminDepartmentContext } from "./AdminDepartmentStore";
import { formUpdateDep } from "./constance";
import MyForm from "../../../molecule/my-form";
import { updateDepSv } from "../../../service/admin/adminDepartment.sv";
import { toast } from "sonner";

export const UpdateDepartmentModal = ({ title }) => {
  const { hiddenUpdateDep, setHiddenUpdateDep, chosenDep, getDepartment } =
    useContext(AdminDepartmentContext);

  const updateDepartment = async (data) => {
    try {
      const response = await updateDepSv(chosenDep._id, data);
      toast.success(response.message || "Cập nhật khoa thành công");
      setHiddenUpdateDep(true);
      getDepartment();
    } catch (error) {
      toast.success(error.message || "Xảy ra lỗi khi cập nhật khoa");
    }
  };

  // const MyFormComponent = useMemo(() => {
  //   return (
  //     <MyForm
  //       formInitData={formUpdateDep}
  //       submitTitle={"Cập nhật"}
  //       onSubmit={updateDepartment}
  //       defaultData={chosenDep}
  //     />
  //   );
  // }, [chosenDep]);

  return (
    <ModalLayout
      hidden={hiddenUpdateDep}
      title={title}
      onClose={() => setHiddenUpdateDep(true)}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm
          formInitData={formUpdateDep}
          submitTitle={"Cập nhật"}
          onSubmit={updateDepartment}
          defaultData={chosenDep}
        />
      </div>
    </ModalLayout>
  );
};
