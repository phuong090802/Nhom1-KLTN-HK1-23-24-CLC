import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import blank_avatar from '../../../../assets/images/blank_avatar.jpg';
import { colors, fonts } from '../../../../constance';
import ModalLayout from '../../../component/molecule/modal-layout';
import Pagination from '../../../component/molecule/pagination';
import {
  adminGetDepCounsellorSv,
  chooseDepheadSv,
} from '../../../service/admin/adminDepartment.sv';
import { AdminDepContext } from './AdminDepProvider';
import { RenderCounsellorItem } from './RenderCounsellorItem';

export const DetailDepModal = () => {
  const { showDetailDepModal, setShowDetailDepModal, selectedDep } =
    useContext(AdminDepContext);

  const initParams = {
    page: 1,
    filter: {
      role: 'COUNSELLOR',
    },
  };

  const [dephead, setDephead] = useState(null);
  const [counsellors, setCounsellors] = useState([]);
  const [pages, setPages] = useState(0);
  const [params, setParams] = useState(initParams);

  const getDepartmentHead = async () => {
    try {
      const response = await adminGetDepCounsellorSv(selectedDep._id, {
        filter: {
          role: 'DEPARTMENT_HEAD',
        },
      });
      setDephead(
        response?.counsellors?.length === 0 ? null : response.counsellors[0]
      );
    } catch (error) {
      ToastAndroid.show(
        error?.message || 'Lỗi khi lấy thông tin trưởng khoa',
        ToastAndroid.SHORT
      );
    }
  };

  const getCounsellors = async () => {
    try {
      const response = await adminGetDepCounsellorSv(selectedDep._id, params);
      setCounsellors(response.counsellors);
      setPages(response.pages);
    } catch (error) {
      ToastAndroid.show(
        error?.message || 'Lỗi khi lấy danh sách nhân viên',
        ToastAndroid.SHORT
      );
    }
  };

  const onModalClose = () => {
    setShowDetailDepModal(false);
  };

  const chooseDephead = async (id) => {
    if (!selectedDep?._id) return;
    try {
      const submitData = { departmentId: selectedDep._id, userId: id };
      const response = await chooseDepheadSv(submitData);
      alert(response?.message || 'Chọn trưởng khoa thành công');
      getCounsellors();
      getDepartmentHead();
    } catch (error) {
      alert(error?.message || 'Lỗi khi chọn trưởng khoa!!');
    }
  };

  useEffect(() => {
    if (!selectedDep?._id) {
      return;
    }
    getDepartmentHead();
  }, [selectedDep]);

  useEffect(() => {
    if (!selectedDep?._id) {
      return;
    }
    getCounsellors();
  }, [selectedDep, params]);

  return (
    <ModalLayout
      visible={showDetailDepModal}
      onClose={onModalClose}
      title={selectedDep?.departmentName || 'Tên khoa'}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Trưởng Khoa</Text>
        <View style={styles.headContainer}>
          <Image
            style={[styles.avatar, { width: 64, height: 64 }]}
            source={dephead?.avatar ? { uri: dephead.avatar } : blank_avatar}
          />
          <Text style={styles.headName}>
            {dephead?.fullName || 'Chưa có trưởng khoa'}
          </Text>
        </View>
        <Text style={styles.title}>Danh sách nhân viên</Text>
        {counsellors?.length !== 0 ? (
          counsellors?.map((counsellor, index) => {
            return (
              <RenderCounsellorItem
                item={counsellor}
                key={counsellor?._id || index}
                onPress={() => chooseDephead(counsellor._id)}
              />
            );
          })
        ) : (
          <View
            style={{
              alignItems: 'center',
              borderWidth: 1,
              padding: 24,
              borderColor: colors.black25,
            }}
          >
            <Text style={[styles.headName, { color: colors.black75 }]}>
              Khoa chưa có tư vấn viên nào
            </Text>
          </View>
        )}
      </View>
      <Pagination page={params.page} setParams={setParams} pages={pages} />
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headName: {
    fontSize: 18,
    marginLeft: 16,
    fontFamily: fonts.BahnschriftBold,
  },
  staffList: {
    paddingBottom: 16,
  },
  avatar: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
