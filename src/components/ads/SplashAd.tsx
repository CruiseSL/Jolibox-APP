"use client";

import { useEffect, useState } from "react";
import { X, Star, ShieldCheck, Download } from "lucide-react";
import { useMockState } from "@/context/MockStateContext";

interface SplashAdProps {
    onFinish: () => void;
}

export function SplashAd({ onFinish }: SplashAdProps) {
    const { showAds } = useMockState();
    const [seconds, setSeconds] = useState(5);
    const [canSkip, setCanSkip] = useState(false);

    useEffect(() => {
        if (!showAds) {
            onFinish();
            return;
        }
        // Enable skip after 2 seconds
        const skipTimer = setTimeout(() => {
            setCanSkip(true);
        }, 2000);

        // Countdown timer
        const countdown = setInterval(() => {
            setSeconds((prev) => {
                if (prev <= 1) {
                    clearInterval(countdown);
                    onFinish();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearTimeout(skipTimer);
            clearInterval(countdown);
        };
    }, [onFinish, showAds]);

    if (!showAds) return null;

    return (
        <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black text-white overflow-hidden">
            {/* Mock Ad Content */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black flex flex-col items-center justify-center">

                {/* Visual Cover */}
                <div className="w-full h-[55%] relative flex flex-col items-center justify-end pb-12">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="w-28 h-28 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-3xl shadow-2xl shadow-orange-500/40 p-1 flex items-center justify-center relative z-10 mb-6">
                        <div className="w-full h-full bg-black/20 rounded-[22px] flex items-center justify-center backdrop-blur-sm border border-white/20">
                            <span className="text-6xl drop-shadow-lg">🎮</span>
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1 w-full px-8 flex flex-col items-center pt-2 relative z-10 text-center">
                    <h1 className="text-3xl font-black mb-2 tracking-tight">
                        EPIC QUEST RPG
                    </h1>
                    <div className="flex items-center gap-2 text-yellow-500 mb-3 text-sm font-medium">
                        <span className="bg-yellow-500/20 px-2 py-0.5 rounded text-yellow-400">4.8</span>
                        <div className="flex -space-x-1">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} className="fill-current" />)}
                        </div>
                        <span className="text-gray-400 ml-1">(1M+ reviews)</span>
                    </div>

                    <p className="text-gray-300 text-sm mb-6 max-w-[260px]">
                        The most anticipated mobile RPG of 2026. Join millions of players worldwide!
                    </p>

                    <div className="flex gap-4 mb-auto w-full justify-center">
                        <div className="flex flex-col items-center gap-1">
                            <ShieldCheck className="text-green-400" size={20} />
                            <span className="text-[10px] text-gray-500 font-medium">Verified</span>
                        </div>
                        <div className="w-px h-8 bg-gray-800"></div>
                        <div className="flex flex-col items-center gap-1">
                            <Download className="text-blue-400" size={20} />
                            <span className="text-[10px] text-gray-500 font-medium">10M+ Apps</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Bar */}
            <div className="absolute top-0 w-full p-4 flex justify-between items-start pt-12 safe-top">
                <div className="bg-black/60 px-3 py-1 rounded border border-white/10 text-[10px] font-bold tracking-wider uppercase text-gray-300 backdrop-blur-md">
                    Advertisement
                </div>
                <button
                    onClick={onFinish}
                    className={`bg-black/60 px-4 py-2 rounded-full text-xs font-semibold backdrop-blur-md border border-white/10 transition-all duration-300 flex items-center gap-1.5 ${canSkip ? "opacity-100 hover:bg-black/80 text-white" : "opacity-50 cursor-not-allowed text-gray-400"
                        }`}
                    disabled={!canSkip}
                >
                    {canSkip ? (
                        <>
                            Skip <X size={14} />
                        </>
                    ) : (
                        <>
                            Skip in {seconds}s
                        </>
                    )}
                </button>
            </div>

            {/* Bottom CTA */}
            <div className="absolute bottom-8 w-full px-6 pb-safe z-20">
                <button className="w-full bg-[#34A853] hover:bg-[#2e9649] text-white font-bold text-lg py-4 rounded-xl shadow-[0_0_20px_rgba(52,168,83,0.4)] transform transition active:scale-95 flex items-center justify-center gap-2">
                    Install Now
                </button>
            </div>
        </div>
    );
}
