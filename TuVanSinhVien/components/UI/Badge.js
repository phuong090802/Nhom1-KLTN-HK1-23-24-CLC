import { View, Text, StyleSheet } from 'react-native';

export default function Badge({ text }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    borderRadius: 16,
    width: 16,
    height: 16,
    position: 'absolute',
    top: -8,
    end: -8,
  },
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 12,
  },
});
