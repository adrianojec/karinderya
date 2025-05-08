import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';

export const FoodsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigateToAddFoodItem = () => {
    navigation.navigate('AddFoodItem')
  }

  return (
    <View style={styles.container}>
      <Pressable style={styles.addIcon} onPress={handleNavigateToAddFoodItem}>
        <MaterialCommunityIcons name='plus' size={40} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addIcon: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#DEDEDE'
  }
})
