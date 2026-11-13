# 📚 StudyNook - Smart Study Room Booking Platform

> A modern, full-stack web application designed for students and universities to effortlessly discover, book, and manage private study rooms and collaborative spaces without double-booking conflicts.

🌐 **Live Website:** [https://studynook-client-roan.vercel.app](https://studynook-client-roan.vercel.app)

---

## ✨ Key Features

- **⚡ Instant & Conflict-Free Room Reservations**: Interactive booking modal with dynamic hourly calculations, time-range selectors, and real-time validation to prevent overlapping or double-booked slots.
- **🔍 Advanced Search, Filtering & Sorting**: Filter available spaces in real-time by floor, amenities (Wi-Fi, Whiteboard, AC, Soundproof, etc.), price range, and capacity with instant sorting.
- **🔐 Secure Authentication via Better Auth**: Seamless user registration and login supporting both traditional Email/Password credentials and one-click Google OAuth with secure JWT verification.
- **📋 Dedicated Host & Student Dashboards**:
  - **My Listings**: Room owners can list new spaces, update room details, set hourly pricing, and track reservation metrics.
  - **My Bookings**: Students can track upcoming study sessions, review past reservations, and cancel bookings anytime.
- **🌓 Dynamic Dark & Light Theme**: Built-in responsive theme switcher with smooth transitions and persistent state for late-night study sessions.
- **📱 Fully Responsive & Accessible Design**: Crafted with clean micro-interactions, mobile navigation drawer, and animated feedback cards built with HeroUI and Tailwind CSS.

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **UI Components**: [@heroui/react](https://heroui.com/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Authentication**: [Better Auth](https://www.better-auth.com/) (with JWT client plugin)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Deployment**: [Vercel](https://vercel.com/)

### Backend (Server)
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Token Verification**: [jose](https://github.com/panva/jose) (Remote JWKS verification)
- **CORS & Environment**: `cors`, `dotenv`

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18.18.0 or later)
- npm, yarn, or pnpm
- MongoDB Atlas database connection string

### 1. Clone the repository
```bash
git clone https://github.com/mdsnbabor330/StudyNook-Client.git
cd studynook-client
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the `studynook-client` root directory:

```env
# Better Auth Configuration
BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# MongoDB Database Connection
DB_URL=your_mongodb_connection_string

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Backend API Endpoint
NEXT_PUBLIC_SERVER_URL=http://localhost:5001
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📂 Project Structure

```text
studynook-client/
├── src/
│   ├── app/
│   │   ├── add-room/          # Add study room page
│   │   ├── api/auth/          # Better Auth API route handler
│   │   ├── edit-room/[id]/    # Edit room listing page
│   │   ├── my-bookings/       # User booked slots & reservations
│   │   ├── my-listings/       # Owner listed study rooms
│   │   ├── profile/           # User profile & statistics
│   │   ├── register/          # User registration page
│   │   ├── rooms/             # Room catalogue with search & filter
│   │   ├── rooms/[id]/        # Room details & booking trigger
│   │   ├── signin/            # User sign in page
│   │   ├── layout.js          # Root layout & theme provider
│   │   └── page.js            # Home landing page
│   ├── components/
│   │   ├── home/              # Hero banner, feature highlights
│   │   ├── modal/             # Booking & cancellation dialogs
│   │   ├── navbar/            # Responsive navigation & user menu
│   │   ├── roomClient/        # Interactive filter controls
│   │   └── UI/                # Reusable cards & display items
│   └── lib/
│       ├── auth.js            # Server-side Better Auth setup
│       └── auth-client.js     # Client-side auth hooks
└── public/                    # Static assets & icons
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
