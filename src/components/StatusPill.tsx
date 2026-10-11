import type { RequestStatus } from "@/lib/models/request";

const STYLES: Record<RequestStatus, string> = {
  pending: "bg-warning-soft text-warning",
  in_progress: "bg-brand-soft text-brand",
  done: "bg-success-soft text-success",
};

const LABELS: Record<RequestStatus, string> = {
  pending: "Pending",
  in_progress: "On the Way",
  done: "Done",
};

export default function StatusPill({ status }: { status: RequestStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {LABELS[status]}
    </span>
  );
}
