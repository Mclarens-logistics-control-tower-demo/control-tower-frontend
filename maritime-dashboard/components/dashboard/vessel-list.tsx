"use client";
import { useMaritimeStore } from '@/lib/store';
import { Search, Filter, AlertTriangle, Download, Plus, MoreHorizontal, Anchor } from 'lucide-react';
import { cn } from '@/components/ui/card';

export default function VesselList() {
  const { vessels, selectVessel, selectedVesselId, setViewMode } = useMaritimeStore();

  return (
    <div className="absolute inset-x-0 bottom-0 top-[15%] bg-white/95 backdrop-blur-sm shadow-[0_-10px_40px_rgba(0,0,0,0.08)] rounded-t-3xl z-40 flex flex-col animate-in slide-in-from-bottom-10 duration-500 border-t border-slate-200">
      
      {/* List Header */}
      <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white rounded-t-3xl">
         <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-slate-800">Active Shipments <span className="text-slate-500 font-normal text-lg">({vessels.length})</span></h2>
         </div>
         <div className="flex items-center gap-3">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
               <input 
                 type="text" 
                 placeholder="Search in list" 
                 className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-64"
               />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 text-slate-700">
               <Filter size={16} /> Filter
            </button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50">
               <Download size={18} />
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-500/20">
               <Plus size={16} /> Add Shipment
            </button>
         </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 px-6 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
         <div className="col-span-1"><input type="checkbox" className="rounded border-slate-300 bg-white" /></div>
         <div className="col-span-1">Status</div>
         <div className="col-span-2">Container no.</div>
         <div className="col-span-2">Vessel</div>
         <div className="col-span-2">POL / POD</div>
         <div className="col-span-2">Maritime AI™ ETA</div>
         <div className="col-span-2">Route Status</div>
      </div>

      {/* Table Rows */}
      <div className="flex-1 overflow-y-auto">
         {vessels.map((ship) => (
            <div 
              key={ship.id} 
              onClick={() => { selectVessel(ship.id); setViewMode('map'); }}
              className={cn(
                "grid grid-cols-12 px-6 py-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors items-center group",
                selectedVesselId === ship.id ? "bg-blue-50 border-l-4 border-l-blue-600 pl-5" : ""
              )}
            >
               <div className="col-span-1 flex items-center gap-4">
                  <input type="checkbox" className="rounded border-slate-300 bg-white" onClick={(e) => e.stopPropagation()} />
                  <div className="opacity-0 group-hover:opacity-100 text-slate-400"><MoreHorizontal size={16} /></div>
               </div>
               <div className="col-span-1">
                  {ship.voyageStatus === 'Critical' && <div className="p-1.5 bg-red-50 text-red-600 rounded-md inline-block"><AlertTriangle size={16} /></div>}
                  {ship.voyageStatus === 'Warning' && <div className="p-1.5 bg-orange-50 text-orange-600 rounded-md inline-block"><AlertTriangle size={16} /></div>}
                  {ship.voyageStatus === 'On Time' && <div className="p-1.5 bg-green-50 text-green-600 rounded-md inline-block"><Anchor size={16} /></div>}
               </div>
               <div className="col-span-2 font-mono font-medium text-slate-700">{ship.containerId}</div>
               <div className="col-span-2 text-sm text-slate-800 font-medium">{ship.name}</div>
               <div className="col-span-2 text-sm text-slate-600">
                  <div className="flex items-center gap-1"><span className="text-slate-400">L:</span> {ship.pol.code}</div>
                  <div className="flex items-center gap-1"><span className="text-slate-400">D:</span> {ship.pod.code}</div>
               </div>
               <div className="col-span-2 text-sm font-bold text-slate-800">
                  {ship.eta.split(' ')[0]}
                  {ship.etaDelta !== 'On Time' && <div className="text-xs text-red-600 font-normal mt-0.5">{ship.etaDelta} late</div>}
               </div>
               <div className="col-span-2">
                  {ship.voyageStatus !== 'On Time' ? (
                     <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        ship.voyageStatus === 'Critical' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'
                     }`}>
                        {ship.events[0]?.type || ship.voyageStatus}
                     </span>
                  ) : (
                     <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-600">
                        On Schedule
                     </span>
                  )}
               </div>
            </div>
         ))}
      </div>
    </div>
  );
}
