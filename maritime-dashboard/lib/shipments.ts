import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  onSnapshot, query, orderBy, serverTimestamp, setDoc, getDocs, limit
} from "firebase/firestore";
import { db } from "./firebase";
import type { Vessel } from "./types";

export type FirestoreShipment = {
  id?: string;
  vesselName: string;
  imo?: string;
  containerId?: string;
  polCode: string;
  podCode: string;
  polLat?: number;
  polLon?: number;
  podLat?: number;
  podLon?: number;
  carrierEta?: string;
  predictedEta?: string;
  etaDelta?: string;
  status?: "SAFE" | "WARNING" | "CRITICAL";
  riskScore?: number;
  voyageStatus?: "On Time" | "Warning" | "Critical";
  speed?: number;
  progress?: number;
  daysToArrival?: number;
  lastUpdate?: string;
  createdAt?: any;
  updatedAt?: any;
};

const orgId = () => process.env.NEXT_PUBLIC_ORG_ID || "mclarens-logistics";

const shipmentsCol = () => collection(db, "orgs", orgId(), "shipments");

export function subscribeShipments(cb: (rows: FirestoreShipment[]) => void) {
  const q = query(shipmentsCol(), orderBy("updatedAt", "desc"));
  return onSnapshot(q, (snap) => {
    const rows = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) })) as FirestoreShipment[];
    cb(rows);
  });
}

export async function createShipment(data: FirestoreShipment) {
  return addDoc(shipmentsCol(), {
    ...data,
    status: data.status ?? "SAFE",
    riskScore: data.riskScore ?? 12,
    voyageStatus: data.voyageStatus ?? "On Time",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateShipment(id: string, patch: Partial<FirestoreShipment>) {
  return updateDoc(doc(db, "orgs", orgId(), "shipments", id), {
    ...patch,
    updatedAt: serverTimestamp(),
  });
}

export async function removeShipment(id: string) {
  return deleteDoc(doc(db, "orgs", orgId(), "shipments", id));
}

/** Convert Firestore data to Vessel type for UI */
export function firestoreToVessel(fs: FirestoreShipment): Vessel {
  const now = new Date();
  const etaDate = fs.predictedEta ? new Date(fs.predictedEta) : new Date(now.getTime() + 10 * 86400000);
  const daysToArrival = Math.ceil((etaDate.getTime() - now.getTime()) / 86400000);
  
  return {
    id: fs.id || '',
    name: fs.vesselName,
    imo: fs.imo || `IMO${Math.floor(1000000 + Math.random() * 9000000)}`,
    containerId: fs.containerId || `MCLU${Math.floor(1000000 + Math.random() * 9000000)}`,
    flag: 'US',
    type: 'Container Ship',
    status: 'Underway',
    heading: 90,
    position: {
      latitude: fs.polLat || 1.264,
      longitude: fs.polLon || 103.84,
    },
    pol: {
      code: fs.polCode,
      name: fs.polCode,
      position: { latitude: fs.polLat || 1.264, longitude: fs.polLon || 103.84 }
    },
    pod: {
      code: fs.podCode,
      name: fs.podCode,
      position: { latitude: fs.podLat || 22.575, longitude: fs.podLon || 114.3 }
    },
    originalEta: fs.carrierEta || etaDate.toISOString(),
    eta: etaDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    etaDelta: fs.etaDelta || 'On Time',
    speed: fs.speed || 14,
    voyageStatus: fs.voyageStatus || 'On Time',
    riskScore: fs.riskScore || 12,
    progress: fs.progress || 45,
    daysToArrival: fs.daysToArrival || daysToArrival,
    lastUpdate: fs.lastUpdate || new Date().toISOString(),
    path: generatePath(fs.polLat || 1.264, fs.polLon || 103.84, fs.podLat || 22.575, fs.podLon || 114.3, 0.45),
    predictedPath: generatePath(fs.polLat || 1.264, fs.polLon || 103.84, fs.podLat || 22.575, fs.podLon || 114.3, 0.8),
    events: [
      {
        id: '1',
        type: 'Departure',
        description: `Departed from ${fs.polCode}`,
        date: new Date(now.getTime() - 5 * 86400000).toISOString(),
        status: 'completed'
      },
      {
        id: '2',
        type: 'In Transit',
        description: 'Vessel in transit',
        date: new Date().toISOString(),
        status: 'active'
      },
      {
        id: '3',
        type: 'Arrival',
        description: `Expected arrival at ${fs.podCode}`,
        date: etaDate.toISOString(),
        status: 'pending'
      }
    ],
    cargo: {
      type: 'Container',
      weight: '24,000 kg',
      commodity: 'General Cargo',
      pieces: Math.floor(20 + Math.random() * 80),
      seal: `SL${Math.floor(100000 + Math.random() * 900000)}`
    }
  };
}

function generatePath(lat1: number, lon1: number, lat2: number, lon2: number, progress: number) {
  const points = [];
  const steps = 20;
  for (let i = 0; i <= steps * progress; i++) {
    const t = i / steps;
    points.push({
      latitude: lat1 + (lat2 - lat1) * t,
      longitude: lon1 + (lon2 - lon1) * t
    });
  }
  return points;
}

/** Auto-seed if empty */
export async function seedDatabaseIfEmpty() {
  const snap = await getDocs(query(shipmentsCol(), limit(1)));
  if (!snap.empty) return;

  const demo: FirestoreShipment[] = [
    {
      vesselName: "CMA CGM T. ROOSEVELT",
      imo: "9780873",
      containerId: "MCLU3847562",
      polCode: "SGSIN",
      podCode: "CNYTN",
      polLat: 1.264, polLon: 103.84,
      podLat: 36.067, podLon: 120.383,
      carrierEta: new Date(Date.now() + 8*86400000).toISOString(),
      predictedEta: new Date(Date.now() + 9*86400000).toISOString(),
      etaDelta: "1 day",
      status: "SAFE",
      riskScore: 12,
      voyageStatus: "On Time",
      speed: 18,
      progress: 65,
      daysToArrival: 9,
      lastUpdate: new Date().toISOString(),
    },
    {
      vesselName: "MSC GULSUN",
      imo: "9839430",
      containerId: "MSCU9284756",
      polCode: "USNYC",
      podCode: "NLRTM",
      polLat: 40.684, polLon: -74.006,
      podLat: 51.948, podLon: 4.142,
      carrierEta: new Date(Date.now() + 15*86400000).toISOString(),
      predictedEta: new Date(Date.now() + 17*86400000).toISOString(),
      etaDelta: "2 days",
      status: "CRITICAL",
      riskScore: 78,
      voyageStatus: "Critical",
      speed: 12,
      progress: 45,
      daysToArrival: 17,
      lastUpdate: new Date().toISOString(),
    },
    {
      vesselName: "MAERSK ESSEX",
      imo: "9632080",
      containerId: "MAEU7392847",
      polCode: "CNSHA",
      podCode: "USNYC",
      polLat: 31.230, polLon: 121.473,
      podLat: 40.684, podLon: -74.006,
      carrierEta: new Date(Date.now() + 12*86400000).toISOString(),
      predictedEta: new Date(Date.now() + 12*86400000).toISOString(),
      etaDelta: "On Time",
      status: "SAFE",
      riskScore: 8,
      voyageStatus: "On Time",
      speed: 20,
      progress: 70,
      daysToArrival: 12,
      lastUpdate: new Date().toISOString(),
    }
  ];

  for (const s of demo) {
    await createShipment(s);
  }
}
