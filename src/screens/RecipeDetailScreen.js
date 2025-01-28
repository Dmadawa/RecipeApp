import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { styled } from 'nativewind';
import { fetchRecipeDetails } from '../services/api';
import { recipeDetailStyles as styles } from '../styles/styles';

const StyledText = styled(Text);
const StyledImage = styled(Image);

const flatListStyle = StyleSheet.create({
  container : {
    backgroundColor: 'white',
    paddingBottom: 16,
  },
});

export const RecipeDetailScreen = ({ route }) => {
  const { recipe } = route.params;
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipeDetails = async () => {
      try {
        const details = await fetchRecipeDetails(recipe.idMeal);
        setRecipeDetails(details);
      } catch (error) {
        console.error('Failed to fetch recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRecipeDetails();
  }, [recipe.idMeal]);

  if (loading) {
    return (
      <View className={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const ingredients = Object.keys(recipeDetails)
    .filter((key) => key.startsWith('strIngredient') && recipeDetails[key])
    .map((key) => recipeDetails[key]);

  const renderHeader = () => (
    <View className={styles.headerContainer}>
      <StyledImage
        source={{ uri: recipeDetails.strMealThumb }}
        className={styles.recipeImage}
      />
      <StyledText className={styles.recipeTitle}>
        {recipeDetails.strMeal}
      </StyledText>
      <StyledText className={styles.sectionTitle}>
        Instructions:
      </StyledText>
      <StyledText className={styles.instructionsText}>
        {recipeDetails.strInstructions}
      </StyledText>
      <StyledText className={styles.sectionTitle}>
        Ingredients:
      </StyledText>
    </View>
  );

  return (
    <FlatList
      data={ingredients}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <StyledText className={styles.ingredientItem}>- {item}</StyledText>
      )}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={flatListStyle.container}
    />
  );
};
