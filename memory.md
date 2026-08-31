# CollegeBus – Project Brain & Memory

This is the brain and authoritative specification of the project.

---

## 1. Project Identity & Standard Name
- **Standard Project Name**: `CollegeBus`
- **Official Domain**: `https://collegebus.pages.dev` (Cloudflare Pages deployment)
- **Tagline**: ACMSR College Community Transit Tracker · Goa, India

---

## 2. Core Business & Access Rules

1. **Read Permissions (Public / Guest)**:
   - Visitors without logging in have full read-only access.
   - They can view real-time countdowns, browse timetables, use instant search, explore route visualizers, and plan multi-hop journeys.

2. **Write Permissions (Logged-in Students Only)**:
   - Only authenticated students (`request.auth != null`) are permitted to write data:
     - ➕ Add new bus timings (`bus_timings`)
     - 📢 Broadcast route alerts (`alerts`)
     - ✔ Verify bus timings (community verification badges)
     - 🟢🟡🔴 Report seat crowd capacity (`crowd_reports`)
     - 💬 Post live updates/comments on bus cards (`comments`)
     - ⭐ Save cloud favorites (`favorites`)

3. **Admin Permissions**:
   - **Admin Email**: `zevbuildstudio@gmail.com`
   - Admin has exclusive rights to delete bus timings, alerts, and comments.

4. **1-Week (7-Day) Community Message Expiration**:
   - Community alerts (`alerts`) and bus card comments (`comments`) strictly auto-expire after **7 days** (`ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000`).
   - The UI automatically filters out messages older than 7 days in real-time.
   - The background auto-cleaner purges documents older than 7 days from Firestore when active.

5. **Seed Data Preservation Rule**:
   - Never remove or alter the original 45 seed schedules (`s1` through `s47`), `SEED_ALERTS`, or `ROUTE_VIZ` stops.

---

## 3. Tech Stack & Infrastructure

- **Frontend**: Vanilla HTML5, CSS3 Modern Design System (Light/Dark auto-theme), Modern JavaScript (ESM).
- **Backend / BaaS**: Firebase Modular SDK v12.18.0 (Firestore, Authentication, Analytics).
- **Firebase Project**: `zevbuild`
- **PWA**: Service Worker caching (`sw.js`), Web App Manifest (`manifest.json`), Offline First with IndexedDB & LocalStorage fallback.
- **Hosting**: Cloudflare Pages (`https://collegebus.pages.dev`).
