import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../../constant';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.ghostWhite,
    flex: 1,
    paddingTop: 8,
  },
});

const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: colors.black10,
    backgroundColor: '#fff',
    borderRadius: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  userInforContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 16,
    overflow: 'hidden',
  },
  avatar: {
    width: 52,
    height: 52,
  },
  text: {
    fontSize: 18,
    marginLeft: 8,
    fontFamily: fonts.BahnschriftRegular,
    color: '#000',
  },
  function: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    marginRight: 8,
  },
});

export { styles, headerStyles };
