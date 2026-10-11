// Document shapes stored in Sanity. There is no sanity.config.ts / schema
// deploy in this project — we write plain documents straight through the
// API with a write token, so these types are the single source of truth
// on the Next.js side. Keep them in sync with the queries below.

export interface Room {
  _id: string;
  _type: "room";
  roomNo: string;
  qrToken: string;
  createdAt: string;
}

export interface Wifi {
  _id: string;
  _type: "wifi";
  ssid: string;
  password: string;
}

export interface Service {
  _id: string;
  _type: "service";
  title: string;
  category: string; // e.g. "Housekeeping" | "Food & Beverage" | "Laundry" | "Concierge"
  contact?: string;
  availableTime?: string;
}

// "Attraction" (or unset, for places added before this field existed)
// groups under the guest app's "Tourist Places" section; everything else
// groups under "Nearby Essentials" with a category tag on the card.
export type PlaceCategory =
  | "Attraction"
  | "Restaurant"
  | "ATM"
  | "Pharmacy"
  | "Hospital"
  | "Cab";

export interface Place {
  _id: string;
  _type: "place";
  name: string;
  distanceKm: number;
  mapUrl: string;
  photoUrl?: string;
  category?: PlaceCategory;
}

export interface Amenity {
  _id: string;
  _type: "amenity";
  name: string;
  description?: string;
  timing?: string;
  location?: string;
  photoUrl?: string;
  bookingRequired: boolean;
}

// The tap-to-request buttons on the guest app (Housekeeping, Laundry,
// Maintenance, Extra Towels, ...). Admin-managed so the hotel can add or
// remove what guests can one-tap request without a code change.
export interface RequestType {
  _id: string;
  _type: "requestType";
  label: string;
  order: number;
}

// A single room-service / food-menu item guests can order under the
// "Food & Beverage" service.
export interface FoodItem {
  _id: string;
  _type: "foodItem";
  name: string;
  category: string; // e.g. "Starters" | "Main Course" | "Beverages" | "Desserts" | "Snacks"
  price: number;
  veg: boolean;
  available: boolean;
  description?: string;
}

// A clothing item guests can send for wash/iron/dry-clean under the
// Laundry request flow. Admin-managed (name + photo) so the hotel can
// show real photos instead of generic icons, and add/remove items.
export interface LaundryItem {
  _id: string;
  _type: "laundryItem";
  name: string;
  description?: string;
  photoUrl?: string;
  order: number;
}

export interface HotelInfo {
  _id: string;
  _type: "hotelInfo";
  name: string;
  checkoutTime: string;
  breakfastTime: string;
  amenities: string[];
  policies?: string;
  // Guest-facing Help tab contact numbers. Optional — no admin form writes
  // these yet, so existing hotelInfo docs won't have them; the Help tab
  // hides a contact row gracefully when its field is missing.
  receptionPhone?: string;
  whatsappNumber?: string;
  securityPhone?: string;
}

// Fixed document ids for the two "singleton" documents — there is only
// ever one WiFi record and one hotelInfo record for a single-hotel build.
export const WIFI_DOC_ID = "wifiSettings";
export const HOTEL_INFO_DOC_ID = "hotelInfo";
