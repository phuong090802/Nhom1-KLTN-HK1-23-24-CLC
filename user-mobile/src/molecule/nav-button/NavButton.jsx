import { StyleSheet, View } from 'react-native';

import { colors } from '../../../constant';
import Octicon from '../../atom/octicon';

const NavButton = ({ icon, color, size }) => {
  return (
    <View
      style={[
        style.container,
        {
          backgroundColor:
            color === colors.primary ? colors.primary : colors.lightGray,
        },
      ]}
    >
      <Octicon
        color={color === colors.primary ? '#fff' : '#000'}
        size={30}
        name={icon || 'home'}
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
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: colors.black10,
  },
});

export default NavButton;
