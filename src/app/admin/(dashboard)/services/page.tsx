import { ChevronDown, ConciergeBell, Trash2 } from "lucide-react";
import { getAllServices, getAllRequestTypes } from "@/lib/sanity/queries";
import { deleteService } from "@/lib/actions/services";
import { AddServiceModal, EditServiceModal } from "@/components/ServiceModal";
import RequestTypesPanel from "@/components/RequestTypesPanel";
import { PageHeader, EmptyState, IconButton } from "@/components/ui";
import { categoryMeta } from "@/components/service-category";
import type { Service } from "@/lib/sanity/types";

export const dynamic = "force-dynamic";

function groupByCategory(services: Service[]) {
  const groups = new Map<string, Service[]>();
  for (const s of services) {
    const list = groups.get(s.category) || [];
    list.push(s);
    groups.set(s.category, list);
  }
  return Array.from(groups.entries());
}

export default async function ServicesPage() {
  const [services, requestTypes] = await Promise.all([
    getAllServices(),
    getAllRequestTypes(),
  ]);
  const groups = groupByCategory(services);

  return (
    <div>
      <PageHeader
        title="Services"
        subtitle="Manage hotel services and guest information."
        action={<AddServiceModal />}
      />

      <RequestTypesPanel requestTypes={requestTypes} />

      {services.length === 0 ? (
        <EmptyState
          icon={<ConciergeBell size={24} />}
          title="No services yet"
          subtitle="Add your first service for guests to request."
          action={<AddServiceModal />}
        />
      ) : (
        <div className="flex flex-col gap-4">
          {groups.map(([category, items]) => {
            const { icon: Icon, tint, desc } = categoryMeta(category);
            return (
              <details
                key={category}
                open
                className="group overflow-hidden rounded-xl2 border border-line bg-white shadow-card"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-full ${tint}`}>
                      <Icon size={18} />
                    </span>
                    <div>
                      <span className="flex items-center gap-2">
                        <h2 className="font-display text-base font-semibold text-ink">{category}</h2>
                        <span className="rounded-full bg-paper px-2 py-0.5 text-xs font-medium text-ink-dim">
                          {items.length}
                        </span>
                      </span>
                      {desc && <p className="text-xs text-ink-dim">{desc}</p>}
                    </div>
                  </div>
                  <ChevronDown size={18} className="text-ink-faint transition-transform group-open:rotate-180" />
                </summary>

                <div className="border-t border-line">
                  {items.map((s) => (
                    <div
                      key={s._id}
                      className="flex items-center gap-3 border-b border-line px-5 py-3 last:border-0 hover:bg-paper/60"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-ink">{s.title}</p>
                        <p className="truncate text-xs text-ink-faint">
                          {s.contact && `Ext. ${s.contact.replace(/^Ext\.?\s*/i, "")}`}
                          {s.contact && s.availableTime && " · "}
                          {s.availableTime}
                        </p>
                      </div>
                      <EditServiceModal service={s} />
                      <form action={deleteService.bind(null, s._id)}>
                        <IconButton tone="danger" type="submit" aria-label={`Delete ${s.title}`}>
                          <Trash2 size={14} />
                        </IconButton>
                      </form>
                    </div>
                  ))}
                </div>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
