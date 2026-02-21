"use client";

import { useEffect, useState } from "react";
import { X, Info } from "lucide-react";
import { useMockState } from "@/context/MockStateContext";

interface GameLaunchAdProps {
    onFinish: () => void;
}

export function GameLaunchAd({ onFinish }: GameLaunchAdProps) {
    const { showAds } = useMockState();
    const [canClose, setCanClose] = useState(false);
    const [secondsLeft, setSecondsLeft] = useState(5);

    useEffect(() => {
        if (!showAds) {
            onFinish();
            return;
        }
        const skipTimer = setTimeout(() => {
            setCanClose(true);
        }, 5000); // 5 seconds mandatory watch for interstitial

        const countdown = setInterval(() => {
            setSecondsLeft((prev) => prev > 0 ? prev - 1 : 0);
        }, 1000);

        return () => {
            clearTimeout(skipTimer);
            clearInterval(countdown);
        };
    }, [onFinish, showAds]);

    if (!showAds) return null;

    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md">
            <div className="relative w-full h-full bg-[#121212] overflow-hidden flex flex-col">
                {/* Header / Close Bar */}
                <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
                    <div className="flex items-center gap-2">
                        <div className="bg-black/60 px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase text-gray-300 border border-white/10 backdrop-blur-md">
                            Ad
                        </div>
                        <Info size={14} className="text-gray-400" />
                    </div>

                    {canClose ? (
                        <button
                            onClick={onFinish}
                            className="bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors border border-white/10 backdrop-blur-md"
                        >
                            <X size={20} />
                        </button>
                    ) : (
                        <div className="bg-black/60 text-white rounded-full px-3 py-1.5 text-xs font-semibold border border-white/10 backdrop-blur-md">
                            Reward in {secondsLeft}s
                        </div>
                    )}
                </div>

                {/* Ad Content (Full Bleed Image) */}
                <div className="flex-1 relative bg-black flex flex-col justify-end pb-8">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-80"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent h-[60%] top-auto"></div>

                    {/* Info Overlay */}
                    <div className="relative z-10 px-6 text-center flex flex-col items-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-2xl shadow-lg p-0.5 mb-4">
                            <div className="w-full h-full bg-black/40 rounded-[14px] flex items-center justify-center backdrop-blur-sm border border-white/20">
                                <span className="text-4xl drop-shadow-md">💎</span>
                            </div>
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">
                            Mega Sale 90% Off
                        </h2>
                        <p className="text-gray-300 mb-6 text-sm">
                            Unlock premium skins and 10,000 gems. Limited time offer!
                        </p>
                        <button className="bg-[#34A853] hover:bg-[#2e9649] text-white font-bold py-3.5 px-8 rounded-xl shadow-[0_0_15px_rgba(52,168,83,0.3)] transform transition active:scale-95 w-full text-lg">
                            Claim Offer
                        </button>
                    </div>
                </div>

                {/* Footer Provider */}
                <div className="bg-[#121212] p-3 flex justify-center border-t border-gray-800">
                    <p className="text-[10px] text-gray-600 flex items-center gap-1">
                        Advertisement by <span className="font-semibold text-gray-400">Google AdMob</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
