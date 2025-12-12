import React from 'react';
import { Ship, LayoutDashboard, Anchor, FileText, Settings, Bell } from 'lucide-react';

export function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center py-6 bg-ocean-900 border-r border-ocean-700 z-20">
      <div className="mb-8 p-2 bg-brand-blue/10 rounded-xl text-brand-blue">
        <Ship size={24} />
      </div>
      
      <nav className="flex-1 space-y-4 w-full px-2">
        <SidebarItem icon={<LayoutDashboard size={20} />} active />
        <SidebarItem icon={<Anchor size={20} />} />
        <SidebarItem icon={<FileText size={20} />} />
      </nav>

      <div className="space-y-4 w-full px-2">
         <SidebarItem icon={<Bell size={20} />} />
         <SidebarItem icon={<Settings size={20} />} />
         <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-blue to-purple-500 mx-auto mt-4" />
      </div>
    </aside>
  );
}

function SidebarItem({ icon, active }: { icon: React.ReactNode, active?: boolean }) {
  return (
    <button className={`w-full p-3 rounded-lg transition-colors flex justify-center ${
      active ? 'bg-ocean-800 text-brand-blue' : 'text-slate-400 hover:text-slate-100 hover:bg-ocean-800'
    }`}>
      {icon}
    </button>
  );
}
