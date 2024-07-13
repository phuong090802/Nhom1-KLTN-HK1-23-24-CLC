import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../../constance';
import ModalLayout from '../../../component/molecule/modal-layout';
import { AppContext } from '../../AppProvider';

export const UserInforModal = ({ visible, onClose }) => {
  const { user } = useContext(AppContext);

  return (
    <ModalLayout
      visible={visible}
      onClose={onClose}
      title={'Thông tin người dùng'}
    >
      <View style={styles.container}>
        <View>
          <View style={styles.inforBox}>
            <Infor label={'Họ & Tên'} text={user.fullName} />
            <Infor label={'Email'} text={user.email} />
            <Infor label={'Số điện thoại'} text={user.phoneNumber} />
            {user?.department && (
              <Infor label={'Khoa'} text={user.department.departmentName} />
            )}
            <Infor label={'Chức vụ'} text={user.role} />
          </View>
        </View>
      </View>
    </ModalLayout>
  );
};

const Infor = ({ label, text }) => {
  return (
    <View style={{ flexDirection: 'row', width: '100%', gap: 4 }}>
      <Text
        style={{
          fontFamily: fonts.BahnschriftBold,
          fontSize: 18,
          color: colors.black75,
        }}
      >
        {label || 'label'}:
      </Text>
      <Text
        style={{
          fontFamily: fonts.BahnschriftRegular,
          fontSize: 18,
          color: colors.black75,
        }}
      >
        {text || 'text'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    gap: 8,
    borderWidth: 0.5,
    padding: 16,
    borderRadius: 16,
  },

  inforBox: {
    padding: 16,
    borderWidth: 1,
    marginTop: 16,
    borderRadius: 16,
    borderColor: colors.primary,
    gap: 16,
  },
});
