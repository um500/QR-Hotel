import { createClient } from "@sanity/client";

// One shared client, used server-side only (it carries a write token).
// Never import this file from a "use client" component.
export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-10-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // we need fresh reads right after a write
});
