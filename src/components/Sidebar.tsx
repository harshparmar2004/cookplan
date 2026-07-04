import React from 'react';
import { ChefHat, Calendar, ShoppingCart, Repeat, DollarSign, CheckSquare, Drumstick } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'meal-plan', label: 'Meal Plan', icon: <Calendar size={18} /> },
    { id: 'grocery-list', label: 'Grocery List', icon: <ShoppingCart size={18} /> },
    { id: 'protein', label: 'Protein Sources', icon: <Drumstick size={18} /> },
    { id: 'checklist', label: 'Checklist', icon: <CheckSquare size={18} /> },
    { id: 'substitutions', label: 'Substitutions', icon: <Repeat size={18} /> },
    { id: 'budget', label: 'Budget Check', icon: <DollarSign size={18} /> },
  ];

  return (
    <div className="w-64 bg-sidebar border-r border-border-light flex flex-col shrink-0 pt-8">
      <div className="px-6 mb-8 flex items-center gap-2 text-xl font-medium tracking-tight text-primary">
        <ChefHat className="text-accent" />
        CookPlan
      </div>
      <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-6 py-3 text-left transition-colors font-medium text-sm
                ${isActive 
                  ? 'bg-accent-subtle border-l-2 border-accent text-accent' 
                  : 'text-secondary hover:bg-black/5 border-l-2 border-transparent hover:text-primary'
                }`}
            >
              {item.icon}
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-border-light">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-8 h-8 rounded-full bg-border-light flex items-center justify-center font-medium text-sm text-primary">
            U
          </div>
          <div className="text-sm font-medium text-primary">User Profile</div>
        </div>
      </div>
    </div>
  );
}
