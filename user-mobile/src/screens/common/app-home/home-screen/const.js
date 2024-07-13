import { StyleSheet } from 'react-native';

import { colors, fonts } from '../../../../../constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.ghostWhite,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});

const dropdownItemStyles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#fff',
    flexDirection: 'column',
    paddingVertical: 16,
    borderWidth: 0.5,
    borderColor: colors.black10,
    marginBottom: 8,
    borderRadius: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    width: '100%',
  },
  questionInfor: {
    width: '85%',
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.BahnschriftBold,
    color: colors.black75,
  },
  inforContainer: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorImage: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inforText: {
    fontSize: 12,
    fontFamily: fonts.BahnschriftRegular,
  },
  icon: {},
  dropDownContainer: {
    paddingTop: 8,
    overflow: 'hidden',
  },
  open: { height: 'auto' },
  close: { height: 0 },
});

const dropdownContentStyles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 2,
    borderTopColor: colors.black10,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  title: { fontSize: 16, fontFamily: fonts.BahnschriftBold },
  content: {
    fontSize: 16,
    fontFamily: fonts.BahnschriftRegular,
    width: '95%',
    textAlign: 'justify',
    color: colors.black75,
  },
  authorImage: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  authorContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 1,
    alignItems: 'center',
  },
});

const initParams = {
  search: ['title', 'content'],
  keyword: '',
  skip: 0,
  size: 8,
  filter: {},
  sort: {
    views: 1,
    createdAt: 1,
  },
};
export { styles, dropdownContentStyles, dropdownItemStyles, initParams };
