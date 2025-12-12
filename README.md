# McLarens Logistics Control Tower �
A mini **Logistics Control Tower** web application for **McLarens Logistics** to track **active shipments**, visualize vessel routes on a map, predict **ETAs**, detect **delays / route deviations**, and send **real-time operational alerts** to the right teams.

This project is designed as a practical MVP that can be extended into a production-grade control tower.

---

##  Key Features
### Shipment Tracking
- View all **Active Shipments**
- Search by **Vessel / IMO / Container / Reference**
- Status labels: **On time / Delayed / Critical / Safe**

### Predictive ETA + Alerts
- Predict **ETA** based on route distance + speed (MVP logic)
- Detect significant ETA change and trigger alerts
- Route deviation detection (threshold-based)

### Map Visualization
- Map view with:
  - **POL** (Port of Loading) marker
  - **POD** (Port of Discharge) marker
  - Planned vs current/predicted route lines
- Shipment selection auto-focuses the map

### Shipment Details Panel
- Voyage status (e.g., **Underway**)
- Compliance / Risk score (e.g., 12/100)
- Voyage timeline (Departure → Predicted Arrival)
- Event feed (can be extended)

---

##  Tech Stack
- **Frontend:** Next.js (React) + Tailwind CSS + Mapbox
- **Backend:** Spring Boot (REST + WebSockets) + JPA
- **ML/Geo Service:** Python FastAPI (ETA + deviation analysis)
- **Database:** PostgreSQL + PostGIS
- **Realtime:** STOMP WebSockets (alerts pushed to UI)

---

##  Repositories (Recommended)
If you’re using separate repos under your GitHub Organization:

- `control-tower-frontend` — Next.js dashboard
- `control-tower-backend` — Spring Boot API + WebSockets
- `control-tower-ml-service` — FastAPI prediction service
- `control-tower-infra` — Docker Compose, DB init, docs

---

##  Prerequisites
Install:
- Node.js 18+
- Java 21 (or 17+)
- Python 3.10+
- Docker Desktop (recommended)
- Mapbox token (for map rendering)

---

##  Environment Variables
### Frontend (`.env.local`)
```env
NEXT_PUBLIC_MAPBOX_TOKEN=YOUR_MAPBOX_TOKEN
NEXT_PUBLIC_API_BASE=http://localhost:8080
NEXT_PUBLIC_WS_URL=ws://localhost:8080/ws
