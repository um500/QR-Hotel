import "server-only";
import { Redis } from "@upstash/redis";

// Upstash's REST-based client — works over plain HTTPS with no persistent
// TCP connection, which is what makes it safe to use from Next.js server
// actions/route handlers running on serverless/edge (a normal TCP Redis
// client would open a new connection per invocation and exhaust Upstash's
// connection limit under load).
//
// Caching is optional, not a dependency: if these env vars aren't set
// (local dev, or a hotel that hasn't provisioned Upstash yet), `redis` is
// null and every call below falls straight through to Sanity. Nothing
// breaks — it's just as fast as before caching existed.
const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;

export const redis = url && token ? new Redis({ url, token }) : null;

// Safety-net TTL — content writes invalidate their key immediately (see
// invalidateCache below), so in normal operation a key is only ever served
// from a write, not from expiry. The TTL exists only to self-heal if an
// invalidation is ever missed (a bug, a Redis blip during a write).
const DEFAULT_TTL_SECONDS = 300;

// Cache-aside read: serve from Redis when warm, otherwise call `fetcher`
// (the real Sanity query), cache the result, and return it. Content here
// is per-hotel and small (a few KB at most), so whole-array caching is
// fine — no pagination to worry about.
export async function cached<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds: number = DEFAULT_TTL_SECONDS
): Promise<T> {
  if (!redis) return fetcher();

  try {
    const hit = await redis.get<T>(key);
    if (hit !== null && hit !== undefined) return hit;
  } catch {
    // Redis unreachable (network blip, wrong creds) — don't fail the
    // page over a cache miss, just read Sanity directly this time.
  }

  const fresh = await fetcher();

  try {
    await redis.set(key, fresh, { ex: ttlSeconds });
  } catch {
    // Best-effort write — a failed cache write still returns fresh data
    // to the caller, it just won't be cached for the next request.
  }

  return fresh;
}

// Called from every admin create/update/delete action right after the
// Sanity write, so the next guest or admin read is fresh immediately
// instead of waiting out the TTL.
export async function invalidateCache(...keys: string[]): Promise<void> {
  if (!redis || keys.length === 0) return;
  try {
    await redis.del(...keys);
  } catch {
    // Best-effort — worst case the stale entry still self-heals via TTL.
  }
}

// One place for every cache key name, so a query function and the actions
// that invalidate it can't drift apart.
export const CACHE_KEYS = {
  wifi: "cache:wifi",
  hotelInfo: "cache:hotelInfo",
  services: "cache:services",
  places: "cache:places",
  amenities: "cache:amenities",
  requestTypes: "cache:requestTypes",
  foodItems: "cache:foodItems",
  laundryItems: "cache:laundryItems",
  rooms: "cache:rooms",
  room: (roomNo: string) => `cache:room:${roomNo}`,
} as const;
