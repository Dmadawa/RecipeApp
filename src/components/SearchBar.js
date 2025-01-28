import React from 'react';
import { TextInput } from 'react-native';
import { styled } from 'nativewind';

const StyledTextInput = styled(TextInput);

const SearchBar = ({ query, onQueryChange }) => (
  <StyledTextInput
    className="p-3 border border-gray-300 rounded-lg bg-white text-gray-800 text-base shadow-md"
    placeholder="Search Recipes"
    value={query}
    onChangeText={onQueryChange}
    placeholderTextColor="#888"
    testID="search-input"
  />
);

export default SearchBar;
