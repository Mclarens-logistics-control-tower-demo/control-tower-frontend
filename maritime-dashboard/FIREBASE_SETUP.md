# 🔥 Firebase Firestore Integration Guide

## Overview
This guide shows how to set up Firebase Firestore for the McLarens Maritime Dashboard with realtime shipment tracking and user profiles via RandomUser.me API.

---

## 🚀 Quick Start

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"**
3. Enter project name: `mclarens-logistics` (or your choice)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

### 2. Enable Firestore Database

1. In Firebase Console → **Build** → **Firestore Database**
2. Click **"Create database"**
3. Select **"Start in test mode"** (for development)
4. Choose a location (e.g., `us-central1`)
5. Click **"Enable"**

### 3. Get Firebase Configuration

1. In Firebase Console → **Project settings** (gear icon)
2. Scroll to **"Your apps"** section
3. Click the **Web icon** (`</>`) to add a web app
4. Register app name: `maritime-dashboard`
5. Copy the configuration object

### 4. Configure Environment Variables

Create `.env.local` file in the `maritime-dashboard` folder:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123

NEXT_PUBLIC_ORG_ID=mclarens-logistics
```

**Important:** Restart your dev server after creating `.env.local`

---

## 📦 What's Already Installed

✅ **Firebase SDK** (`firebase` package)  
✅ **Firestore integration** (`lib/firebase.ts`, `lib/shipments.ts`)  
✅ **RandomUser.me API** (`lib/randomUser.ts`)  
✅ **Zustand store updates** (realtime vessel state)  
✅ **UI integration** (user profile display, Add Shipment button)

---

## 🔥 Firestore Data Model

### Collections Structure

```
orgs/
  └── {orgId}/
      └── shipments/
          └── {shipmentId}
              ├── vesselName: "CMA CGM T. ROOSEVELT"
              ├── imo: "9780873"
              ├── containerId: "MCLU3847562"
              ├── polCode: "SGSIN"
              ├── podCode: "CNYTN"
              ├── polLat: 1.264
              ├── polLon: 103.84
              ├── podLat: 36.067
              ├── podLon: 120.383
              ├── carrierEta: "2025-12-20T12:00:00Z"
              ├── predictedEta: "2025-12-22T18:30:00Z"
              ├── etaDelta: "2 days"
              ├── status: "SAFE" | "WARNING" | "CRITICAL"
              ├── riskScore: 12
              ├── voyageStatus: "On Time" | "Warning" | "Critical"
              ├── speed: 18
              ├── progress: 65
              ├── daysToArrival: 9
              ├── lastUpdate: "2025-12-12T10:30:00Z"
              ├── createdAt: <serverTimestamp>
              └── updatedAt: <serverTimestamp>
```

### Sample Document

```json
{
  "vesselName": "MSC GULSUN",
  "imo": "9839430",
  "containerId": "MSCU9284756",
  "polCode": "USNYC",
  "podCode": "NLRTM",
  "polLat": 40.684,
  "polLon": -74.006,
  "podLat": 51.948,
  "podLon": 4.142,
  "carrierEta": "2025-12-27T12:00:00Z",
  "predictedEta": "2025-12-29T18:30:00Z",
  "etaDelta": "2 days",
  "status": "CRITICAL",
  "riskScore": 78,
  "voyageStatus": "Critical",
  "speed": 12,
  "progress": 45,
  "daysToArrival": 17,
  "lastUpdate": "2025-12-12T10:30:00Z",
  "createdAt": { "_seconds": 1734003600, "_nanoseconds": 0 },
  "updatedAt": { "_seconds": 1734003600, "_nanoseconds": 0 }
}
```

---

## 🔐 Firestore Security Rules

### Development Mode (Quick Start)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Warning:** This allows anyone to read/write. Only use for local development!

### Production Mode (Recommended)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Organization-based access
    match /orgs/{orgId}/shipments/{shipmentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.orgId == orgId;
    }
    
    match /orgs/{orgId}/shipments/{shipmentId}/events/{eventId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.orgId == orgId;
    }
  }
}
```

### Apply Rules

1. Firebase Console → **Firestore Database** → **Rules** tab
2. Paste your rules
3. Click **"Publish"**

---

## 👤 RandomUser.me Integration

The app automatically fetches a random user profile from [RandomUser.me](https://randomuser.me/) on page load.

**Features:**
- Displays user name in header
- Shows user email
- Displays avatar photo
- Refreshes on each page reload

**API Endpoint:** `https://randomuser.me/api/?nat=us`

**No API key required** - it's a free public API!

---

## 🎯 Key Features Implemented

### 1. Realtime Shipments
- **Auto-sync** with Firestore using `onSnapshot()`
- **Live updates** when data changes in database
- **Auto-seeding** with 3 sample shipments on first load

### 2. Add Shipment
- Click the blue **Ship icon** button (bottom-right)
- Automatically creates a new "EVER GIVEN" shipment
- Appears instantly in the list (realtime)

### 3. User Profile
- Fetches random user from RandomUser.me
- Displays in top-right header
- Shows name, email, and avatar

### 4. CRUD Operations
- ✅ **Create** - Add new shipments via `createShipment()`
- ✅ **Read** - Subscribe to realtime updates via `subscribeShipments()`
- ✅ **Update** - Update existing shipments via `updateShipment()`
- ✅ **Delete** - Remove shipments via `removeShipment()`

---

## 📝 How to Use

### View Realtime Data

1. Start dev server: `npm run dev`
2. Open browser to `http://localhost:3000`
3. Database auto-seeds with 3 sample shipments
4. Data syncs realtime from Firestore

### Add a Shipment

1. Click the blue **Ship icon** (floating button, bottom-right)
2. New shipment appears instantly on map and list
3. Changes are saved to Firestore automatically

### Test Realtime Sync

1. Open Firebase Console → Firestore Database
2. Navigate to: `orgs/mclarens-logistics/shipments`
3. Edit any field (e.g., change `vesselName`)
4. Watch the UI update **instantly** without refresh!

---

## 🛠️ Code Structure

### New Files Created

```
lib/
├── firebase.ts          # Firebase initialization & config
├── shipments.ts         # Firestore CRUD operations
└── randomUser.ts        # RandomUser.me API integration

.env.local.example       # Environment variable template
```

### Modified Files

```
lib/
└── store.ts             # Added setVessels, setUserProfile, userProfile state

app/
└── page.tsx             # Firebase integration, user profile display
```

---

## 🔧 API Reference

### `lib/shipments.ts`

#### `subscribeShipments(callback)`
Subscribe to realtime shipment updates.

```ts
const unsubscribe = subscribeShipments((shipments) => {
  console.log('Updated shipments:', shipments);
});

// Later: unsubscribe()
```

#### `createShipment(data)`
Add a new shipment to Firestore.

```ts
await createShipment({
  vesselName: "MAERSK ESSEX",
  imo: "9632080",
  polCode: "CNSHA",
  podCode: "USNYC",
  // ... other fields
});
```

#### `updateShipment(id, patch)`
Update existing shipment.

```ts
await updateShipment("shipment-id-123", {
  speed: 22,
  status: "WARNING"
});
```

#### `removeShipment(id)`
Delete a shipment.

```ts
await removeShipment("shipment-id-123");
```

#### `seedDatabaseIfEmpty()`
Auto-populate database with sample data if empty.

```ts
await seedDatabaseIfEmpty();
```

### `lib/randomUser.ts`

#### `fetchRandomUser()`
Get random user profile from RandomUser.me.

```ts
const profile = await fetchRandomUser();
// { name: "John Doe", email: "john@example.com", avatar: "https://..." }
```

---

## 🚨 Troubleshooting

### "Firebase: Firebase App named '[DEFAULT]' already exists"
**Solution:** This is normal - the app uses singleton pattern to prevent multiple instances.

### "Missing or insufficient permissions"
**Solution:** 
1. Check Firestore Rules in Firebase Console
2. For dev, use "test mode" rules (allow read, write: if true)
3. Restart dev server after changing rules

### User profile not loading
**Solution:**
1. Check browser console for CORS errors
2. RandomUser.me might be rate-limited (try again in a few minutes)
3. Check internet connection

### Shipments not appearing
**Solution:**
1. Open browser DevTools → Console
2. Check for Firebase errors
3. Verify `.env.local` has correct Firebase config
4. Make sure you restarted dev server after adding `.env.local`
5. Check Firebase Console → Firestore → verify collection exists

### "FIREBASE_API_KEY is not defined"
**Solution:**
1. Ensure `.env.local` exists in `maritime-dashboard/` folder
2. Variable names must start with `NEXT_PUBLIC_`
3. Restart dev server (`Ctrl+C`, then `npm run dev`)

---

## 🔄 Data Flow

```
Firebase Firestore (Cloud Database)
          ↓
subscribeShipments() - Realtime listener
          ↓
firestoreToVessel() - Data transformation
          ↓
setVessels() - Update Zustand store
          ↓
UI Components Re-render
```

---

## 🎨 Next Steps

### Optional Enhancements

1. **Firebase Authentication**
   - Enable Anonymous Auth
   - Add proper user management
   - Secure Firestore rules

2. **Advanced Features**
   - Events subcollection for shipment timeline
   - File uploads for cargo documents
   - Real-time notifications via Firebase Cloud Messaging

3. **Performance**
   - Add Firestore indexes for complex queries
   - Implement pagination for large datasets
   - Cache user profile in localStorage

4. **Analytics**
   - Firebase Analytics integration
   - Track user behavior
   - Monitor shipment trends

---

## 📚 Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/data-model)
- [RandomUser.me API](https://randomuser.me/documentation)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

---

**Status:** ✅ Firebase integration complete  
**Last Updated:** December 12, 2025
