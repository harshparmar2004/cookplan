import React from 'react';
import { MealPlanResult } from '../types';
import { Drumstick } from 'lucide-react';

interface Props {
  data: MealPlanResult;
}

export function ProteinSourcesView({ data }: Props) {
  if (!data.proteinSources || data.proteinSources.length === 0) {
    return (
      <div className="bg-card border border-border-light rounded-xl p-8 flex flex-col items-center justify-center text-center">
        <Drumstick className="text-secondary mb-4 opacity-50" size={48} />
        <h3 className="text-lg font-medium text-primary mb-2">No Protein Data</h3>
        <p className="text-secondary text-sm">We couldn't find any specific protein sources for this meal plan.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border-light rounded-xl overflow-hidden">
      <div className="px-8 py-6 border-b border-border-light flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-accent-subtle flex items-center justify-center text-accent">
          <Drumstick size={20} />
        </div>
        <div>
          <h2 className="text-lg font-medium text-primary">Protein Sources</h2>
          <p className="text-sm text-secondary">Breakdown of key protein ingredients.</p>
        </div>
      </div>
      <div className="p-8">
        <div className="grid gap-4">
          {data.proteinSources.map((protein, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-bg border border-border-light hover:border-accent transition-colors">
              <div className="flex flex-col">
                <span className="font-medium text-primary">{protein.source}</span>
                <span className="text-xs text-secondary tracking-wider uppercase mt-1">{protein.meal}</span>
              </div>
              <div className="font-mono text-sm bg-accent-subtle text-accent px-3 py-1 rounded-full font-medium">
                {protein.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
