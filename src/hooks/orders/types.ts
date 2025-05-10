import { CartItem } from "../../store/cart/types";

export type Order = {
  id: string;
  items: CartItem[];
  totalAmount: number;
};
