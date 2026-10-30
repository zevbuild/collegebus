# 🚍 CollegeBus

> **Real-Time Student Bus Transit & Schedule Tracker for ACMSR College & South Goa**  
> 🌐 **Live Website**: [https://collegebus.pages.dev](https://collegebus.pages.dev)  
> 🏷️ **Version**: `v6.0.0 (Final Community Release)`  
> 📦 **Status**: **Maintenance Complete · Self-Sustaining Community PWA**

[![Final Release](https://img.shields.io/badge/Release-v6.0.0--Final-10B981?style=flat-square)](https://collegebus.pages.dev)
[![PWA Ready](https://img.shields.io/badge/PWA-Offline--First-10B981?style=flat-square)](https://collegebus.pages.dev)
[![Status](https://img.shields.io/badge/Status-Self--Sustaining%20%2F%20Archived-3B82F6?style=flat-square)](https://collegebus.pages.dev)
[![License](https://img.shields.io/badge/License-MIT-059669?style=flat-square)](LICENSE)

---

## 📌 Final Release & Maintenance Notice

This marks the **Final Release (`v6.0.0`)** of **CollegeBus**. Active feature development has concluded, and this repository is now in permanent maintenance wind-down mode. 

The application is engineered to be **100% self-sustaining and autonomous**:
- **Offline-First Resilience**: All core bus schedules (45+ routes) are hardcoded as resilient seed data with instant LocalStorage caching and Service Worker precaching. If Firebase or network connectivity is unavailable, the application remains fully functional.
- **Self-Cleaning Storage**: Community chat messages, delay alerts, and comments automatically expire after 7 days (`ONE_WEEK_MS`), preventing Firestore database bloat.
- **Autonomous Role-Based Contributions**: Registered students can verify timings, submit delay alerts, report crowd levels, and participate in community chat with chosen unique `@handles` without administrative intervention.

---

## 📖 Overview

**CollegeBus** is a fast, community-driven Progressive Web App (PWA) designed for students of **ACMSR College (Borda)** and daily commuters across South Goa routes including **Kamat Bus Stand**, **Varca**, **Margao KTC**, **Benaulim**, and **Mobor**.

---

## ✨ Features

- ⚡ **Next Bus Spotlight**: Real-time departure countdown timer (`Departing Now`, `In 15 mins`, `In 1h 20m`) and upcoming departures carousel.
- 🔍 **Instant Search & Fast Route Chips**: Type stop names or tap chips (*ACMSR → Kamat*, *Kamat → Varca*, *Borda → KTC*, *Mobor → Margao*).
- 🕒 **Timings Hub**: Switch between interactive cards and detailed tabular timetables.
- 🗺️ **Multi-Hop Journey Planner**: Automatically calculates direct buses and 1-transfer connections with layover times via transit hubs.
- 📍 **Interactive Route Timelines**: Step-by-step stop-by-stop visual road timelines with departure links.
- 👥 **Crowd & Seat Availability Reporting**: Students can vote in real-time (🟢 Seat Available, 🟡 Medium Rush, 🔴 Full).
- 💬 **Live Student Community Chat**: Real-time transit chat room with quick-message chips, dynamic auto-scroll, and unique `@handle` identities.
- 📢 **Community Delay & Cancellation Alerts**: Broadcast road, weather, and schedule changes across campus (auto-purged after 7 days).
- 🔒 **Secure Role-Based Access Control**: Public read-only access for guests; authenticated contribution for verified students.
- 📱 **Progressive Web App (PWA)**: Full offline support, home screen install prompt, fast app shortcuts, and push notifications via Service Worker.

---

## 🛡️ Architecture & Security

| Resource | Unauthenticated (Guest) | Authenticated Student | Admin (`zevbuildstudio@gmail.com`) |
| :--- | :---: | :---: | :---: |
| **View Timetables & Planners** | ✅ Read-Only | ✅ Read | ✅ Read |
| **Live Student Chat** | ✅ Read-Only | ✅ Send Messages | ✅ Full Access + Purge |
| **Add New Bus Timing** | ❌ Prompt Login | ✅ Create / Update | ✅ Full Access |
| **Verify Timing / Vote Crowd** | ❌ Prompt Login | ✅ Vote | ✅ Full Access |
| **Broadcast Alerts / Comment** | ❌ Prompt Login | ✅ Create (7d expiry) | ✅ Full Access + Purge |
| **Delete Schedules / Alerts** | ❌ Denied | ❌ Denied | ✅ Full Access |

---

## 🔍 Final Website Audit Results

A comprehensive pre-release audit was performed before finalizing this release:
- **Code Syntax & Compilation**: Verified 100% valid JavaScript (ES Module & classic scripts), JSON-LD structured data, and PWA manifest.
- **DOM & Element Integrity**: 78 unique element IDs and event handlers verified without missing bindings.
- **PWA Assets**: Generated high-resolution 192×192 and 512×512 PNG app icons for standalone installation and social Open Graph preview cards.
- **Service Worker (`v6.0.0`)**: Pre-caches HTML, manifest, typography, Firebase SDK modules, and icons with a Network-First navigation strategy and Stale-While-Revalidate static cache.
- **Search Engine Optimization**: Up-to-date sitemap (`sitemap.xml`), robots policy (`robots.txt`), Open Graph metadata, Twitter summary cards, and Schema.org `WebApplication` structured data.
- **Data Protection**: Zero composite index Firestore dependencies, single-field queries, and complete seed data fallback integrity.

---

## 🚀 Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/zevbuild/collegebus.git
   cd collegebus
   ```
2. **Run Locally**:
   Open `index.html` directly in any modern web browser or serve with a local HTTP server:
   ```bash
   npx serve .
   ```
3. **Live Deployment**:
   Continuously deployed on Cloudflare Pages at [https://collegebus.pages.dev](https://collegebus.pages.dev).

---

## 📄 License

MIT © [Zevbuild Studio](https://github.com/zevbuild)
