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
            </div>
          );
        })}
      </div>
    </div>
  );
}
