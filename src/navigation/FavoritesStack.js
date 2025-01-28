import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { RecipeDetailScreen } from '../screens/RecipeDetailScreen';

const Stack = createNativeStackNavigator();

const FavoritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{
          headerShown: true,
          title: 'Favorites',
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

export default FavoritesStack;
