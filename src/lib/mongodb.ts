import "server-only";
import { MongoClient, type Db } from "mongodb";

const dbName = process.env.MONGODB_DB || "stayqr";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Lazy — the connection is opened on the first actual query (inside
// getDb()), never at module import time. That keeps `next build`'s
// page-data collection pass, and any route that merely imports this
// file, from trying to reach Mongo before it's needed.
function getClientPromise(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is missing — set it in .env.local");
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      global._mongoClientPromise = new MongoClient(uri).connect();
    }
    return global._mongoClientPromise;
  }

  if (!cachedProdClientPromise) {
    cachedProdClientPromise = new MongoClient(uri).connect();
  }
  return cachedProdClientPromise;
}

let cachedProdClientPromise: Promise<MongoClient> | undefined;

export async function getDb(): Promise<Db> {
  const client = await getClientPromise();
  return client.db(dbName);
}
