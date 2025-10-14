# Figma car rental

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/logesh2046-2371s-projects/v0-figma-car-rental)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/XDjafkrIcCA)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/logesh2046-2371s-projects/v0-figma-car-rental](https://vercel.com/logesh2046-2371s-projects/v0-figma-car-rental)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/XDjafkrIcCA](https://v0.app/chat/projects/XDjafkrIcCA)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Local setup for Leaflet map (GPS Tracking)

The project includes a Leaflet-based map component used in the Admin Dashboard GPS Tracking tab. To enable it locally, install the following packages and ensure Leaflet's CSS is loaded by your app:

1. Install packages (pnpm / npm / yarn):

```bash
pnpm add react-leaflet leaflet
pnpm add -D @types/leaflet
```

2. Leaflet requires its CSS file. We import it in the component, but if your bundler needs a global import, add this to `app/globals.css` or `_app.tsx`:

```css
@import 'leaflet/dist/leaflet.css';
```

3. Restart the dev server. The Admin Dashboard > GPS Tracking tab will display an interactive map with active booking markers.

If you prefer Mapbox or Google Maps, I can swap the implementation to use that provider instead (requires API key).

## Demo authentication (signup / login)

This project includes a small file-backed authentication demo under `app/api/auth/` that stores users in `data/users.json` (NOT production-ready).

To enable password hashing you need `bcryptjs` installed:

```bash
pnpm add bcryptjs
pnpm add -D @types/bcryptjs
```

Usage (development only):
- POST to `/api/auth/signup` with { name, email, password } to create a user (password hashed in `data/users.json`).
- POST to `/api/auth/login` with { email, password } to authenticate and set a server-side `session` cookie.

Replace this demo with a production-ready solution (NextAuth, Clerk, Auth0, or your own session store) before deploying.

4. Optional: Marker clustering

If you want marker clustering (recommended for many vehicles), install the plugin and its types:

```bash
pnpm add leaflet.markercluster
pnpm add -D @types/leaflet.markercluster
```

You may also need to import the plugin CSS where appropriate, for example in `app/globals.css`:

```css
@import 'leaflet.markercluster/dist/MarkerCluster.css';
@import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
```
