import React, { useState } from 'react';
import { MealPlanResult } from '../types';
import { Check, Square, CheckSquare } from 'lucide-react';

export function ChecklistView({ data }: { data: MealPlanResult }) {
  // Flatten items for checklist
  const allItems = Object.entries(data.groceryList).flatMap(([category, items]) => 
    items.map(item => ({ ...item, category }))
  );

  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (name: string) => {
    setChecked(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const progress = allItems.length > 0 
    ? Math.round((Object.values(checked).filter(Boolean).length / allItems.length) * 100) 
    : 0;

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-medium text-primary">Shopping Checklist</h2>
          <p className="text-secondary mt-1">Check off items as you shop.</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-medium text-accent">{progress}%</div>
          <div className="text-xs font-medium text-secondary uppercase tracking-widest">Completed</div>
        </div>
      </div>

      <div className="bg-card border border-border-light rounded-xl overflow-hidden">
        {allItems.length === 0 ? (
          <div className="p-8 text-center text-secondary">No items in checklist.</div>
        ) : (
          <div className="divide-y divide-border-light">
            {allItems.map((item, idx) => {
              const isChecked = !!checked[item.name];
              return (
                <div 
                  key={idx} 
                  className={`flex items-center gap-4 px-6 py-4 cursor-pointer transition-colors hover:bg-black/5 ${isChecked ? 'opacity-50' : ''}`}
                  onClick={() => toggleCheck(item.name)}
                >
                  <button className={`shrink-0 ${isChecked ? 'text-accent' : 'text-border-light'}`}>
                    {isChecked ? <CheckSquare size={24} /> : <Square size={24} />}
                  </button>
                  <div className="flex-1">
                    <div className={`font-medium text-primary capitalize ${isChecked ? 'line-through' : ''}`}>
                      {item.name}
                    </div>
                    <div className="text-xs font-medium text-secondary uppercase tracking-wider mt-0.5">
                      {item.category}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-primary bg-bg border border-border-light px-3 py-1.5 rounded-lg">
                    {item.totalQty} {item.unit}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
