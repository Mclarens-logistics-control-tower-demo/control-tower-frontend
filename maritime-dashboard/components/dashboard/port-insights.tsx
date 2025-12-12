"use client";

import React, { useMemo } from 'react';
import { GLOBAL_PORT_CONGESTION, getCongestionStats, PortCongestion } from '@/lib/port-data';
import { MapPin, TrendingUp, TrendingDown, Minus, AlertTriangle, Clock, Anchor, BarChart3 } from 'lucide-react';

export default function PortInsights() {
  const stats = useMemo(() => getCongestionStats(), []);
  
  const getCongestionColor = (level: PortCongestion['congestionLevel']) => {
    switch (level) {
      case 'Critical': return 'text-red-600 bg-red-50';
      case 'High': return 'text-orange-600 bg-orange-50';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
    }
  };
  
  const getTrendIcon = (trend: PortCongestion['trend']) => {
    switch (trend) {
      case 'increasing': return <TrendingUp size={14} className="text-red-500" />;
      case 'decreasing': return <TrendingDown size={14} className="text-green-500" />;
      case 'stable': return <Minus size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MapPin className="text-blue-600" size={20} />
              Port Insights
            </h2>
            <p className="text-sm text-slate-600 mt-1">Global congestion analysis across major ports</p>
          </div>
          <div className="text-xs text-slate-500">
            Updated {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Global Stats */}
      <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1">Avg Wait Time</div>
            <div className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" />
              {stats.avgWaitTime}h
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1">Vessels Waiting</div>
            <div className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <Anchor size={20} className="text-indigo-600" />
              {stats.totalVesselsWaiting}
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1">Avg Utilization</div>
            <div className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 size={20} className="text-purple-600" />
              {stats.avgUtilization}%
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <div className="text-xs text-slate-500 font-medium mb-1">Critical Ports</div>
            <div className="text-2xl font-bold text-red-600 flex items-center gap-2">
              <AlertTriangle size={20} />
              {stats.critical}
            </div>
          </div>
        </div>
      </div>

      {/* Congestion Breakdown */}
      <div className="px-6 py-3 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-600">Congestion Levels:</span>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-50 text-red-600">
              Critical: {stats.critical}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-600">
              High: {stats.high}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600">
              Moderate: {stats.moderate}
            </span>
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600">
              Low: {stats.low}
            </span>
          </div>
        </div>
      </div>

      {/* Port List */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              <th className="px-6 py-3 text-left">Port</th>
              <th className="px-6 py-3 text-left">Region</th>
              <th className="px-6 py-3 text-center">Congestion</th>
              <th className="px-6 py-3 text-center">Wait Time</th>
              <th className="px-6 py-3 text-center">Vessels</th>
              <th className="px-6 py-3 text-center">Utilization</th>
              <th className="px-6 py-3 text-center">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {GLOBAL_PORT_CONGESTION
              .sort((a, b) => b.congestionScore - a.congestionScore)
              .map((port) => (
                <tr 
                  key={port.id} 
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-800">{port.name}</div>
                    <div className="text-xs text-slate-500">{port.code} • {port.country}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{port.region}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${getCongestionColor(port.congestionLevel)}`}>
                      {port.congestionLevel}
                    </span>
                    <div className="text-xs text-slate-500 mt-1">{port.congestionScore}/100</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="font-medium text-slate-800">{port.avgWaitTime}h</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="font-medium text-slate-800">{port.vesselsWaiting}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${
                            port.berthUtilization >= 95 ? 'bg-red-500' :
                            port.berthUtilization >= 85 ? 'bg-orange-500' :
                            port.berthUtilization >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${port.berthUtilization}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-slate-700">{port.berthUtilization}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      {getTrendIcon(port.trend)}
                      <span className="text-xs text-slate-600 capitalize">{port.trend}</span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
