"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { getPusherClient } from "@/lib/pusher/client";
import { createRequest } from "@/lib/actions/requests";
import type { GuestRequest } from "@/lib/models/request";
import type {
  Amenity,
  FoodItem,
  HotelInfo,
  LaundryItem,
  Place,
  RequestType,
  Service,
  Wifi,
} from "@/lib/sanity/types";
import GuestHeader from "@/components/guest/GuestHeader";
import BottomNav from "@/components/guest/BottomNav";
import StayTab from "@/components/guest/StayTab";
import ServicesTab from "@/components/guest/ServicesTab";
import ExploreTab from "@/components/guest/ExploreTab";
import HelpTab from "@/components/guest/HelpTab";
import AmenityDetailSheet from "@/components/guest/AmenityDetailSheet";
import ExtraTowelsSheet from "@/components/guest/flows/ExtraTowelsSheet";
import WakeUpCallSheet from "@/components/guest/flows/WakeUpCallSheet";
import HousekeepingFlow from "@/components/guest/flows/HousekeepingFlow";
import LaundryFlow from "@/components/guest/flows/LaundryFlow";
import MaintenanceFlow from "@/components/guest/flows/MaintenanceFlow";
import RoomServiceFlow from "@/components/guest/flows/RoomServiceFlow";
import { Toast } from "@/components/guest/ui";

export type GuestTab = "stay" | "services" | "explore" | "help";
export type FlowKey =
  | "extra-towels"
  | "wake-up-call"
  | "housekeeping"
  | "laundry"
  | "maintenance"
  | "room-service";

const FLOW_LABEL: Record<Exclude<FlowKey, "room-service">, string> = {
  "extra-towels": "Extra Towels",
  "wake-up-call": "Wake-up Call",
  housekeeping: "Housekeeping",
  laundry: "Laundry",
  maintenance: "Maintenance",
};

interface Props {
  roomNo: string;
  wifi: Wifi | null;
  hotelInfo: HotelInfo | null;
  services: Service[];
  places: Place[];
  amenities: Amenity[];
  requestTypes: RequestType[];
  foodItems: FoodItem[];
  laundryItems: LaundryItem[];
  initialRequests: GuestRequest[];
}

export default function RoomExperience({
  roomNo,
  wifi,
  hotelInfo,
  // `services` (the admin's category-grouped service directory) isn't
  // used by the reference Explore/Services layout — amenities and the
  // request-type grid cover that ground instead — kept in props for
  // forward-compat so nothing upstream has to change.
  services: _services,
  places,
  amenities,
  requestTypes,
  foodItems,
  laundryItems,
  initialRequests,
}: Props) {
  const [activeTab, setActiveTab] = useState<GuestTab>("stay");
  const [openFlow, setOpenFlow] = useState<FlowKey | null>(null);
  const [openAmenity, setOpenAmenity] = useState<Amenity | null>(null);
  const [requests, setRequests] = useState<GuestRequest[]>(initialRequests);
  const [note, setNote] = useState("");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  function flash(message: string) {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  }

  useEffect(() => {
    const pusher = getPusherClient();
    const channel = pusher.subscribe(`room-${roomNo}`);

    const upsert = (incoming: GuestRequest) => {
      setRequests((prev) => {
        const exists = prev.some((r) => r._id === incoming._id);
        return exists
          ? prev.map((r) => (r._id === incoming._id ? incoming : r))
          : [incoming, ...prev];
      });
    };

    channel.bind("request-created", upsert);
    channel.bind("request-updated", upsert);

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(`room-${roomNo}`);
    };
  }, [roomNo]);

  const activeRequests = useMemo(
    () => requests.filter((r) => r.status !== "done"),
    [requests]
  );

  function sendRequest(type: string, requestNote?: string) {
    startTransition(async () => {
      const result = await createRequest({ roomNo, type, note: requestNote });
      if (result.error) {
        flash(result.error);
      } else {
        flash(`${type} requested — front desk notified.`);
      }
    });
  }

  function handleQuickSend(type: string) {
    sendRequest(type, note || undefined);
    setNote("");
  }

  function handleFlowSend(note: string) {
    if (!openFlow || openFlow === "room-service") return;
    sendRequest(FLOW_LABEL[openFlow], note);
  }

  function addToCart(item: FoodItem) {
    setCart((prev) => ({ ...prev, [item._id]: (prev[item._id] || 0) + 1 }));
  }

  function removeFromCart(itemId: string) {
    setCart((prev) => {
      const next = { ...prev };
      const qty = (next[itemId] || 0) - 1;
      if (qty <= 0) delete next[itemId];
      else next[itemId] = qty;
      return next;
    });
  }

  function placeOrder() {
    const lines = foodItems
      .filter((f) => cart[f._id] > 0)
      .map((f) => `${cart[f._id]}x ${f.name}`);
    if (lines.length === 0) return;

    startTransition(async () => {
      const result = await createRequest({
        roomNo,
        type: "Room Service",
        note: lines.join(", "),
      });
      if (result.error) {
        flash(result.error);
      } else {
        flash("Order placed — the kitchen has been notified.");
        setCart({});
        setOpenFlow(null);
      }
    });
  }

  function submitFeedback(stars: number, comment: string) {
    const stars_str = "★".repeat(stars);
    sendRequest("Feedback", comment ? `${stars_str} — ${comment}` : stars_str);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Toast message={toast} />
      <GuestHeader
        roomNo={roomNo}
        hotelName={hotelInfo?.name}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
      />

      <main className="mx-auto max-w-md">
        {activeTab === "stay" && (
          <StayTab
            wifi={wifi}
            hotelInfo={hotelInfo}
            amenities={amenities}
            activeRequests={activeRequests}
            onOpenFlow={(flow) => setOpenFlow(flow)}
            onOpenAmenity={setOpenAmenity}
            onGoToServices={() => setActiveTab("services")}
          />
        )}
        {activeTab === "services" && (
          <ServicesTab
            requestTypes={requestTypes}
            requests={requests}
            note={note}
            onNoteChange={setNote}
            onOpenFlow={setOpenFlow}
            onQuickSend={handleQuickSend}
            isPending={isPending}
          />
        )}
        {activeTab === "explore" && <ExploreTab places={places} />}
        {activeTab === "help" && (
          <HelpTab hotelInfo={hotelInfo} onSubmitFeedback={submitFeedback} isPending={isPending} />
        )}
      </main>

      <BottomNav active={activeTab} onChange={setActiveTab} />

      <AmenityDetailSheet
        amenity={openAmenity}
        onClose={() => setOpenAmenity(null)}
        onBook={(name) => sendRequest("Amenity Booking", name)}
        isPending={isPending}
      />

      <ExtraTowelsSheet
        open={openFlow === "extra-towels"}
        onClose={() => setOpenFlow(null)}
        onSend={handleFlowSend}
        isPending={isPending}
      />
      <WakeUpCallSheet
        open={openFlow === "wake-up-call"}
        onClose={() => setOpenFlow(null)}
        onSend={handleFlowSend}
        isPending={isPending}
      />
      {openFlow === "housekeeping" && (
        <HousekeepingFlow
          onBack={() => setOpenFlow(null)}
          onSend={handleFlowSend}
          isPending={isPending}
        />
      )}
      {openFlow === "laundry" && (
        <LaundryFlow
          items={laundryItems}
          onBack={() => setOpenFlow(null)}
          onSend={handleFlowSend}
          isPending={isPending}
        />
      )}
      {openFlow === "maintenance" && (
        <MaintenanceFlow
          onBack={() => setOpenFlow(null)}
          onSend={handleFlowSend}
          isPending={isPending}
        />
      )}
      {openFlow === "room-service" && (
        <RoomServiceFlow
          foodItems={foodItems}
          cart={cart}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onBack={() => setOpenFlow(null)}
          onPlaceOrder={placeOrder}
          isPending={isPending}
        />
      )}
    </div>
  );
}
