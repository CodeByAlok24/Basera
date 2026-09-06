import { BedDouble, IndianRupee, MapPin } from "lucide-react";

const listings = [
  {
    title: "Green View PG",
    city: "Kolkata",
    rent: "7,500",
    sharing: "Double sharing",
    amenities: "Wi-Fi, laundry, study desk"
  },
  {
    title: "Lake Road Student House",
    city: "Kolkata",
    rent: "9,200",
    sharing: "Single room",
    amenities: "Meals nearby, gated entry"
  }
];

export default function PgListingsPage() {
  return (
    <main className="listPage">
      <header className="pageHeader">
        <p className="eyebrow">PG listings</p>
        <h1>Rooms students can compare quickly.</h1>
      </header>

      <div className="listingGrid">
        {listings.map((listing) => (
          <article className="listingCard" key={listing.title}>
            <BedDouble size={24} aria-hidden="true" />
            <h2>{listing.title}</h2>
            <p>
              <MapPin size={16} aria-hidden="true" />
              {listing.city}
            </p>
            <p>
              <IndianRupee size={16} aria-hidden="true" />
              {listing.rent} per month
            </p>
            <p>{listing.sharing}</p>
            <span>{listing.amenities}</span>
          </article>
        ))}
      </div>
    </main>
  );
}

