module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@testing-library|react-clone-referenced-element|nativewind|react-native-gesture-handler|react-native-screens)/)',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
