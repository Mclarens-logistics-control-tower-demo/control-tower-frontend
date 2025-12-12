import { create } from 'zustand';
import { Vessel } from './types';
import { MOCK_VESSELS } from './mock-data';

interface MaritimeStore {
  vessels: Vessel[];
  selectedVesselId: string | null;
  viewMode: 'map' | 'list';
  viewport: {
    longitude: number;
    latitude: number;
    zoom: number;
    pitch: number;
    bearing: number;
    transitionDuration?: number;
  };
  // Actions
  selectVessel: (id: string | null) => void;
  setViewMode: (mode: 'map' | 'list') => void;
  setViewport: (view: any) => void;
  updateVesselPosition: (id: string, pos: {lat: number, lng: number}) => void;
}

export const useMaritimeStore = create<MaritimeStore>((set) => ({
  vessels: MOCK_VESSELS,
  selectedVesselId: null,
  viewMode: 'map',
  viewport: {
    longitude: -30,
    latitude: 35,
    zoom: 2,
    pitch: 0,
    bearing: 0
  },
  selectVessel: (id) => set((state) => {
    // If selecting a vessel, fly the camera to it
    if (id) {
      const vessel = state.vessels.find(v => v.id === id);
      if (vessel) {
        return { 
          selectedVesselId: id,
          viewport: {
           ...state.viewport,
            longitude: vessel.position.longitude,
            latitude: vessel.position.latitude,
            zoom: 5,
            transitionDuration: 1000
          }
        };
      }
    }
    return { selectedVesselId: id };
  }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setViewport: (view) => set({ viewport: view }),
  updateVesselPosition: (id, pos) => set((state) => ({
    vessels: state.vessels.map(v => 
      v.id === id ? {...v, position: { longitude: pos.lng, latitude: pos.lat } } : v
    )
  }))
}));
