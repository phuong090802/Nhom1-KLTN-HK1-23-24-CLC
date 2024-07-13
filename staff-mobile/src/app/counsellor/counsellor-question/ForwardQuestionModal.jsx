import { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import MyButton from '../../../component/atomic/my-button/MyButton';
import MySelect from '../../../component/atomic/my-select';
import ModalLayout from '../../../component/molecule/modal-layout';
import { getDepartmentSv } from '../../../service/cousellor/counsellorDepartment.sv';
import {
  forwardQuestionSv,
  getDepartmentFieldSv,
} from '../../../service/dephead/depheadField.sv';
import { CounsellorQuestionContext } from './CounsellorQuestionProvider';

export const ForwardQuestionModal = () => {
  const { showForwardModal, setShowForwardModal, selectedQuestion } =
    useContext(CounsellorQuestionContext);
  const [deps, setDeps] = useState([]);
  const [selectedDep, setSelectedDep] = useState(null);
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);

  const getDepartments = async () => {
    try {
      const response = await getDepartmentSv();
      setDeps(
        response.departments.map((dep) => ({
          value: dep._id,
          key: dep.departmentName,
        }))
      );
    } catch (error) {
      console.log('getDepartments', error);
    }
  };

  const getFieldByDepId = async () => {
    try {
      const response = await getDepartmentFieldSv(selectedDep);
      setFields(
        response.fields.map((field) => ({
          value: field._id,
          key: field.fieldName,
        }))
      );
    } catch (error) {
      console.log('getFieldByDepId', error);
    }
  };

  const handleForward = async () => {
    if (!selectedDep) {
      Alert.alert('Chưa chọn khoa');
    }
    if (!selectedField) {
      Alert.alert('Chưa chọn lĩnh vực');
    }
    try {
      const response = await forwardQuestionSv(selectedQuestion._id, {
        departmentId: selectedDep,
        fieldId: selectedField,
      });
      setShowForwardModal(false);
      Alert.alert(response?.message || 'Chuyển tiếp câu trả lời thành công');
    } catch (error) {
      Alert.alert(error?.message || 'Lỗi khi chuyển tiếp câu hỏi');
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  useEffect(() => {
    if (selectedDep) {
      getFieldByDepId();
    }
  }, [selectedDep]);

  return (
    <ModalLayout
      visible={showForwardModal}
      onClose={() => {
        setShowForwardModal(false);
      }}
      title={'Chuyển tiếp câu hỏi'}
    >
      <View style={styles.container}>
        <MySelect data={deps} onSelect={(data) => setSelectedDep(data.value)} />
        <MySelect
          data={fields}
          onSelect={(data) => setSelectedField(data.value)}
        />
        <MyButton buttonText={'Chuyển tiếp'} onPress={handleForward} />
      </View>
    </ModalLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 12,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
  },
});
