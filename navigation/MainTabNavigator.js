import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../components/TabBarIcon'
import CompleteScreen from '../screens/CompleteScreen'
import ActiveScreen from '../screens/ActiveScreen'
import AllScreen from '../screens/AllScreen'
import SingleTodoScreen from '../screens/SingleTodoScreen'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {}
})

const CompleteStack = createStackNavigator(
  {
    Complete: CompleteScreen,
    SingleTodo: SingleTodoScreen
  },
  config
)

CompleteStack.navigationOptions = {
  tabBarLabel: 'Complete',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-done-all' : 'md-link'}
    />
  )
}

CompleteStack.path = ''

const AllStack = createStackNavigator(
  {
    All: AllScreen,
    SingleTodo: SingleTodoScreen
  },
  config
)

AllStack.navigationOptions = {
  tabBarLabel: 'All',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-add-circle-outline'
          : 'md-add-circle-outline'
      }
    />
  )
}

AllStack.path = ''

const ActiveStack = createStackNavigator(
  {
    Active: ActiveScreen,
    SingleTodo: SingleTodoScreen
  },
  config
)

ActiveStack.navigationOptions = {
  tabBarLabel: 'Active',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

ActiveStack.path = ''

const tabNavigator = createBottomTabNavigator(
  {
    complete: CompleteStack,
    all: AllStack,
    active: ActiveStack
  },
  {
    initialRouteName: 'all'
  }
)

tabNavigator.path = ''

export default tabNavigator
