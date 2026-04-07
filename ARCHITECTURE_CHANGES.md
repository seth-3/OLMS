# Architecture Changes: localStorage → MongoDB

## Overview

OLMS has been successfully migrated from a client-side localStorage system to a server-based MongoDB architecture.

## What Changed

### Backend Changes
- **New:** Express.js server with TypeScript
- **New:** MongoDB database with Mongoose schemas
- **New:** JWT-based authentication
- **New:** RESTful API endpoints for all CRUD operations
- **Location:** `/server` directory

### Frontend Changes
- **Updated:** Zustand stores now call API endpoints instead of localStorage
- **Updated:** All stores include loading and error states
- **New:** API client utility (`src/utils/api.ts`) for API calls
- **Updated:** Authentication now uses JWT tokens
- **Removed:** Zustand persist middleware (localStorage persistence)

## Architecture Diagram

```
Frontend (React + Zustand)
    ↓
API Client (src/utils/api.ts)
    ↓
Express.js Server (Node.js)
    ↓
MongoDB Database
```

## Data Flow

### Before (localStorage)
```
Component → Zustand Store → localStorage → Component
```

### After (MongoDB)
```
Component → Zustand Store → API Client → Express Server → MongoDB → API Response → Zustand Store → Component
```

## Benefits

✅ **Centralized Data:** Single source of truth (MongoDB)
✅ **Real-time Sync:** Changes sync across devices/sessions
✅ **User Isolation:** Each user has their own data
✅ **Scalability:** Can handle multiple concurrent users
✅ **Security:** Server-side validation and authentication
✅ **Persistence:** Data survives browser clear/uninstall
✅ **Data Analysis:** Easier to analyze and backup

## Store Updates

All stores now have async operations with loading/error states:

```typescript
// Old pattern
createCourse: (course) => set(...)

// New pattern
createCourse: async (course) => {
  set({ loading: true });
  try {
    const result = await createCourseAPI(course);
    set({ loading: false });
  } catch (error) {
    set({ error: error.message, loading: false });
  }
}
```

## Authentication Flow

1. User registers → API creates user in MongoDB with hashed password
2. User logs in → API validates credentials
3. API returns JWT token
4. Token stored in localStorage for subsequent requests
5. All API requests include `Authorization: Bearer {token}` header
6. Server validates token before processing requests

## File Structure

```
server/
├── src/
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth & other middleware
│   ├── utils/         # Utility functions
│   └── index.ts       # Main server file
├── package.json
├── tsconfig.json
└── .env              # Environment variables

frontend/
├── src/
│   ├── utils/
│   │   ├── api.ts     # NEW: API client
│   │   └── useOffline.ts
│   ├── store/         # UPDATED: Use API calls
│   └── ...
├── .env              # NEW: Add VITE_API_URL
└── ...
```

## Key Files to Know

- **[server/src/index.ts](/server/src/index.ts)** - Express server setup
- **[server/src/models/](/server/src/models/)** - Database schemas
- **[server/src/routes/](/server/src/routes/)** - API endpoints
- **[server/src/middleware/auth.ts](/server/src/middleware/auth.ts)** - Authentication
- **[src/utils/api.ts](/src/utils/api.ts)** - Frontend API client
- **[src/store/courseStore.ts](/src/store/courseStore.ts)** - Example updated store

## What's NOT Implemented Yet

Some features might need additional API routes:
- User messages (Message routes skeleton exists)
- Announcements (Announcement routes skeleton exists)
- Attendance tracking (schema exists)
- User/Department management admin endpoints
- File uploads (currently accepts base64)
- Discussion forums

These can be added following the same pattern as existing routes.

## Important Notes

⚠️ **Offline Support:** The current implementation requires a server connection. The offline indicator in the UI will show when offline, but operations won't work until reconnected. You can add local caching if needed.

⚠️ **Data Port:** Existing localStorage data won't automatically migrate. See MONGODB_SETUP.md for migration instructions.

⚠️ **File Uploads:** Currently stores files as base64 strings. For production, consider using object storage (S3, CDN, etc.).

## Getting Started

1. Follow the setup instructions in [MONGODB_SETUP.md](/MONGODB_SETUP.md)
2. Start both servers (backend and frontend)
3. Register a new user
4. Begin using the application with MongoDB persistence!
