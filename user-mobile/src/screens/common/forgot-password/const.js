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

export { formStyle };
