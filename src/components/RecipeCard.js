import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledImage = styled(Image);

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite, onPress }) => (
  <StyledTouchableOpacity
    onPress={onPress}
    className="flex-row p-4 mb-3 bg-white rounded-lg shadow"
  >
    <StyledImage source={{ uri: recipe.strMealThumb }} className="h-20 w-20 rounded-lg" />
    <StyledView className="flex-1 ml-4">
      <StyledText className="text-lg font-bold text-gray-800">{recipe.strMeal}</StyledText>
      <StyledTouchableOpacity
        className={`mt-2 p-2 rounded-lg ${isFavorite ? 'bg-red-500' : 'bg-blue-500'}`}
        onPress={onToggleFavorite}
      >
        <StyledText className="text-white text-center">
          {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
        </StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  </StyledTouchableOpacity>
);

export default RecipeCard;
