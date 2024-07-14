import { useContext } from 'react';
import StaffTitleBar from '../../../molecule/staff-title-bar';
import { AddNewsModal } from './AddNewsModal';
import { AdminNewsContext } from './AdminNewsStore';
import { DetailNewsModal } from './DetailNewsModal';
import { NewsTable } from './NewsTable';

export const AdmiNewsContent = () => {
  const { setHiddenAddNewsModal, setParams } = useContext(AdminNewsContext);

  return (
    <>
      <AddNewsModal />
      <DetailNewsModal />
      <StaffTitleBar
        title={'Quản lý tin tức'}
        onAdd={() => {
          setHiddenAddNewsModal(false);
        }}
        setParams={setParams}
      />
      <NewsTable />
    </>
  );
};
