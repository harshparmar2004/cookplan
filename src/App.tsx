import React, { useState } from 'react';
import { Diet, Busyness, MealPlanResult, Tab } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ConfigurationForm } from './components/ConfigurationForm';
import { MealPlanView } from './components/MealPlan';
import { GroceryList } from './components/GroceryList';
import { ChecklistView } from './components/Checklist';
import { SubstitutionsView } from './components/Substitutions';
import { BudgetCheckView } from './components/BudgetCheck';

export default function App() {
  const [people, setPeople] = useState<number>(2);
  const [diet, setDiet] = useState<Diet>('veg');
  const [budget, setBudget] = useState<number>(1000);
  const [disliked, setDisliked] = useState<string>('');
  const [busyness, setBusyness] = useState<Busyness>('normal');
  const [activeTab, setActiveTab] = useState<Tab>('meal-plan');
  const [result, setResult] = useState<MealPlanResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          people,
          diet,
          budget,
          disliked,
          busyness
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to generate plan');
      }
      const data = await res.json();
      setResult(data);
      setActiveTab('meal-plan');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-bg text-primary font-sans antialiased">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <ConfigurationForm 
              people={people} setPeople={setPeople}
              diet={diet} setDiet={setDiet}
              budget={budget} setBudget={setBudget}
              disliked={disliked} setDisliked={setDisliked}
              busyness={busyness} setBusyness={setBusyness}
              handleGenerate={handleGenerate}
              loading={loading} error={error}
            />

            {result && (
              <div className="mt-8 transition-all">
                {activeTab === 'meal-plan' && <MealPlanView data={result} />}
                {activeTab === 'grocery-list' && <GroceryList data={result} />}
                {activeTab === 'checklist' && <ChecklistView data={result} />}
                {activeTab === 'substitutions' && <SubstitutionsView data={result} />}
                {activeTab === 'budget' && <BudgetCheckView data={result} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

