import { StyleSheet } from 'react-native';

const formStyle = StyleSheet.create({
  container: {
    marginTop: 24,
    gap: 28,
    fontFamily: 'BahnschriftRegular',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
    fontFamily: 'BahnschriftRegular',
  },
  footerLink: {
    color: '#4E504E',
    fontSize: 13,
    fontFamily: 'BahnschriftRegular',
  },
});

const selectData = [
  { key: 'Sinh viên', value: 'Sinh viên' },
  { key: 'Cựu sinh viên', value: 'Cựu sinh viên' },
  { key: 'Học sinh', value: 'Học sinh' },
  { key: 'Phụ huynh', value: 'Phụ huynh' },
];

const initRegisterData = {
  fullName: '',
  email: '',
  phoneNumber: '',
  password: '',
  confirmPassword: '',
  occupation: '',
};

export { formStyle, selectData, initRegisterData };
