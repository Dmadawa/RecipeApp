import React from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { useFavoritesStore } from '../stores/useFavoritesStore';
import { favouriteStyles as styles } from '../styles/styles';

import RecipeList from '../components/RecipeList';

const StyledView = styled(View);
const StyledText = styled(Text);

export const FavoritesScreen = ({ navigation }) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const toggleFavorite = (recipe) => {
      removeFavorite(recipe.idMeal);
  };

  return (
    <StyledView className={styles.headerContainer}>
      {favorites.length ? (
        <RecipeList
          recipes={favorites}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRecipePress={(recipe) => navigation.navigate('RecipeDetail', { recipe })}
       />
      ) : (
        <StyledText className={styles.noItems}>No favorite recipes found</StyledText>
      )}
    </StyledView>
  );
};
