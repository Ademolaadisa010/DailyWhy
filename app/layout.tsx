import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DailyWhy — Discover the science behind everyday life",
  description:
    "An AI-powered STEM learning platform that turns everyday curiosity into science lessons. Ask questions, snap photos, explore curiosity cards.",
  keywords: ["STEM", "science", "learning", "AI", "education", "curiosity"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <body className="bg-[#0A0E1A] text-[#F0F4FF] font-inter antialiased">
        {children}
      </body>
    </html>
  );
}