import { Food } from "../../hooks/foods/types";

export type CartItem = {
  food: Food;
  purchasedQty: number;
};

export type CartState = {
  items: CartItem[];
  totalAmount: number;
};

export type CartActions = {
  addItem: (item: CartItem) => void;
};
