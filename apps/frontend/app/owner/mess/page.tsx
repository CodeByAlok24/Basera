import { ClipboardList, WalletCards } from "lucide-react";

const cancellations = [
  "Rahul cancelled lunch at 8:35 AM",
  "Priya cancelled dinner at 2:12 PM",
  "Aman cancelled breakfast yesterday"
];

export default function MessOwnerPage() {
  return (
    <main className="dashboardPage">
      <header className="pageHeader">
        <p className="eyebrow">Mess owner</p>
        <h1>Daily meal operations.</h1>
      </header>

      <section className="dashboardGrid">
        <article className="statTile">
          <ClipboardList size={24} aria-hidden="true" />
          <strong>186</strong>
          <span>meals to prepare today</span>
        </article>
        <article className="statTile">
          <WalletCards size={24} aria-hidden="true" />
          <strong>INR 1,920</strong>
          <span>coins issued from valid cancellations</span>
        </article>
      </section>

      <section className="activityPanel">
        <h2>Cancellation log</h2>
        <ul>
          {cancellations.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

