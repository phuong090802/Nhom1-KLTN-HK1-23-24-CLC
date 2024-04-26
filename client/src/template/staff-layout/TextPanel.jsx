import { useContext } from "react";
import { DataContext } from "../../store/DataProvider";

export const TextPanel = () => {
  const { user } = useContext(DataContext);
  
  const content =
    user.role === "ADMIN"
      ? "Quản Trị Viên"
      : user?.department?.departmentName || "Unknow Department";

  return (
    <div className="w-full bg-primary py-4 flex justify-center items-center rounded-2xl text-lg text-white font-bold shadow-black50 shadow-lg">
      {content}
    </div>
  );
};
