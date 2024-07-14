import clsx from 'clsx';
import { useContext } from 'react';
import { AdminDepartmentContext } from './AdminDepartmentStore';

export const DepartmentsTable = () => {
  const { deps, updateDepStatus, setSelectedDep, setHiddenDetailDepModal } =
    useContext(AdminDepartmentContext);

  const onDetail = (data) => {
    setSelectedDep(data);
    setHiddenDetailDepModal(false);
  };

  return (
    <>
      <table className="min-w-full bg-white mt-2 rounded-xl overflow-hidden shadow-md shadow-black50">
        <thead>
          <tr className="bg-gray-100">
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Tên khoa
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Trạng thái
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Hành động
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {deps?.map((dep, index) => {
            return (
              <tr key={dep?._id || index}>
                <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                  <div className="text-sm leading-5 text-gray-900 truncate">
                    {dep?.departmentName || 'Tên khoa'}
                  </div>
                </td>
                <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                  <button
                    onClick={() =>
                      updateDepStatus(dep._id, { isActive: !dep.isActive })
                    }
                    className={clsx(
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full duration-300',
                      dep.isActive
                        ? ' bg-green-100 text-green-800 hover:bg-green-200'
                        : ' bg-red-100 text-red-800 hover:bg-red-200'
                    )}
                  >
                    {dep?.isActive ? 'Hoạt động' : 'Dừng hoạt động'}
                  </button>
                </td>
                <td className="border-b border-gray-200 px-6 py-4 whitespace-no-wrap">
                  <button
                    onClick={() => onDetail(dep)}
                    className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
