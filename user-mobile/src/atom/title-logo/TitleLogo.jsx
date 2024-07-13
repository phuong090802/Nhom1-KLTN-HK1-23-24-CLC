import { Image, StyleSheet, View, Text } from 'react-native';

import logo from '../../../assets/images/logo.png';
import { fonts } from '../../../constant';

const TitleLogo = () => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>HCMUTE</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    fontFamily: fonts.Bungee,
    marginVertical: -24,
  },
});

export default TitleLogo;
