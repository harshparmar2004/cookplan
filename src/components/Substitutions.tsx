import React from 'react';
import { MealPlanResult } from '../types';
import { Repeat } from 'lucide-react';

export function SubstitutionsView({ data }: { data: MealPlanResult }) {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-primary">Ingredient Substitutions</h2>
        <p className="text-secondary mt-1">Smart swaps based on your preferences.</p>
      </div>
      
      {(!data.substitutions || data.substitutions.length === 0) ? (
        <div className="bg-card border border-border-light rounded-xl p-12 text-center flex flex-col items-center">
          <div className="bg-bg p-3 rounded-full mb-4 border border-border-light">
            <Repeat className="text-secondary" size={24} />
          </div>
          <h3 className="text-lg font-medium text-primary mb-1">No substitutions needed</h3>
          <p className="text-secondary max-w-sm">
            We didn't need to swap out any ingredients for this meal plan.
          </p>
        </div>
      ) : (
        <div className="bg-card border border-border-light rounded-xl overflow-hidden">
          <ul className="divide-y divide-border-light">
            {data.substitutions.map((sub, idx) => (
              <li key={idx} className="p-6 flex items-start gap-5 hover:bg-black/5 transition-colors">
                <div className="bg-accent-subtle p-2.5 rounded-lg shrink-0 text-accent mt-1">
                  <Repeat size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-medium text-secondary text-lg capitalize line-through decoration-border-light">
                      {sub.original}
                    </span>
                    <span className="text-border-light font-bold">→</span>
                    <span className="font-medium text-accent text-lg capitalize">
                      {sub.replacement}
                    </span>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed">
                    {sub.reason || `Swapped ${sub.original} for ${sub.replacement} based on preferences.`}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
