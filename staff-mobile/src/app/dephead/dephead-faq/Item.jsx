import { useContext } from 'react';
import { ToastAndroid } from 'react-native';
import ItemLayout from '../../../component/molecule/item-layout/ItemLayout';
import { depheadDeleteFaqSv } from '../../../service/dephead/depheadFaq.sv';
import { DepheadFaqContext } from './DepheadFaqProvider';

export const Item = ({ data }) => {
  const { setSelectedFaq, setShowFaqDetailModal, getFaqs } =
    useContext(DepheadFaqContext);

  const onDetail = () => {
    setSelectedFaq(data);
    setShowFaqDetailModal(true);
  };

  const onDelete = async () => {
    try {
      const response = await depheadDeleteFaqSv(data._id);
      ToastAndroid.show(
        response.message || 'Xóa câu hỏi chung thành công',
        ToastAndroid.SHORT
      );
      getFaqs();
    } catch (error) {
      ToastAndroid.show(
        error.message || 'Xóa câu hỏi chung không thành công',
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <ItemLayout text={data?.question} onDetail={onDetail} onDelete={onDelete} />
  );
};
