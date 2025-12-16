# CU_PLUS_WEBAPP_BACKEND

This folder hosts the Node.js + Express + Prisma backend for CU_PLUS_WEBAPP. The backend is structured so that new APIs can be added quickly without breaking existing functionality.

## Folder Structure

```
CU_PLUS_WEBAPP_BACKEND/
├── prisma/
│   ├── schema.prisma      # Data models + Prisma client config
│   └── migrations/        # Auto-generated migration scripts
├── src/
│   ├── index.js           # App entry point, server bootstrap
│   ├── prisma.js          # Prisma client singleton
│   ├── auth.routes.js     # Example route module
│   └── (feature).routes.js# Additional route modules
├── .env                   # Environment variables (ignored from git)
├── package.json
└── README.md
```

### Key Files

- `src/index.js`: Builds the Express app, registers all routes, and starts the server.
- `src/prisma.js`: Exports a single Prisma client instance used across routes.
- `src/*.routes.js`: Each file defines a router for a single feature area (e.g., auth, profile, etc.). Keep routes small and cohesive.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up `.env`:

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/cu_plus?schema=public"
   PORT=4000
   ```

3. Apply migrations:

   ```bash
   npx prisma migrate dev
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

## Adding New APIs

1. **Create a route file** inside `src/` following the pattern `feature.routes.js`.
2. **Require dependencies** at the top:

   ```js
   const express = require('express');
   const prisma = require('./prisma');

   const router = express.Router();
   ```

3. **Define handlers** that use Prisma; keep validation near the route and business logic in helper functions if needed.

4. **Export the router**:

   ```js
   module.exports = router;
   ```

5. **Register the router** in `src/index.js`:

   ```js
   const featureRoutes = require('./feature.routes');
   app.use('/feature', featureRoutes);
   ```

6. **Document the endpoints** directly in the route file or update the README so others understand request/response shapes.

7. **Add tests** or manual steps to cover new behavior (optional but recommended).

## Best Practices

- Keep each route file focused on one feature.
- Reuse the shared Prisma client (`require('./prisma')`) to avoid connection churn.
- Validate request payloads early; return 400-level errors for bad input.
- Handle errors with `try/catch` and return consistent JSON responses.
- Update the Prisma schema and run migrations when introducing new tables or relationships.

---

Paste this into `CU_PLUS_WEBAPP_BACKEND/README.md` and adjust any specifics as needed. If you’d like me to tailor it further once write access is available, let me know!
