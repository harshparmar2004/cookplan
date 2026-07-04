export type Tab = 'meal-plan' | 'grocery-list' | 'checklist' | 'substitutions' | 'budget' | 'protein';
export type Diet = 'veg' | 'non-veg' | 'vegan';
export type Busyness = 'relaxed' | 'normal' | 'very busy';
export type ProfileType = 'student' | 'professional';
export type Gender = 'male' | 'female';

export interface Ingredient {
  name: string;
  qty: number;
  unit: string;
  category: 'produce' | 'grains' | 'dairy' | 'spices' | 'protein' | 'other';
}

export interface Recipe {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  diet: Diet[];
  busyness: Busyness[];
  prepTime: string;
  desc: string;
  ingredients: Ingredient[];
}

export interface Substitution {
  original: string;
  replacement: string;
  reason: string;
}

export interface GroceryItem extends Ingredient {
  totalQty: number;
  cost: number;
}

export interface BudgetInfo {
  totalCost: number;
  budget: number;
  isWithinBudget: boolean;
  difference: number;
  suggestedSwap?: Substitution;
}

export interface ProteinSource {
  meal: string;
  source: string;
  amount: string;
}

export interface MealPlanResult {
  meals: {
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
  };
  groceryList: Record<string, GroceryItem[]>;
  substitutions: Substitution[];
  budget: BudgetInfo;
  proteinSources: ProteinSource[];
}
