import { FOODS_URL } from "../../utils/constants";
import { useGet } from "../useGet";
import { usePost } from "../usePost";
import { Food } from "./types";

export const useCreateFood = () => {
  return usePost<Omit<Food, "id">, Food>(FOODS_URL);
};

export const useGetFoods = () => {
  return useGet<Food[]>(FOODS_URL);
};
