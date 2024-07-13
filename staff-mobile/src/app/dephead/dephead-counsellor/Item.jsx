import { useContext } from 'react';
import blank_avatar from '../../../../assets/images/blank_avatar.jpg';
import ItemLayout from '../../../component/molecule/item-layout/ItemLayout';
import { DepheadCounsellorContext } from './DepheadCounsellorProvider';

export const Item = ({ data }) => {
  const {
    updateCounsellorStatus,
    setShowCounsellorDetailModal,
    setSelectedCounsellor,
  } = useContext(DepheadCounsellorContext);

  const onDetail = () => {
    setSelectedCounsellor(data);
    setShowCounsellorDetailModal(true);
  };

  return (
    <ItemLayout
      text={data.fullName}
      image={data?.avatar === null ? blank_avatar : { uri: avatar }}
      status={data.isEnabled}
      onStatus={() =>
        updateCounsellorStatus(data._id, { isEnabled: !data.isEnabled })
      }
      onDetail={onDetail}
    />
  );
};
