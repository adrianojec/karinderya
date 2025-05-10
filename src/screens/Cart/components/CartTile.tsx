import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CartItem } from '../../../store/cart/types';

interface CartTileProps {
  item: CartItem,
  onPressPlus: (id: string) => void,
  onPressMinus: (id: string) => void,
  onPressRemoveItem: (id: string) => void,
}

export const CartTile: React.FC<CartTileProps> = ({ item, onPressPlus, onPressMinus, onPressRemoveItem }) => {
  const { food, purchasedQty } = item;

  return (
    <View style={styles.container}>
      <View style={styles.itemTile}>
        <View>
          <Text style={styles.itemName}>{food.foodName}</Text>
          <Text style={styles.itemPrice}>₱ {food.price.toFixed(2)}</Text>
        </View>
        <View style={styles.foodItemActions}>
          <Pressable style={styles.iconButton} onPress={() => onPressMinus(food.id)} disabled={purchasedQty === 1}>
            <MaterialCommunityIcons name='minus' size={24} />
          </Pressable>
          <Text style={styles.foodItemQty}>{purchasedQty}</Text>
          <Pressable style={styles.iconButton} onPress={() => onPressPlus(food.id)} disabled={food.availableQty === purchasedQty}>
            <MaterialCommunityIcons name='plus' size={24} />
          </Pressable>
        </View>
      </View>
      <Pressable
        style={styles.removeItemButton}
        onPress={() => onPressRemoveItem(food.id)}
      >
        <MaterialCommunityIcons name='close' size={16} color='black' />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 8
  },
  itemTile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
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
  foodItemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    padding: 8,
    borderRadius: 100
  },
  foodItemQty: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  removeItemButton: {
    ...StyleSheet.absoluteFillObject,
    left: undefined,
    bottom: undefined,
    padding: 4,
    borderRadius: 100,
    backgroundColor: "#DEDEDE"
  }
})
