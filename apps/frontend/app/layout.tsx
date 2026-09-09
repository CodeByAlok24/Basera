import type { Metadata } from "next";
import { BaseraProvider } from "./lib/basera-context";
import "./styles.css";

export const metadata: Metadata = {
  title: "Basera — PG & Mess, sorted",
  description: "Marketplace for finding PG rooms and mess kitchens in college towns. Browse listings, book accommodations, manage daily meals, and settle payments.",
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#101018"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        suppressHydrationWarning
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
      >
        <BaseraProvider>{children}</BaseraProvider>
      </body>
    </html>
  );
}
