import { Ingredient } from './ingredient.model';
import { Meal } from './meal.model';

export interface Menu {
  id: number;
  label: string;
  status: number;
  imageId: number;
  price: number;
  availableForWeeks: number[];
  meals: Meal[];
  ingredients: Ingredient[];
}