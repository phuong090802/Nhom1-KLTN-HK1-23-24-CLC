import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../../constance';
import MyIcon from '../../atomic/my-icon';
import { FilterModal } from './FilterModal';

const Filter = ({ data, setParams }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <FilterModal
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
          iconPackage="Foundation"
          name={'filter'}
          size={28}
          color={colors.black75}
        />
      </TouchableOpacity>
    </>
  );
};

export default Filter;
