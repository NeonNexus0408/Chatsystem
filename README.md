# Chat System Frontend (React)

Frontend starter for a chat system using React + Vite + Material UI + Redux Toolkit.

## Included features

- Template selector (Modern / Minimal)
- Theme provider with light/dark mode toggle
- Redux store + auth slice
- Layout with protected routes
- Pages: Login, Registration, Chat
- Reusable components (AuthForm, ChatComposer, ProtectedRoute)
- Auth bearer token injection for API calls
- Axios API layer for auth/chat endpoints
- File upload support via multipart/form-data

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Environment

Copy `.env.example` to `.env` and set your API URL:

```bash
VITE_API_BASE_URL=http://localhost:4000/api
```
