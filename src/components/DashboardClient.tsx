"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { Bell, BedDouble, Clock3, Zap, ChevronDown, CheckCheck } from "lucide-react";
import { getPusherClient } from "@/lib/pusher/client";
import { updateRequestStatus } from "@/lib/actions/requests";
import { ADMIN_REQUESTS_CHANNEL } from "@/lib/pusher/channels";
import type { GuestRequest, RequestStatus } from "@/lib/models/request";
import { formatClockTime } from "@/lib/format";
import StatusPill from "@/components/StatusPill";
import StatCard from "@/components/StatCard";
import { requestIconFor } from "@/components/request-icons";

const NEXT_STATUS: Record<RequestStatus, RequestStatus | null> = {
  pending: "in_progress",
  in_progress: "done",
  done: null,
};

const NEXT_LABEL: Record<RequestStatus, string> = {
  pending: "Start",
  in_progress: "Mark Done",
  done: "",
};

export default function DashboardClient({
  initialRequests,
  roomsCount,
  avgResponseMinutes,
}: {
  initialRequests: GuestRequest[];
  roomsCount: number;
  avgResponseMinutes: number | null;
}) {
  const [requests, setRequests] = useState(initialRequests);
  const [completedOpen, setCompletedOpen] = useState(true);
  const [, startTransition] = useTransition();
  const [justArrived, setJustArrived] = useState<Set<string>>(new Set());

  useEffect(() => {
    const pusher = getPusherClient();
    const channel = pusher.subscribe(ADMIN_REQUESTS_CHANNEL);

    const upsert = (incoming: GuestRequest, flash = false) => {
      setRequests((prev) => {
        const exists = prev.some((r) => r._id === incoming._id);
        return exists
          ? prev.map((r) => (r._id === incoming._id ? incoming : r))
          : [incoming, ...prev];
      });
      if (flash && incoming._id) {
        setJustArrived((prev) => new Set(prev).add(incoming._id as string));
        setTimeout(() => {
          setJustArrived((prev) => {
            const next = new Set(prev);
            next.delete(incoming._id as string);
            return next;
          });
        }, 2500);
      }
    };

    channel.bind("new-request", (r: GuestRequest) => upsert(r, true));
    channel.bind("request-updated", (r: GuestRequest) => upsert(r, false));

    return () => {
      channel.unbind_all();
      pusher.unsubscribe(ADMIN_REQUESTS_CHANNEL);
    };
  }, []);

  function advance(id: string, next: RequestStatus) {
    startTransition(async () => {
      await updateRequestStatus(id, next);
    });
  }

  const open = useMemo(
    () => requests.filter((r) => r.status !== "done"),
    [requests]
  );
  const completed = useMemo(
    () =>
      requests
        .filter((r) => r.status === "done")
        .sort(
          (a, b) =>
            new Date(b.completedAt || b.updatedAt).getTime() -
            new Date(a.completedAt || a.updatedAt).getTime()
        )
        .slice(0, 8),
    [requests]
  );

  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  }, []);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[26px] font-semibold text-ink">
            {greeting}, Admin
          </h1>
          <p className="mt-1 text-sm text-ink-dim">
            Here&apos;s what&apos;s happening at your hotel today.
          </p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={Bell}
          tint="bg-warning-soft text-warning"
          label="Open Requests"
          value={open.length}
          caption="Pending attention"
        />
        <StatCard
          icon={BedDouble}
          tint="bg-brand-soft text-brand"
          label="Rooms"
          value={roomsCount}
          caption="Total rooms"
        />
        <StatCard
          icon={Clock3}
          tint="bg-success-soft text-success"
          label="Avg Response Time"
          value={avgResponseMinutes != null ? `${avgResponseMinutes} min` : "—"}
          caption="Last 24 hours"
        />
      </div>

      <section className="mb-6 overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-gold" />
            <h2 className="font-display text-base font-semibold text-ink">
              Live Requests
            </h2>
            <span className="flex items-center gap-1 text-xs text-ink-faint">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Real-time updates
            </span>
          </div>
          {open.length > 0 && (
            <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-medium text-brand">
              {open.length} new
            </span>
          )}
        </div>

        {open.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-ink-faint">
            No open requests right now.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-faint">
                  <th className="px-5 py-3 font-medium">Room</th>
                  <th className="px-5 py-3 font-medium">Request Type</th>
                  <th className="px-5 py-3 font-medium">Note</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th className="px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {open.map((r) => {
                  const next = NEXT_STATUS[r.status];
                  const { icon: Icon, tint } = requestIconFor(r.type);
                  const flashing = r._id ? justArrived.has(r._id) : false;
                  return (
                    <tr
                      key={r._id}
                      className={`border-b border-line last:border-0 transition-colors ${
                        flashing ? "bg-brand-soft/60" : "hover:bg-paper/60"
                      }`}
                    >
                      <td className="px-5 py-3 font-medium text-ink">
                        {flashing && (
                          <span className="mr-2 rounded bg-brand px-1.5 py-0.5 text-[10px] font-semibold uppercase text-white">
                            New
                          </span>
                        )}
                        {r.roomNo}
                      </td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-2 text-ink">
                          <span className={`flex h-7 w-7 items-center justify-center rounded-full ${tint}`}>
                            <Icon size={14} />
                          </span>
                          {r.type}
                        </span>
                      </td>
                      <td className="max-w-[220px] truncate px-5 py-3 text-ink-dim">
                        {r.note || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="tnum px-5 py-3 text-ink-dim">
                        {formatClockTime(r.createdAt)}
                      </td>
                      <td className="px-5 py-3">
                        {next && (
                          <button
                            onClick={() => advance(r._id as string, next)}
                            className={
                              r.status === "pending"
                                ? "rounded-lg bg-brand px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover"
                                : "rounded-lg border border-brand px-3.5 py-1.5 text-xs font-semibold text-brand hover:bg-brand-soft"
                            }
                          >
                            {NEXT_LABEL[r.status]}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="overflow-hidden rounded-xl2 border border-line bg-white shadow-card">
        <button
          onClick={() => setCompletedOpen((v) => !v)}
          className="flex w-full items-center justify-between px-5 py-4"
        >
          <div className="flex items-center gap-2">
            <CheckCheck size={16} className="text-success" />
            <div className="text-left">
              <h2 className="font-display text-base font-semibold text-ink">
                Recently Completed
              </h2>
              <p className="text-xs text-ink-faint">Last {completed.length} completed requests</p>
            </div>
          </div>
          <ChevronDown
            size={18}
            className={`text-ink-faint transition-transform ${completedOpen ? "rotate-180" : ""}`}
          />
        </button>

        {completedOpen &&
          (completed.length === 0 ? (
            <p className="px-5 pb-6 text-sm text-ink-faint">Nothing completed yet.</p>
          ) : (
            <div className="overflow-x-auto border-t border-line">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-line text-xs uppercase tracking-wide text-ink-faint">
                    <th className="px-5 py-3 font-medium">Room</th>
                    <th className="px-5 py-3 font-medium">Request Type</th>
                    <th className="px-5 py-3 font-medium">Note</th>
                    <th className="px-5 py-3 font-medium">Status</th>
                    <th className="px-5 py-3 font-medium">Time</th>
                    <th className="px-5 py-3 font-medium">Completed By</th>
                  </tr>
                </thead>
                <tbody>
                  {completed.map((r) => (
                    <tr key={r._id} className="border-b border-line text-ink-dim last:border-0">
                      <td className="px-5 py-3 font-medium text-ink">{r.roomNo}</td>
                      <td className="px-5 py-3">{r.type}</td>
                      <td className="max-w-[220px] truncate px-5 py-3">{r.note || "—"}</td>
                      <td className="px-5 py-3">
                        <StatusPill status={r.status} />
                      </td>
                      <td className="tnum px-5 py-3">{formatClockTime(r.updatedAt)}</td>
                      <td className="px-5 py-3">{r.completedBy || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
      </section>
    </div>
  );
}
