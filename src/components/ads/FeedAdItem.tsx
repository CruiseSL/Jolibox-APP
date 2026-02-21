"use client";

import { useEffect, useState, useRef } from "react";
import { Play, Pause, VolumeX, Star, ShieldCheck, Download } from "lucide-react";
import { useMockState } from "@/context/MockStateContext";

interface FeedAdItemProps {
    isActive: boolean;
    isVisible: boolean; // Page visibility (tab switch)
    onUnlock: () => void;
}

export function FeedAdItem({ isActive, isVisible, onUnlock }: FeedAdItemProps) {
    const { showAds } = useMockState();
    const [timeLeft, setTimeLeft] = useState(10); // 10 seconds ad
    const [isPaused, setIsPaused] = useState(false);

    // Ref to track if we have already unlocked
    const hasUnlocked = useRef(false);

    useEffect(() => {
        if (!showAds) {
            if (!hasUnlocked.current) {
                hasUnlocked.current = true;
                onUnlock();
            }
            return;
        }

        // Only run timer if:
        // 1. The slide is active (in view)
        // 2. The page/tab is visible
        // 3. We haven't finished yet
        // 4. Not manually paused (optional, for video click)

        if (isActive && isVisible && timeLeft > 0 && !hasUnlocked.current) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        hasUnlocked.current = true;
                        onUnlock();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            setIsPaused(false);
        }
    }, [isActive, isVisible, timeLeft, onUnlock, showAds]);

    if (!showAds) return null;

    return (
        <div className="w-full h-full relative bg-gray-900 flex flex-col items-center justify-center">
            {/* Mock Video Background */}
            <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-[20s] ease-linear scale-110"></div>

                {/* Visual Video Play Overlay */}
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                        <Play size={24} className="fill-white text-white ml-1" />
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/60 h-2/3 top-auto to-transparent"></div>
            </div>

            {/* Top UI Elements */}
            <div className="absolute top-20 right-4 flex flex-col gap-4">
                <div className="bg-black/40 p-2 rounded-full backdrop-blur-md">
                    <VolumeX className="text-white w-6 h-6" />
                </div>
            </div>

            <div className="absolute bottom-24 left-4 right-4 z-20 flex flex-col gap-3">

                {/* Ad Content Box */}
                <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex gap-3 shadow-2xl">
                    <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl shadow-inner p-px flex-shrink-0">
                        <div className="w-full h-full bg-black/50 rounded-[11px] flex items-center justify-center">
                            <span className="text-2xl drop-shadow-md">⚔️</span>
                        </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-bold leading-none">Epic Quest RPG</h3>
                            <span className="bg-yellow-500/20 text-yellow-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">Ad</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-300 mb-2">
                            <div className="flex -space-x-0.5">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} className="fill-yellow-500 text-yellow-500" />)}
                            </div>
                            <span>4.8</span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full mx-0.5"></span>
                            <span>RPG</span>
                        </div>
                        <p className="text-gray-400 text-xs line-clamp-2 leading-snug">Experience next-gen graphics on your phone. Download now and get 10,000 free gems!</p>
                    </div>
                </div>

                <button className="w-full bg-[#34A853] py-3.5 rounded-xl text-white font-bold text-[15px] shadow-[0_0_15px_rgba(52,168,83,0.3)] transform transition active:scale-95 flex items-center justify-center gap-2">
                    Install Game <Download size={16} />
                </button>

                {/* Timer / Progress */}
                <div className="bg-black/60 backdrop-blur-md rounded-xl p-3 flex items-center justify-between border border-white/5 mb-[85px]">
                    <div className="text-xs text-gray-200 font-medium">
                        {timeLeft > 0 ? (
                            <span className="flex items-center gap-2">
                                {isPaused ? <Pause size={12} className="fill-gray-400" /> : <Play size={12} className="fill-green-400 text-green-400" />}
                                Scroll unlocked in <span className="text-white font-bold">{timeLeft}s</span>
                            </span>
                        ) : (
                            <span className="text-green-400 font-bold flex items-center gap-1.5">
                                <ShieldCheck size={14} /> Scroll Unlocked
                            </span>
                        )}
                    </div>

                    {/* Progress Bar */}
                    <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-linear ${timeLeft > 0 ? "bg-green-500" : "bg-green-400"}`}
                            style={{ width: `${((10 - timeLeft) / 10) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
