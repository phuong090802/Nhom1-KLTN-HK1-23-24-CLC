import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../constance';
import MyIcon from '../../atomic/my-icon';
import { SortModal } from './SortModal';

const Sort = ({ data, setParams }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <SortModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        data={data}
        setParams={setParams}
      />
      <TouchableOpacity
        activeOpacity={0.4}
        onPress={() => setModalVisible(true)}
      >
        <MyIcon
          iconPackage="FontAwesome5"
          name={'sort'}
          size={28}
          color={colors.black75}
        />
      </TouchableOpacity>
    </>
  );
};

export default Sort;
