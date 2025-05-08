import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FoodsScreen } from '../screens/Foods/FoodsScreen'
import { AddFoodItemScreen } from '../screens/AddFoodItem/AddFoodItemScreen';

export type RootStackParamList = {
  Foods: undefined;
  AddFoodItem: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Foods" component={FoodsScreen} />
      <Stack.Screen name="AddFoodItem" component={AddFoodItemScreen} />
    </Stack.Navigator>
  )
}
