import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/FontAwesome';
import HomeStack from './src/navigation/HomeStack';
import FavoritesStack from './src/navigation/FavoritesStack';
import { NotificationSettingsScreen } from './src/screens/NotificationSettingsScreen';
import { useFavoritesStore } from './src/stores/useFavoritesStore';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const queryClient = new QueryClient();
const Tab = createBottomTabNavigator();

const getTabBarIcon = (routeName) => ({ color, size }) => {
  let iconName;

  switch (routeName) {
    case 'Home':
      iconName = 'home';
      break;
    case 'Favorites':
      iconName = 'heart';
      break;
    case 'Notification':
      iconName = 'cog';
      break;
    default:
      iconName = 'circle';
  }

  return <Icon name={iconName} size={size} color={color} />;
};

const App = () => {
  useEffect(() => {
    // Load favorites when the app starts
    useFavoritesStore.getState().loadFavorites();
  }, []);

  useEffect(() => {
    PushNotificationIOS.requestPermissions().then((permissions) => {
      console.log('Notification Permissions:', permissions);
    });

    PushNotificationIOS.addEventListener('localNotification', (notification) => {
      console.log('Local Notification:', notification);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: getTabBarIcon(route.name), // Use stable factory function
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Favorites" component={FavoritesStack} options={{ headerShown: false }} />
          <Tab.Screen
            name="Notification"
            component={NotificationSettingsScreen}
            options={{ headerShown: true }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
