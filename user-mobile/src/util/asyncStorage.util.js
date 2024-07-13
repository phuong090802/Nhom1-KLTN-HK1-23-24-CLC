import AsyncStorage from "@react-native-async-storage/async-storage";

const getAsyncStorage = async (key) => {
  const result = await AsyncStorage.getItem(key);
  return result;
};

export { getAsyncStorage };
