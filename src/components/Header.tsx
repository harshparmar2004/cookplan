import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-card border-b border-border-light flex items-center justify-between px-8 shrink-0">
      <div className="flex items-center gap-4 text-secondary">
        <button className="hover:text-primary transition-colors md:hidden">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-bg border border-border-light rounded-md text-sm">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search plans..." 
            className="bg-transparent border-none focus:outline-none text-primary w-48 font-medium placeholder-secondary"
          />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="text-secondary hover:text-primary transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border border-card"></span>
        </button>
        <div className="h-6 w-px bg-border-light"></div>
        <div className="text-sm font-medium text-primary">
          Fri, July 3rd
        </div>
      </div>
    </header>
  );
}
