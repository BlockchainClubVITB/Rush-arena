# Rush Arena - QR Tracking System

A professional, university-grade event management system designed for **Linpack Club**. This application handles participant check-ins and event win tracking via QR codes and Student IDs.

## 🚀 Features

- **Direct Volunteer Scanner**: Instant access to QR scanning upon launch.
- **Dual Identification**: Check participants via QR Scan or Student Registration Number.
- **12 Game Tracking Dashboard**:
  - **9 Mini Games**: Dedicated checkboxes for fast-paced event logging.
  - **3 Main Events**: Featured tracking for Bull Riding, Body Zorbing, and Speed Dating.
- **Supabase Integration**: Ready-to-use service layer for cloud synchronization.
- **University Branding**: Professional dark-mode aesthetic built with Framer Motion and Lucide icons.
- **Mobile Optimized**: Enhanced touch targets and responsive layouts for on-field volunteers.

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Vanilla CSS (Custom Glassmorphism Design)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **QR Support**: html5-qrcode

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Locally**:
   ```bash
   npm run dev
   ```

3. **Supabase Setup**:
   - Create a `participants` table in your Supabase project.
   - Configure your keys in `src/lib/participantService.js`.

---
Developed for **Linpack Club** 2026.
