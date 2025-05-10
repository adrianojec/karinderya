import { create } from "zustand";
import { CartActions, CartState } from "./types";
import { immer } from "zustand/middleware/immer";

const initialState = {
  items: [],
  totalAmount: 0,
};

export const useCartStore = create(
  immer<CartState & CartActions>((set) => ({
    ...initialState,
    addItem: (item) => {
      const { purchasedQty, food } = item;

      return set((state) => {
        state.items.push(item);
        state.totalAmount += purchasedQty * food.price;
      });
    },
    removeItem: (foodId) => {
      return set((state) => {
        state.items = state.items.filter((item) => item.food.id !== foodId);
        state.totalAmount = state.items.reduce(
          (acc, item) => acc + item.purchasedQty * item.food.price,
          0
        );
      });
    },
    increaseQty: (foodId) => {
      return set((state) => {
        const item = state.items.find((item) => item.food.id === foodId);

        if (!item) return;

        item.purchasedQty += 1;
        state.totalAmount += item.food.price;
      });
    },
    decreaseQty: (foodId) => {
      return set((state) => {
        const item = state.items.find((item) => item.food.id === foodId);

        if (!item) return;

        item.purchasedQty -= 1;
        state.totalAmount -= item.food.price;
      });
    },
    resetCart: () => set(initialState),
  }))
);
