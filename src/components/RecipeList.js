import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import RecipeCard from './RecipeCard';

const styles = StyleSheet.create({
    contentContainer: {
        paddingBottom: 16,
        marginTop: 8,
    },
  });

const RecipeList = ({ recipes, favorites, onToggleFavorite, onRecipePress }) => (
  <FlatList
    data={recipes}
    keyExtractor={(item) => item.idMeal}
    renderItem={({ item }) => (
      <RecipeCard
        recipe={item}
        isFavorite={favorites.some((fav) => fav.idMeal === item.idMeal)}
        onToggleFavorite={() => onToggleFavorite(item)}
        onPress={() => onRecipePress(item)}
      />
    )}
    contentContainerStyle={styles.contentContainer}
  />
);

export default RecipeList;
