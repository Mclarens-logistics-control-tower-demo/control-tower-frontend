import { Vessel } from './types';

// Helper to generate a curved path for visualization
const generatePath = (start: [number, number], end: [number, number], steps = 20) => {
  const path = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    // Simple linear interpolation for now, can be improved with great circle or bezier
    path.push({
      longitude: start[0] + (end[0] - start[0]) * t,
      latitude: start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * 5 // Slight curve
    });
  }
  return path;
};

export const MOCK_VESSELS: Vessel[] = [
  {
    id: "v_001",
    name: "ONE TRUTH",
    imo: "9780873",
    flag: "PA",
    type: "Container Ship",
    status: "Underway",
    voyageStatus: "Critical",
    riskScore: 85,
    containerId: "MRKU4761090",
    pol: { name: "Yantian", code: "CNYTN", position: { longitude: 114.2, latitude: 22.5 } },
    pod: { name: "Southampton", code: "GBSOU", position: { longitude: -1.4, latitude: 50.9 } },
    position: { longitude: 60.0, latitude: -20.0 }, // Indian Ocean
    heading: 240,
    speed: 14.5,
    lastUpdate: "2024-01-12T10:30:00Z",
    eta: "2024-01-17 22:49",
    originalEta: "2024-01-04 10:00",
    etaDelta: "+13d",
    daysToArrival: 20,
    progress: 65,
    path: [
      ...generatePath([114.2, 22.5], [103.8, 1.35]), // Yantian -> Singapore
      ...generatePath([103.8, 1.35], [60.0, -20.0]), // Singapore -> Current
    ],
    predictedPath: generatePath([60.0, -20.0], [-1.4, 50.9]), // Current -> UK (via Cape)
    originalPath: generatePath([60.0, -20.0], [32.5, 30.0]), // Current -> Suez (Planned)
    events: [
      {
        id: "e_001",
        type: "DEVIATION",
        severity: "CRITICAL",
        date: "2024-01-10",
        description: "Route deviation detected. Vessel avoiding Red Sea.",
        location: "Indian Ocean"
      }
    ]
  },
  {
    id: "v_002",
    name: "MSC GULSUN",
    imo: "9839430",
    flag: "PA",
    type: "Container Ship",
    status: "Underway",
    voyageStatus: "On Time",
    riskScore: 10,
    containerId: "MSDU8581684",
    pol: { name: "New York", code: "USNYC", position: { longitude: -74.0, latitude: 40.7 } },
    pod: { name: "Rotterdam", code: "NLRTM", position: { longitude: 4.4, latitude: 51.9 } },
    position: { longitude: -35.0, latitude: 45.0 }, // Atlantic
    heading: 75,
    speed: 18.2,
    lastUpdate: "2024-04-05T08:00:00Z",
    eta: "2024-04-09 00:00",
    originalEta: "2024-04-09 00:00",
    etaDelta: "On Time",
    daysToArrival: 5,
    progress: 80,
    path: generatePath([-74.0, 40.7], [-35.0, 45.0]),
    predictedPath: generatePath([-35.0, 45.0], [4.4, 51.9]),
    events: [
      {
        id: '1',
        type: 'Departure',
        description: 'Vessel departed from origin port',
        date: '25 Mar 08:00 AM',
        status: 'completed'
      },
      {
        id: '2',
        type: 'In Transit',
        description: 'Vessel currently in transit',
        date: 'Now',
        status: 'active'
      },
      {
        id: '3',
        type: 'Arrival',
        description: 'Expected arrival at destination',
        date: '09 Apr 12:00 AM',
        status: 'pending'
      }
    ],
    cargo: {
      type: '20GP',
      weight: '14,200 kg',
      commodity: 'Auto Parts',
      pieces: 450,
      seal: 'MSC-2211'
    }
  },
  {
    id: "v_003",
    name: "CMA CGM T. ROOSEVELT",
    imo: "9780873",
    flag: "MT",
    type: "Container Ship",
    status: "Underway",
    voyageStatus: "Warning",
    riskScore: 45,
    containerId: "CMAU5240288",
    pol: { name: "Singapore", code: "SGSIN", position: { longitude: 103.8, latitude: 1.35 } },
    pod: { name: "Yantian", code: "CNYTN", position: { longitude: 114.2, latitude: 22.5 } },
    position: { longitude: 108.0, latitude: 10.0 }, // South China Sea
    heading: 30,
    speed: 12.0,
    lastUpdate: "2024-04-01T14:20:00Z",
    eta: "2024-04-09 20:02",
    originalEta: "2024-04-08 10:00",
    etaDelta: "+1d",
    daysToArrival: 12,
    progress: 20,
    path: generatePath([103.8, 1.35], [108.0, 10.0]),
    predictedPath: generatePath([108.0, 10.0], [114.2, 22.5]),
    events: [
      {
        id: "e_002",
        type: "LOITERING",
        severity: "MEDIUM",
        date: "2024-03-30",
        description: "Late departure from Singapore",
        location: "Singapore Anchorage"
      }
    ]
  }
];
