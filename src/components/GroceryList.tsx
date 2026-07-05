import React, { useState, useEffect } from 'react';
import { MealPlanResult } from '../types';

export function GroceryList({ data }: { data: MealPlanResult }) {
  const categories = Object.keys(data.groceryList);
  
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('cookplan_checked_groceries');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('cookplan_checked_groceries', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const toggleItem = (itemName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

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
              {data.groceryList[category].map((item, idx) => {
                const isChecked = checkedItems[item.name] || false;
                return (
                  <li 
                    key={idx} 
                    className={`flex justify-between items-center px-5 py-4 cursor-pointer transition-opacity ${isChecked ? 'opacity-50' : 'opacity-100'}`}
                    onClick={() => toggleItem(item.name)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${isChecked ? 'bg-primary border-primary' : 'border-border-light'}`}>
                        {isChecked && (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`font-medium text-primary capitalize ${isChecked ? 'line-through' : ''}`}>
                        {item.name}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-secondary bg-bg border border-border-light px-2.5 py-1 rounded-md">
                      {item.totalQty} {item.unit}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
