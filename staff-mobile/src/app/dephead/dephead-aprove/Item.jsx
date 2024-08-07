import { useContext } from 'react';
import ItemLayout from '../../../component/molecule/item-layout/ItemLayout';
import { DepheadAproveContext } from './DepheadAproveProvider';

export const Item = ({ data }) => {
  const { setShowDetailModal, setSelectedAnswer } =
    useContext(DepheadAproveContext);
  const onDetail = () => {
    setShowDetailModal(true);
    setSelectedAnswer(data);
  };
  return <ItemLayout text={data?.title} onDetail={onDetail} />;
};
