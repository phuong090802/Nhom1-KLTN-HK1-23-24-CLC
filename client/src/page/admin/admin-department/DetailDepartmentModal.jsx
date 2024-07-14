import clsx from 'clsx';
import { ArrowBigUpDash, Check, Pencil, UserRoundPlus, X } from 'lucide-react';
import { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import default_avatar from '../../../assets/image/default_avatar.png';
import Search from '../../../atom/search/Search';
import ModalLayout2 from '../../../layout/modal-layout-2';
import Pagination from '../../../molecule/pagination';
import {
  chooseDepheadSv,
  getDepCounsellorsSv,
  updateDepSv,
} from '../../../service/admin/adminDepartment.sv';
import { AddCounsellorModal } from './AddCounsellorModal';
import { AdminDepartmentContext } from './AdminDepartmentStore';
import { initParams } from './constance';

export const DetailDepartmentModal = () => {
  const {
    hiddenDetailDepModal,
    setHiddenDetailDepModal,
    selectedDep,
    setDeps,
  } = useContext(AdminDepartmentContext);

  const [dephead, setDephead] = useState(null);

  const [counsellors, setCounsellors] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const [departmentName, setDepartmentName] = useState('');

  const [hiddenAddCounsellorModal, setHiddenAddCounsellorModal] =
    useState(true);

  const [params, setParams] = useState({
    ...initParams,
    size: 6,
    filter: {
      role: 'COUNSELLOR',
    },
  });

  const [pages, setPages] = useState(0);

  const departmentNameRef = useRef(null);

  const getDephead = async () => {
    try {
      const response = await getDepCounsellorsSv(selectedDep._id, {
        filter: {
          role: 'DEPARTMENT_HEAD',
        },
      });
      setDephead(
        response?.counsellors?.length === 0 ? null : response.counsellors[0]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getDepCounsellors = async () => {
    try {
      const response = await getDepCounsellorsSv(selectedDep._id, params);
      setCounsellors(response.counsellors);
      setPages(response.pages);
    } catch (error) {
      console.log(error);
    }
  };

  const chooseDephead = async (userId) => {
    try {
      const submitData = { departmentId: selectedDep._id, userId: userId };
      const response = await chooseDepheadSv(submitData);
      getDephead();
      getDepCounsellors();
      toast.success(response?.message || 'Chọn trưởng khoa thành công');
    } catch (error) {
      toast.error(error?.message || 'Lỗi khi chọn trưởng khoa');
    }
  };

  const updateDepartment = async () => {
    try {
      const response = await updateDepSv(selectedDep._id, { departmentName });
      toast.success(response.message || 'Cập nhật tên khoa thành công');
      setIsEditing(false);
      setDeps((prev) => {
        return prev.map((dep) => {
          if (dep._id === selectedDep._id) {
            return { ...dep, departmentName: departmentName };
          } else {
            return dep;
          }
        });
      });
    } catch (error) {
      setDepartmentName(selectedDep.departmentName);
      toast.error(error?.message || 'Xảy ra lỗi khi cập nhật khoa');
    }
  };

  useEffect(() => {
    if (!selectedDep) return;
    getDephead();
    setDepartmentName(selectedDep?.departmentName);
  }, [selectedDep]);
  useEffect(() => {
    if (!selectedDep) return;
    getDepCounsellors();
  }, [selectedDep, params]);

  return (
    <ModalLayout2
      hidden={hiddenDetailDepModal}
      setHidden={setHiddenDetailDepModal}
    >
      <AddCounsellorModal
        hidden={hiddenAddCounsellorModal}
        setHidden={setHiddenAddCounsellorModal}
      />
      <div className="flex items-center justify-center">
        <div className="rounded-lg px-6 w-full">
          <div className="flex justify-between">
            <input
              ref={departmentNameRef}
              className={clsx(
                'text-3xl font-bold mb-2 text-black75 outline-none border-black75',
                isEditing && 'border-b-2'
              )}
              size={departmentName?.length || 0}
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              disabled={!isEditing}
            />
            <div className="">
              {isEditing && (
                <button
                  className=" text-blue-500 hover:text-blue-700"
                  title="Thêm tư vấn viên"
                  onClick={updateDepartment}
                >
                  <Check />
                </button>
              )}
              <button
                className=" text-blue-500 hover:text-blue-700 mx-4"
                title="Chỉnh sửa"
                onClick={() => {
                  setIsEditing(!isEditing);
                  setTimeout(() => {
                    departmentNameRef.current.focus();
                  }, 0);
                }}
              >
                {isEditing ? (
                  <div>
                    <X />
                  </div>
                ) : (
                  <Pencil />
                )}
              </button>

              <button
                className=" text-blue-500 hover:text-blue-700"
                title="Thêm tư vấn viên"
                onClick={() => setHiddenAddCounsellorModal(false)}
              >
                <UserRoundPlus />
              </button>
            </div>
          </div>
          <div className="flex items-center mb-2">
            <img
              src={dephead?.avatar ? dephead.avatar : default_avatar}
              alt="Department Head Avatar"
              className="size-16 rounded-full mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">
                {dephead ? dephead?.fullName : 'Chưa có trưởng khoa'}
              </h2>
              <p className="text-gray-600">Trưởng khoa</p>
            </div>
          </div>
          <div className="rounded-lg w-full">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-black75">
                Danh sách nhân viên
              </h1>
              {counsellors?.length !== 0 && (
                <Search
                  setParams={setParams}
                  placeholder={'Tìm kiếm nhân viên'}
                />
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {counsellors?.length !== 0 ? (
                counsellors.map((counsellor, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 rounded-lg border gap-2"
                  >
                    <img
                      src={counsellor?.avatar || default_avatar}
                      alt={`${counsellor.fullName} avatar`}
                      className="size-16 h-full object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold">
                        {counsellor.fullName}
                      </h2>
                      <p className="text-gray-600 text-sm">Tư vấn viên</p>
                    </div>
                    <button
                      className=" text-blue-500 hover:text-blue-700"
                      title="Chọn trưởng khoa"
                      onClick={() => chooseDephead(counsellor._id)}
                    >
                      <ArrowBigUpDash />
                    </button>
                  </div>
                ))
              ) : (
                <h2 className="text-lg font-semibold text-center col-span-3 rounded-lg border p-6 px-20">
                  Chưa có nhân viên trong khoa
                </h2>
              )}
            </div>
            <div className="w-full flex justify-center mt-4 pb-2">
              <Pagination
                pages={pages || 0}
                page={params.page || 1}
                setParams={setParams}
              />
            </div>
          </div>
        </div>
      </div>
    </ModalLayout2>
  );
};
