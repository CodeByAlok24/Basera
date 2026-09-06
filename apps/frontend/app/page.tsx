"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  BedDouble,
  UtensilsCrossed,
  ShieldCheck,
  CheckCircle2,
  Star,
  X,
  Building,
  Sparkles,
  SlidersHorizontal,
  Coins,
  Clock3,
  Check,
  Heart,
  Menu,
  Navigation,
  CheckCheck
} from "lucide-react";

// The Target Local Area Address Specified by User
const BOKARO_LOCAL_AREA = {
  name: "Vill-Ghoragara, Chandankiyari",
  fullAddress: "Vill-Ghoragara, P.O-Kherabera (Near Power Grid) Anchal- Chandankiyari, Dist-Bokaro-828134",
  city: "Bokaro",
  pincode: "828134",
  stats: {
    pgs: 8,
    mess: 5,
    flats: 6,
    total: 19
  }
};

// Preset Popular Locations with Local Counts
const presetLocations = [
  BOKARO_LOCAL_AREA,
  {
    name: "Salt Lake Sector V, Kolkata",
    fullAddress: "Salt Lake Sector V, Bidhannagar, Kolkata - 700091",
    city: "Kolkata",
    pincode: "700091",
    stats: { pgs: 14, mess: 8, flats: 11, total: 33 }
  },
  {
    name: "Koramangala, Bengaluru",
    fullAddress: "Koramangala 4th Block, 80 Feet Road, Bengaluru - 560034",
    city: "Bengaluru",
    pincode: "560034",
    stats: { pgs: 28, mess: 12, flats: 16, total: 56 }
  },
  {
    name: "Kamla Nagar, North Campus, Delhi",
    fullAddress: "Kamla Nagar, Near North Campus DU, Delhi - 110007",
    city: "Delhi NCR",
    pincode: "110007",
    stats: { pgs: 35, mess: 18, flats: 20, total: 73 }
  },
  {
    name: "Viman Nagar, Pune",
    fullAddress: "Viman Nagar, Near Symbiosis, Pune - 411014",
    city: "Pune",
    pincode: "411014",
    stats: { pgs: 22, mess: 10, flats: 14, total: 46 }
  }
];

// Verified Properties Dataset (including Bokaro / Chandankiyari area)
const initialProperties = [
  {
    id: "pg-bokaro-1",
    title: "Power Grid Scholars PG & Student Home",
    city: "Bokaro",
    area: "Vill-Ghoragara, P.O-Kherabera (Near Power Grid), Chandankiyari - 828134",
    type: "boys",
    category: "Boys PG",
    price: 4200,
    sharing: "Double Sharing",
    rating: 4.9,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Wi-Fi", "Homely Mess", "Power Backup", "Study Desks", "RO Drinking Water", "Bike Parking"],
    deposit: "1 Month Rent",
    noticePeriod: "15 Days",
    mealsIncluded: true,
    description: "Peaceful student accommodation in Vill-Ghoragara near Power Grid, Chandankiyari, Bokaro. Safe environment, 3 home-style meals daily, and 24/7 power backup."
  },
  {
    id: "pg-bokaro-2",
    title: "Chandankiyari Comfort Girls PG",
    city: "Bokaro",
    area: "P.O-Kherabera, Anchal- Chandankiyari, Bokaro - 828134",
    type: "girls",
    category: "Girls PG",
    price: 4800,
    sharing: "Single Room",
    rating: 4.8,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["CCTV & Gated Entry", "3-Time Food", "Geyser", "Daily Housekeeping", "Female Warden"],
    deposit: "1 Month Rent",
    noticePeriod: "30 Days",
    mealsIncluded: true,
    description: "Secure, gated girls residency in Kherabera, Chandankiyari. Includes fresh home-cooked meals with 3-hour cancellation wallet coin refunds."
  },
  {
    id: "mess-bokaro-1",
    title: "Annapurna Desi Mess & Daily Tiffins",
    city: "Bokaro",
    area: "Vill-Ghoragara (Near Power Grid), Chandankiyari - 828134",
    type: "mess",
    category: "Mess Included",
    price: 2200,
    sharing: "Monthly Mess Plan",
    rating: 4.9,
    reviews: 34,
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Lunch + Dinner", "Fresh Rotis & Sabzi", "Free Delivery", "3-Hr Cancel Coin Refund", "Pure Veg Option"],
    deposit: "None",
    noticePeriod: "None",
    mealsIncluded: true,
    description: "Hygienic daily tiffin and mess center serving Vill-Ghoragara and Kherabera near Power Grid. 3-hour notice cancellation saves you money on your next bill."
  },
  {
    id: "flat-bokaro-1",
    title: "Kherabera 2BHK Independent Student Flat",
    city: "Bokaro",
    area: "Vill-Ghoragara, P.O-Kherabera (Near Power Grid), Chandankiyari, Bokaro - 828134",
    type: "flat",
    category: "Flats & Rooms",
    price: 6000,
    sharing: "Full 2BHK Flat",
    rating: 4.7,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["2 Bedrooms + Kitchen", "24/7 Water", "Attached Balcony", "Parking Space", "Independent Electric Meter"],
    deposit: "1 Month Rent",
    noticePeriod: "30 Days",
    mealsIncluded: false,
    description: "Spacious independent 2BHK rental flat near Power Grid in Kherabera, Chandankiyari, Bokaro. Quiet and secure environment, ideal for students and professionals."
  },
  {
    id: "pg-1",
    title: "Green View Executive PG",
    city: "Kolkata",
    area: "Salt Lake Sector V",
    type: "co-living",
    category: "Co-Living",
    price: 7500,
    sharing: "Double Sharing",
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Wi-Fi", "3-Time Food", "AC", "Laundry", "Daily Cleaning", "Biometric Entry"],
    deposit: "1 Month Rent",
    noticePeriod: "30 Days",
    mealsIncluded: true,
    description: "Modern, fully-furnished air-conditioned co-living space located 5 minutes from IT parks. Includes 3 wholesome home-style meals daily with early meal cancellation coin refund."
  },
  {
    id: "pg-2",
    title: "Koramangala Student Haven",
    city: "Bengaluru",
    area: "Koramangala 4th Block",
    type: "boys",
    category: "Boys PG",
    price: 9200,
    sharing: "Single Room",
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["High-speed Wi-Fi", "North/South Meals", "Power Backup", "Gym", "Study Room"],
    deposit: "2 Months Rent",
    noticePeriod: "15 Days",
    mealsIncluded: true,
    description: "Premium single occupancy room ideal for tech interns and students. Walking distance to Sony World signal with 24/7 high-speed fiber internet and hygienic dining."
  },
  {
    id: "pg-3",
    title: "North Campus Blossom Girls PG",
    city: "Delhi NCR",
    area: "Kamla Nagar, North Campus",
    type: "girls",
    category: "Girls PG",
    price: 8500,
    sharing: "Double Sharing",
    rating: 4.9,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["CCTV & Warden", "Homely Mess", "AC", "RO Water", "Study Desks", "Geyser"],
    deposit: "1 Month Rent",
    noticePeriod: "30 Days",
    mealsIncluded: true,
    description: "Super-safe gated girls PG with biometric entry, female warden, hygienic breakfast, lunch, and dinner. 3-hour cancel rule lets you save wallet coins when eating outside."
  },
  {
    id: "pg-4",
    title: "Viman Nagar Studio Coliving",
    city: "Pune",
    area: "Viman Nagar",
    type: "co-living",
    category: "Co-Living",
    price: 11000,
    sharing: "Single Room",
    rating: 4.7,
    reviews: 35,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
    ],
    amenities: ["Wi-Fi", "Attached Washroom", "Balcony", "Fridge", "Kitchen Access", "Lift"],
    deposit: "1 Month Rent",
    noticePeriod: "30 Days",
    mealsIncluded: false,
    description: "Chic studio co-living room with private balcony and attached bath. Close to Symbiosis and Phoenix Mall with vibrant community lounge and gaming zone."
  }
];

// Moving Marquee Image Cards
const marqueeCards = [
  {
    id: "m-bokaro",
    title: "Power Grid Scholars PG",
    city: "Bokaro",
    rent: "₹4,200",
    tag: "Verified",
    type: "Double",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-flat-bokaro",
    title: "Kherabera 2BHK Flat",
    city: "Bokaro",
    rent: "₹6,000",
    tag: "Zero Brokerage",
    type: "Flat",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-1",
    title: "Executive Single Suite",
    city: "Bengaluru",
    rent: "₹9,200",
    tag: "Verified",
    type: "Single",
    img: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-2",
    title: "Girls Co-Living Space",
    city: "Delhi NCR",
    rent: "₹8,500",
    tag: "Zero Brokerage",
    type: "Double",
    img: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-3",
    title: "Modern Tech Student Room",
    city: "Pune",
    rent: "₹7,800",
    tag: "Food Included",
    type: "Studio",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "m-4",
    title: "Homely Mess & Dining Room",
    city: "Kolkata",
    rent: "₹6,800",
    tag: "Daily Buffet",
    type: "Meals",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80"
  }
];

const topCities = [
  { name: "Bokaro", count: "19+ PGs, Mess & Flats", state: "Chandankiyari, Jharkhand" },
  { name: "Bengaluru", count: "1,240+ PGs", state: "Karnataka" },
  { name: "Delhi NCR", count: "1,850+ PGs", state: "Delhi / Noida / Gurugram" },
  { name: "Kolkata", count: "640+ PGs", state: "West Bengal" },
  { name: "Pune", count: "920+ PGs", state: "Maharashtra" },
  { name: "Hyderabad", count: "780+ PGs", state: "Telangana" }
];

export default function HomePage() {
  // State for location inquiry
  const [currentArea, setCurrentArea] = useState(BOKARO_LOCAL_AREA);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [locationToast, setLocationToast] = useState<string | null>(null);

  // State for search and filters
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSharing, setSelectedSharing] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for interactive modals
  const [activeModalProperty, setActiveModalProperty] = useState<(typeof initialProperties)[0] | null>(null);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [ownerSuccess, setOwnerSuccess] = useState(false);

  // Meal Cancellation Simulation State
  const [mealCancelled, setMealCancelled] = useState(false);
  const [walletCoins, setWalletCoins] = useState(240);

  // Show location prompt on initial page load if not chosen yet
  useEffect(() => {
    const hasSeenPrompt = sessionStorage.getItem("basera_location_asked");
    if (!hasSeenPrompt) {
      const timer = setTimeout(() => {
        setShowLocationModal(true);
        sessionStorage.setItem("basera_location_asked", "true");
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return initialProperties.filter((p) => {
      const matchCity = selectedCity === "All" || p.city.toLowerCase() === selectedCity.toLowerCase();
      const matchCat =
        selectedCategory === "All" ||
        (selectedCategory === "boys" && p.type === "boys") ||
        (selectedCategory === "girls" && p.type === "girls") ||
        (selectedCategory === "co-living" && p.type === "co-living") ||
        (selectedCategory === "mess" && p.mealsIncluded) ||
        (selectedCategory === "flat" && p.type === "flat");
      const matchSharing =
        selectedSharing === "All" || p.sharing.toLowerCase().includes(selectedSharing.toLowerCase());
      return matchCity && matchCat && matchSharing;
    });
  }, [selectedCity, selectedCategory, selectedSharing]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setActiveModalProperty(null);
    }, 2400);
  };

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOwnerSuccess(true);
    setTimeout(() => {
      setOwnerSuccess(false);
      setIsOwnerModalOpen(false);
    }, 2400);
  };

  const handleMealCancelTest = () => {
    if (!mealCancelled) {
      setMealCancelled(true);
      setWalletCoins((c) => c + 80);
    } else {
      setMealCancelled(false);
      setWalletCoins((c) => c - 80);
    }
  };

  const handleSelectArea = (area: typeof BOKARO_LOCAL_AREA) => {
    setCurrentArea(area);
    setSelectedCity(area.city);
    setShowLocationModal(false);
    setLocationToast(`Showing PGs, Mess & Flats for: ${area.name}`);
    setTimeout(() => setLocationToast(null), 3500);
  };

  const handleDetectGPS = () => {
    setIsDetectingLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setIsDetectingLocation(false);
          handleSelectArea(BOKARO_LOCAL_AREA);
        },
        () => {
          setIsDetectingLocation(false);
          // Fallback to the Chandankiyari, Bokaro address
          handleSelectArea(BOKARO_LOCAL_AREA);
        },
        { timeout: 5000 }
      );
    } else {
      setIsDetectingLocation(false);
      handleSelectArea(BOKARO_LOCAL_AREA);
    }
  };

  return (
    <main className="pgdekhoWrapper">
      {/* Toast Notification */}
      {locationToast && (
        <div className="globalLocationToast">
          <CheckCheck size={18} /> {locationToast}
        </div>
      )}

      {/* Top Floating Pill Navigation */}
      <nav className="pgdekhoNav" aria-label="Main navigation">
        <div className="navBrand">
          <span className="brandLogo">Basera</span>
          <button
            type="button"
            className="navLocationSelectorBtn"
            onClick={() => setShowLocationModal(true)}
            title="Click to change location"
          >
            <MapPin size={14} className="textBrand" />
            <span className="navLocationText">{currentArea.name}</span>
          </button>
        </div>

        <div className="navCenterLinks">
          <Link href="/pg-listings" className="navLink">
            Find PGs
          </Link>
          <Link href="/mess-listings" className="navLink">
            Mess & Dining
          </Link>
          <button
            type="button"
            className="navLinkBtn"
            onClick={() => setIsOwnerModalOpen(true)}
          >
            List Property <span className="freeBadge">Free</span>
          </button>
        </div>

        <div className="navRightActions">
          <button
            type="button"
            className="btnListOwner"
            onClick={() => setIsOwnerModalOpen(true)}
          >
            + List PG
          </button>
          <Link href="/auth" className="btnSignIn">
            Sign In
          </Link>
          <button
            type="button"
            className="mobileMenuToggle"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="mobileNavDrawer">
            <button
              type="button"
              className="mobileNavLinkBtnHighlight"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setShowLocationModal(true);
              }}
            >
              <MapPin size={18} className="textBrand" /> Change Area ({currentArea.name})
            </button>
            <Link
              href="/pg-listings"
              className="mobileNavLink"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BedDouble size={18} /> Find PGs
            </Link>
            <Link
              href="/mess-listings"
              className="mobileNavLink"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <UtensilsCrossed size={18} /> Mess & Dining
            </Link>
            <button
              type="button"
              className="mobileNavBtn"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsOwnerModalOpen(true);
              }}
            >
              <Building size={18} /> List Property <span className="freeBadge">Free</span>
            </button>
            <Link
              href="/auth"
              className="mobileNavAuth"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In to Basera
            </Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pgdekhoHero">
        <div className="heroContent">
          <div className="heroBadge">
            <Sparkles size={15} /> 100% Zero Brokerage Verified PGs, Mess & Flats
          </div>
          <h1>
            Find Verified PGs, Mess & Flats Across India
          </h1>
          <p className="heroSubtitle">
            Explore verified rooms with homely food, 24/7 security, and 3-hour flexible meal cancellation coins.
          </p>

          {/* Minimalist Multi-Filter Search Bar */}
          <div className="searchBarCard">
            <div className="searchField">
              <label>
                <MapPin size={16} /> Location / City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                aria-label="Filter by city"
              >
                <option value="All">All Cities & Hubs</option>
                <option value="Bokaro">Bokaro (Chandankiyari)</option>
                <option value="Bengaluru">Bengaluru</option>
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Pune">Pune</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Kota">Kota</option>
              </select>
            </div>

            <div className="searchField">
              <label>
                <BedDouble size={16} /> Property Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                aria-label="Filter by category"
              >
                <option value="All">All Accommodations</option>
                <option value="boys">Boys PG</option>
                <option value="girls">Girls PG</option>
                <option value="co-living">Co-Living Space</option>
                <option value="mess">Mess & Tiffin Included</option>
                <option value="flat">Rental Flats & Rooms</option>
              </select>
            </div>

            <div className="searchField">
              <label>
                <SlidersHorizontal size={16} /> Occupancy
              </label>
              <select
                value={selectedSharing}
                onChange={(e) => setSelectedSharing(e.target.value)}
                aria-label="Filter by room sharing"
              >
                <option value="All">Any Sharing / Room</option>
                <option value="single">Single Room</option>
                <option value="double">Double Sharing</option>
                <option value="flat">Full Flat (1BHK / 2BHK)</option>
              </select>
            </div>

            <button
              type="button"
              className="searchSubmitBtn"
              onClick={() => {
                const el = document.getElementById("verifiedListings");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Search size={18} /> Search
            </button>
          </div>

          {/* DEDICATED LOCAL AREA AVAILABILITY BAR */}
          <div className="localAreaInsightsCard">
            <div className="localAreaHead">
              <div className="localAreaText">
                <span className="liveAreaPulse">● Live Local Area Insights</span>
                <p className="localAreaAddress">
                  <MapPin size={16} className="textBrand" />
                  <strong>{currentArea.fullAddress}</strong>
                </p>
              </div>
              <button
                type="button"
                className="btnChangeArea"
                onClick={() => setShowLocationModal(true)}
              >
                Change Area
              </button>
            </div>

            <div className="localStatsGrid">
              <button
                type="button"
                className={`localStatTile ${selectedCategory === "All" || selectedCategory === "boys" ? "statActive" : ""}`}
                onClick={() => {
                  setSelectedCity(currentArea.city);
                  setSelectedCategory("All");
                  document.getElementById("verifiedListings")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <BedDouble size={22} className="textBrand" />
                <div className="statContent">
                  <strong>{currentArea.stats.pgs} Verified PGs</strong>
                  <span>Boys & Girls Rooms</span>
                </div>
              </button>

              <button
                type="button"
                className={`localStatTile ${selectedCategory === "mess" ? "statActive" : ""}`}
                onClick={() => {
                  setSelectedCity(currentArea.city);
                  setSelectedCategory("mess");
                  document.getElementById("verifiedListings")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <UtensilsCrossed size={22} className="textAmber" />
                <div className="statContent">
                  <strong>{currentArea.stats.mess} Daily Mess & Tiffins</strong>
                  <span>3-Hr Coin Cancel Rule</span>
                </div>
              </button>

              <button
                type="button"
                className={`localStatTile ${selectedCategory === "flat" ? "statActive" : ""}`}
                onClick={() => {
                  setSelectedCity(currentArea.city);
                  setSelectedCategory("flat");
                  document.getElementById("verifiedListings")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Building size={22} className="textTeal" />
                <div className="statContent">
                  <strong>{currentArea.stats.flats} Rental Flats</strong>
                  <span>1BHK, 2BHK & Student Units</span>
                </div>
              </button>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="trustPillsRow">
            <div className="trustPill">
              <ShieldCheck size={16} className="textBrand" /> 0% Brokerage Guarantee
            </div>
            <div className="trustPill">
              <CheckCircle2 size={16} className="textBrand" /> 100% Verified Owners
            </div>
            <div className="trustPill">
              <UtensilsCrossed size={16} className="textBrand" /> Homely Food Included
            </div>
            <div className="trustPill">
              <Coins size={16} className="textBrand" /> Meal Cancellation Coins
            </div>
          </div>
        </div>
      </section>

      {/* CONTINUOUS LEFT-TO-RIGHT MOVING IMAGES MARQUEE */}
      <section className="marqueeSection">
        <div className="sectionHeadCenter">
          <span className="subHeading">Verified Rooms Gallery</span>
          <h2>Explore Trending Rooms, Mess & Flats</h2>
          <p>Live snapshots of verified stays from top student hubs and local areas</p>
        </div>

        <div className="marqueeWrapper">
          <div className="marqueeTrack leftToRight">
            {[...marqueeCards, ...marqueeCards].map((card, idx) => (
              <article
                className="marqueeCard"
                key={`${card.id}-${idx}`}
                onClick={() => {
                  const matched = initialProperties.find(
                    (p) => p.city.toLowerCase() === card.city.toLowerCase()
                  );
                  if (matched) setActiveModalProperty(matched);
                }}
              >
                <div className="marqueeImgBox">
                  <img src={card.img} alt={card.title} loading="lazy" />
                  <span className="marqueeBadge">{card.tag}</span>
                  <span className="marqueeType">{card.type}</span>
                </div>
                <div className="marqueeInfo">
                  <h4>{card.title}</h4>
                  <div className="marqueeMeta">
                    <span>
                      <MapPin size={13} /> {card.city}
                    </span>
                    <strong className="marqueePrice">{card.rent}<small>/mo</small></strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY TABS & FILTERABLE LISTINGS SECTION */}
      <section className="listingsSection" id="verifiedListings">
        <div className="sectionHeadFlex">
          <div>
            <span className="subHeading">Curated Spaces</span>
            <h2>Available Stays in {selectedCity === "All" ? "All Locations" : selectedCity}</h2>
            <p>Showing {filteredProperties.length} verified listings ready for zero-brokerage move-in</p>
          </div>

          {/* Filter Tabs */}
          <div className="categoryTabs">
            {[
              { id: "All", label: "All Accommodations" },
              { id: "boys", label: "Boys PG" },
              { id: "girls", label: "Girls PG" },
              { id: "co-living", label: "Co-Living" },
              { id: "mess", label: "Mess & Dining" },
              { id: "flat", label: "Flats & Rooms" }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={`tabBtn ${selectedCategory === tab.id ? "tabBtnActive" : ""}`}
                onClick={() => setSelectedCategory(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <div className="propertyGrid">
          {filteredProperties.map((property) => (
            <article className="propertyCard" key={property.id}>
              <div className="propertyImgContainer">
                <img src={property.image} alt={property.title} loading="lazy" />
                <button
                  type="button"
                  className={`heartBtn ${favorites.includes(property.id) ? "favorited" : ""}`}
                  onClick={(e) => toggleFavorite(property.id, e)}
                  aria-label="Save to favorites"
                >
                  <Heart size={18} />
                </button>
                <span className="verifiedChip">
                  <Check size={13} /> Verified
                </span>
                <span className="sharingChip">{property.sharing}</span>
              </div>

              <div className="propertyDetails">
                <div className="propertyHeader">
                  <div className="propertyRating">
                    <Star size={14} className="starFill" /> {property.rating} ({property.reviews})
                  </div>
                  <span className="propertyCategory">{property.category}</span>
                </div>

                <h3 className="propertyTitle">{property.title}</h3>
                <p className="propertyLocation">
                  <MapPin size={15} /> {property.area}
                </p>

                <div className="amenitiesTags">
                  {property.amenities.slice(0, 3).map((amenity) => (
                    <span className="amenityTag" key={amenity}>
                      {amenity}
                    </span>
                  ))}
                  {property.amenities.length > 3 && (
                    <span className="amenityMore">+{property.amenities.length - 3}</span>
                  )}
                </div>

                <div className="propertyFooter">
                  <div className="priceBox">
                    <span className="priceAmount">₹{property.price.toLocaleString()}</span>
                    <span className="pricePeriod">/ month</span>
                  </div>
                  <button
                    type="button"
                    className="btnViewDetails"
                    onClick={() => setActiveModalProperty(property)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* UNIQUE BASERA FEATURE: SMART MESS & WALLET SIMULATOR */}
      <section className="smartMessFeature">
        <div className="smartMessCard">
          <div className="messTextSide">
            <span className="pillAccent">Smart Mess Feature</span>
            <h2>Save Money with 3-Hour Meal Cancellations</h2>
            <p>
              Eating outside with friends or visiting home? Cancel your lunch before 10:00 AM or dinner before 5:00 PM.
              Your account instantly gets credited with refund coins that automatically reduce your next month's rent!
            </p>
            <div className="messBenefits">
              <div className="benefitItem">
                <Clock3 size={20} className="textBrand" />
                <div>
                  <strong>3-Hour Notice Window</strong>
                  <p>Fair notice for mess cooks, zero food waste.</p>
                </div>
              </div>
              <div className="benefitItem">
                <Coins size={20} className="textBrand" />
                <div>
                  <strong>Direct Coin Wallet</strong>
                  <p>1 Meal = 80 Coins (₹80 discount on renewal).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="messInteractiveSide">
            <div className="interactiveSimulator">
              <div className="simHeader">
                <span>Interactive Student Desk</span>
                <span className="liveBadge">Live Demo</span>
              </div>
              <div className="simBody">
                <div className="walletDisplay">
                  <Coins size={28} className="textAmber" />
                  <div>
                    <span className="walletLabel">Available Wallet Coins</span>
                    <strong className="walletAmount">{walletCoins} Coins (₹{walletCoins})</strong>
                  </div>
                </div>

                <div className="mealActionCard">
                  <div className="mealMeta">
                    <UtensilsCrossed size={20} />
                    <div>
                      <strong>Today's Dinner</strong>
                      <span>Cutoff: 5:00 PM today</span>
                    </div>
                  </div>
                  <span className={`statusPill ${mealCancelled ? "statusCancelled" : "statusScheduled"}`}>
                    {mealCancelled ? "Cancelled (+₹80)" : "Scheduled"}
                  </span>
                </div>

                <button
                  type="button"
                  className={`btnSimulate ${mealCancelled ? "btnSimulateActive" : ""}`}
                  onClick={handleMealCancelTest}
                >
                  {mealCancelled ? "Undo Cancellation" : "Test 3-Hour Cancel (Get ₹80)"}
                </button>
                <p className="simNotice">
                  Try clicking the button above to see instant wallet updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR CITIES & LOCAL HUBS */}
      <section className="citiesSection">
        <div className="sectionHeadCenter">
          <span className="subHeading">Nationwide & Local Coverage</span>
          <h2>Explore by Region & City</h2>
          <p>Verified stays across India's educational centers and industrial corridors</p>
        </div>

        <div className="citiesGrid">
          {topCities.map((city) => (
            <button
              type="button"
              className={`cityCard ${selectedCity === city.name ? "cityCardSelected" : ""}`}
              key={city.name}
              onClick={() => {
                setSelectedCity(city.name);
                const el = document.getElementById("verifiedListings");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Building size={24} className="cityIcon" />
              <h3>{city.name}</h3>
              <p className="cityState">{city.state}</p>
              <span className="cityCount">{city.count}</span>
            </button>
          ))}
        </div>
      </section>

      {/* LIST PROPERTY OWNER BANNER */}
      <section className="ownerBannerSection">
        <div className="ownerBanner">
          <div>
            <h2>Are You a PG, Mess or Flat Owner?</h2>
            <p>
              List your property on Basera for free. Reach thousands of verified students and IT professionals with zero commissions.
            </p>
          </div>
          <button
            type="button"
            className="btnOwnerBanner"
            onClick={() => setIsOwnerModalOpen(true)}
          >
            List Property with Zero Fee
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pgdekhoFooter">
        <div className="footerInner">
          <div>
            <span className="brandLogo">Basera</span>
            <p className="footerMotto">
              Verified PG, Mess and Student accommodation platform across India.
            </p>
          </div>
          <div className="footerLinks">
            <Link href="/pg-listings">PG Listings</Link>
            <Link href="/mess-listings">Mess Plans</Link>
            <Link href="/auth">Student Portal</Link>
            <button
              type="button"
              className="footerBtnLink"
              onClick={() => setIsOwnerModalOpen(true)}
            >
              Owner Desk
            </button>
          </div>
        </div>
        <div className="footerBottom">
          <p>© {new Date().getFullYear()} Basera Technologies. All rights reserved. Zero Brokerage Guaranteed.</p>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* LOCATION INQUIRY & PERMISSION MODAL                                       */}
      {/* ========================================================================= */}
      {showLocationModal && (
        <div className="modalBackdrop" onClick={() => setShowLocationModal(false)}>
          <div className="modalBox modalSmall" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modalCloseBtn"
              onClick={() => setShowLocationModal(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="locationModalContent">
              <div className="locationModalIcon">
                <Navigation size={32} />
              </div>
              <span className="pillAccent">Find Nearby Stays</span>
              <h3 className="modalHeaderTitle">Select Your Local Area</h3>
              <p className="modalSub">
                See verified counts of <strong>PGs</strong>, <strong>Mess/Tiffins</strong>, and <strong>Rental Flats</strong> in your neighborhood.
              </p>

              {/* GPS Auto-Detect Button */}
              <button
                type="button"
                className="btnAutoDetectGPS"
                onClick={handleDetectGPS}
                disabled={isDetectingLocation}
              >
                <Navigation size={18} />
                {isDetectingLocation ? "Detecting GPS..." : "📍 Use My Current Location"}
              </button>

              <div className="dividerOr">
                <span>OR SELECT YOUR REGION</span>
              </div>

              {/* Preset Local Addresses */}
              <div className="presetLocationList">
                {presetLocations.map((loc) => (
                  <button
                    key={loc.fullAddress}
                    type="button"
                    className={`presetLocItem ${currentArea.fullAddress === loc.fullAddress ? "locItemActive" : ""}`}
                    onClick={() => handleSelectArea(loc)}
                  >
                    <div className="presetLocMeta">
                      <div className="presetLocTop">
                        <strong>{loc.name}</strong>
                        {loc.name.includes("Ghoragara") && <span className="featuredLocBadge">Local Area</span>}
                      </div>
                      <p className="presetLocFull">{loc.fullAddress}</p>
                    </div>
                    <div className="presetLocCounts">
                      <span>{loc.stats.pgs} PGs</span> • <span>{loc.stats.mess} Mess</span> • <span>{loc.stats.flats} Flats</span>
                    </div>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="btnDismissLoc"
                onClick={() => setShowLocationModal(false)}
              >
                Browse All Accommodations
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL 1: PROPERTY DETAIL & SCHEDULE VISIT MODAL               */}
      {/* ========================================================================= */}
      {activeModalProperty && (
        <div className="modalBackdrop" onClick={() => setActiveModalProperty(null)}>
          <div className="modalBox" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modalCloseBtn"
              onClick={() => setActiveModalProperty(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {bookingSuccess ? (
              <div className="modalSuccessState">
                <div className="successCircle">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Visit Scheduled Successfully!</h3>
                <p>
                  We have notified the owner of <strong>{activeModalProperty.title}</strong>.
                  You will receive SMS and WhatsApp confirmation with directions shortly.
                </p>
              </div>
            ) : (
              <div className="modalGrid">
                {/* Left: Gallery & Property Overview */}
                <div className="modalLeft">
                  <div className="modalMainImg">
                    <img src={activeModalProperty.image} alt={activeModalProperty.title} />
                    <span className="modalTagChip">{activeModalProperty.sharing}</span>
                  </div>

                  <div className="modalOverview">
                    <h2>{activeModalProperty.title}</h2>
                    <p className="modalLocation">
                      <MapPin size={16} /> {activeModalProperty.area}
                    </p>
                    <p className="modalDesc">{activeModalProperty.description}</p>

                    <div className="modalAmenityGrid">
                      {activeModalProperty.amenities.map((a) => (
                        <span className="modalAmenityBadge" key={a}>
                          <Check size={14} /> {a}
                        </span>
                      ))}
                    </div>

                    <div className="modalTerms">
                      <div>
                        <span>Deposit:</span> <strong>{activeModalProperty.deposit}</strong>
                      </div>
                      <div>
                        <span>Notice Period:</span> <strong>{activeModalProperty.noticePeriod}</strong>
                      </div>
                      <div>
                        <span>Brokerage:</span> <strong>0% (Direct Owner)</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Booking Form */}
                <div className="modalRight">
                  <div className="bookingBox">
                    <div className="bookingPriceRow">
                      <div>
                        <span className="bookPrice">₹{activeModalProperty.price.toLocaleString()}</span>
                        <small>/month</small>
                      </div>
                      <span className="verifiedTag">
                        <ShieldCheck size={14} /> Verified Room
                      </span>
                    </div>

                    <h4>Schedule a Free Property Visit</h4>
                    <p className="bookingSub">Inspect the room in person with zero commitment.</p>

                    <form onSubmit={handleBookingSubmit} className="bookingForm">
                      <label>
                        Your Full Name
                        <input required placeholder="e.g. Rahul Sharma" />
                      </label>

                      <label>
                        Phone Number (WhatsApp)
                        <input required type="tel" placeholder="+91 98765 43210" />
                      </label>

                      <label>
                        Preferred Visit Date
                        <input required type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                      </label>

                      <button type="submit" className="btnConfirmVisit">
                        Confirm Free Visit
                      </button>
                    </form>

                    <p className="safeGuarantee">
                      <ShieldCheck size={14} /> Your contact is safe and shared only with the verified property manager.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE MODAL 2: LIST YOUR PG / MESS / FLAT (FOR OWNERS)              */}
      {/* ========================================================================= */}
      {isOwnerModalOpen && (
        <div className="modalBackdrop" onClick={() => setIsOwnerModalOpen(false)}>
          <div className="modalBox modalSmall" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="modalCloseBtn"
              onClick={() => setIsOwnerModalOpen(false)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {ownerSuccess ? (
              <div className="modalSuccessState">
                <div className="successCircle">
                  <CheckCircle2 size={48} />
                </div>
                <h3>Property Submitted for Verification!</h3>
                <p>
                  Our team will verify your property details and contact you within 24 hours. Zero listing fees charged!
                </p>
              </div>
            ) : (
              <div>
                <span className="pillAccent">Owner Onboarding</span>
                <h3 className="modalHeaderTitle">List Your Property on Basera</h3>
                <p className="modalSub">Connect with genuine student and professional tenants with zero brokerage.</p>

                <form onSubmit={handleOwnerSubmit} className="ownerModalForm">
                  <label>
                    Property Name
                    <input required placeholder="e.g. Power Grid Scholars PG / Residency" />
                  </label>

                  <div className="formRow">
                    <label>
                      City / Area
                      <select required defaultValue="Bokaro">
                        <option value="Bokaro">Bokaro (Chandankiyari)</option>
                        <option value="Bengaluru">Bengaluru</option>
                        <option value="Delhi NCR">Delhi NCR</option>
                        <option value="Kolkata">Kolkata</option>
                        <option value="Pune">Pune</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Kota">Kota</option>
                      </select>
                    </label>

                    <label>
                      Property Type
                      <select required defaultValue="pg">
                        <option value="pg">Boys / Girls PG</option>
                        <option value="coliving">Co-Living Space</option>
                        <option value="mess">Daily Mess & Tiffin</option>
                        <option value="flat">Rental Flat / Rooms</option>
                      </select>
                    </label>
                  </div>

                  <label>
                    Full Local Address
                    <input required placeholder="e.g. Vill-Ghoragara, P.O-Kherabera (Near Power Grid), Chandankiyari" defaultValue={currentArea.fullAddress} />
                  </label>

                  <div className="formRow">
                    <label>
                      Starting Rent (₹ / month)
                      <input required type="number" placeholder="4500" />
                    </label>

                    <label>
                      Owner Phone Number
                      <input required type="tel" placeholder="+91 98765 43210" />
                    </label>
                  </div>

                  <button type="submit" className="btnConfirmVisit">
                    Submit Property (100% Free)
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
