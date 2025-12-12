"use client";

import React from 'react';
import { useMaritimeStore } from '@/lib/store';
import VesselList from '@/components/dashboard/vessel-list';
import MapVisualization from '@/components/map/map-visualization';
import VesselDrawer from '@/components/dashboard/vessel-drawer';
import { Search, Bell, Settings, List, Map as MapIcon, LayoutDashboard, Anchor, FileText } from 'lucide-react';

export default function DashboardPage() {
  const { viewMode, setViewMode } = useMaritimeStore();

  return (
    <main className="flex flex-col h-screen w-screen bg-canvas overflow-hidden font-sans text-text-main selection:bg-brand-primary/20">
      
      {/* 1. Top Navigation Bar */}
      <header className="h-16 bg-canvas-white border-b border-border flex items-center px-6 justify-between flex-shrink-0 z-30 shadow-sm">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">M</div>
             <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-text-main leading-none">McLARENS</span>
                <span className="text-[10px] text-brand-primary tracking-widest uppercase font-bold">Logistics</span>
             </div>
          </div>
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button 
              onClick={() => setViewMode('map')}
              className={`h-16 border-b-2 px-4 transition-colors flex items-center gap-2 ${viewMode === 'map' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-text-muted hover:text-text-main'}`}
            >
              <MapIcon size={16} />
              Shipment Tracking
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`h-16 border-b-2 px-4 transition-colors flex items-center gap-2 ${viewMode === 'list' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-text-muted hover:text-text-main'}`}
            >
              <List size={16} />
              List View
            </button>
            <button className="h-16 border-b-2 border-transparent px-4 text-text-muted hover:text-text-main flex items-center gap-2">
              <LayoutDashboard size={16} />
              Analytics <span className="text-[10px] bg-canvas text-text-muted px-1.5 py-0.5 rounded border border-border">BETA</span>
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search shipments..." 
              className="bg-ocean-950 border border-ocean-700 rounded-full pl-10 pr-4 py-1.5 text-sm text-slate-200 focus:outline-none focus:border-brand-blue w-64"
            />
          </div>
          <button className="p-2 text-slate-400 hover:text-white relative">
             <Bell size={20} />
             <span className="absolute top-2 right-2 w-2 h-2 bg-brand-red rounded-full border border-ocean-900"></span>
          </button>
          <button className="p-2 text-slate-400 hover:text-white">
             <Settings size={20} />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-ocean-700">
            <div className="w-8 h-8 bg-linear-to-tr from-brand-blue to-purple-500 rounded-full border border-ocean-700 shadow-inner" />
          </div>
        </div>
      </header>
      
      {/* 2. Main Workspace */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {/* Map Layer (Always rendered, hidden in list mode if needed, or just covered) */}
        <div className={`w-full h-full transition-all duration-500 ${viewMode === 'list' ? 'h-[40%]' : 'h-full'}`}>
          <MapVisualization />
        </div>

        {/* Overlays */}
        
        {/* Detail Panel (Floating Left) - Visible in Map Mode */}
        {viewMode === 'map' && <VesselDrawer />}

        {/* List View (Bottom Sheet) - Visible in List Mode */}
        {viewMode === 'list' && <VesselList />}
        
        {/* View Toggle FAB (Mobile/Quick Access) */}
        <div className="absolute bottom-8 right-8 z-50 flex flex-col gap-3">
           <button 
             onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
             className="bg-ocean-900 text-white p-4 rounded-full shadow-xl border border-ocean-700 hover:bg-ocean-800 transition-all hover:scale-105 flex items-center gap-2 font-bold"
           >
              {viewMode === 'map' ? <List size={20} /> : <MapIcon size={20} />}
           </button>
        </div>

      </div>
    </main>
  );
}
