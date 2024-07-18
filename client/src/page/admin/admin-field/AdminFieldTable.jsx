import clsx from "clsx";
import { useContext } from "react";
import { AdminFieldContext } from "./AdminFieldStore";
import { updateFieldStatusSv } from "../../../service/admin/adminField.sv";
import { toast } from "sonner";

export const AdminFieldTable = () => {
  const { generalField, getGeneralField } = useContext(AdminFieldContext);

  const updateFieldStatus = async (fieldId, data) => {
    try {
      const response = await updateFieldStatusSv(fieldId, data);
      getGeneralField();
      toast.success(
        response.message || "Cập nhật trạng thái lĩnh vực thành công"
      );
    } catch (error) {
      toast.error("Lỗi khi cập nhật trạng thái lĩnh vực");
    }
  };

  return (
    <table className="min-w-full bg-white mt-2 rounded-xl overflow-hidden shadow-md shadow-black50">
      <thead>
        <tr className="bg-gray-100">
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Tên lĩnh vực
          </th>
          <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Trạng thái
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {generalField?.map((field, index) => {
          return (
            <tr key={field?._id || index}>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <div className="text-sm leading-5 text-gray-900">
                  {field.fieldName}
                </div>
              </td>
              <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                <button
                  onClick={() =>
                    updateFieldStatus(field._id, { isActive: !field.isActive })
                  }
                  className={clsx(
                    "px-2 inline-flex text-xs leading-5 font-semibold rounded-full duration-300",
                    field.isActive
                      ? " bg-green-100 text-green-800 hover:bg-green-200"
                      : " bg-red-100 text-red-800 hover:bg-red-200"
                  )}
                >
                  {field?.isActive ? "Hoạt động" : "Dừng hoạt động"}
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
