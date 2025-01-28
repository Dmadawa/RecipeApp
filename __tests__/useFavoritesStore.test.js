import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFavoritesStore } from '../src/stores/useFavoritesStore';

describe('useFavoritesStore', () => {
  const sampleRecipe = {
    idMeal: '12345',
    strMeal: 'Sample Recipe',
    strMealThumb: 'https://via.placeholder.com/150',
  };

  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] }); // Reset Zustand state
    AsyncStorage.clear(); // Reset mock AsyncStorage
  });

  it('should add a favorite and persist it in AsyncStorage', async () => {
    const { addFavorite, favorites } = useFavoritesStore.getState();

    // Add a favorite
    await addFavorite(sampleRecipe);

    // Assert the state
    expect(useFavoritesStore.getState().favorites).toEqual([sampleRecipe]);

    // Assert AsyncStorage
    const storedFavorites = await AsyncStorage.getItem('favorites');
    expect(JSON.parse(storedFavorites)).toEqual([sampleRecipe]);
  });

  it('should remove a favorite and update AsyncStorage', async () => {
    const { addFavorite, removeFavorite } = useFavoritesStore.getState();

    // Add and then remove a favorite
    await addFavorite(sampleRecipe);
    await removeFavorite(sampleRecipe.idMeal);

    // Assert the state
    expect(useFavoritesStore.getState().favorites).toEqual([]);

    // Assert AsyncStorage
    const storedFavorites = await AsyncStorage.getItem('favorites');
    expect(JSON.parse(storedFavorites)).toEqual([]);
  });

  it('should load favorites from AsyncStorage', async () => {
    // Mock AsyncStorage with a pre-existing favorite
    await AsyncStorage.setItem('favorites', JSON.stringify([sampleRecipe]));

    const { loadFavorites } = useFavoritesStore.getState();

    // Load favorites
    await loadFavorites();

    // Assert the state
    expect(useFavoritesStore.getState().favorites).toEqual([sampleRecipe]);
  });
});
