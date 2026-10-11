// Shape of a document in the "requests" MongoDB collection.
// This is the only data that lives outside Sanity — it is high-frequency
// and transactional (guest creates it, admin updates its status), which
// suits a fast document DB + real-time push better than a CMS.

export type RequestStatus = "pending" | "in_progress" | "done";

export interface GuestRequest {
  _id?: string;
  roomNo: string;
  type: string; // "Extra towels", "Housekeeping", "Room service", ...
  note?: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  completedBy?: string; // admin email that pressed "Mark Done"
}

export const REQUEST_TYPES = [
  "Extra towels",
  "Housekeeping",
  "Room service",
  "Laundry",
  "Wake-up call",
  "Maintenance issue",
  "Other",
] as const;
