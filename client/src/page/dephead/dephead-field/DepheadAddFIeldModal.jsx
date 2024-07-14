import { useContext } from 'react';
import ModalLayout2 from '../../../layout/modal-layout-2/ModalLayout2';
import MyForm from '../../../molecule/my-form';
import { initAddFieldForm } from './constance';
import { DepheadFieldContext } from './DepheadFieldStore';

export const DepheadAddFIeldModal = () => {
  const { hiddenAddField, setHiddenAddField, addField } =
    useContext(DepheadFieldContext);

  return (
    <ModalLayout2
      hidden={hiddenAddField}
      setHidden={setHiddenAddField}
      text={'Thêm lĩnh vực'}
    >
      <div className="mt-4 w-80 flex flex-col justify-center items-center">
        <MyForm
          formInitData={initAddFieldForm}
          submitTitle={'Thêm'}
          onSubmit={addField}
        />
      </div>
    </ModalLayout2>
  );
};
