import { useContext } from 'react';
import ModalLayout2 from '../../../layout/modal-layout-2/ModalLayout2';
import MyForm from '../../../molecule/my-form';
import { initAddCounsellorForm } from './constance';
import { DepheadCounsellorContext } from './DepheadCounsellorStore';

export const DepheadAddCounsellorModal = () => {
  const { setHiddenAddCounsellor, hiddenAddCounsellor, depheadAddCounsellor } =
    useContext(DepheadCounsellorContext);

  return (
    <ModalLayout2
      hidden={hiddenAddCounsellor}
      setHidden={setHiddenAddCounsellor}
      text={'Thêm tư vấn viên'}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm
          formInitData={initAddCounsellorForm}
          onSubmit={depheadAddCounsellor}
          submitTitle={'Thêm'}
        />
      </div>
    </ModalLayout2>
  );
};
