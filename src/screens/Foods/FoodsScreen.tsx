import React from 'react'
import { Pressable, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { useGetFoods } from '../hooks/foods/useFoods';
import { Food } from '../hooks/foods/types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const FoodsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { data: products } = useGetFoods();

  const handleNavigateToAddFoodItem = () => {
    navigation.navigate('AddFoodItem')
  }

  const renderItem = ({ item }: { item: Food }) => {
    const { foodName, price } = item

    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{foodName}</Text>
          <Text style={styles.itemPrice}>₱ {price.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { }} // TODO: Add to cart functionality
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.header}>Menu</Text>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <Pressable style={styles.addIcon} onPress={handleNavigateToAddFoodItem}>
        <MaterialCommunityIcons name='plus' size={40} />
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  addIcon: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    padding: 8,
    borderRadius: 100,
    backgroundColor: '#DEDEDE'
  },
  screen: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cartCount: {
    marginBottom: 16,
    fontSize: 16,
  },
  list: {
    paddingBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
  },
  itemName: {
    fontSize: 18,
  },
  itemPrice: {
    marginTop: 4,
    color: '#666',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#0C6CC9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
})
