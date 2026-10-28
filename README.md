# 🌿 Charlene Agdan RMT - Massage Clinic & Wellness App (PWA)

A modern, responsive, and feature-packed Massage Clinic Web Application designed for **Charlene Agdan RMT (Registered Massage Therapist)**, deployable on **Vercel** and installable as a **PWA (Progressive Web App)** on mobile phones (iOS & Android) and desktop computers.

---

## 🎨 Color Palette & Design System

1. **Primary & Brand Accent Colors**:
   - **Primary Gold (`#F1BB09`)**: Primary action buttons, dialog titles, highlighted appointment slots, and focal accents.
   - **Light Cream (`#FBF4C4`)**: Body text in dialogs, sub-headers, and readable light text.
   - **Teal Primary (`#0D9488`)**: Primary brand accent color.
   - **Olive Secondary (`#716B56`)**: Calendar headers, unselected slot chips, and secondary actions.
2. **Background & Container Colors (Glassmorphic & Dark Theme)**:
   - **Deep Dark Slate / Spa Green (`#1B2724` / `#161E1A`)**: Custom glassmorphic cards and dialog surfaces.
   - **Translucent Dark Overlay (`#59000000`)**: Subtle dark overlay over the background image (`bg.jpeg`) for optimal readability while keeping the steady background image clear.
   - **Mobile Background Alignment**: Background anchored to the left on mobile screens and centered on desktops.
   - **Light Warm Cream (`#FDF6E2`)**: Pop-up calendar date picker surface.
3. **State & Alert Colors**:
   - **Restricted / Past Date Red (`#FF5252`)**: Indicator for past dates and cancellations.

---

## 🚀 Key Features

### 1. Navigation & Authentication
- **Dynamic Navbar**:
  - When logged out: Shows `Home`, `Rates & Services`, `Contact`, `Sign In`, and `Register`.
  - When logged in: Automatically removes `Home`, `Rates & Services`, and `Contact`! Displays personal portal links (`Dashboard`, `Book Appointment`, `My Appointments`, `My Profile` for clients; `Today's Bookings`, `Calendar`, `Client Profiles` for admin).
- **Phone Number Format**: Strictly enforced and auto-formatted as `000-000-0000` (e.g. `415-555-0123`).
- **Complete English Interface**: Polished, professional English throughout all pages, modals, and alerts.

---

### 2. Treatment Rates & Services
- **30 mins** = $65
- **45 mins** = $90
- **60 mins** = $115
- **75 mins** = $140
- **90 mins** = $160
- **Mandatory Patient Information**:
  - *"Please login first to book appointment."*
  - *"Personalized Experience. Body Part Focus: During booking you can specify which part of your body you would want to focus on (e.g. back, shoulder, arms)."*
  - *"Professional Assessment: We also provide on-site assessment to determine the best massage technique for your needs."*

---

### 3. Smart Scheduling & Hidden Therapist Rest Logic
- **Operating Hours**: 9:00 AM to 6:00 PM only.
- **Hidden Buffer Protection**:
  - If a 30m or 45m session is booked: automatic **+10 minutes** therapist rest buffer is allocated.
  - If a 60m, 75m, or 90m session is booked: automatic **+15 minutes** therapist rest buffer is allocated.
  - **Completely invisible to clients**: Clients only see slots as *"Not Available"* without knowing who booked it or why the gap exists.
  - **Visible to Admin**: Admins see the exact buffer time (e.g., `+15m rest until 10:45 AM`) on today's schedule and calendar views.

---

### 4. Admin Management Center
- **Today's Bookings Overview**: Immediate schedule display showing client full names, contact info, duration, and target muscle focus.
- **Calendar Schedule**: Interactive Weekly and Monthly views showing all booked client names.
- **Client Directory**: Searchable profiles list with edit capabilities for admin.
- **Walk-in Booking**: Manual reservation entry for phone and walk-in clients.

---

## 📲 Installing as an App (PWA)

- **iPhone / iPad (Safari)**:
  1. Open the website in Safari.
  2. Tap the **Share** button at the bottom.
  3. Select **"Add to Home Screen"**.
- **Android (Chrome)**:
  1. Open the website in Chrome.
  2. Tap the 3 dots (⋮) menu at the top.
  3. Select **"Install App"** or **"Add to Home screen"**.

---

## 🛠️ Local Development & Deployment

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production
npm run build
```

---

## 🔑 Demo Accounts
- **Client**: `client@gmail.com` | Password: `client`
- **Admin**: `admin@charleneagdanrmt.com` | Password: `admin`
