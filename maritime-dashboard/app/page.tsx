"use client";

import React, { useState, useMemo } from 'react';
import { useMaritimeStore } from '@/lib/store';
import VesselList from '@/components/dashboard/vessel-list';
import MapVisualization from '@/components/map/map-visualization';
import VesselDrawer from '@/components/dashboard/vessel-drawer';
import { 
  Search, Bell, Settings, List, Map as MapIcon, LayoutDashboard, 
  AlertTriangle, Filter, Plus, X, BarChart3, TrendingUp, Activity, MapPin
} from 'lucide-react';

const NOTIFICATIONS = [
  { id: 1, type: 'critical', title: 'Route Deviation', message: 'Vessel ONE TRUTH deviated near Cape of Good Hope', time: '10 min ago' },
  { id: 2, type: 'warning', title: 'Late Departure', message: 'CMA CGM delayed at Singapore', time: '2 hours ago' },
  { id: 3, type: 'info', title: 'Port Congestion', message: 'High congestion reported at Rotterdam', time: '5 hours ago' }
];

export default function DashboardPage() {
  const { viewMode, setViewMode, vessels, selectedVesselId, selectVessel } = useMaritimeStore();
  const [activePage, setActivePage] = useState('tracking');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);

  const selectedVessel = vessels.find(v => v.id === selectedVesselId);

  const filteredVessels = useMemo(() => {
    if (!searchQuery) return vessels;
    const q = searchQuery.toLowerCase();
    return vessels.filter(v => 
      v.name.toLowerCase().includes(q) ||
      v.containerId.toLowerCase().includes(q) ||
      v.imo.toLowerCase().includes(q) ||
      v.pol.code.toLowerCase().includes(q) ||
      v.pod.code.toLowerCase().includes(q)
    );
  }, [searchQuery, vessels]);

  // KPI calculations
  const kpis = useMemo(() => ({
    total: vessels.length,
    onTime: vessels.filter(v => v.voyageStatus === 'On Time').length,
    delayed: vessels.filter(v => v.etaDelta !== 'On Time' && v.etaDelta !== '+0d').length,
    critical: vessels.filter(v => v.voyageStatus === 'Critical').length
  }), [vessels]);

  return (
    <main className="flex flex-col h-screen w-screen bg-[#F5F7FA] overflow-hidden font-sans text-slate-800">
      
      {/* Top Navigation */}
      <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 justify-between flex-shrink-0 z-30 shadow-sm relative">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-sm">M</div>
             <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-slate-900 leading-none">McLARENS</span>
                <span className="text-[10px] text-blue-600 tracking-widest uppercase font-bold">Logistics</span>
             </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button 
              onClick={() => setActivePage('tracking')}
              className={`h-16 border-b-2 px-2 transition-colors ${activePage === 'tracking' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Shipment Tracking
            </button>
            <button 
              onClick={() => setActivePage('analytics')}
              className={`h-16 border-b-2 px-2 transition-colors flex items-center gap-1 ${activePage === 'analytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Analytics <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">BETA</span>
            </button>
            <button 
              onClick={() => setActivePage('ports')}
              className={`h-16 border-b-2 px-2 transition-colors ${activePage === 'ports' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Port Insights
            </button>
          </nav>
        </div>
        
        {/* KPI Pills */}
        <div className="hidden lg:flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-full text-xs">
            <span className="font-bold text-slate-900">{kpis.total}</span>
            <span className="text-slate-500">Total</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 rounded-full text-xs">
            <span className="font-bold text-green-700">{kpis.onTime}</span>
            <span className="text-green-600">On Time</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-full text-xs">
            <span className="font-bold text-orange-700">{kpis.delayed}</span>
            <span className="text-orange-600">Delayed</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 rounded-full text-xs">
            <span className="font-bold text-red-700">{kpis.critical}</span>
            <span className="text-red-600">Critical</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search vessel, container..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-1.5 border border-slate-200 rounded-full text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all w-64"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setShowNotifications(!showNotifications)} className={`p-2 rounded-full transition-colors ${showNotifications ? 'bg-blue-50 text-blue-600' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'}`}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            {showNotifications && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                <div className="px-4 py-2 border-b border-slate-100 font-bold text-sm text-slate-700">Notifications</div>
                {NOTIFICATIONS.map(notif => (
                  <div key={notif.id} className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-50 last:border-0">
                    <div className="flex gap-3">
                      <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.type === 'critical' ? 'bg-red-500' : notif.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'}`}></div>
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{notif.title}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{notif.message}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{notif.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <Settings size={20} />
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="w-9 h-9 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
              <img src="https://i.pravatar.cc/150?u=user" alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {activePage === 'tracking' ? (
          <>
            {/* Map Layer */}
            <div className={`w-full h-full transition-all duration-500 ${viewMode === 'list' ? 'h-1/3' : 'h-full'}`}>
              <MapVisualization />
            </div>

            {/* Detail Panel (Floating Left) - Visible in Map Mode */}
            {viewMode === 'map' && <VesselDrawer />}

            {/* List View (Bottom Sheet) - Visible in List Mode */}
            {viewMode === 'list' && <VesselList />}
            
            {/* View Toggle FAB */}
            <div className="absolute bottom-8 right-8 z-50">
              <button 
                onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
                className="bg-slate-900 text-white p-4 rounded-full shadow-xl hover:bg-slate-700 transition-all hover:scale-105 flex items-center gap-2 font-bold"
              >
                {viewMode === 'map' ? <><List size={20} /> List View</> : <><MapIcon size={20} /> Map View</>}
              </button>
            </div>
          </>
        ) : activePage === 'analytics' ? (
          <div className="p-8 h-full overflow-y-auto bg-slate-50 w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Analytics Dashboard</h2>
              <p className="text-slate-500">Real-time performance metrics</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-400 text-sm font-medium mb-2">Total Shipments</div>
                <div className="text-3xl font-bold text-slate-800">{kpis.total}</div>
                <div className="text-xs text-green-500 mt-2 flex items-center gap-1"><TrendingUp size={14}/> +12% this month</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-400 text-sm font-medium mb-2">On Time Performance</div>
                <div className="text-3xl font-bold text-slate-800">84.2%</div>
                <div className="text-xs text-red-500 mt-2 flex items-center gap-1"><TrendingUp size={14} className="transform rotate-180"/> -2.1% this month</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-400 text-sm font-medium mb-2">Active Deviations</div>
                <div className="text-3xl font-bold text-orange-600">{kpis.critical}</div>
                <div className="text-xs text-orange-500 mt-2">Requires attention</div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <div className="text-slate-400 text-sm font-medium mb-2">Avg. Transit Time</div>
                <div className="text-3xl font-bold text-slate-800">14.2d</div>
                <div className="text-xs text-slate-400 mt-2">Global average</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm h-64 flex flex-col">
                <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2"><BarChart3 size={16}/> Weekly Shipment Volume</h3>
                <div className="flex-1 flex items-end justify-between gap-2">
                  {[40, 65, 30, 80, 55, 90, 45].map((h, i) => (
                    <div key={i} className="w-full bg-blue-100 rounded-t-sm relative group">
                      <div className="absolute bottom-0 w-full bg-blue-600 rounded-t-sm transition-all duration-500 group-hover:bg-blue-700" style={{ height: `${h}%` }}></div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400 font-mono">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                <h3 className="text-sm font-bold text-slate-700 mb-6 flex items-center gap-2"><Activity size={16}/> Live Alerts Breakdown</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600"><div className="w-3 h-3 rounded-full bg-orange-500"></div> Route Deviations</span>
                    <span className="font-bold">45%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-orange-500 w-[45%]"></div></div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> Late Arrivals</span>
                    <span className="font-bold">30%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[30%]"></div></div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600"><div className="w-3 h-3 rounded-full bg-blue-500"></div> Documentation</span>
                    <span className="font-bold">25%</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 w-[25%]"></div></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 h-full overflow-y-auto bg-slate-50 w-full">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Port Insights</h2>
              <p className="text-slate-500">Global congestion analysis</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <p className="text-slate-500 text-center py-12">Port insights view - Coming soon</p>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
