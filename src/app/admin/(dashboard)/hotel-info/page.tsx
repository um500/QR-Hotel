import { getHotelInfo } from "@/lib/sanity/queries";
import HotelInfoForm from "@/components/HotelInfoForm";
import { PageHeader } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function HotelInfoPage() {
  const hotelInfo = await getHotelInfo();

  return (
    <div>
      <PageHeader
        title="Hotel Info"
        subtitle="Checkout/breakfast times, house rules and the Help tab's contact numbers."
      />
      <div className="max-w-xl">
        <HotelInfoForm hotelInfo={hotelInfo} />
      </div>
    </div>
  );
}
