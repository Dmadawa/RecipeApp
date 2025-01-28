import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';

const Stack = createNativeStackNavigator();

const NotificationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSettingsScreen}
        options={{
          headerShown: true,
          title: 'Notification Settings',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#333333', fontSize: 18, fontWeight: 'bold' },
        }}
      />
    </Stack.Navigator>
  );
};

export default NotificationStack;
