import React from 'react';
import { MealPlanResult } from '../types';

export function GroceryList({ data }: { data: MealPlanResult }) {
  const categories = Object.keys(data.groceryList);
  
  if (categories.length === 0) {
    return (
      <div className="bg-card border border-border-light rounded-xl p-8 text-center text-secondary">
        No groceries needed.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-primary">Grocery List</h2>
        <p className="text-secondary mt-1">Consolidated ingredients for all meals.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <div key={category} className="bg-card border border-border-light rounded-xl overflow-hidden">
            <div className="bg-bg px-5 py-3 border-b border-border-light">
              <h3 className="text-sm font-medium text-secondary uppercase tracking-wider capitalize">
                {category}
              </h3>
            </div>
            <ul className="divide-y divide-border-light">
              {data.groceryList[category].map((item, idx) => (
                <li key={idx} className="flex justify-between items-center px-5 py-4">
                  <span className="font-medium text-primary capitalize">{item.name}</span>
                  <span className="text-sm font-medium text-secondary bg-bg border border-border-light px-2.5 py-1 rounded-md">
                    {item.totalQty} {item.unit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
