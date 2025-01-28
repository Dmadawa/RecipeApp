import React from 'react';
import { FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

const styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: 0,
    },
    topMargin: {
        marginTop: 10,
    },
});

const CategorySelector = ({ categories, selectedCategory, onCategorySelect, categoryListRef }) => (
  <FlatList
    ref={categoryListRef}
    horizontal
    data={categories}
    keyExtractor={(item) => item.idCategory}
    renderItem={({ item, index }) => (
      <StyledTouchableOpacity
        className={`h-10 w-40 mx-1 rounded-lg flex items-center justify-center ${
          selectedCategory === item.strCategory ? 'bg-green-500' : 'bg-gray-200'
        }`}
        onPress={() => onCategorySelect(item.strCategory, index)}
      >
        <StyledText
          className={`font-bold text-sm text-center ${
            selectedCategory === item.strCategory ? 'text-white' : 'text-gray-800'
          }`}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.strCategory}
        </StyledText>
      </StyledTouchableOpacity>
    )}
    contentContainerStyle={styles.contentContainer}
    style={styles.topMargin}
  />
);

export default CategorySelector;
