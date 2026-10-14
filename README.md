# DeskQR

Single-hotel room QR system. Guest scans a room's QR, no login, sees WiFi,
services and nearby places; can send a request that shows up live on the
admin dashboard. Content (rooms, WiFi, services, places) lives in Sanity;
live requests live in MongoDB; status updates push over Pusher.

## 1. Accounts you need (all free tier)

**Sanity** — go to [sanity.io/manage](https://www.sanity.io/manage) → create
a project → note the **Project ID** → in that project, create a dataset
named `production` → under API → Tokens, add a token with **Editor**
permission and copy it. You never open Sanity Studio day-to-day — this app
writes to it directly.

**MongoDB Atlas** — create a free cluster at
[mongodb.com/atlas](https://www.mongodb.com/atlas) → Database Access: add a
user → Network Access: allow your IP (or `0.0.0.0/0` for simplicity while
building) → copy the connection string.

**Pusher** — create a free app (Channels product) at
[pusher.com](https://pusher.com) → note the app id, key, secret, cluster.

## 2. Configure

```bash
cp .env.example .env.local
```

Fill in every value. For `ADMIN_PASSWORD_HASH`, generate it once:

```bash
node -e "console.log(require('bcryptjs').hashSync('yourpassword', 10))"
```

Paste the output (starts with `$2a$...`) into `.env.local`.

## 3. Install and run

```bash
npm install
npm run dev
```

Visit `/admin/login`, sign in with `ADMIN_EMAIL` / the password you hashed.

## 4. First-time setup inside the app

1. `/admin/wifi` — set the WiFi name and password
2. `/admin/rooms` — add your rooms (e.g. 101, 102...) and download each
   room's QR code (prints as a PNG targeting `/r/101`, etc.)
3. `/admin/services` — add housekeeping, room service, laundry, etc.
4. `/admin/places` — add nearby places with a Google Maps link each

Stick each room's downloaded QR on that room's door or desk. Scanning it
opens `/r/<room number>` — no login, live data.

## 5. Deploying

Deploy to Vercel as a normal Next.js app; add the same environment
variables there. MongoDB Atlas and Sanity are already cloud-hosted, so
nothing else to stand up.

## Notes on scope

- Single hotel only. To support multiple hotels later, add a `hotelId`
  field to every Sanity document and every MongoDB request, and scope every
  query by it — the rest of the structure stays the same.
- Real-time uses Pusher's public channels (no per-channel auth) to keep
  the MVP simple. If you later want to lock down who can post requests, add
  a private-channel auth endpoint.
- Admin auth is a single hardcoded account via env vars. Add a users
  collection if more than one staff login is needed.
