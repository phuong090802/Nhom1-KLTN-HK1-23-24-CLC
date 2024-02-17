import { Pressable, StyleSheet } from 'react-native';

export default function IconButton({ children }) {
  return <Pressable style={styles.container}>{children}</Pressable>;
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});
