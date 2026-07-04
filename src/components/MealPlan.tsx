import React from 'react';
import { MealPlanResult } from '../types';
import { Clock } from 'lucide-react';

export function MealPlanView({ data }: { data: MealPlanResult }) {
  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-primary">Today's Meal Plan</h2>
        <p className="text-secondary mt-1">Your personalized AI-generated culinary schedule.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['breakfast', 'lunch', 'dinner'].map((type) => {
          const meal = data.meals[type as keyof typeof data.meals];
          if (!meal) return null;
          return (
            <div key={type} className="bg-card border border-border-light rounded-xl p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-medium uppercase tracking-widest text-accent bg-accent-subtle px-2.5 py-1 rounded-full">
                  {type}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-medium text-secondary bg-bg px-2 py-1 rounded-md border border-border-light">
                  <Clock size={14} />
                  {meal.prepTime}
                </span>
              </div>
              <h3 className="text-xl font-medium text-primary mb-2 leading-tight">{meal.name}</h3>
              <p className="text-secondary text-sm leading-relaxed flex-1">{meal.desc}</p>
              
              {meal.nutrition && (
                <div className="mt-6 pt-4 border-t border-border-light grid grid-cols-4 gap-2 text-center">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-secondary">Cals</span>
                    <span className="text-sm font-medium text-primary mt-1">{meal.nutrition.calories}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-secondary">Protein</span>
                    <span className="text-sm font-medium text-primary mt-1">{meal.nutrition.protein}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-secondary">Carbs</span>
                    <span className="text-sm font-medium text-primary mt-1">{meal.nutrition.carbs}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-secondary">Fat</span>
                    <span className="text-sm font-medium text-primary mt-1">{meal.nutrition.fat}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
