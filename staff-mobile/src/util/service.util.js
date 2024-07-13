import AsyncStorage from '@react-native-async-storage/async-storage';

const createHeader = async (type) => {
  const token = await AsyncStorage.getItem('accessToken');
  const header = {
    author: { Authorization: `Bearer ${token}` },
    formData: { 'Content-Type': 'multipart/form-data' },
  };
  return type.reduce((prev, t) => ({ ...prev, ...header[t] }), {});
};

export { createHeader };
