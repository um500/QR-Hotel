import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

function MarkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
      <rect x="18" y="3" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
      <rect x="3" y="18" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
      <rect x="7" y="7" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="22" y="7" width="3" height="3" rx="0.5" fill="currentColor" />
      <rect x="7" y="22" width="3" height="3" rx="0.5" fill="currentColor" />
      <path
        d="M19 20h4v4h-4v-4Zm6 0h4v4h-4v-4Zm-6 6h4v4h-4v-4Zm6 0h4v4h-4v-4Z"
        fill="currentColor"
      />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const RESOURCES = [
  { label: "Help Center", href: "#contact" },
  { label: "FAQs", href: "#contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
];

const SOCIALS = [Instagram, Facebook, Linkedin, Youtube];

export default function LandingFooter() {
  return (
    <footer id="contact" className="bg-navy px-5 pb-6 pt-16 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <MarkIcon className="h-6 w-6 text-gold" />
              <span className="font-display text-lg font-semibold text-white">
                Stay<span className="text-gold">QR</span>
              </span>
            </div>
            <p className="mt-3 text-sm text-white/55">
              Smart Stays. Happier Guests.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Quick Links</p>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/55 transition hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Resources</p>
            <ul className="mt-4 space-y-2.5">
              {RESOURCES.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-sm text-white/55 transition hover:text-gold"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Contact Us</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/55">
              <li className="flex items-center gap-2">
                <Mail size={14} className="shrink-0 text-gold" />
                hello@stayqr.com
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="shrink-0 text-gold" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0 text-gold" />
                Kolkata, India
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Follow Us</p>
            <div className="mt-4 flex gap-2.5">
              {SOCIALS.map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="Social link"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 transition hover:bg-gold hover:text-navy"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row">
          <p>© 2026 StayQR. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gold">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gold">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
