import { Food } from "../../hooks/foods/types";

export type NewFood = Omit<Food, "id">;
