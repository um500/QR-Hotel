import { BedDouble, Download, Trash2 } from "lucide-react";
import { getAllRooms } from "@/lib/sanity/queries";
import { deleteRoom } from "@/lib/actions/rooms";
import AddRoomModal from "@/components/AddRoomModal";
import { PageHeader, EmptyState } from "@/components/ui";
import { formatDateTime } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function RoomsPage() {
  const rooms = await getAllRooms();

  return (
    <div>
      <PageHeader
        title="Rooms"
        subtitle="Manage room details, status and amenities."
        action={<AddRoomModal />}
      />

      {rooms.length === 0 ? (
        <EmptyState
          icon={<BedDouble size={24} />}
          title="No rooms added yet"
          subtitle="Add your first room to get started."
          action={<AddRoomModal />}
        />
      ) : (
        <div className="overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-faint">
                  <th className="px-5 py-3 font-medium">Room No</th>
                  <th className="px-5 py-3 font-medium">QR</th>
                  <th className="px-5 py-3 font-medium">Created Date</th>
                  <th className="px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room._id} className="border-b border-line last:border-0 hover:bg-paper/60">
                    <td className="px-5 py-3 font-medium text-ink">{room.roomNo}</td>
                    <td className="px-5 py-3">
                      {/* The QR route itself requires an admin session, so this
                          thumbnail renders fine from inside the admin panel. */}
                      <img
                        src={`/api/qr/${room.roomNo}`}
                        alt={`QR for room ${room.roomNo}`}
                        className="h-10 w-10 rounded border border-line bg-white p-0.5"
                      />
                    </td>
                    <td className="px-5 py-3 text-ink-dim">{formatDateTime(room.createdAt)}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <a
                          href={`/api/qr/${room.roomNo}`}
                          download={`room-${room.roomNo}-qr.png`}
                          aria-label={`Download QR for room ${room.roomNo}`}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-brand hover:bg-brand-soft"
                        >
                          <Download size={15} />
                        </a>
                        <form action={deleteRoom.bind(null, room._id)}>
                          <button
                            type="submit"
                            aria-label={`Delete room ${room.roomNo}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-line text-danger hover:bg-danger-soft"
                          >
                            <Trash2 size={15} />
                          </button>
                        </form>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-line px-5 py-3 text-xs text-ink-faint">
            <span>
              Showing 1–{rooms.length} of {rooms.length} rooms
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
