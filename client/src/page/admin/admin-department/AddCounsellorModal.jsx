import React, { useContext, useEffect, useState } from "react";
import ModalLayout2 from "../../../template/modal-layout-2";
import { AdminDepartmentContext } from "./AdminDepartmentStore";
import default_avatar from "../../../assets/image/default_avatar.png";
import { Plus, Star } from "lucide-react";
import { getCounsellorsToAddSv } from "../../../service/admin/adminDepartment.sv";
import { toast } from "sonner";

export const AddCounsellorModal = ({ hidden, setHidden }) => {
  const { selectedDep } = useContext(AdminDepartmentContext);

  const [counsellorList, setCounsellorList] = useState([]);

  const getCounsellorToAdd = async () => {
    try {
      const response = await getCounsellorsToAddSv(selectedDep._id);
      console.log("getCounsellorToAdd", response);
      setCounsellorList(response?.counsellors || []);
    } catch (error) {
      toast.error("Lỗi khi lấy danh sách tư vấn viên");
    }
  };

  useEffect(() => {
    getCounsellorToAdd();
  }, []);

  const employees = [
    {
      avatar: "https://example.com/avatar1.jpg",
      name: "Ưu Tú",
    },
    {
      avatar: "https://example.com/avatar2.jpg",
      name: "Nguyễn Văn B",
    },
    {
      avatar: "https://example.com/avatar3.jpg",
      name: "Trần Thị C",
    },
  ];

  return (
    <ModalLayout2 hidden={hidden} setHidden={setHidden}>
      <div className="flex items-center justify-center">
        <div className="rounded-lg p-6 w-full">
          <h1 className="text-4xl font-bold mb-6 text-center">
            Danh sách nhân viên
          </h1>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 text-left">Nhân viên</th>
                <th className="py-2 text-center">Thêm</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 min-w-40">
                    <div className="flex items-center gap-2">
                      <img
                        src={default_avatar}
                        alt={`${employee.name} avatar`}
                        className="object-cover size-14 rounded-full"
                      />
                      <p>{employee.name}</p>
                    </div>
                  </td>
                  <td className="py-2">
                    <div className="flex">
                      <button
                        className="text-blue-500 hover:text-blue-700 mx-auto"
                        title="Chỉnh sửa"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ModalLayout2>
  );
};
