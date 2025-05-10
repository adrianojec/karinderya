import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { FoodsScreen } from '../screens/Foods/FoodsScreen'
import { AddFoodItemScreen } from '../screens/AddFoodItem/AddFoodItemScreen';
import { CartScreen } from '../screens/Cart/CartScreen';

export type RootStackParamList = {
  Foods: undefined;
  AddFoodItem: undefined;
  Cart: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Foods" component={FoodsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddFoodItem" component={AddFoodItemScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
    </Stack.Navigator>
  )
}
