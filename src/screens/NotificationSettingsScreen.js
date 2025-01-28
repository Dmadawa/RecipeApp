import React, { useState } from 'react';
import { View, Text, Switch, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styled } from 'nativewind';
import { notificationnStyles as styles } from '../styles/styles';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledSwitch = styled(Switch);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

export const NotificationSettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('19:00'); // Default time: 7:00 PM

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
    Alert.alert(
      notificationsEnabled ? 'Notifications Disabled' : 'Notifications Enabled',
      `Notifications have been ${notificationsEnabled ? 'disabled' : 'enabled'}.`
    );
  };

  const updateReminderTime = (time) => {
    setReminderTime(time);
    Alert.alert('Reminder Time Updated', `Your preferred reminder time is now set to ${time}.`);
  };

  return (
    <StyledView className="flex-1 p-4 bg-gray-100">
      {/* Toggle Notifications */}
      <StyledView className="flex-row items-center justify-between mb-6">
        <StyledText className="text-lg text-gray-800">Enable Notifications</StyledText>
        <StyledSwitch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
          className="ml-4"
        />
      </StyledView>

      {/* Reminder Time */}
      <StyledView className="mb-6">
        <StyledText className="text-lg text-gray-800 mb-2">Set Reminder Time</StyledText>
        <StyledTextInput
          className={styles.enterTimeTextField}
          placeholder="Enter time (e.g., 19:00)"
          value={reminderTime}
          onChangeText={updateReminderTime}
          placeholderTextColor="#888"
        />
      </StyledView>

      {/* Save Settings */}
      <StyledTouchableOpacity
        className={styles.saveButton}
        onPress={() => Alert.alert('Settings Saved', 'Your notification settings have been updated.')}
      >
        <StyledText className={styles.saveText}>Save Settings</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};
