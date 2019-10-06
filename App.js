import React from 'react'
import { View, Text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from './src/Pages/Home'
import Detail from './src/Pages/Detail'

const AppNavigator = createStackNavigator(
  {
    Home: Home,
    Detail: Detail
  },
  {
    headerMode: 'none'
  }
)

export default createAppContainer(AppNavigator)
