import React from 'react'
import { FlatList, StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import { useCartStore } from '../../store/cart/useCartStore'
import { CartItem } from '../../store/cart/types'
import { useCreateOrder } from '../../hooks/orders/useOrders';
import { CartTile } from './components/CartTile';
import { useUpdateFoods } from '../../hooks/foods/useFoods';

export const CartScreen = () => {
  const {
    items,
    totalAmount,
    increaseQty,
    decreaseQty,
    removeItem,
    resetCart,
  } = useCartStore();

  const {
    mutate,
    isPending,
  } = useCreateOrder();

  const {
    mutate: updateFood
  } = useUpdateFoods();

  const onUpdateFoods = (items: CartItem[]) => {
    return Promise.all(
      items.map((item) =>
        updateFood({
          ...item.food,
          availableQty: item.food.availableQty - item.purchasedQty,
        })
      )
    );
  };

  const handlePlaceOrder = () => {
    const order = {
      items,
      totalAmount,
    }

    mutate(order, {
      onSuccess: async () => {
        try {
          await onUpdateFoods(items);

          resetCart();

          Alert.alert("Success", "Order placed successfully");
        } catch (err: any) {
          Alert.alert(
            "Partial success",
            "Order placed, but failed to update some items"
          );
        }
      },
      onError: () => Alert.alert('Error', 'Failed to place order')
    })
  }

  return (
    <View style={styles.screen}>
      <FlatList
        data={items}
        keyExtractor={item => item.food.id}
        renderItem={({ item }) => (
          <CartTile
            item={item}
            onPressPlus={increaseQty}
            onPressMinus={decreaseQty}
            onPressRemoveItem={removeItem}
          />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.totalContainer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={styles.totalText}>₱ {totalAmount}</Text>
        </View>
        <Pressable
          style={styles.placeOrderButton}
          disabled={items.length === 0 || isPending}
          onPress={handlePlaceOrder}
        >
          <Text style={styles.placeOrderText}>Place Order</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    gap: 16,
    padding: 16
  },
  separator: {
    height: 16
  },
  totalContainer: {
    ...StyleSheet.absoluteFillObject,
    top: undefined,
    padding: 16,
    paddingBottom: 32,
    gap: 32
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  placeOrderButton: {
    backgroundColor: '#0C6CC9',
    padding: 16,
    borderRadius: 8
  },
  placeOrderText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
