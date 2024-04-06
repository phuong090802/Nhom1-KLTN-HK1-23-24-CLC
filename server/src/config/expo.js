import { Expo } from 'expo-server-sdk';

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true, // this can be set to true in order to use the FCM v1 API
});

export default expo;