import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveLastActivityTime = async () => {
  const currentTime = new Date().getTime();
  await AsyncStorage.setItem('lastActivityTime', currentTime.toString());
};

export const getLastActivityTime = async () => {
  const lastActivityTime = await AsyncStorage.getItem('lastActivityTime');
  return parseInt(lastActivityTime, 10);
};
