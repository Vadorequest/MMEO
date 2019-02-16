import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import RabbitsMaterialScreen from '../screens/RabbitsMaterialScreen';
import RabbitsMoveScreen from '../screens/RabbitsMoveScreen';
import SettingsScreen from '../screens/SettingsScreen';

const RabbitsMaterialStack = createStackNavigator({
  Home: RabbitsMaterialScreen,
});

RabbitsMaterialStack.navigationOptions = {
  tabBarLabel: 'Matériaux',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const RabbitsMoveStack = createStackNavigator({
  Links: RabbitsMoveScreen,
});

RabbitsMoveStack.navigationOptions = {
  tabBarLabel: 'Mouvement',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  RabbitsMaterialStack,
  RabbitsMoveStack,
  SettingsStack,
});
