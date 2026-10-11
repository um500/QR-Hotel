import { getWifi } from "@/lib/sanity/queries";
import WifiForm from "@/components/WifiForm";
import { PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function WifiPage() {
  const wifi = await getWifi();

  return (
    <div>
      <PageHeader
        title="WiFi Settings"
        subtitle="Set the WiFi network details for all guest rooms."
      />
      <div className="max-w-md">
        <WifiForm wifi={wifi} />
      </div>
    </div>
  );
}
