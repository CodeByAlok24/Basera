import type { Metadata } from "next";
import "./styles.css";

export const metadata: Metadata = {
  title: "Basera Platform",
  description: "PG, mess, and student marketplace dashboard",
  icons: {
    icon: "/icon.svg"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ff5722"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        data-gramm="false"
        data-gramm_editor="false"
        data-enable-grammarly="false"
      >
        {children}
      </body>
    </html>
  );
}
