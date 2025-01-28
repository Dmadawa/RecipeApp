import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoritesStore } from '../src/stores/useFavoritesStore';

describe('useFavoritesStore', () => {
  const sampleRecipe = {
    idMeal: '12345',
    strMeal: 'Sample Recipe',
    strMealThumb: 'https://via.placeholder.com/150',
  };

  beforeEach(() => {
    AsyncStorage.clear(); // Clear the mock storage before each test
  });

  it('should add a favorite and persist it in AsyncStorage', async () => {
    const { result } = renderHook(() => useFavoritesStore());

    await act(async () => {
      await result.current.addFavorite(sampleRecipe);
    });

    // Check the state
    expect(result.current.favorites).toEqual([sampleRecipe]);

    // Verify AsyncStorage
    const storedFavorites = await AsyncStorage.getItem('favorites');
    expect(JSON.parse(storedFavorites)).toEqual([sampleRecipe]);
  });

  it('should remove a favorite and update AsyncStorage', async () => {
    const { result } = renderHook(() => useFavoritesStore());

    // Add and then remove a favorite
    await act(async () => {
      await result.current.addFavorite(sampleRecipe);
      await result.current.removeFavorite(sampleRecipe.idMeal);
    });

    // Check the state
    expect(result.current.favorites).toEqual([]);

    // Verify AsyncStorage
    const storedFavorites = await AsyncStorage.getItem('favorites');
    expect(JSON.parse(storedFavorites)).toEqual([]);
  });

  it('should load favorites from AsyncStorage', async () => {
    // Mock AsyncStorage with a pre-existing favorite
    await AsyncStorage.setItem('favorites', JSON.stringify([sampleRecipe]));

    const { result } = renderHook(() => useFavoritesStore());

    // Load favorites
    await act(async () => {
      await result.current.loadFavorites();
    });

    // Check the state
    expect(result.current.favorites).toEqual([sampleRecipe]);
  });
});
