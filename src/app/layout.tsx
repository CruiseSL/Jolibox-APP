"use client";

import { useEffect, useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MockStateProvider, useMockState } from "@/context/MockStateContext";
import { SplashAd } from "@/components/ads/SplashAd";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Design dimensions (iPhone 14/15 Pro)
const PORTRAIT_W = 390;
const PORTRAIT_H = 844;
const LANDSCAPE_W = 844;
const LANDSCAPE_H = 390;

function calcScaleFor(w: number, h: number) {
  if (typeof window === "undefined") return 1;
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const padding = 40;
  const scaleH = (vh - padding) / h;
  const scaleW = (vw - padding) / w;
  return Math.min(scaleH, scaleW, 1);
}

function SimulatorShell({ children }: { children: React.ReactNode }) {
  const { simulatorOrientation } = useMockState();
  const [showSplash, setShowSplash] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [, forceUpdate] = useState(0);

  const isLandscape = simulatorOrientation === "landscape";
  const designW = isLandscape ? LANDSCAPE_W : PORTRAIT_W;
  const designH = isLandscape ? LANDSCAPE_H : PORTRAIT_H;

  // Scale is computed synchronously — no intermediate stale state
  const scale = isClient ? calcScaleFor(designW, designH) : 1;

  useEffect(() => {
    setIsClient(true);
    const onResize = () => forceUpdate(n => n + 1);
    window.addEventListener("resize", onResize);

    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    if (!hasSeenSplash) {
      setShowSplash(true);
    }
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem("hasSeenSplash", "true");
  };

  const scaledW = designW * scale;
  const scaledH = designH * scale;

  return (
    <div
      className="shrink-0 flex items-center justify-center"
      style={{ width: scaledW, height: scaledH }}
    >
      <main
        className="relative overflow-x-hidden overflow-y-auto bg-background shadow-2xl flex flex-col rounded-[20px] ring-1 ring-black/10"
        style={{
          width: designW,
          height: designH,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        <ToastProvider>
          {isClient && showSplash && <SplashAd onFinish={handleSplashFinish} />}
          {children}
        </ToastProvider>
      </main>
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f5f5f5] flex items-center justify-center w-full min-h-screen overflow-hidden`}
      >
        <MockStateProvider>
          <SimulatorShell>{children}</SimulatorShell>
        </MockStateProvider>
      </body>
    </html>
  );
}
