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
  }))
);
