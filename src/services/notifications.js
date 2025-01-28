// import PushNotification from 'react-native-push-notification';
// import { NativeModules, Platform } from 'react-native';
// import { AppState } from 'react-native';

// let lastActiveTime = Date.now();

// export const configureNotifications = () => {
//   const { RNPushNotification } = NativeModules;

//   if (Platform.OS === 'ios' && !RNPushNotification) {
//     console.error('Native module for push notifications not found.');
//   }
  
//   PushNotification.configure({
//     onNotification: function (notification) {
//       console.log('Notification received:', notification);
//     },
//     requestPermissions: true,
//   });

//   // Track app state to detect inactivity
//   AppState.addEventListener('change', (nextAppState) => {
//     if (nextAppState === 'active') {
//       const currentTime = Date.now();
//       if (currentTime - lastActiveTime > 24 * 60 * 60 * 1000) { // 24 hours of inactivity
//         scheduleFavoriteReminder();
//       }
//       lastActiveTime = currentTime;
//     }
//   });
// };

// export const scheduleFavoriteReminder = () => {
//   PushNotification.localNotificationSchedule({
//     message: "Don't forget to add your favorite recipes!",
//     date: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours from now
//   });
// };

// export const scheduleRecipeReminder = (recipeName, reminderTime) => {
//   PushNotification.localNotificationSchedule({
//     message: `Time to cook your favorite recipe: ${recipeName}!`,
//     date: reminderTime, // Custom time for the reminder
//   });
// };

// export const handleUserInactivity = () => {
//   const currentTime = Date.now();
//   if (currentTime - lastActiveTime > 24 * 60 * 60 * 1000) { // 24 hours of inactivity
//     scheduleFavoriteReminder();
//   }
// };
