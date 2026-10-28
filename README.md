# 🌿 Serenity Massage Clinic & Wellness App (PWA)

Usa ka modern, responsive, ug feature-packed Massage Clinic Web App nga gihimo para ma-deploy sa **Vercel** ug ma-download/install isip usa ka **PWA (Progressive Web App)** sa cellphone (iOS & Android) ug computer.

---

## 🚀 Features nga Na-Implementar

### 1. Public Pages
- **Hero & Home Page**: Nindot nga visual gamit ang imong giandam nga `bg.jpeg`, clinic introduction, value propositions, ug quick action buttons.
- **Rates Page**:
  - **30 mins** = $65
  - **45 mins** = $90
  - **60 mins** = $115
  - **75 mins** = $140
  - **90 mins** = $160
  - **Mga Importante nga Note**:
    - *"Please login first to book appointment."*
    - *"Personalized Experience. Body Part Focus: During booking you can specify which part of your body you would want to focus on (e.g. back, shoulder, arms)."*
    - *"Professional Assessment: We also provide on-site assessment to determine the best massage technique for your needs."*
- **Contact Page**: Complete contact form, schedule (9:00 AM – 6:00 PM), clinic phone, email, ug clinic address.

---

### 2. Client Authentication & Profile
- **Registration Page**:
  - First Name, Preferred Name, Last Name
  - Phone Number, Email, Home Address
  - Profile Picture upload (with real-time preview)
- **Login Page**:
  - Email & Password login
  - Naay **1-Click Demo Login** buttons para sa paspas nga testing (Jessica Ramos as Client, Admin Maria as Admin).
- **Client Dashboard**:
  - Human sa login, makita dayon ang 3 ka main action buttons:
    1. **Book Appointment**
    2. **View Appointments**
    3. **View Profile**
- **View Profile Page**:
  - Pwede i-edit ang First Name, Preferred Name, Last Name, Phone Number, Email, Home Address, ug Profile Picture.
- **View Appointments Page**:
  - Naka-lista ang tanang appointments apil ang previous history.
  - Naay status badge: **Confirmed**, **Done**, o **Cancelled**.
  - Pwede i-cancel ang upcoming appointment.

---

### 3. Booking & Smart Scheduling Logic
- **Operating Hours**: 9:00 AM hangtod 6:00 PM lamang ang available.
- **Body Part Focus**: Pwede mopili ang kliyente sa part nga gusto i-focus (e.g., Back, Shoulders, Arms, Neck, Lower Back, Legs, etc.) ug magbutang ug custom notes.
- **Hidden Therapist Rest Time Buffer**:
  - Kung **30 min** o **45 min** ang ibook: automatic mag-add ug **+10 minutes** nga rest buffer para makapahuway ang masahista.
  - Kung **60 min**, **75 min**, o **90 min** ang ibook: automatic mag-add ug **+15 minutes** nga rest buffer.
  - **Dili kini makita sa client** — ang slot makita lang as *"Not Available" / "Booked"* nga walay gipakitang ngalan o buffer details.

---

### 4. Admin Management Dashboard
- **"Makita diresto kung kinsa ang naka book today"**:
  - Makita dayon ang schedule karong adlawa uban ang **ngalan sa kliyente**, contact number, oras, duration, ug target body parts.
  - Makita pud sa admin ang **therapist rest buffer** (e.g. `+15m rest buffer until 10:45 AM`).
  - Actions: **Mark as Done**, **Edit**, ug **Cancel**.
- **Check Calendar Schedule**:
  - **Weekly Schedule View**: 7-day grid uban ang tanang appointments ug ngalan sa kliyente.
  - **Monthly Schedule View**: Tibuok buwan nga kalendaryo.
- **Client Profiles Directory**:
  - Makita ang listahan sa tanang rehistradong kliyente.
  - Naay search bar (name, phone, email, address).
  - Pwede i-edit sa admin ang profile sa bisan kinsang kliyente.
- **Add / Walk-in Booking**:
  - Pwede mag-add ang admin ug bag-ong reservation para sa walk-in o phone call clients.

---

## 📲 Giunsa Pag-Install Isip App (PWA)

- **Sa iPhone / iPad (Safari)**:
  1. Ablihi ang app sa Safari.
  2. I-tap ang **Share** icon (ang box nga naay arrow pa-taas).
  3. Pilia ang **"Add to Home Screen"**.
- **Sa Android (Chrome)**:
  1. Ablihi ang app sa Chrome.
  2. I-tap ang 3 dots (⋮) sa ibabaw.
  3. Pilia ang **"Install App"** o **"Add to Home screen"**.
- **Sa Computer (Chrome / Edge / Mac)**:
  - Naay makita nga install icon sa address bar, o i-click ang **"Install App"** button sa navbar.

---

## 🛠️ Giunsa Pagpadagan sa Local Machine

```bash
# 1. Siguroha nga naa ka sa folder
cd /Users/oninninoonin/Downloads/apps/massage_clinic

# 2. Padagana ang development server
npm run dev
```

Ablihi ang browser sa: `http://localhost:3000`

---

## 🌐 Giunsa Pag-Deploy sa Vercel

### Option A: Gamit ang GitHub (Recommended)
1. I-push kining folder sa imong GitHub account:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/massage-clinic.git
   git branch -M main
   git push -u origin main
   ```
2. Adto sa [vercel.com](https://vercel.com) ug i-click ang **"Add New Project"**.
3. I-import ang repository. Makita dayon ni Vercel nga kini usa ka **Vite** project ug mag-build kini automatically!

### Option B: Gamit ang Vercel CLI
```bash
npx vercel
```
Sunda lang ang mga on-screen prompts (gamita ang default settings).

---

## 🔑 Demo Login Credentials
- **Client Account**:
  - Email: `client@gmail.com`
  - Password: `client`
  - Name: Jessica Ramos (Preferred: Jess)
- **Admin Account**:
  - Email: `admin@serenity.com`
  - Password: `admin`
  - Name: Admin Maria Santos

*Naay Quick Switcher sa ibabaw nga banner aron makabalhin-balhin ka dayon sa Admin ug Client view sa usa lang ka click!*

