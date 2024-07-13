import { StyleSheet } from 'react-native';

import { fonts } from '../../../constant';

const style = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 16,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontFamily: fonts.BahnschriftBold,
  },
});

export { style };
