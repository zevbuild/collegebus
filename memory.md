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
   - They can view real-time countdowns, browse timetables, use instant search, explore route visualizers, plan multi-hop journeys, and read the community chat feed.

2. **Write Permissions (Logged-in Students Only)**:
   - Only authenticated students (`request.auth != null`) are permitted to write data:
     - 💬 Send live messages in the **Community Transit Chat** (`comments` collection with `busId: 'community_chat'`)
     - ➕ Add new bus timings (`bus_timings`)
     - 📢 Broadcast route alerts (`alerts`)
     - ✔ Verify bus timings (records student's unique public `@username`)
     - 🟢🟡🔴 Report seat crowd capacity (`crowd_reports`)
     - 💬 Post live updates/comments on bus cards (`comments`)
     - ⭐ Save cloud favorites (`favorites`)

3. **Unique Public Usernames (`@handle`)**:
   - Each registered student chooses a unique public username (3-20 characters: letters, numbers, and underscores).
   - This username serves as their public identity on chat messages, bus verifications, alerts, comments, and leaderboard rankings.
   - Profile tab includes an `✏️ Edit @handle` option to update usernames with Firestore uniqueness checks.

4. **Admin Permissions**:
   - **Admin Email**: `zevbuildstudio@gmail.com`
   - Admin has exclusive rights to delete bus timings, alerts, and comments.

5. **1-Week (7-Day) Community Message Expiration**:
   - Community chat messages, route alerts (`alerts`), and bus card comments (`comments`) strictly auto-expire after **7 days** (`ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000`).
   - The UI automatically filters out messages older than 7 days in real-time.
   - The background auto-cleaner purges documents older than 7 days from Firestore when admin is active.

6. **Seed Data Preservation Rule**:
   - Never remove or alter the original 45 seed schedules (`s1` through `s47`), `SEED_ALERTS`, `SEED_CHAT`, or `ROUTE_VIZ` stops.
   - Seed data contributor handles are anonymized using generic identifiers (`student_1`, `student_2`, etc.).

---

## 3. Tech Stack & Infrastructure

- **Frontend**: Vanilla HTML5, CSS3 Modern Design System (Light/Dark auto-theme), Modern JavaScript (ESM).
- **Backend / BaaS**: Firebase Modular SDK v12.18.0 (Firestore, Authentication, Analytics).
- **Firebase Project**: `zevbuild`
- **PWA**: Service Worker caching (`sw.js`), Web App Manifest (`manifest.json`), Offline First with IndexedDB & LocalStorage fallback.
- **Hosting**: Cloudflare Pages (`https://collegebus.pages.dev`).

---

## 4. Final Release Milestone (v6.0.0 LTS)

- **Status**: Self-Sustaining Community Edition · Maintenance Complete & Archived.
- **Release Version**: `v6.0.0`
- **Release Date**: October 30, 2026
- **Architecture Stability**:
  - Application operates fully autonomously via Firebase live sync and local seed data fallbacks.
  - Auto-cleaning routines handle Firestore message purges after 7 days without developer intervention.
  - Complete offline PWA support with Service Worker `collegebus-v6.0.0` and pre-cached core assets.
- **Key Features in Final Release**:
  - High-resolution 192×192 and 512×512 PNG app icons in `icons/` for PWA installation and Open Graph social cards.
  - Deep linking support for `?page=` URL search parameters (supports shortcuts for home, timings, journey, community, profile, and add).
  - Humanized countdown format (`In Xh Ym` / `In X mins` / `Departing Now`).
  - Pre-release audit executed with 100% test pass rate.
