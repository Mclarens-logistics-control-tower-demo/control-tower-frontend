export interface PortCongestion {
  id: string;
  name: string;
  code: string;
  country: string;
  region: string;
  coordinates: { longitude: number; latitude: number };
  congestionLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  congestionScore: number; // 0-100
  avgWaitTime: number; // hours
  vesselsWaiting: number;
  berthUtilization: number; // percentage
  trend: 'increasing' | 'stable' | 'decreasing';
  lastUpdated: string;
}

export const GLOBAL_PORT_CONGESTION: PortCongestion[] = [
  {
    id: 'port_001',
    name: 'Shanghai',
    code: 'CNSHA',
    country: 'China',
    region: 'Asia-Pacific',
    coordinates: { longitude: 121.5, latitude: 31.2 },
    congestionLevel: 'High',
    congestionScore: 78,
    avgWaitTime: 18.5,
    vesselsWaiting: 34,
    berthUtilization: 92,
    trend: 'stable',
    lastUpdated: '2025-12-12T08:30:00Z'
  },
  {
    id: 'port_002',
    name: 'Singapore',
    code: 'SGSIN',
    country: 'Singapore',
    region: 'Asia-Pacific',
    coordinates: { longitude: 103.8, latitude: 1.35 },
    congestionLevel: 'Moderate',
    congestionScore: 62,
    avgWaitTime: 12.3,
    vesselsWaiting: 28,
    berthUtilization: 85,
    trend: 'decreasing',
    lastUpdated: '2025-12-12T08:45:00Z'
  },
  {
    id: 'port_003',
    name: 'Rotterdam',
    code: 'NLRTM',
    country: 'Netherlands',
    region: 'Europe',
    coordinates: { longitude: 4.5, latitude: 51.9 },
    congestionLevel: 'Critical',
    congestionScore: 89,
    avgWaitTime: 26.7,
    vesselsWaiting: 42,
    berthUtilization: 97,
    trend: 'increasing',
    lastUpdated: '2025-12-12T09:00:00Z'
  },
  {
    id: 'port_004',
    name: 'Los Angeles',
    code: 'USLAX',
    country: 'United States',
    region: 'North America',
    coordinates: { longitude: -118.2, latitude: 33.7 },
    congestionLevel: 'High',
    congestionScore: 81,
    avgWaitTime: 21.4,
    vesselsWaiting: 37,
    berthUtilization: 94,
    trend: 'stable',
    lastUpdated: '2025-12-12T07:15:00Z'
  },
  {
    id: 'port_005',
    name: 'Hamburg',
    code: 'DEHAM',
    country: 'Germany',
    region: 'Europe',
    coordinates: { longitude: 10.0, latitude: 53.5 },
    congestionLevel: 'Moderate',
    congestionScore: 58,
    avgWaitTime: 10.8,
    vesselsWaiting: 19,
    berthUtilization: 79,
    trend: 'stable',
    lastUpdated: '2025-12-12T09:10:00Z'
  },
  {
    id: 'port_006',
    name: 'Antwerp',
    code: 'BEANR',
    country: 'Belgium',
    region: 'Europe',
    coordinates: { longitude: 4.4, latitude: 51.3 },
    congestionLevel: 'High',
    congestionScore: 74,
    avgWaitTime: 16.2,
    vesselsWaiting: 31,
    berthUtilization: 88,
    trend: 'increasing',
    lastUpdated: '2025-12-12T09:05:00Z'
  },
  {
    id: 'port_007',
    name: 'Busan',
    code: 'KRPUS',
    country: 'South Korea',
    region: 'Asia-Pacific',
    coordinates: { longitude: 129.0, latitude: 35.1 },
    congestionLevel: 'Low',
    congestionScore: 42,
    avgWaitTime: 6.5,
    vesselsWaiting: 12,
    berthUtilization: 68,
    trend: 'decreasing',
    lastUpdated: '2025-12-12T08:20:00Z'
  },
  {
    id: 'port_008',
    name: 'Dubai',
    code: 'AEDXB',
    country: 'UAE',
    region: 'Middle East',
    coordinates: { longitude: 55.3, latitude: 25.2 },
    congestionLevel: 'Moderate',
    congestionScore: 55,
    avgWaitTime: 9.7,
    vesselsWaiting: 22,
    berthUtilization: 76,
    trend: 'stable',
    lastUpdated: '2025-12-12T08:50:00Z'
  },
  {
    id: 'port_009',
    name: 'Hong Kong',
    code: 'HKHKG',
    country: 'Hong Kong',
    region: 'Asia-Pacific',
    coordinates: { longitude: 114.2, latitude: 22.3 },
    congestionLevel: 'High',
    congestionScore: 76,
    avgWaitTime: 17.3,
    vesselsWaiting: 33,
    berthUtilization: 91,
    trend: 'stable',
    lastUpdated: '2025-12-12T08:35:00Z'
  },
  {
    id: 'port_010',
    name: 'New York',
    code: 'USNYC',
    country: 'United States',
    region: 'North America',
    coordinates: { longitude: -74.0, latitude: 40.7 },
    congestionLevel: 'Moderate',
    congestionScore: 64,
    avgWaitTime: 13.5,
    vesselsWaiting: 25,
    berthUtilization: 82,
    trend: 'decreasing',
    lastUpdated: '2025-12-12T07:30:00Z'
  },
  {
    id: 'port_011',
    name: 'Felixstowe',
    code: 'GBFXT',
    country: 'United Kingdom',
    region: 'Europe',
    coordinates: { longitude: 1.3, latitude: 51.9 },
    congestionLevel: 'Critical',
    congestionScore: 91,
    avgWaitTime: 28.4,
    vesselsWaiting: 45,
    berthUtilization: 98,
    trend: 'increasing',
    lastUpdated: '2025-12-12T09:15:00Z'
  },
  {
    id: 'port_012',
    name: 'Long Beach',
    code: 'USLGB',
    country: 'United States',
    region: 'North America',
    coordinates: { longitude: -118.2, latitude: 33.8 },
    congestionLevel: 'High',
    congestionScore: 79,
    avgWaitTime: 19.8,
    vesselsWaiting: 36,
    berthUtilization: 93,
    trend: 'stable',
    lastUpdated: '2025-12-12T07:20:00Z'
  }
];

export const getPortsByCongestionLevel = (level: PortCongestion['congestionLevel']) => {
  return GLOBAL_PORT_CONGESTION.filter(port => port.congestionLevel === level);
};

export const getPortsByRegion = (region: string) => {
  return GLOBAL_PORT_CONGESTION.filter(port => port.region === region);
};

export const getCongestionStats = () => {
  const total = GLOBAL_PORT_CONGESTION.length;
  const critical = GLOBAL_PORT_CONGESTION.filter(p => p.congestionLevel === 'Critical').length;
  const high = GLOBAL_PORT_CONGESTION.filter(p => p.congestionLevel === 'High').length;
  const moderate = GLOBAL_PORT_CONGESTION.filter(p => p.congestionLevel === 'Moderate').length;
  const low = GLOBAL_PORT_CONGESTION.filter(p => p.congestionLevel === 'Low').length;
  
  const avgWaitTime = GLOBAL_PORT_CONGESTION.reduce((sum, p) => sum + p.avgWaitTime, 0) / total;
  const totalVesselsWaiting = GLOBAL_PORT_CONGESTION.reduce((sum, p) => sum + p.vesselsWaiting, 0);
  const avgUtilization = GLOBAL_PORT_CONGESTION.reduce((sum, p) => sum + p.berthUtilization, 0) / total;
  
  return {
    total,
    critical,
    high,
    moderate,
    low,
    avgWaitTime: Math.round(avgWaitTime * 10) / 10,
    totalVesselsWaiting,
    avgUtilization: Math.round(avgUtilization * 10) / 10
  };
};
