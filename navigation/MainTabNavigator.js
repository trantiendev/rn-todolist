import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import CompleteScreen from '../screens/CompleteScreen';
import AllScreen from '../screens/AllScreen';
import ActiveScreen from '../screens/ActiveScreen';
import TodoDetailsScreen from '../screens/TodoDetailsScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const DetailsStack = createStackNavigator(
  {
    Details: TodoDetailsScreen,
  },
  config
);

DetailsStack.navigationOptions = {
  tabBarLabel: 'Details',
};

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen,
  },
  config
);

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-done-all`
          : 'md-information-circle'
      }
    />
  ),
};

const AllStack = createStackNavigator(
  {
    All: AllScreen,
  },
  config
);

AllStack.navigationOptions = {
  tabBarLabel: 'All',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-link'} />
  ),
};

const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
  },
  config
);

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

const tabNavigator = createBottomTabNavigator({
  AllStack,
  CompleteStack,
  ActiveStack,
  DetailsStack
});

tabNavigator.path = '';

export default tabNavigator;
