import React from 'react';
import { Diet, Busyness } from '../types';
import { Loader2 } from 'lucide-react';

interface ConfigFormProps {
  people: number;
  setPeople: (v: number) => void;
  diet: Diet;
  setDiet: (v: Diet) => void;
  budget: number;
  setBudget: (v: number) => void;
  disliked: string;
  setDisliked: (v: string) => void;
  busyness: Busyness;
  setBusyness: (v: Busyness) => void;
  handleGenerate: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export function ConfigurationForm({
  people, setPeople, diet, setDiet, budget, setBudget,
  disliked, setDisliked, busyness, setBusyness,
  handleGenerate, loading, error
}: ConfigFormProps) {
  return (
    <div className="bg-card border border-border-light rounded-xl p-8 mb-8">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-primary">Configure Your Day</h2>
        <p className="text-sm text-secondary">Set your parameters to generate a custom plan.</p>
      </div>
      <form onSubmit={handleGenerate} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-secondary uppercase tracking-wider">Number of People</label>
            <input 
              type="number" min="1" max="20"
              value={people} onChange={e => setPeople(Number(e.target.value))}
              className="w-full bg-bg border border-border-light rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-accent text-primary"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-secondary uppercase tracking-wider">Meal Preference</label>
            <select 
              value={diet} onChange={e => setDiet(e.target.value as Diet)}
              className="w-full bg-bg border border-border-light rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-accent text-primary"
            >
              <option value="veg">Vegetarian</option>
              <option value="non-veg">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-secondary uppercase tracking-wider">Daily Budget (₹)</label>
            <input 
              type="number" min="100" step="100"
              value={budget} onChange={e => setBudget(Number(e.target.value))}
              className="w-full bg-bg border border-border-light rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-accent text-primary"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-secondary uppercase tracking-wider">Busyness (Complexity)</label>
            <select 
              value={busyness} onChange={e => setBusyness(e.target.value as Busyness)}
              className="w-full bg-bg border border-border-light rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-accent text-primary"
            >
              <option value="relaxed">Relaxed (60+ mins)</option>
              <option value="normal">Normal (30-45 mins)</option>
              <option value="very busy">Very Busy (Quick meals)</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-secondary uppercase tracking-wider">Disliked / Unavailable</label>
            <input 
              type="text" placeholder="e.g. Tomato, Paneer, Mushroom"
              value={disliked} onChange={e => setDisliked(e.target.value)}
              className="w-full bg-bg border border-border-light rounded-lg px-4 py-2.5 text-sm font-medium focus:outline-none focus:border-accent text-primary"
            />
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-3 mt-4 pt-4 border-t border-border-light">
          {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
          <button 
            type="submit" 
            disabled={loading}
            className="bg-accent text-white px-8 py-3 rounded-lg text-sm font-medium tracking-wide disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            {loading && <Loader2 className="animate-spin" size={16} />}
            {loading ? 'Generating Plan...' : 'Generate Plan'}
          </button>
        </div>
      </form>
    </div>
  );
}
