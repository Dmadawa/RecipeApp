import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useFavoritesStore = create((set, get) => ({
  favorites: [],
  addFavorite: async (recipe) => {
    const updatedFavorites = [...get().favorites, recipe];
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    set({ favorites: updatedFavorites });
  },
  removeFavorite: async (idMeal) => {
    const updatedFavorites = get().favorites.filter((fav) => fav.idMeal !== idMeal);
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    set({ favorites: updatedFavorites });
  },
  loadFavorites: async () => {
    const storedFavorites = await AsyncStorage.getItem('favorites');
    if (storedFavorites) {
      set({ favorites: JSON.parse(storedFavorites) });
    }
  },
}));