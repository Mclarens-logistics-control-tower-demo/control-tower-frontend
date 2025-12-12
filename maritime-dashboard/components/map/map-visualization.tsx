"use client";

import React, { useMemo } from 'react';
import Map from 'react-map-gl/maplibre';
import DeckGL from '@deck.gl/react';
import { ScatterplotLayer, IconLayer, PathLayer } from '@deck.gl/layers';
import { useMaritimeStore } from '@/lib/store';
import 'maplibre-gl/dist/maplibre-gl.css';

// Custom Map Style - Light theme for Windward
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export default function MapVisualization() {
  const { vessels, viewport, setViewport, selectVessel, selectedVesselId } = useMaritimeStore();

  const layers = useMemo(() => {
    const selectedVessel = vessels.find(v => v.id === selectedVesselId);
    
    return [
      // 1. Original Planned Path (Orange Dashed - only for selected vessel with deviation)
      new PathLayer({
        id: 'original-routes',
        data: selectedVessel && selectedVessel.originalPath ? [selectedVessel] : [],
        getPath: (d: any) => d.originalPath.map((p: any) => [p.longitude, p.latitude]),
        getColor: [249, 115, 22], // Orange-500
        getWidth: 2,
        widthMinPixels: 1,
        getDashArray: [4, 2],
        extensions: [] // Dashed line extension would go here in full implementation
      }),

      // 2. Predicted Path Layer (Grey Dashed)
      new PathLayer({
        id: 'predicted-routes',
        data: vessels,
        getPath: (d: any) => d.predictedPath.map((p: any) => [p.longitude, p.latitude]),
        getColor: [100, 116, 139], // Slate-500
        getWidth: 2,
        widthMinPixels: 1,
        getDashArray: [2, 3],
        extensions: [] 
      }),

      // 3. Historical Track Layer (Solid)
      new PathLayer({
        id: 'active-routes',
        data: vessels,
        getPath: (d: any) => d.path.map((p: any) => [p.longitude, p.latitude]),
        getColor: (d: any) => {
           if (d.id === selectedVesselId) return [14, 165, 233]; // Blue for selected
           return d.riskScore > 70 ? [239, 68, 68] : [14, 165, 233]; // Red if high risk, Blue otherwise
        },
        getWidth: (d: any) => d.id === selectedVesselId ? 4 : 2,
        widthMinPixels: 2,
        capRounded: true,
        jointRounded: true,
      }),

      // 4. POL/POD Markers (Only for selected vessel)
      ...(selectedVesselId ? [new ScatterplotLayer({
        id: 'pol-pod-markers',
        data: [
            { ...selectedVessel?.pol, type: 'POL' },
            { ...selectedVessel?.pod, type: 'POD' }
        ],
        getPosition: (d: any) => [d.position.longitude, d.position.latitude],
        getRadius: 10000, // meters
        radiusMinPixels: 5,
        getFillColor: (d: any) => d.type === 'POL' ? [59, 130, 246] : [16, 185, 129], // Blue POL, Green POD
        stroked: true,
        getLineColor: [255, 255, 255],
        lineWidthMinPixels: 2
      })] : []),

      // 5. Vessel Icon Layer
      new IconLayer({
        id: 'vessel-icons',
        data: vessels,
        getPosition: (d: any) => [d.position.longitude, d.position.latitude],
        getIcon: (d: any) => ({
          url: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icons.png', // Placeholder sprite
          width: 128,
          height: 128,
          anchorY: 128,
          mask: true
        }),
        getSize: (d: any) => d.id === selectedVesselId ? 45 : 30, // Highlight selected
        getColor: (d: any) => {
          if (d.riskScore >= 80) return [239, 68, 68]; // Critical (Red)
          if (d.riskScore >= 50) return [245, 158, 11]; // Warning (Amber)
          return [20, 184, 166]; // Safe (Teal)
        },
        pickable: true,
        onClick: ({ object }) => selectVessel(object.id),
        updateTriggers: {
          getSize: selectedVesselId
        }
      }),
      
      // 6. Halo effect for selected vessel
      ...(selectedVesselId ? [new ScatterplotLayer({
        id: 'selection-halo',
        data: vessels.filter(v => v.id === selectedVesselId),
        getPosition: (d: any) => [d.position.longitude, d.position.latitude],
        getRadius: 50000, // meters
        stroked: true,
        filled: true,
        getFillColor: [14, 165, 233, 50],
        getLineColor: [14, 165, 233],
        lineWidthMinPixels: 2,
      })] : [])
    ];
  }, [vessels, selectedVesselId, selectVessel]);

  return (
    <div className="relative w-full h-full bg-slate-100">
      <DeckGL
        initialViewState={viewport}
        controller={true}
        layers={layers}
        onViewStateChange={({ viewState }) => setViewport(viewState)}
        getTooltip={({ object }: any) => object && {
            html: `
                <div class="p-2 bg-white text-slate-800 text-xs rounded shadow-lg border border-slate-200">
                    <div class="font-bold mb-1">${object.name}</div>
                    <div>Status: <span class="${object.riskScore > 50 ? 'text-red-600' : 'text-green-600'}">${object.voyageStatus}</span></div>
                    <div>Speed: ${object.speed} kn</div>
                </div>
            `
        }}
      >
        <Map
          mapStyle={MAP_STYLE}
          reuseMaps
          attributionControl={false}
        />
      </DeckGL>

      {/* Legend Overlay */}
      <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md border border-slate-200 p-4 rounded-lg text-xs text-slate-700 shadow-xl z-10">
        <h4 className="font-bold text-slate-800 mb-2">Route Legend</h4>
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-blue-600 rounded-full"></div>
                <span>Active Route</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-slate-400 border-t border-dashed border-slate-400"></div>
                <span>Predicted Path</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-4 h-1 bg-orange-500 border-t border-dashed border-orange-400"></div>
                <span>Planned / Deviation</span>
            </div>
            <div className="mt-2 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-600"></div> Safe
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-orange-500"></div> Warning
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-600"></div> Critical
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}