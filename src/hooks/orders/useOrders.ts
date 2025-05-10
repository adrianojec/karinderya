import { FOODS_URL, ORDERS_URL } from "../../utils/constants";
import { usePost } from "../usePost";
import { Order } from "./types";

export const useCreateOrder = () => {
  return usePost<Omit<Order, "id">, Order>(ORDERS_URL);
};
