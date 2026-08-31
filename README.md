# 🚍 CollegeBus

> **Real-Time Student Bus Transit & Schedule Tracker for ACMSR College & South Goa**  
> 🌐 **Live Website**: [https://collegebus.pages.dev](https://collegebus.pages.dev)

---

## 📖 Overview

**CollegeBus** is a fast, modern, community-driven Progressive Web App (PWA) designed for students of **ACMSR College (Borda)** and commuters across South Goa routes including **Kamat Bus Stand**, **Varca**, **Margao KTC**, and **Mobor**.

---

## ✨ Features

- ⚡ **Next Bus Spotlight**: Real-time departure countdown timer and upcoming departures carousel.
- 🔍 **Instant Search & Fast Route Chips**: Type stop names or tap chips (*ACMSR → Kamat*, *Kamat → Varca*, *Borda → KTC*, *Mobor → Margao*).
- 🕒 **Timings Hub**: Switch between interactive cards and detailed tabular timetables.
- 🗺️ **Multi-Hop Journey Planner**: Automatically calculates direct buses and 1-transfer connections with layover times via transit hubs.
- 📍 **Interactive Route Timelines**: Step-by-step stop-by-stop visual road timelines with departure links.
- 👥 **Crowd & Seat Availability Reporting**: Students can vote in real-time (🟢 Seat Available, 🟡 Medium Rush, 🔴 Full).
- 💬 **Live Student Updates & Comments**: Post on-the-ground bus status notes (auto-purged after 7 days).
- 📢 **Community Delay & Cancellation Alerts**: Broadcast road and schedule changes across the campus.
- 🔒 **Secure Role-Based Access Control**: Public read-only access for guests; authenticated contribution for verified students.
- 📱 **Progressive Web App (PWA)**: Works offline, installable to home screen, instant load caching via Service Worker.

---

## 🛡️ Architecture & Security

| Resource | Unauthenticated (Guest) | Authenticated Student | Admin (`zevbuildstudio@gmail.com`) |
| :--- | :---: | :---: | :---: |
| **View Timetables & Planners** | ✅ Read-Only | ✅ Read | ✅ Read |
| **Add New Bus Timing** | ❌ Prompt Login | ✅ Create / Update | ✅ Full Access |
| **Verify Timing / Vote Crowd** | ❌ Prompt Login | ✅ Vote | ✅ Full Access |
| **Broadcast Alerts / Comment** | ❌ Prompt Login | ✅ Create (7d expiry) | ✅ Full Access |
| **Delete Schedules / Alerts** | ❌ Denied | ❌ Denied | ✅ Full Access |

---

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/zevbuild/collegebus.git
   cd collegebus
   ```
2. **Run Locally**:
   Open `index.html` in any modern web browser or serve with a local HTTP server:
   ```bash
   npx serve .
   ```
3. **Live Deployment**:
   Automatically deployed to Cloudflare Pages at [https://collegebus.pages.dev](https://collegebus.pages.dev).

---

## 📄 License
MIT © [Zevbuild Studio](https://github.com/zevbuild)
