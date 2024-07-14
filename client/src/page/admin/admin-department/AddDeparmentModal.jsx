import { useContext } from 'react';
import { toast } from 'sonner';
import ModalLayout2 from '../../../layout/modal-layout-2/ModalLayout2';
import MyForm from '../../../molecule/my-form';
import { addDepSv } from '../../../service/admin/adminDepartment.sv';
import { AdminDepartmentContext } from './AdminDepartmentStore';
import { formAddDep } from './constance';

export const AddDeparmentModal = ({ title }) => {
  const { hiddenAddDep, setHiddenAddDep, getDepartment } = useContext(
    AdminDepartmentContext
  );

  // const AddDepFormRef = useRef();

  const addDeparment = async (data) => {
    try {
      const response = await addDepSv(data);
      toast.success(response.message || 'Thêm khoa thành công');
      getDepartment();
    } catch (error) {
      toast.error(error?.message || 'Xảy ra lỗi trong quá trình thêm khoa');
    }
  };

  return (
    <ModalLayout2
      hidden={hiddenAddDep}
      setHidden={setHiddenAddDep}
      text={title}
      // title={title}
      // onClose={() => setHiddenAddDep(true)}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm
          formInitData={formAddDep}
          submitTitle={'Thêm'}
          onSubmit={addDeparment}
          // ref={AddDepFormRef}
        />
      </div>
    </ModalLayout2>
  );
};
