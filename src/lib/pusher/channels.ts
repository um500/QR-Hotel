// Channel names only — no Pusher instance, no secrets. Safe to import from
// both server code and "use client" components.
export const ADMIN_REQUESTS_CHANNEL = "admin-requests";
export const roomChannel = (roomNo: string) => `room-${roomNo}`;
