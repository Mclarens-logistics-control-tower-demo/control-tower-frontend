"use client";
import React from 'react';
import { useMaritimeStore } from '@/lib/store';
import { AlertCircle, Clock, LayoutGrid, Anchor, Package } from 'lucide-react';

const CircularProgress = ({ value, label, color = "text-blue-600" }: { value: number, label: string, color?: string }) => {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-gray-100" />
        <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className={color} />
      </svg>
      <div className="absolute flex flex-col items-center text-center">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-[10px] text-gray-500 font-medium uppercase leading-tight">{label}</span>
      </div>
    </div>
  );
};

export default function VesselDrawer() {
  const { selectedVesselId, vessels } = useMaritimeStore();
  const [panelTab, setPanelTab] = React.useState('details');
  
  if (!selectedVesselId) return null;

  const vessel = vessels.find(v => v.id === selectedVesselId);
  if (!vessel) return null;

  return (
    <div className="absolute top-4 left-4 bottom-4 w-96 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl z-20 flex flex-col border border-slate-200 overflow-hidden transition-all duration-300">
      
      {/* Header */}
      <div className="p-6 pb-2 shrink-0">
         <div className="flex items-start justify-between mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1">
               <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Maritime AI™ Predictive ETA</h3>
               </div>
               <div className="flex items-center gap-4">
                  <div className="text-center">
                     <div className="text-xl font-bold text-slate-800">{vessel.eta.split(' ')[0]} {vessel.eta.split(' ')[1]}</div>
                     <div className="text-sm text-slate-500">{vessel.eta.split(' ').slice(2).join(' ')}</div>
                  </div>
                  <div className="h-8 w-px bg-slate-200"></div>
                  <CircularProgress value={vessel.daysToArrival} label="days" color={vessel.voyageStatus === 'Critical' ? 'text-orange-500' : 'text-blue-600'} />
               </div>
               {vessel.etaDelta !== 'On Time' && (
                  <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 p-2 rounded-lg border border-orange-100">
                     <AlertCircle size={12} />
                     {vessel.etaDelta} late
                  </div>
               )}
            </div>
         </div>

         {/* Tabs */}
         <div className="flex border-b border-slate-200 mb-4">
            {['details', 'events', 'cargo'].map(tab => (
               <button 
                  key={tab}
                  onClick={() => setPanelTab(tab)}
                  className={`flex-1 pb-3 text-sm font-bold capitalize transition-colors border-b-2 ${panelTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
               >
                  {tab}
               </button>
            ))}
         </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 scrollbar-thin scrollbar-thumb-slate-200">
         
         {/* DETAILS TAB */}
         {panelTab === 'details' && (
            <div className="animate-in fade-in duration-300">
               <div className="bg-slate-50 rounded-lg p-3 mb-6 border border-slate-100">
                  <div className="text-xs text-slate-400 mb-1">Container no.</div>
                  <div className="flex items-center justify-between">
                     <div className="font-mono font-bold text-slate-700 flex items-center gap-2">
                        <LayoutGrid size={14} className="text-slate-400" />
                        {vessel.containerId}
                     </div>
                  </div>
               </div>

               <div className="mb-8">
                  <div className="flex justify-between items-end mb-2">
                     <div className="text-left">
                        <div className="flex items-center gap-1 text-blue-600 mb-1 text-xs"><div className="w-2 h-2 rounded-full bg-blue-600"></div> From POL</div>
                        <div className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                           {vessel.pol.code}
                        </div>
                     </div>
                     <div className="text-right">
                        <div className="flex items-center justify-end gap-1 text-slate-400 mb-1 text-xs">To POD <div className="w-2 h-2 rounded-full border border-slate-300"></div></div>
                        <div className="font-bold text-slate-800 flex items-center justify-end gap-2 text-sm">
                           {vessel.pod.code}
                        </div>
                     </div>
                  </div>
                  
                  <div className="h-1.5 bg-slate-200 w-full rounded-full overflow-hidden relative">
                     <div className="h-full bg-blue-500 rounded-full relative transition-all duration-1000" style={{ width: `${vessel.progress}%` }}></div>
                  </div>
                  <div className="flex justify-center mt-2">
                     <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full border border-slate-200">In Transit</span>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 text-sm border-t border-slate-100 pt-4">
                  <div>
                     <div className="text-slate-400 text-xs mb-1">Vessel Name</div>
                     <div className="font-bold text-blue-600">{vessel.name}</div>
                  </div>
                  <div>
                     <div className="text-slate-400 text-xs mb-1">IMO</div>
                     <div className="font-bold text-slate-700 font-mono">{vessel.imo}</div>
                  </div>
                  <div>
                     <div className="text-slate-400 text-xs mb-1">Speed</div>
                     <div className="font-bold text-slate-700">{vessel.speed} kn</div>
                  </div>
                  <div>
                     <div className="text-slate-400 text-xs mb-1">Last AIS</div>
                     <div className="font-bold text-slate-700 text-xs">{new Date(vessel.lastUpdate).toLocaleTimeString()}</div>
                  </div>
               </div>
            </div>
         )}

         {/* EVENTS TAB */}
         {panelTab === 'events' && (
            <div className="space-y-6 animate-in fade-in duration-300 relative">
               {/* Vertical Line */}
               <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-slate-200 z-0"></div>
               
               {vessel.events?.map((event, idx) => (
                  <div key={idx} className="relative z-10 flex gap-4">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm shrink-0 ${event.status === 'completed' ? 'bg-green-100 text-green-600' : event.status === 'active' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                        {event.status === 'completed' ? <Anchor size={16}/> : <Clock size={16}/>}
                     </div>
                     <div className="flex-1 bg-white p-3 rounded-lg border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-start mb-1">
                           <div className={`font-bold text-sm ${event.alert ? 'text-orange-600' : 'text-slate-700'}`}>{event.type}</div>
                           {event.alert && <AlertCircle size={14} className="text-orange-500"/>}
                        </div>
                        <div className="text-xs text-slate-500">{event.description}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">{event.date}</div>
                     </div>
                  </div>
               ))}
            </div>
         )}

         {/* CARGO TAB */}
         {panelTab === 'cargo' && vessel.cargo && (
            <div className="animate-in fade-in duration-300 space-y-4">
               <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                  <div className="flex items-center gap-3 mb-2">
                     <Package className="text-blue-600" size={20}/>
                     <span className="font-bold text-blue-900">Cargo Manifest</span>
                  </div>
                  <div className="text-sm text-blue-700">{vessel.cargo.commodity}</div>
               </div>
               
               <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-slate-100 rounded-lg">
                     <div className="text-xs text-slate-400 mb-1">Type</div>
                     <div className="font-bold text-slate-700">{vessel.cargo.type}</div>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-lg">
                     <div className="text-xs text-slate-400 mb-1">Weight</div>
                     <div className="font-bold text-slate-700">{vessel.cargo.weight}</div>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-lg">
                     <div className="text-xs text-slate-400 mb-1">Total Pieces</div>
                     <div className="font-bold text-slate-700">{vessel.cargo.pieces}</div>
                  </div>
                  <div className="p-3 border border-slate-100 rounded-lg">
                     <div className="text-xs text-slate-400 mb-1">Seal No.</div>
                     <div className="font-mono font-bold text-slate-700">{vessel.cargo.seal}</div>
                  </div>
               </div>
            </div>
         )}
      </div>
    </div>
  );
}
