import clsx from "clsx";
import { UserRound, UserRoundCog } from "lucide-react";
import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import useDepartmentField from "../../../hooks/useDepartmentField";
import MyForm from "../../../molecule/my-form";
import { addStaffSv } from "../../../service/admin/adminUser.sv";
import { formAddStaff } from "./constance";
import { AdminStaffContext } from "./AdminStaffStore";

export const SingleAddForm = () => {
  const [role, setRole] = useState("COUNSELLOR");

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { deps } = useDepartmentField();

  const { getUser } = useContext(AdminStaffContext);

  const addStaff = async (data) => {
    try {
      const submitData = { ...data, role, departmentId: selectedDepartment };
      const response = await addStaffSv(submitData);
      toast.success(response.message || "Thêm nhân viên thành công");
      // setSelectedDepartment(null)
      getUser();
    } catch (error) {
      toast.error(error?.message || "Lỗi xảy ra khi thêm nhân viên");
    }
  };

  const selectRoleButtonComponent = useMemo(() => {
    return (
      <div className="w-full border-2 mb-4 rounded-lg border-primary overflow-hidden">
        <button
          onClick={() => setRole("COUNSELLOR")}
          className={clsx(
            "w-1/2 py-2 duration-300",
            role === "COUNSELLOR" && "bg-primary text-white"
          )}
        >
          <div className="flex justify-center items-start">
            <UserRound />
            <p className="font-bold text-lg">Tư vấn viên</p>
          </div>
        </button>
        <button
          onClick={() => setRole("SUPERVISOR")}
          className={clsx(
            "w-1/2 py-2 duration-300",
            role === "SUPERVISOR" && "bg-primary text-white"
          )}
        >
          <div className="flex justify-center items-start">
            <UserRoundCog />
            <p className="font-bold text-lg">Giám sát viên</p>
          </div>
        </button>
      </div>
    );
  }, [role]);

  const selectDepartmentComponent = useMemo(() => {
    const handleClick = (e) => {
      setSelectedDepartment(e?.target?.value);
    };

    return (
      <div className="relative leading-10 h-10 mb-6">
        <label
          htmlFor="temporaryName"
          className={`absolute text-base mx-4 bg-transparent top-2 cursor-text ${
            selectedDepartment &&
            "-translate-y-[20px] bg-white scale-90 -translate-x-1"
          } duration-500`}
        >
          Chọn khoa
        </label>
        <select
          id="temporaryName"
          className="outline-none w-full text-base border-2 rounded-lg bg-transparent transition-all h-10 px-4"
          // onClick={}
          onChange={handleClick}
        >
          {deps.map((dep) => {
            return (
              <option key={dep.value} value={dep.value}>
                {dep.key === "Chọn khoa" ? "" : dep.key}
              </option>
            );
          })}
        </select>
      </div>
    );
  }, [selectedDepartment, deps]);

  useEffect(() => {
    if (role === "SUPERVISOR") setSelectedDepartment(null);
  }, [role]);

  return (
    <div className="mt-2">
      {selectRoleButtonComponent}
      {role === "COUNSELLOR" && selectDepartmentComponent}
      <MyForm
        formInitData={formAddStaff}
        submitTitle={"Thêm"}
        onSubmit={addStaff}
      />
    </div>
  );
};
