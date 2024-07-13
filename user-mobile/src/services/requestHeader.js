import AsyncStorage from '@react-native-async-storage/async-storage';

const authHeader = async () => {
  const token = await AsyncStorage.getItem('accessToken');
  return { Authorization: `Bearer ${token}` };
};

export { authHeader };
