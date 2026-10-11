import Logo from "@/components/Logo";
import { getRoomPageData } from "@/lib/sanity/queries";
import { listRoomRequests } from "@/lib/requests-data";
import RoomExperience from "./RoomPageClient";

export const dynamic = "force-dynamic"; // always fetch fresh — this is live data

export default async function RoomPage({
  params,
}: {
  params: { room: string };
}) {
  const roomNo = decodeURIComponent(params.room);
  const {
    room,
    wifi,
    hotelInfo,
    services,
    places,
    amenities,
    requestTypes,
    foodItems,
    laundryItems,
  } = await getRoomPageData(roomNo);

  if (!room) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-navy px-6 text-center">
        <Logo tone="light" />
        <div>
          <h1 className="font-display text-lg font-semibold text-white">
            Room not found
          </h1>
          <p className="mt-1.5 text-sm text-white/60">
            This QR code doesn&apos;t match a room on file. Please contact
            the front desk for help.
          </p>
        </div>
      </main>
    );
  }

  const initialRequests = await listRoomRequests(roomNo);

  return (
    <RoomExperience
      roomNo={room.roomNo}
      wifi={wifi}
      hotelInfo={hotelInfo}
      services={services}
      places={places}
      amenities={amenities}
      requestTypes={requestTypes}
      foodItems={foodItems}
      laundryItems={laundryItems}
      initialRequests={initialRequests}
    />
  );
}
