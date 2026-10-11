import { sanityClient } from "./client";
import { cached, CACHE_KEYS } from "@/lib/redis";
import {
  HOTEL_INFO_DOC_ID,
  WIFI_DOC_ID,
  type Amenity,
  type FoodItem,
  type HotelInfo,
  type LaundryItem,
  type Place,
  type RequestType,
  type Room,
  type Service,
  type Wifi,
} from "./types";

// Every function here is read-heavy and content-driven (set once by the
// admin, read on every guest page load), which is exactly what the Redis
// cache-aside wrapper in lib/redis.ts is for. The corresponding admin
// action (lib/actions/*) calls invalidateCache() with the matching
// CACHE_KEYS entry right after writing to Sanity, so a change shows up
// immediately instead of waiting out the TTL.

export async function getRoomByNo(roomNo: string): Promise<Room | null> {
  return cached(CACHE_KEYS.room(roomNo), () =>
    sanityClient.fetch(`*[_type == "room" && roomNo == $roomNo][0]`, { roomNo })
  );
}

export async function getAllRooms(): Promise<Room[]> {
  return cached(CACHE_KEYS.rooms, () =>
    sanityClient.fetch(`*[_type == "room"] | order(roomNo asc)`)
  );
}

export async function getWifi(): Promise<Wifi | null> {
  return cached(CACHE_KEYS.wifi, () =>
    sanityClient.fetch(`*[_id == $id][0]`, { id: WIFI_DOC_ID })
  );
}

export async function getHotelInfo(): Promise<HotelInfo | null> {
  return cached(CACHE_KEYS.hotelInfo, () =>
    sanityClient.fetch(`*[_id == $id][0]`, { id: HOTEL_INFO_DOC_ID })
  );
}

export async function getAllServices(): Promise<Service[]> {
  return cached(CACHE_KEYS.services, () =>
    sanityClient.fetch(`*[_type == "service"] | order(category asc, title asc)`)
  );
}

export async function getAllPlaces(): Promise<Place[]> {
  return cached(CACHE_KEYS.places, () =>
    sanityClient.fetch(`*[_type == "place"] | order(distanceKm asc)`)
  );
}

export async function getAllAmenities(): Promise<Amenity[]> {
  return cached(CACHE_KEYS.amenities, () =>
    sanityClient.fetch(`*[_type == "amenity"] | order(name asc)`)
  );
}

// The guest app's one-tap request buttons (Housekeeping, Laundry,
// Maintenance, ...), in the order the admin arranged them.
export async function getAllRequestTypes(): Promise<RequestType[]> {
  return cached(CACHE_KEYS.requestTypes, () =>
    sanityClient.fetch(`*[_type == "requestType"] | order(order asc)`)
  );
}

// Room-service / food-menu items, grouped for display by category.
export async function getAllFoodItems(): Promise<FoodItem[]> {
  return cached(CACHE_KEYS.foodItems, () =>
    sanityClient.fetch(`*[_type == "foodItem"] | order(category asc, name asc)`)
  );
}

// Laundry items (Shirt, Trouser, Saree, ...) shown with real photos in
// the guest app's Laundry flow, in the order the admin arranged them.
export async function getAllLaundryItems(): Promise<LaundryItem[]> {
  return cached(CACHE_KEYS.laundryItems, () =>
    sanityClient.fetch(`*[_type == "laundryItem"] | order(order asc)`)
  );
}

// Everything the guest room page needs, in one round trip.
export async function getRoomPageData(roomNo: string) {
  const [room, wifi, hotelInfo, services, places, amenities, requestTypes, foodItems, laundryItems] =
    await Promise.all([
      getRoomByNo(roomNo),
      getWifi(),
      getHotelInfo(),
      getAllServices(),
      getAllPlaces(),
      getAllAmenities(),
      getAllRequestTypes(),
      getAllFoodItems(),
      getAllLaundryItems(),
    ]);
  return { room, wifi, hotelInfo, services, places, amenities, requestTypes, foodItems, laundryItems };
}
