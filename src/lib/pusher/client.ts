"use client";

import PusherClient from "pusher-js";

let pusherClientInstance: PusherClient | null = null;

// One socket per browser tab, created lazily so it never runs during SSR.
export function getPusherClient() {
  if (!pusherClientInstance) {
    pusherClientInstance = new PusherClient(
      process.env.NEXT_PUBLIC_PUSHER_KEY as string,
      { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string }
    );
  }
  return pusherClientInstance;
}
