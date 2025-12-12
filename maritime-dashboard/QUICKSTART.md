# 🚀 Quick Start - Firebase Integration

## Setup in 5 Minutes

### 1. Install Dependencies
```bash
cd maritime-dashboard
npm install
```

### 2. Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Create new project: `mclarens-logistics`
3. Enable Firestore Database (test mode)

### 3. Configure Environment

Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Add your Firebase credentials to `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456:web:abc123

NEXT_PUBLIC_ORG_ID=mclarens-logistics
```

### 4. Run Development Server
```bash
npm run dev
```

Open http://localhost:3000

## ✨ Features

### Real-time Shipments
- Auto-syncs with Firestore
- Live updates without refresh
- Auto-seeds 3 sample shipments

### Add Shipment
Click the blue **ship icon** (bottom-right) to add a new shipment instantly!

### User Profile
Random user from RandomUser.me appears in top-right header.

## 📖 Full Documentation

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete setup guide.

## 🎯 What's Different from Mock Data

**Before (Mock Data):**
- Static data from `lib/mock-data.ts`
- Changes lost on refresh
- No persistence

**After (Firebase):**
- Realtime database with Firestore
- Data persists across sessions
- Live sync across multiple tabs/users
- Add/edit/delete shipments
- User profile from API

## 🔧 Troubleshooting

**"Firebase App already exists"**  
→ This is normal, ignore it

**"Missing permissions"**  
→ Use test mode rules in Firestore

**User profile not loading**  
→ Check internet connection (RandomUser.me API)

**Shipments not showing**  
→ Verify `.env.local` exists and restart dev server

## 🎨 Architecture

```
Next.js Frontend
    ↓
Firebase Firestore (Cloud DB)
    ↓
Realtime Listeners (onSnapshot)
    ↓
Zustand Store
    ↓
React Components
```

## 📦 Files Created

```
lib/
├── firebase.ts          # Firebase config
├── shipments.ts         # CRUD operations
└── randomUser.ts        # User API

.env.local.example       # Environment template
FIREBASE_SETUP.md        # Full documentation
```

Happy shipping! 🚢
