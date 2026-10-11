"use client";

import { useState } from "react";
import { Phone, MessageCircle, ShieldAlert, Star, ChevronRight } from "lucide-react";
import type { HotelInfo } from "@/lib/sanity/types";
import { SectionCard } from "@/components/guest/ui";

const EMERGENCY_CONTACTS = [
  { label: "Police", desc: "For immediate emergency help", phone: "100" },
  { label: "Hospital", desc: "Nearest hospital for medical support", phone: "108" },
];

export default function HelpTab({
  hotelInfo,
  onSubmitFeedback,
  isPending,
}: {
  hotelInfo: HotelInfo | null;
  onSubmitFeedback: (stars: number, comment: string) => void;
  isPending: boolean;
}) {
  const [stars, setStars] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);

  function submit() {
    if (stars === 0) return;
    onSubmitFeedback(stars, comment);
    setSent(true);
    setStars(0);
    setComment("");
    setTimeout(() => setSent(false), 2500);
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-24 pt-1">
      <SectionCard>
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
            <Phone size={19} />
          </span>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-ink-faint">
              Reception
            </p>
            <p className="font-display text-base font-semibold text-ink">Call Reception</p>
            <p className="text-xs text-ink-dim">For any assistance, 24×7</p>
          </div>
        </div>
        {hotelInfo?.receptionPhone ? (
          <a
            href={`tel:${hotelInfo.receptionPhone}`}
            className="flex items-center justify-between rounded-lg bg-brand-soft px-3.5 py-2.5 text-sm font-semibold text-brand"
          >
            <span className="flex items-center gap-2">
              <Phone size={14} /> {hotelInfo.receptionPhone}
            </span>
            <ChevronRight size={15} />
          </a>
        ) : (
          <p className="rounded-lg bg-paper px-3.5 py-2.5 text-xs text-ink-faint">
            Reception number not set up yet — ask the admin to add it.
          </p>
        )}
      </SectionCard>

      <a
        href={hotelInfo?.whatsappNumber ? `https://wa.me/${hotelInfo.whatsappNumber}` : undefined}
        target="_blank"
        rel="noreferrer"
        className={`flex items-center gap-3 rounded-xl2 bg-success px-4 py-3.5 text-white shadow-card ${
          !hotelInfo?.whatsappNumber ? "pointer-events-none opacity-50" : ""
        }`}
      >
        <MessageCircle size={20} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">Chat on WhatsApp</p>
          <p className="text-xs text-white/80">Quick support, faster response</p>
        </div>
        <ChevronRight size={16} className="shrink-0" />
      </a>

      <div>
        <h2 className="mb-2.5 px-0.5 font-display text-[15px] font-semibold text-ink">
          Emergency Contacts
        </h2>
        <SectionCard>
          <ul className="flex flex-col divide-y divide-line">
            {EMERGENCY_CONTACTS.map((c) => (
              <li key={c.label} className="flex items-center justify-between gap-3 py-2.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-ink">{c.label}</p>
                  <p className="truncate text-xs text-ink-faint">{c.desc}</p>
                </div>
                <a
                  href={`tel:${c.phone}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand"
                >
                  <Phone size={11} /> +91 {c.phone}
                </a>
              </li>
            ))}
            {hotelInfo?.securityPhone && (
              <li className="flex items-center justify-between gap-3 py-2.5 last:pb-0">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert size={16} className="shrink-0 text-success" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-ink">Hotel Security</p>
                    <p className="truncate text-xs text-ink-faint">For any safety or security concerns</p>
                  </div>
                </div>
                <a
                  href={`tel:${hotelInfo.securityPhone}`}
                  className="flex shrink-0 items-center gap-1.5 rounded-full bg-brand-soft px-3 py-1.5 text-xs font-semibold text-brand"
                >
                  <Phone size={11} /> {hotelInfo.securityPhone}
                </a>
              </li>
            )}
          </ul>
        </SectionCard>
      </div>

      <SectionCard className="bg-success-soft">
        <div className="mb-3 flex items-center gap-2.5">
          <Star size={18} className="shrink-0 fill-success text-success" />
          <div>
            <p className="font-display text-base font-semibold text-ink">How was your stay?</p>
            <p className="text-xs text-ink-dim">Your feedback helps us serve you better.</p>
          </div>
        </div>
        <div className="mb-3 flex items-center gap-1.5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" aria-label={`${n} star`} onClick={() => setStars(n)}>
              <Star
                size={26}
                className={n <= stars ? "fill-warning text-warning" : "text-line"}
              />
            </button>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 200))}
          rows={2}
          placeholder="Share your feedback (optional)…"
          className="w-full resize-none rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-soft"
        />
        <p className="mt-1 text-right text-[10px] text-ink-faint">{comment.length}/200</p>
        <button
          type="button"
          disabled={stars === 0 || isPending}
          onClick={submit}
          className="mt-2 w-full rounded-lg bg-success py-3 text-sm font-semibold text-white disabled:opacity-50"
        >
          {sent ? "Thank you!" : "Submit Feedback"}
        </button>
      </SectionCard>
    </div>
  );
}
