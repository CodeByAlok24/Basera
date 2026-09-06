import { Clock3, IndianRupee, Soup } from "lucide-react";

const messes = [
  {
    name: "Annapurna Daily Mess",
    city: "Kolkata",
    price: "3,600",
    meals: "Lunch + dinner",
    timing: "Cancel dinner before 5:00 PM"
  },
  {
    name: "North Campus Tiffin",
    city: "Kolkata",
    price: "2,400",
    meals: "Lunch only",
    timing: "Cancel lunch before 10:00 AM"
  }
];

export default function MessListingsPage() {
  return (
    <main className="listPage">
      <header className="pageHeader">
        <p className="eyebrow">Mess listings</p>
        <h1>Plans with meal timing clear from the start.</h1>
      </header>

      <div className="listingGrid">
        {messes.map((mess) => (
          <article className="listingCard" key={mess.name}>
            <Soup size={24} aria-hidden="true" />
            <h2>{mess.name}</h2>
            <p>{mess.city}</p>
            <p>
              <IndianRupee size={16} aria-hidden="true" />
              {mess.price} per month
            </p>
            <p>{mess.meals}</p>
            <span>
              <Clock3 size={16} aria-hidden="true" />
              {mess.timing}
            </span>
          </article>
        ))}
      </div>
    </main>
  );
}

