import Config from 'react-native-config';

const API_BASE_URL = Config.API_BASE_URL || 'https://www.themealdb.com/api/json/v1/1/';

export const fetchRecipes = async (query, category) => {
  let url = '';
  if (category && !query) {
    url = `${API_BASE_URL}filter.php?c=${category}`;
  } else {
    url = `${API_BASE_URL}search.php?s=${query}`;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return await response.json();
};

export const fetchRecipeDetails = async (idMeal) => {
  const url = `${API_BASE_URL}/lookup.php?i=${idMeal}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.meals[0]; // Return the first (and only) recipe object
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_BASE_URL}categories.php`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await response.json();
};