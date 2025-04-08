# NYCDB Web App Development Environment Setup

This document provides instructions for setting up the development environment for the NYCDB Web App.

## Project Structure

The project is organized into two main components:

```
nycdb_webapp/
├── backend/         # Express.js API server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── index.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
└── frontend/        # Next.js web application
    ├── src/
    │   ├── app/
    │   ├── components/
    │   └── ...
    ├── public/
    └── package.json
```

## Backend Setup

The backend is built with Express.js and TypeScript, connecting to a PostgreSQL database.

### Prerequisites

- Node.js (v16+)
- PostgreSQL with NYCDB data loaded

### Installation

1. Navigate to the backend directory:
   ```
   cd nycdb_webapp/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Configure environment variables:
   Edit the `.env` file with your database connection details:
   ```
   PORT=3001
   DB_USER=postgres
   DB_HOST=localhost
   DB_NAME=postgres
   DB_PASSWORD=nycdb
   DB_PORT=5432
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The server will start on port 3001 (or the port specified in your .env file).

## Frontend Setup

The frontend is built with Next.js, TypeScript, and Tailwind CSS.

### Prerequisites

- Node.js (v16+)

### Installation

1. Navigate to the frontend directory:
   ```
   cd nycdb_webapp/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file with the API URL:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```
   npm run dev
   ```

The application will be available at http://localhost:3000.

## Available API Endpoints

- `GET /api/datasets` - List all available datasets
- `GET /api/properties/:bbl` - Get property details by BBL
- `GET /api/properties/:bbl/violations` - Get violations for a property

## Technology Stack

### Backend
- Express.js
- TypeScript
- PostgreSQL client (pg)
- CORS for cross-origin requests
- dotenv for environment variables
- morgan for request logging

### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Material UI
- Mapbox GL JS for maps
- D3.js and Recharts for data visualization
- Axios for API requests

## Next Steps

After setting up the development environment, you can:

1. Develop additional API endpoints
2. Create frontend components
3. Implement database query features
4. Test and deploy the application
