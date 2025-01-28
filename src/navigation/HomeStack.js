import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          title: 'Home',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#333333', fontSize: 18, fontWeight: 'bold' },
        }} 
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetailScreen}
        options={{
          title: 'Recipe Details',
          headerStyle: { backgroundColor: '#f8f9fa' },
          headerTitleStyle: { color: '#333333', fontSize: 18, fontWeight: 'bold' },
          headerTintColor: '#007bff',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
