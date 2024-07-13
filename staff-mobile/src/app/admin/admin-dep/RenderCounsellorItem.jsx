import { Image, StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import blank_avatar from '../../../../assets/images/blank_avatar.jpg';
import { colors, fonts } from '../../../../constance';

export const RenderCounsellorItem = ({ item, onPress }) => {
  return (
    <View style={styles.staffItem}>
      <Image
        style={[styles.avatar, { width: 48, height: 48 }]}
        source={item?.avatar ? { uri: item.avatar } : blank_avatar}
      />
      <Text style={styles.staffName}>{item.fullName}</Text>
      <IconButton
        icon="transfer-up"
        iconColor={colors.primary}
        size={24}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  staffItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  staffName: {
    fontSize: 16,
    flex: 1,
    marginLeft: 16,
    fontFamily: fonts.BahnschriftRegular,
  },
  avatar: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.primary,
  },
});
