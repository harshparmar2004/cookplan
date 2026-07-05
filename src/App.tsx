import React, { useState, useEffect } from 'react';
import { Diet, Busyness, MealPlanResult, Tab, ProfileType, Gender } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ConfigurationForm } from './components/ConfigurationForm';
import { MealPlanView } from './components/MealPlan';
import { GroceryList } from './components/GroceryList';
import { ChecklistView } from './components/Checklist';
import { SubstitutionsView } from './components/Substitutions';
import { BudgetCheckView } from './components/BudgetCheck';
import { ProteinSourcesView } from './components/ProteinSources';

export default function App() {
  const [people, setPeople] = useState<number>(2);
  const [diet, setDiet] = useState<Diet>('veg');
  const [budget, setBudget] = useState<number>(1000);
  const [disliked, setDisliked] = useState<string>('');
  const [busyness, setBusyness] = useState<Busyness>('normal');
  const [profileType, setProfileType] = useState<ProfileType>('student');
  const [age, setAge] = useState<number>(20);
  const [college, setCollege] = useState<string>('');
  const [gender, setGender] = useState<Gender>('male');
  
  const [activeTab, setActiveTab] = useState<Tab>('meal-plan');
  const [result, setResult] = useState<MealPlanResult | null>(() => {
    const saved = localStorage.getItem('cookplan_result');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (result) {
      localStorage.setItem('cookplan_result', JSON.stringify(result));
    }
  }, [result]);

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
          busyness,
          profileType,
          age,
          college,
          gender
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
              profileType={profileType} setProfileType={setProfileType}
              age={age} setAge={setAge}
              college={college} setCollege={setCollege}
              gender={gender} setGender={setGender}
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
                {activeTab === 'protein' && <ProteinSourcesView data={result} />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

