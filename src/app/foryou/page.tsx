"use client";

import { useState, useEffect, useRef } from "react";
import { BottomNav } from "@/components/rewards/BottomNav";
import { FeedAdItem } from "@/components/ads/FeedAdItem";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Heart, Search, History } from "lucide-react";
import { MOCK_GAMES } from "@/lib/mockGames";

// Mock Video Data adapted to use actual game identities
const VIDEOS = [
    {
        id: 1, type: "video",
        url: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2071&auto=format&fit=crop",
        gameId: MOCK_GAMES[0].id,
    },
    {
        id: 2, type: "video",
        url: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        gameId: MOCK_GAMES[1].id,
    },
    { id: "ad", type: "ad" }, // Ad Slot
    {
        id: 3, type: "video",
        url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2070&auto=format&fit=crop",
        gameId: MOCK_GAMES[2].id,
    },
];

export default function ForYouPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [liked, setLiked] = useState<Record<string, boolean>>({});
    const [adUnlocked, setAdUnlocked] = useState(false);

    // Touch handling state
    const touchStartY = useRef<number | null>(null);
    const lastWheelTime = useRef<number>(0);

    // Lock screen if we land on Ad
    useEffect(() => {
        const currentItem = VIDEOS[activeIndex];
        if (currentItem?.type === "ad" && !adUnlocked) {
            setIsLocked(true);
        }
    }, [activeIndex, adUnlocked]);

    const handleUnlock = () => {
        setIsLocked(false);
        setAdUnlocked(true);
    };

    // Tab Visibility Logic
    useEffect(() => {
        const handleVisibilityChange = () => {
            setIsTabVisible(document.visibilityState === "visible");
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    const toggleLike = (id: string | number) => {
        setLiked(prev => ({ ...prev, [id]: !prev[id] }));
    }

    // Scroll Handlers
    const advanceSlide = (direction: 1 | -1) => {
        // Prevent progressing forward if locked on Ad
        if (direction === 1 && isLocked) return;

        setActiveIndex(prev => {
            const nextIndex = prev + direction;
            if (nextIndex < 0 || nextIndex >= VIDEOS.length) return prev;
            return nextIndex;
        });
    }

    const handleWheel = (e: React.WheelEvent) => {
        const now = Date.now();
        if (now - lastWheelTime.current < 800) return; // debounce intense wheel events

        if (e.deltaY > 30) {
            advanceSlide(1);
            lastWheelTime.current = now;
        } else if (e.deltaY < -30) {
            advanceSlide(-1);
            lastWheelTime.current = now;
        }
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartY.current === null) return;

        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY.current - touchEndY;

        if (deltaY > 50) {
            advanceSlide(1);
        } else if (deltaY < -50) {
            advanceSlide(-1);
        }

        touchStartY.current = null;
    };

    return (
        <div className="w-full h-full bg-black flex flex-col font-sans overflow-hidden relative text-slate-900">
            {/* Top Bar (Sticky Overlaid) */}
            <div className="absolute top-0 w-full z-50 pt-safe-top">
                <div className="flex justify-between items-center px-4 py-4">
                    <div className="text-white text-sm font-semibold opacity-0">9:41</div> {/* Invisible spacer */}

                    {/* Top Right Actions */}
                    <div className="flex gap-3 items-center">
                        <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                            <History size={20} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/40 transition-colors">
                            <Search size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Programmatic Sliding Container */}
            <div
                className="w-full h-full relative transition-transform duration-500 ease-out"
                style={{ transform: `translateY(-${activeIndex * 100}%)` }}
                onWheel={handleWheel}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                {VIDEOS.map((item, index) => (
                    <div
                        key={item.id}
                        className="w-full h-full relative flex items-center justify-center shrink-0 bg-black"
                    >
                        {item.type === "ad" ? (
                            <FeedAdItem
                                isActive={activeIndex === index}
                                isVisible={isTabVisible}
                                onUnlock={handleUnlock}
                            />
                        ) : (
                            <div className="w-full h-full relative">
                                {/* Video Background Mock */}
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.url}')` }}></div>
                                <div className="absolute inset-0 bg-black/10"></div> {/* Very Light overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent h-[50%] top-auto to-transparent"></div>

                                {/* Video UI Overlay */}
                                <div className="absolute inset-0 flex items-end justify-between px-4 pb-[100px] z-10 pointer-events-none"> {/* Offset for bottom nav */}

                                    {/* Left: Glassmorphism Game Card Container */}
                                    <div className="w-[65%] max-w-[260px] bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 shadow-2xl pointer-events-auto">

                                        {/* Info Row */}
                                        {/* Game Info Matrix */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-[52px] h-[52px] rounded-[14px] overflow-hidden flex-shrink-0 border border-white/10 shadow-inner">
                                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${MOCK_GAMES.find(g => g.id === item.gameId)?.image}')` }}></div>
                                            </div>
                                            <div className="flex flex-col flex-1 overflow-hidden select-none">
                                                <h3 className="text-white font-bold text-[15px] leading-tight block truncate drop-shadow-md">
                                                    {MOCK_GAMES.find(g => g.id === item.gameId)?.title}
                                                </h3>
                                                <span className="text-gray-300 text-[12px] font-medium mt-0.5">
                                                    {MOCK_GAMES.find(g => g.id === item.gameId)?.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Play Button */}
                                        <Link href={`/game/${item.gameId}`} className="w-full mt-3 bg-[#8B3DFF] hover:bg-[#7b32e6] text-white font-bold py-2.5 rounded-[10px] text-[14px] shadow-[0_0_15px_rgba(139,61,255,0.4)] transition-all active:scale-[0.98] flex items-center justify-center">
                                            Play
                                        </Link>
                                    </div>

                                    {/* Right: Minimal Action Column (Only Heart) */}
                                    <div className="flex flex-col items-center pb-2 pointer-events-auto">
                                        <button onClick={() => toggleLike(item.id.toString())} className="flex flex-col items-center gap-1 hover:scale-105 transition-transform">
                                            <div className={`p-1 transition-colors ${liked[item.id] ? "text-pink-500" : "text-white drop-shadow-lg"}`}>
                                                <Heart size={36} className={liked[item.id] ? "fill-pink-500" : "fill-white/20"} />
                                            </div>
                                            <span className="text-sm text-white font-bold drop-shadow-md">{MOCK_GAMES.find(g => g.id === item.gameId)?.likes}</span>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Persistent bottom nav, sits ON TOP of videos */}
            <div className="absolute bottom-0 w-full z-50">
                <BottomNav />
            </div>
        </div>
    );
}
