"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockStateProvider } from "@/context/MockStateContext";
import { SplashAd } from "@/components/ads/SplashAd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Simulation of "Cold Start" check
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#121212] flex items-center justify-center w-full min-h-screen`}
      >
        <main className="w-[344px] h-[882px] relative overflow-x-hidden overflow-y-auto bg-background shadow-2xl flex flex-col shrink-0">
          <MockStateProvider>
            {isClient && showSplash && <SplashAd onFinish={handleSplashFinish} />}
            {children}
          </MockStateProvider>
        </main>
      </body>
    </html>
  );
}
