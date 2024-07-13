import { StyleSheet, View } from 'react-native';

import { colors } from '../../../constant';
import Octicon from '../../atom/octicon';

const CreateNavButton = ({ icon, color, size }) => {
  return (
    <View
      style={[
        style.container,
        { backgroundColor: color === colors.primary ? colors.primary : '#fff' },
      ]}
    >
      <Octicon
        color={color === colors.primary ? '#fff' : colors.primary}
        size={30}
        name={'plus'}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 40,
    width: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.primary,
  },
});

export default CreateNavButton;
