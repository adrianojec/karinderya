import React, { useCallback } from 'react'
import { Pressable, StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native'
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGetFoods } from '../../hooks/foods/useFoods';
import { Food } from '../../hooks/foods/types';
import { useCartStore } from '../../store/cart/useCartStore';

export const FoodsScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { addItem, items } = useCartStore()
  const { data: products } = useGetFoods();

  const isItemInCart = useCallback((item: Food) => {
    return items.some(cartItem => cartItem.food.id === item.id);
  }, [items]);

  const handleNavigateToAddFoodItem = () => {
    navigation.navigate('AddFoodItem')
  }

  const handleAddToCart = (item: Food) => {
    addItem({
      food: item,
      purchasedQty: 1
    })
  }

  const renderItem = ({ item }: { item: Food }) => {
    const { foodName, price } = item

    return (
      <View style={styles.itemContainer}>
        <View>
          <Text style={styles.itemName}>{foodName}</Text>
          <Text style={styles.itemPrice}>₱ {price.toFixed(2)}</Text>
        </View>
        {!isItemInCart(item)
          ? <TouchableOpacity
            style={styles.button}
            onPress={() => handleAddToCart(item)}
          >
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          : <Text style={styles.addedText}>Added</Text>
        }
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Menu</Text>
        <View>
          <Pressable style={styles.cartIcon}>
            <MaterialCommunityIcons name='cart' size={20} />
          </Pressable>
          {items.length > 0 && <View style={styles.cartBadge}>
            <Text style={styles.cartItemCount}>{items.length}</Text>
          </View>}
        </View>
      </View>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
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
  addedText: { color: 'green' },
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
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cartIcon: {
    padding: 4
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    padding: 4,
    borderRadius: 100,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartItemCount: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold'
  }
})
