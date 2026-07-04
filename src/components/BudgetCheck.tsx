import React from 'react';
import { MealPlanResult } from '../types';
import { TrendingDown, CheckCircle2, AlertCircle } from 'lucide-react';

export function BudgetCheckView({ data }: { data: MealPlanResult }) {
  const { totalCost, budget, isWithinBudget, difference, suggestedSwap } = data.budget;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-medium text-primary">Budget Analysis</h2>
        <p className="text-secondary mt-1">Financial breakdown of your grocery list.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border-light rounded-xl p-8 flex flex-col justify-center items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-bg">
            <div 
              className={`h-full ${isWithinBudget ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{ width: `${Math.min((totalCost / budget) * 100, 100)}%` }} 
            />
          </div>
          <span className="text-sm font-medium text-secondary uppercase tracking-widest mb-3">
            Estimated Total
          </span>
          <span className="text-5xl font-medium tracking-tight text-primary mb-6">
            ₹{totalCost.toLocaleString()}
          </span>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
            isWithinBudget 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}>
            {isWithinBudget ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {isWithinBudget 
              ? `Within budget by ₹${difference.toLocaleString()}` 
              : `Over budget by ₹${difference.toLocaleString()}`}
          </div>
          <div className="text-xs text-secondary font-medium mt-4">
            Daily Budget: ₹{budget.toLocaleString()}
          </div>
        </div>

        <div className="bg-card border border-border-light rounded-xl p-8 flex flex-col">
          <h3 className="text-sm font-medium text-secondary uppercase tracking-widest mb-6 flex items-center gap-2">
            <TrendingDown size={16} /> Cost Reduction Tips
          </h3>
          
          {!isWithinBudget && suggestedSwap ? (
            <div className="bg-bg border border-border-light rounded-xl p-5 flex-1 flex flex-col justify-center">
              <div className="mb-3">
                <span className="text-xs font-medium bg-accent-subtle text-accent px-2 py-1 rounded-md uppercase tracking-wider border border-accent/20">
                  Suggested Swap
                </span>
              </div>
              <p className="font-medium text-primary text-lg mb-2 leading-snug">
                Consider swapping <span className="capitalize text-accent">{suggestedSwap.original}</span> for <span className="capitalize text-accent">{suggestedSwap.replacement}</span>.
              </p>
              <p className="text-sm text-secondary">
                {suggestedSwap.reason || 'This change will help you stay closer to your target budget while maintaining the recipe structure.'}
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
              <div className="bg-bg border border-border-light p-3 rounded-full text-green-600 mb-4">
                <CheckCircle2 size={32} />
              </div>
              <p className="text-secondary font-medium">
                {isWithinBudget 
                  ? "You are comfortably within your budget! No major changes needed." 
                  : "We couldn't find a direct cheaper swap. Consider reducing portion sizes or substituting generic brands."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
