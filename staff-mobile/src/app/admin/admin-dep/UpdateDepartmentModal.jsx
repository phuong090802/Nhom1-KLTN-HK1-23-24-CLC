import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { fonts } from '../../../../constance';
import MyButton from '../../../component/atomic/my-button';
import ModalLayout from '../../../component/molecule/modal-layout';
import { AdminDepContext } from './AdminDepProvider';

export const UpdateDepartmentModal = () => {
  const { showUpdateModal, setShowUpdateModal, selectedDep, updateDep } =
    useContext(AdminDepContext);

  const [tempData, setTempData] = useState(selectedDep);

  const onDepNameChange = (value) => {
    setTempData((prev) => ({ ...prev, departmentName: value }));
  };

  useEffect(() => {
    setTempData(selectedDep);
  }, [selectedDep, showUpdateModal]);

  return (
    <ModalLayout
      visible={showUpdateModal}
      onClose={() => setShowUpdateModal(false)}
      title={'Cập nhật khoa'}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Tên khoa</Text>
        <TextInput
          style={styles.textInput}
          value={tempData?.departmentName || ''}
          onChangeText={onDepNameChange}
        />
        <MyButton
          activeOpacity={0.5}
          style={{ backgroundColor: '#000', marginTop: 16 }}
          buttonText={'Cập nhật'}
          onPress={() => updateDep(tempData)}
        />
      </View>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  label: {
    fontFamily: fonts.BahnschriftRegular,
    fontSize: 16,
  },
  textInput: {
    borderBottomWidth: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    fontSize: 18,
    fontFamily: fonts.BahnschriftRegular,
  },
});
