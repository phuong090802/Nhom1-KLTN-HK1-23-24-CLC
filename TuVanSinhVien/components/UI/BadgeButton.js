import { Pressable, StyleSheet, View, Text } from 'react-native';

import Badge from './Badge';

export default function BadgeButton({ children }) {
  return (
    <Pressable style={styles.container}>
      {children}
      <Badge text='5' />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
