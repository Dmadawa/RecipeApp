import React, { useState, useCallback, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { useQuery } from '@tanstack/react-query';
import { fetchRecipes, fetchCategories } from '../services/api';
import { useFavoritesStore } from '../stores/useFavoritesStore';

import SearchBar from '../components/SearchBar';
import CategorySelector from '../components/CategorySelector';
import RecipeList from '../components/RecipeList';

const StyledView = styled(View);
const StyledText = styled(Text);

export const HomeScreen = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categoryListRef = useRef(null);

  const favorites = useFavoritesStore((state) => state.favorites);
  const addFavorite = useFavoritesStore((state) => state.addFavorite);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);

  const handleQueryChange = useCallback((value) => {
    setQuery(value);
  }, []);

  const handleCategorySelect = useCallback((category, index) => {
    setQuery(''); // Clear the search text
    setSelectedCategory(category);
    // Scroll to selected category
    if (categoryListRef.current) {
      categoryListRef.current.scrollToIndex({ index, animated: true });
    }
  }, []);

  const toggleFavorite = (recipe) => {
    if (favorites.some((fav) => fav.idMeal === recipe.idMeal)) {
      removeFavorite(recipe.idMeal);
    } else {
      addFavorite(recipe);
    }
  };

  // Fetch categories and automatically select the first one on load
  const { data: categoriesData, isLoading: categoriesLoading, error: categoriesError } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 60000,
    onSuccess: (data) => {
      if (data?.categories?.length > 0 && !selectedCategory) {
        setSelectedCategory(data.categories[0].strCategory);
      }
    },
  });

  // Fetch recipes using the query and selected category
  const { data: recipesData, isLoading: recipesLoading, error: recipesError } = useQuery({
    queryKey: ['recipes', query, selectedCategory],
    queryFn: () => fetchRecipes(query, selectedCategory),
    enabled: !!selectedCategory, // Fetch only when a category is selected
    staleTime: 5000,
  });

  useEffect(() => {
    // Initially Load First Category
    if (categoriesData?.categories?.length > 0 && !selectedCategory) {
      setSelectedCategory(categoriesData.categories[0].strCategory);
    }
  }, [categoriesData, selectedCategory]);

  if (recipesLoading || categoriesLoading) {
    return <StyledText className="text-center text-gray-500 text-lg mt-5">Loading...</StyledText>;
  }

  if (recipesError || categoriesError) {
    return <StyledText className="text-center text-red-500 text-lg mt-5">Failed to fetch data</StyledText>;
  }

  return (
    <StyledView className="flex-1 p-4 bg-gray-100">
      <SearchBar query={query} onQueryChange={handleQueryChange} />
      <StyledView className="flex-row flex-wrap mb-2">
        <CategorySelector
          categories={categoriesData.categories}
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
          categoryListRef={categoryListRef}
        />
      </StyledView>

      {/* Recipe List */}
      {recipesData?.meals?.length ? (
        <RecipeList
          recipes={recipesData.meals}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onRecipePress={(recipe) => navigation.navigate('RecipeDetail', { recipe })}
        />
      ) : (
        <StyledText className="text-center text-gray-500 text-lg mt-5">No recipes found</StyledText>
      )}
    </StyledView>
  );
};
