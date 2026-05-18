
# PassOP - Password Manager

A modern, full-stack password manager built with React, Vite, Express.js, and MongoDB. Securely store and manage your passwords with an intuitive interface and powerful features.

## Features

- **Secure Password Storage** - Passwords stored in MongoDB with secure handling
- **User-Friendly Interface** - Built with React and styled with Tailwind CSS
- **Real-time Notifications** - Toast notifications for user feedback
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Fast & Optimized** - Vite for lightning-fast development and production builds
- **RESTful API** - Express.js backend with CORS support

## Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite 5** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS & Autoprefixer** - CSS processing

### Backend
- **Express.js** - Node.js web framework
- **MongoDB** - NoSQL database
- **Body-Parser** - Middleware for parsing request bodies
- **CORS** - Cross-origin resource sharing

## Project Structure

```
Password-Manager/
├── src/                          # Frontend source code
│   ├── components/
│   │   ├── Manager.jsx          # Main password manager component
│   │   ├── Navbar.jsx           # Navigation bar
│   │   └── Footer.jsx           # Footer component
│   ├── config/
│   │   └── api.js               # API configuration
│   ├── assets/                  # Static assets
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── backend/                      # Backend source code
│   ├── server.js                # Express server
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables
├── public/                       # Public assets
│   └── icons/
├── api/
│   └── index.js                 # API routes
├── index.html                   # Main HTML file
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
├── dev-server.js                # Development server setup
├── package.json                 # Root package.json
├── vercel.json                  # Vercel deployment config
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Password-Manager.git
cd Password-Manager
```

2. Install dependencies:
```bash
npm install
cd backend && npm install && cd ..
```

3. Configure environment variables:
Create a `.env` file in the `backend/` directory with your MongoDB connection string and other config:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

### Running the Application

#### Development Mode (Frontend + Backend)
```bash
npm run dev
```

This runs both the Vite dev server and the Express backend concurrently.

#### Frontend Only
```bash
npm run dev-frontend
```

#### Backend Only
```bash
npm run dev-backend
```

#### Build for Production
```bash
npm run build
```

#### Preview Production Build
```bash
npm run preview
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Run frontend and backend concurrently |
| `npm run dev-frontend` | Run Vite dev server |
| `npm run dev-backend` | Run Express backend |
| `npm run build` | Build for production |
| `npm run lint` | Run ESLint checks |
| `npm run preview` | Preview production build |

## License

MIT

