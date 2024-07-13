import { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import blank_avatar from '../../../../assets/images/blank_avatar.jpg';
import { AppContext } from '../../AppProvider';

const WelcomeView = ({ name, avatar }) => (
  <View style={styles.welcomeContainer}>
    <View style={styles.avatarWrapper}>
      <Image
        source={avatar ? { uri: avatar } : blank_avatar}
        style={styles.avatar}
      />
    </View>
    <Text style={styles.welcomeText}>Chào mừng, {name}!</Text>
  </View>
);

export const Welcome = () => {
  const { user } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <WelcomeView name={user.fullName} avatar={user.avatar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    // width: "80%",
    backgroundColor: '#ffffff',
    // borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 5,
  },
  avatarWrapper: {
    marginBottom: 15,
    borderRadius: 50,
    overflow: 'hidden',
    width: 100,
    height: 100,
    borderWidth: 3,
    borderColor: '#ddd',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});
