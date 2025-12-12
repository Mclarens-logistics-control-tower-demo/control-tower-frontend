export type RiskLevel = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
export type VoyageStatus = "On Time" | "Late" | "Critical" | "Warning" | "Early";

export interface Coordinate {
  longitude: number;
  latitude: number;
}

export interface RiskEvent {
  id: string;
  type: string;
  severity?: RiskLevel;
  date: string;
  description: string;
  location?: string;
  status?: 'completed' | 'active' | 'pending';
  alert?: boolean;
}

export interface CargoInfo {
  type: string;
  weight: string;
  commodity: string;
  pieces: number;
  seal: string;
}

export interface Vessel {
  id: string;
  name: string;
  imo: string;
  flag: string;
  type: string;
  status: "Underway" | "Moored" | "Anchored";
  voyageStatus: VoyageStatus; // e.g. "Critical", "On Time"
  riskScore: number; // 0-100
  
  // Cargo/Shipment Info
  containerId: string;
  pol: { name: string; code: string; position: Coordinate }; // Port of Loading
  pod: { name: string; code: string; position: Coordinate }; // Port of Discharge
  
  // Position & Route
  position: Coordinate;
  heading: number;
  speed: number;
  lastUpdate: string; // ISO string
  
  // Timing
  eta: string;
  originalEta: string;
  etaDelta: string; // e.g. "+7d"
  daysToArrival: number;
  progress: number; // 0-100
  
  path: Coordinate[]; // Historical track
  predictedPath: Coordinate[]; // Future route
  originalPath?: Coordinate[]; // The original planned path (for deviation comparison)
  
  events: RiskEvent[];
  cargo?: CargoInfo;
  alert?: string;
}
