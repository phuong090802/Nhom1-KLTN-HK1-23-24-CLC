import { Button, StyleSheet, View } from 'react-native';

export default function Account({navigation}) {

  function handleLogin() {
    navigation.navigate('Login')
  }

  function handleRegister() {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title='Đăng nhập' onPress={handleLogin} />
      </View>
      <View style={styles.button}>
        <Button title='Đăng ký' onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginVertical: 8,
  },
});
