"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBasera, UserRole } from "../lib/basera-context";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { login } = useBasera();

  const [role, setRole] = useState<UserRole>("student");
  const [name, setName] = useState("Ananya Sharma");
  const [phone, setPhone] = useState("9876543210");
  const [error, setError] = useState("");

  const handleQuickFill = () => {
    if (role === "student") {
      setName("Ananya Sharma");
      setPhone("9876543210");
    } else if (role === "pg_owner") {
      setName("Rajesh Verma");
      setPhone("9811223344");
    } else if (role === "mess_owner") {
      setName("Rameshwar Gupta");
      setPhone("9822334455");
    } else if (role === "admin") {
      setName("Vikram Malhotra (Admin)");
      setPhone("9999900000");
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    if (newRole === "student") {
      setName("Ananya Sharma");
      setPhone("9876543210");
    } else if (newRole === "pg_owner") {
      setName("Rajesh Verma");
      setPhone("9811223344");
    } else if (newRole === "mess_owner") {
      setName("Rameshwar Gupta");
      setPhone("9822334455");
    } else if (newRole === "admin") {
      setName("Vikram Malhotra (Admin)");
      setPhone("9999900000");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError("Please fill in your name and phone number.");
      return;
    }
    login(role, name.trim(), phone.trim());
    router.push("/");
  };

  return (
    <div className="authDunePage">
      {/* Stars and cosmic background overlay */}
      <div className="starsBackdrop" aria-hidden="true" />
      <div className="dunesLandscape" aria-hidden="true" />

      {/* Top Header Bar */}
      <header className="authTopBar">
        <Link href="/" className="authBackBtn">
          <ArrowLeft size={16} /> Back to Basera
        </Link>

        <div className="authBrandLogo">
          <span>Basera</span>
          <span className="brandDot">✦</span>
        </div>

        <div className="authLiveBadge">
          <span className="liveGlowDot" /> 186 Active Students
        </div>
      </header>

      {/* Central Login Card */}
      <main className="authCenterContainer">
        <div className="authGlassCard">
          {/* Card Top Pill Header */}
          <div className="authCardTopRow">
            <div className="activeStudentsCounter">
              <div className="counterAccentBar" />
              <div className="counterText">
                <strong>186</strong>
                <span>Active students</span>
              </div>
            </div>

            <button
              type="button"
              className="quickDemoFillBtn"
              onClick={handleQuickFill}
              title="Auto-fill sample credentials for this role"
            >
              <Sparkles size={14} className="sparkleIcon" /> Quick Demo Fill
            </button>
          </div>

          <div className="authFormBody">
            <h1 className="authTitle">Get started</h1>
            <p className="authSubtitle">
              Pick who you are — this is a quick demo login, no OTP yet
            </p>

            {/* Role Selection Tabs */}
            <div className="rolePickerGrid">
              <div className="roleRowTop">
                <button
                  type="button"
                  className={`roleTabBtn ${role === "student" ? "roleActive" : ""}`}
                  onClick={() => handleRoleChange("student")}
                >
                  I&apos;m a student
                </button>
                <button
                  type="button"
                  className={`roleTabBtn ${role === "pg_owner" ? "roleActive" : ""}`}
                  onClick={() => handleRoleChange("pg_owner")}
                >
                  I own a PG
                </button>
                <button
                  type="button"
                  className={`roleTabBtn ${role === "mess_owner" ? "roleActive" : ""}`}
                  onClick={() => handleRoleChange("mess_owner")}
                >
                  I run a mess
                </button>
              </div>
              <div className="roleRowBottom">
                <button
                  type="button"
                  className={`roleTabBtn roleAdminBtn ${role === "admin" ? "roleActive" : ""}`}
                  onClick={() => handleRoleChange("admin")}
                >
                  Platform admin
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="authInputForm">
              <div className="authFormField">
                <label htmlFor="authName">Full name</label>
                <input
                  id="authName"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Ananya Sharma"
                  required
                />
              </div>

              <div className="authFormField">
                <label htmlFor="authPhone">Phone number</label>
                <input
                  id="authPhone"
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setError("");
                  }}
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              {error && <p className="authErrorMsg">{error}</p>}

              <button type="submit" className="authContinueBtn">
                Continue
              </button>

              <p className="authFootnote">
                Your name is shown to the other side of a booking (student ⇄ owner)
                so payments and dashboards can be matched to you.
              </p>
            </form>
          </div>

          {/* Bottom 3 Feature Highlights */}
          <div className="authValueColumns">
            <div className="valueCol">
              <h4>For students</h4>
              <p>Zero brokerage &amp; coin refunds</p>
            </div>
            <div className="valueCol">
              <h4>For PG owners</h4>
              <p>Free room listings &amp; direct tenants</p>
            </div>
            <div className="valueCol">
              <h4>For mess owners</h4>
              <p>Daily headcounts &amp; meal ledgers</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
