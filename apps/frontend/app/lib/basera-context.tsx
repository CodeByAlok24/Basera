"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type UserRole = "student" | "pg_owner" | "mess_owner" | "admin";

export interface UserSession {
  role: UserRole;
  name: string;
  phone: string;
}

export interface PGListingItem {
  id: string;
  title: string;
  city: string;
  area: string;
  rent: number;
  deposit: number;
  sharing: string;
  amenities: string[];
  photos: string[];
  totalRooms: number;
  occupiedRooms: number;
  ownerName: string;
  ownerPhone: string;
  rating: number;
  reviewsCount: number;
  description: string;
}

export interface PGBookingItem {
  id: string;
  pgId: string;
  pgName: string;
  studentName: string;
  studentPhone: string;
  monthlyRent: number;
  depositPaid: number;
  status: "active" | "completed" | "cancelled";
  moveInDate: string;
  payments: Array<{
    id: string;
    month: string;
    amount: number;
    date: string;
    status: "paid" | "pending";
  }>;
}

export interface MessListingItem {
  id: string;
  name: string;
  area: string;
  city: string;
  perMealPrice: number;
  menuNote: string;
  mealTimes: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
  ownerName: string;
  ownerPhone: string;
  rating: number;
  reviewsCount: number;
}

export interface MessSubscriptionItem {
  id: string;
  messId: string;
  messName: string;
  studentName: string;
  studentPhone: string;
  active: boolean;
  startDate: string;
  paidMonths: Record<string, boolean>;
}

export interface MealLogItem {
  id: string;
  subId: string;
  messId: string;
  studentName: string;
  studentPhone: string;
  date: string; // YYYY-MM-DD
  meal: "breakfast" | "lunch" | "dinner";
  servingTime: string; // e.g. "08:30", "13:00", "20:30"
  price: number;
  status: "scheduled" | "served" | "cancelled";
  cancelledAt?: string;
}

export interface ComplaintItem {
  id: string;
  type: "pg" | "mess";
  targetId: string;
  targetName: string;
  studentName: string;
  studentPhone: string;
  category: "food" | "hygiene" | "maintenance" | "noise" | "other";
  text: string;
  status: "open" | "resolved";
  createdAt: string;
}

export interface WalletTxItem {
  id: string;
  type: "credit" | "debit";
  amount: number;
  reason: string;
  date: string;
}

interface BaseraContextType {
  session: UserSession | null;
  login: (role: UserRole, name: string, phone: string) => void;
  logout: () => void;
  // PGs
  pgs: PGListingItem[];
  bookings: PGBookingItem[];
  bookPg: (pgId: string, name: string, phone: string) => boolean;
  addPgListing: (item: Omit<PGListingItem, "id" | "occupiedRooms" | "rating" | "reviewsCount">) => void;
  editPgListing: (id: string, item: Partial<PGListingItem>) => void;
  deletePgListing: (id: string) => void;
  payRent: (bookingId: string, month: string) => void;
  // Mess
  messes: MessListingItem[];
  subscriptions: MessSubscriptionItem[];
  mealLogs: MealLogItem[];
  subscribeMess: (messId: string, name: string, phone: string) => boolean;
  saveMessDetails: (messData: Omit<MessListingItem, "id" | "rating" | "reviewsCount">) => void;
  cancelMeal: (logId: string) => { success: boolean; message: string };
  uncancelMeal: (logId: string) => { success: boolean; message: string };
  settleMessBill: (subId: string, monthKey: string) => void;
  // Wallet
  walletBalance: number;
  walletTxs: WalletTxItem[];
  // Complaints
  complaints: ComplaintItem[];
  addComplaint: (
    type: "pg" | "mess",
    targetId: string,
    targetName: string,
    category: ComplaintItem["category"],
    text: string
  ) => void;
  resolveComplaint: (id: string) => void;
  // Notification items
  notifications: string[];
}

const BaseraContext = createContext<BaseraContextType | null>(null);

export const todayISO = () => new Date().toISOString().slice(0, 10);
export const currentMonthISO = () => todayISO().slice(0, 7);

export function BaseraProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Default seed states
  const [pgs, setPgs] = useState<PGListingItem[]>([
    {
      id: "pg-bokaro-1",
      title: "Power Grid Scholars PG & Student Home",
      city: "Bokaro",
      area: "Vill-Ghoragara, Chandankiyari",
      rent: 4200,
      deposit: 4200,
      sharing: "Double Sharing",
      amenities: ["Wi-Fi", "Homely Mess", "Power Backup", "Study Desks", "RO Water"],
      photos: [
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
      ],
      totalRooms: 12,
      occupiedRooms: 9,
      ownerName: "Rajesh Verma",
      ownerPhone: "9811223344",
      rating: 4.9,
      reviewsCount: 28,
      description: "Quiet student stay near Power Grid, Chandankiyari with 24/7 power backup and study rooms."
    },
    {
      id: "pg-bokaro-2",
      title: "Comfort Girls PG & Residency",
      city: "Bokaro",
      area: "P.O-Kherabera, Chandankiyari",
      rent: 4800,
      deposit: 4800,
      sharing: "Single Room",
      amenities: ["CCTV & Warden", "3-Time Food", "Geyser", "Daily Cleaning"],
      photos: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
      ],
      totalRooms: 8,
      occupiedRooms: 6,
      ownerName: "Sunita Devi",
      ownerPhone: "9833445566",
      rating: 4.8,
      reviewsCount: 19,
      description: "Gated accommodation for female students with homely atmosphere and warden support."
    },
    {
      id: "pg-kolkata-1",
      title: "Green View Executive PG",
      city: "Kolkata",
      area: "Salt Lake Sector V",
      rent: 7500,
      deposit: 7500,
      sharing: "Double Sharing",
      amenities: ["AC", "Wi-Fi", "Daily Meals", "Laundry", "Biometric Entry"],
      photos: [
        "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
      ],
      totalRooms: 15,
      occupiedRooms: 11,
      ownerName: "Amitabh Banerjee",
      ownerPhone: "9822331100",
      rating: 4.8,
      reviewsCount: 42,
      description: "Walkable to tech parks in Sector V with fast internet and 3-course homely meals."
    }
  ]);

  const [bookings, setBookings] = useState<PGBookingItem[]>([
    {
      id: "b-1",
      pgId: "pg-bokaro-1",
      pgName: "Power Grid Scholars PG & Student Home",
      studentName: "Ananya Sharma",
      studentPhone: "9876543210",
      monthlyRent: 4200,
      depositPaid: 4200,
      status: "active",
      moveInDate: "2026-08-01",
      payments: [
        {
          id: "p-1",
          month: "2026-08",
          amount: 4200,
          date: "2026-08-02",
          status: "paid"
        },
        {
          id: "p-2",
          month: currentMonthISO(),
          amount: 4200,
          date: todayISO(),
          status: "pending"
        }
      ]
    }
  ]);

  const [messes, setMesses] = useState<MessListingItem[]>([
    {
      id: "mess-bokaro-1",
      name: "Annapurna Desi Mess & Tiffins",
      area: "Vill-Ghoragara (Near Power Grid), Chandankiyari",
      city: "Bokaro",
      perMealPrice: 70,
      menuNote: "North Indian Dal, seasonal sabzi, hot rotis, basmati rice & dessert on Sundays.",
      mealTimes: {
        breakfast: "08:30",
        lunch: "13:00",
        dinner: "20:30"
      },
      ownerName: "Rameshwar Gupta",
      ownerPhone: "9822334455",
      rating: 4.9,
      reviewsCount: 34
    }
  ]);

  const [subscriptions, setSubscriptions] = useState<MessSubscriptionItem[]>([
    {
      id: "sub-1",
      messId: "mess-bokaro-1",
      messName: "Annapurna Desi Mess & Tiffins",
      studentName: "Ananya Sharma",
      studentPhone: "9876543210",
      active: true,
      startDate: "2026-08-05",
      paidMonths: {}
    }
  ]);

  // Generate 6 upcoming days of meal logs for initial demo
  const [mealLogs, setMealLogs] = useState<MealLogItem[]>(() => {
    const logs: MealLogItem[] = [];
    const baseDate = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      logs.push(
        {
          id: `m-log-${iso}-b`,
          subId: "sub-1",
          messId: "mess-bokaro-1",
          studentName: "Ananya Sharma",
          studentPhone: "9876543210",
          date: iso,
          meal: "breakfast",
          servingTime: "08:30",
          price: 60,
          status: "scheduled"
        },
        {
          id: `m-log-${iso}-l`,
          subId: "sub-1",
          messId: "mess-bokaro-1",
          studentName: "Ananya Sharma",
          studentPhone: "9876543210",
          date: iso,
          meal: "lunch",
          servingTime: "13:00",
          price: 75,
          status: "scheduled"
        },
        {
          id: `m-log-${iso}-d`,
          subId: "sub-1",
          messId: "mess-bokaro-1",
          studentName: "Ananya Sharma",
          studentPhone: "9876543210",
          date: iso,
          meal: "dinner",
          servingTime: "20:30",
          price: 75,
          status: "scheduled"
        }
      );
    }
    return logs;
  });

  const [walletBalance, setWalletBalance] = useState<number>(240);
  const [walletTxs, setWalletTxs] = useState<WalletTxItem[]>([
    {
      id: "w-1",
      type: "credit",
      amount: 150,
      reason: "Meal cancellation refund (Lunch & Dinner)",
      date: todayISO()
    },
    {
      id: "w-2",
      type: "credit",
      amount: 90,
      reason: "Early notification bonus reward",
      date: todayISO()
    }
  ]);

  const [complaints, setComplaints] = useState<ComplaintItem[]>([
    {
      id: "c-1",
      type: "pg",
      targetId: "pg-bokaro-1",
      targetName: "Power Grid Scholars PG & Student Home",
      studentName: "Ananya Sharma",
      studentPhone: "9876543210",
      category: "maintenance",
      text: "Wi-Fi router on 2nd floor has unstable connection during evening hours.",
      status: "open",
      createdAt: todayISO()
    }
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedSession = localStorage.getItem("basera_user_session");
      if (savedSession) setSession(JSON.parse(savedSession));

      const sPgs = localStorage.getItem("basera_pgs");
      if (sPgs) setPgs(JSON.parse(sPgs));

      const sBookings = localStorage.getItem("basera_bookings");
      if (sBookings) setBookings(JSON.parse(sBookings));

      const sMesses = localStorage.getItem("basera_messes");
      if (sMesses) setMesses(JSON.parse(sMesses));

      const sSubs = localStorage.getItem("basera_subs");
      if (sSubs) setSubscriptions(JSON.parse(sSubs));

      const sMeals = localStorage.getItem("basera_meals");
      if (sMeals) setMealLogs(JSON.parse(sMeals));

      const sWallet = localStorage.getItem("basera_wallet");
      if (sWallet) setWalletBalance(Number(sWallet));

      const sComplaints = localStorage.getItem("basera_complaints");
      if (sComplaints) setComplaints(JSON.parse(sComplaints));
    } catch {
      // ignore
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      if (session) localStorage.setItem("basera_user_session", JSON.stringify(session));
      else localStorage.removeItem("basera_user_session");
      localStorage.setItem("basera_pgs", JSON.stringify(pgs));
      localStorage.setItem("basera_bookings", JSON.stringify(bookings));
      localStorage.setItem("basera_messes", JSON.stringify(messes));
      localStorage.setItem("basera_subs", JSON.stringify(subscriptions));
      localStorage.setItem("basera_meals", JSON.stringify(mealLogs));
      localStorage.setItem("basera_wallet", String(walletBalance));
      localStorage.setItem("basera_complaints", JSON.stringify(complaints));
    } catch {
      // ignore
    }
  }, [isLoaded, session, pgs, bookings, messes, subscriptions, mealLogs, walletBalance, complaints]);

  const login = (role: UserRole, name: string, phone: string) => {
    const s: UserSession = { role, name, phone };
    setSession(s);
  };

  const logout = () => {
    setSession(null);
  };

  // PG Booking
  const bookPg = (pgId: string, name: string, phone: string) => {
    const pg = pgs.find((p) => p.id === pgId);
    if (!pg) return false;

    const newBooking: PGBookingItem = {
      id: `b-${Date.now()}`,
      pgId: pg.id,
      pgName: pg.title,
      studentName: name,
      studentPhone: phone,
      monthlyRent: pg.rent,
      depositPaid: pg.deposit,
      status: "active",
      moveInDate: todayISO(),
      payments: [
        {
          id: `p-${Date.now()}`,
          month: currentMonthISO(),
          amount: pg.rent,
          date: todayISO(),
          status: "paid"
        }
      ]
    };

    setBookings((prev) => [newBooking, ...prev]);
    setPgs((prev) =>
      prev.map((p) => (p.id === pgId ? { ...p, occupiedRooms: p.occupiedRooms + 1 } : p))
    );
    return true;
  };

  const addPgListing = (item: Omit<PGListingItem, "id" | "occupiedRooms" | "rating" | "reviewsCount">) => {
    const newPg: PGListingItem = {
      ...item,
      id: `pg-${Date.now()}`,
      occupiedRooms: 0,
      rating: 5.0,
      reviewsCount: 1
    };
    setPgs((prev) => [newPg, ...prev]);
  };

  const editPgListing = (id: string, item: Partial<PGListingItem>) => {
    setPgs((prev) => prev.map((p) => (p.id === id ? { ...p, ...item } : p)));
  };

  const deletePgListing = (id: string) => {
    setPgs((prev) => prev.filter((p) => p.id !== id));
  };

  const payRent = (bookingId: string, month: string) => {
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          payments: b.payments.map((p) => (p.month === month ? { ...p, status: "paid" } : p))
        };
      })
    );
  };

  // Mess Subscriptions
  const subscribeMess = (messId: string, name: string, phone: string) => {
    const mess = messes.find((m) => m.id === messId);
    if (!mess) return false;

    const newSubId = `sub-${Date.now()}`;
    const newSub: MessSubscriptionItem = {
      id: newSubId,
      messId: mess.id,
      messName: mess.name,
      studentName: name,
      studentPhone: phone,
      active: true,
      startDate: todayISO(),
      paidMonths: {}
    };

    setSubscriptions((prev) => [newSub, ...prev]);

    // Generate meals for the subscriber
    const newLogs: MealLogItem[] = [];
    const baseDate = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const iso = d.toISOString().slice(0, 10);
      const meals: Array<"breakfast" | "lunch" | "dinner"> = ["breakfast", "lunch", "dinner"];
      meals.forEach((m) => {
        newLogs.push({
          id: `m-${newSubId}-${iso}-${m}`,
          subId: newSubId,
          messId: mess.id,
          studentName: name,
          studentPhone: phone,
          date: iso,
          meal: m,
          servingTime: mess.mealTimes[m] || "12:00",
          price: mess.perMealPrice,
          status: "scheduled"
        });
      });
    }
    setMealLogs((prev) => [...newLogs, ...prev]);
    return true;
  };

  const saveMessDetails = (messData: Omit<MessListingItem, "id" | "rating" | "reviewsCount">) => {
    const existing = messes.find((m) => m.ownerPhone === messData.ownerPhone);
    if (existing) {
      setMesses((prev) =>
        prev.map((m) => (m.id === existing.id ? { ...m, ...messData } : m))
      );
    } else {
      const newMess: MessListingItem = {
        ...messData,
        id: `mess-${Date.now()}`,
        rating: 5.0,
        reviewsCount: 1
      };
      setMesses((prev) => [newMess, ...prev]);
    }
  };

  // 3-Hour Cancellation Rule Engine
  const cancelMeal = (logId: string): { success: boolean; message: string } => {
    const meal = mealLogs.find((l) => l.id === logId);
    if (!meal) return { success: false, message: "Meal not found." };
    if (meal.status === "cancelled") {
      return { success: false, message: "Meal is already cancelled." };
    }

    // Time evaluation: compare serving time with current time
    const [hours, minutes] = meal.servingTime.split(":").map(Number);
    const servingDate = new Date(`${meal.date}T${String(hours).padStart(2, "0")}:${String(minutes || 0).padStart(2, "0")}:00`);
    const now = new Date();
    const diffMs = servingDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    // Rule: Must be at least 3 hours ahead
    if (diffHours < 3) {
      return {
        success: false,
        message: `Cutoff passed! Meals can only be cancelled up to 3 hours before serving time (${meal.servingTime}).`
      };
    }

    // Process cancellation & refund
    setMealLogs((prev) =>
      prev.map((l) =>
        l.id === logId
          ? {
              ...l,
              status: "cancelled",
              cancelledAt: new Date().toISOString()
            }
          : l
      )
    );

    const refundAmount = meal.price;
    setWalletBalance((prev) => prev + refundAmount);
    setWalletTxs((prev) => [
      {
        id: `w-${Date.now()}`,
        type: "credit",
        amount: refundAmount,
        reason: `3-Hr Cancel Refund: ${meal.meal} on ${meal.date}`,
        date: todayISO()
      },
      ...prev
    ]);

    return {
      success: true,
      message: `Meal cancelled! ₹${refundAmount} has been credited to your Basera coin wallet.`
    };
  };

  const uncancelMeal = (logId: string): { success: boolean; message: string } => {
    const meal = mealLogs.find((l) => l.id === logId);
    if (!meal) return { success: false, message: "Meal not found." };
    if (meal.status !== "cancelled") {
      return { success: false, message: "Meal is not cancelled." };
    }

    const [hours, minutes] = meal.servingTime.split(":").map(Number);
    const servingDate = new Date(`${meal.date}T${String(hours).padStart(2, "0")}:${String(minutes || 0).padStart(2, "0")}:00`);
    const now = new Date();
    const diffMs = servingDate.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 3) {
      return {
        success: false,
        message: "Too late to re-opt in — the kitchen has finalized preparations."
      };
    }

    if (walletBalance < meal.price) {
      return {
        success: false,
        message: "Insufficient wallet balance to restore this meal."
      };
    }

    setMealLogs((prev) =>
      prev.map((l) => (l.id === logId ? { ...l, status: "scheduled", cancelledAt: undefined } : l))
    );

    setWalletBalance((prev) => prev - meal.price);
    setWalletTxs((prev) => [
      {
        id: `w-${Date.now()}`,
        type: "debit",
        amount: meal.price,
        reason: `Re-scheduled: ${meal.meal} on ${meal.date}`,
        date: todayISO()
      },
      ...prev
    ]);

    return {
      success: true,
      message: `Meal re-scheduled! ₹${meal.price} debited from wallet.`
    };
  };

  const settleMessBill = (subId: string, monthKey: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => {
        if (s.id !== subId) return s;
        return {
          ...s,
          paidMonths: {
            ...s.paidMonths,
            [monthKey]: true
          }
        };
      })
    );
  };

  // Complaints
  const addComplaint = (
    type: "pg" | "mess",
    targetId: string,
    targetName: string,
    category: ComplaintItem["category"],
    text: string
  ) => {
    const newComplaint: ComplaintItem = {
      id: `c-${Date.now()}`,
      type,
      targetId,
      targetName,
      studentName: session?.name || "Student",
      studentPhone: session?.phone || "9876543210",
      category,
      text,
      status: "open",
      createdAt: todayISO()
    };
    setComplaints((prev) => [newComplaint, ...prev]);
  };

  const resolveComplaint = (id: string) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "resolved" } : c))
    );
  };

  // Compute Notifications
  const notifications: string[] = [];
  const currentMonth = currentMonthISO();

  if (session?.role === "student") {
    bookings
      .filter((b) => b.studentPhone === session.phone && b.status === "active")
      .forEach((b) => {
        const p = b.payments.find((pm) => pm.month === currentMonth);
        if (p && p.status === "pending") {
          notifications.push(`Rent due for ${b.pgName} — ₹${b.monthlyRent.toLocaleString("en-IN")}`);
        }
      });

    subscriptions
      .filter((s) => s.studentPhone === session.phone && s.active)
      .forEach((s) => {
        if (!s.paidMonths[currentMonth]) {
          notifications.push(`Monthly mess bill pending for ${s.messName}`);
        }
      });
  } else if (session?.role === "pg_owner") {
    const myPgIds = pgs.filter((p) => p.ownerPhone === session.phone).map((p) => p.id);
    const openCount = complaints.filter(
      (c) => c.type === "pg" && myPgIds.includes(c.targetId) && c.status === "open"
    ).length;
    if (openCount > 0) {
      notifications.push(`${openCount} open tenant complaint(s) on your properties.`);
    }
  } else if (session?.role === "mess_owner") {
    const myMess = messes.find((m) => m.ownerPhone === session.phone);
    if (myMess) {
      const openCount = complaints.filter(
        (c) => c.type === "mess" && c.targetId === myMess.id && c.status === "open"
      ).length;
      if (openCount > 0) {
        notifications.push(`${openCount} open issue(s) reported on food & delivery.`);
      }
    }
  } else if (session?.role === "admin") {
    const openCount = complaints.filter((c) => c.status === "open").length;
    if (openCount > 0) {
      notifications.push(`${openCount} open complaint(s) platform-wide awaiting review.`);
    }
  }

  return (
    <BaseraContext.Provider
      value={{
        session,
        login,
        logout,
        pgs,
        bookings,
        bookPg,
        addPgListing,
        editPgListing,
        deletePgListing,
        payRent,
        messes,
        subscriptions,
        mealLogs,
        subscribeMess,
        saveMessDetails,
        cancelMeal,
        uncancelMeal,
        settleMessBill,
        walletBalance,
        walletTxs,
        complaints,
        addComplaint,
        resolveComplaint,
        notifications
      }}
    >
      {children}
    </BaseraContext.Provider>
  );
}

export function useBasera() {
  const ctx = useContext(BaseraContext);
  if (!ctx) throw new Error("useBasera must be used within a BaseraProvider");
  return ctx;
}
