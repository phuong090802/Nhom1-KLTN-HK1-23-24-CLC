import { router } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../../constance';
import MyIcon from '../../atomic/my-icon';

const BackArrow = ({ text }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.4} onPress={() => router.back()}>
        <MyIcon
          iconPackage="Ionicons"
          name="chevron-back"
          size={36}
          color={colors.black75}
        />
      </TouchableOpacity>
      {/* <Text style={styles.text}>{text || "Text Required"}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default BackArrow;
