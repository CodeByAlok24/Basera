"use client";

import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { PGListingItem, MessListingItem, useBasera } from "../lib/basera-context";

interface BookPgModalProps {
  pg: PGListingItem;
  onClose: () => void;
  onSuccess: () => void;
}

export function BookPgModal({ pg, onClose, onSuccess }: BookPgModalProps) {
  const { session, bookPg } = useBasera();
  const [name, setName] = useState(session?.name || "Ananya Sharma");
  const [phone, setPhone] = useState(session?.phone || "9876543210");
  const [confirmed, setConfirmed] = useState(false);

  const totalPayable = pg.rent + pg.deposit;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    bookPg(pg.id, name, phone);
    setConfirmed(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1800);
  };

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <span className="modalKicker">Direct Booking</span>
            <h3>Book Room at {pg.title}</h3>
          </div>
          <button type="button" className="modalCloseBtn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {confirmed ? (
          <div className="modalSuccessState">
            <CheckCircle2 size={48} className="textSage" />
            <h4>Room Booked Successfully!</h4>
            <p>Welcome to {pg.title}. Your booking details and rent schedule are now live in &ldquo;My Room&rdquo;.</p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} className="modalForm">
            <p className="modalSubtext">
              Zero brokerage. Security deposit is 100% refundable upon vacate notice.
            </p>

            <div className="priceBreakdownBox">
              <div className="breakdownRow">
                <span>Monthly Rent ({pg.sharing})</span>
                <strong>₹{pg.rent.toLocaleString("en-IN")}</strong>
              </div>
              <div className="breakdownRow">
                <span>Security Deposit (Refundable)</span>
                <strong>₹{pg.deposit.toLocaleString("en-IN")}</strong>
              </div>
              <div className="breakdownTotal">
                <span>Total Due on Move-in</span>
                <span className="totalAmount">₹{totalPayable.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="formGroupRow">
              <div className="formField">
                <label>Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="formField">
                <label>Contact Phone</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modalActions">
              <button type="button" className="btnCancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btnConfirmBooking">
                Confirm &amp; Pay ₹{totalPayable.toLocaleString("en-IN")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface SubscribeMessModalProps {
  mess: MessListingItem;
  onClose: () => void;
  onSuccess: () => void;
}

export function SubscribeMessModal({ mess, onClose, onSuccess }: SubscribeMessModalProps) {
  const { session, subscribeMess } = useBasera();
  const [name, setName] = useState(session?.name || "Ananya Sharma");
  const [phone, setPhone] = useState(session?.phone || "9876543210");
  const [confirmed, setConfirmed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    subscribeMess(mess.id, name, phone);
    setConfirmed(true);
    setTimeout(() => {
      onSuccess();
      onClose();
    }, 1800);
  };

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <span className="modalKicker">Daily Mess Subscription</span>
            <h3>Join {mess.name}</h3>
          </div>
          <button type="button" className="modalCloseBtn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {confirmed ? (
          <div className="modalSuccessState">
            <CheckCircle2 size={48} className="textSage" />
            <h4>Subscription Activated!</h4>
            <p>Your meal schedule is generated. You can now view and cancel meals up to 3 hours in advance under &ldquo;My meals&rdquo;.</p>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="modalForm">
            <div className="priceBreakdownBox">
              <div className="breakdownRow">
                <span>Per Meal Rate</span>
                <strong>₹{mess.perMealPrice}</strong>
              </div>
              <div className="breakdownRow">
                <span>Meal Timings</span>
                <span>Breakfast: {mess.mealTimes.breakfast} | Lunch: {mess.mealTimes.lunch} | Dinner: {mess.mealTimes.dinner}</span>
              </div>
              <div className="breakdownTotal">
                <span>3-Hour Cancellation Rule</span>
                <span className="textTerra">Active &amp; Wallet-Refunded</span>
              </div>
            </div>

            <div className="formGroupRow">
              <div className="formField">
                <label>Student Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="formField">
                <label>Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modalActions">
              <button type="button" className="btnCancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btnConfirmBooking">
                Start Subscription
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface ComplaintModalProps {
  defaultTarget?: { type: "pg" | "mess"; id: string; name: string };
  onClose: () => void;
}

export function ComplaintModal({ defaultTarget, onClose }: ComplaintModalProps) {
  const { addComplaint } = useBasera();
  const [type, setType] = useState<"pg" | "mess">(defaultTarget?.type || "pg");
  const [targetId, setTargetId] = useState(defaultTarget?.id || "pg-bokaro-1");
  const [targetName, setTargetName] = useState(defaultTarget?.name || "Power Grid Scholars PG");
  const [category, setCategory] = useState<"food" | "hygiene" | "maintenance" | "noise" | "other">("maintenance");
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addComplaint(type, targetId, targetName, category, text.trim());
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1800);
  };

  return (
    <div className="modalOverlay" role="dialog" aria-modal="true">
      <div className="modalCard">
        <div className="modalHeader">
          <div>
            <span className="modalKicker">Assistance &amp; Quality</span>
            <h3>File a Complaint / Report Issue</h3>
          </div>
          <button type="button" className="modalCloseBtn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="modalSuccessState">
            <CheckCircle2 size={48} className="textSage" />
            <h4>Ticket Logged!</h4>
            <p>Your issue has been sent directly to the owner and platform admin dashboard for immediate resolution.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modalForm">
            <div className="formField">
              <label>Regarding Property</label>
              <input
                type="text"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                required
              />
            </div>

            <div className="formField">
              <label>Issue Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="maintenance">Maintenance / Electricity / Plumbing</option>
                <option value="food">Food Quality &amp; Hygiene</option>
                <option value="hygiene">Room / Washroom Cleanliness</option>
                <option value="noise">Noise &amp; Disturbance</option>
                <option value="other">Other Inquiry</option>
              </select>
            </div>

            <div className="formField">
              <label>Explain the problem</label>
              <textarea
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Describe what's wrong so the owner can fix it quickly..."
                required
              />
            </div>

            <div className="modalActions">
              <button type="button" className="btnCancel" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btnConfirmBooking">
                Submit Complaint
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
