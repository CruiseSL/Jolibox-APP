"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Power } from "lucide-react";
import { BannerAd } from "@/components/ads/BannerAd";
import { getGameById } from "@/lib/mockGames";

export default function GameLoadingPage() {
    const params = useParams();
    const router = useRouter();
    const [progress, setProgress] = useState(0);

    const game = getGameById(params.id as string);

    // Mock Loading Progress
    useEffect(() => {
        let currentProgress = 0;
        const targetDuration = 3000; // 3 seconds total load time
        const intervalTime = 50;
        const step = (100 / (targetDuration / intervalTime));

        const timer = setInterval(() => {
            currentProgress += step;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(timer);

                // Navigate to real play page after a brief 100% pause
                setTimeout(() => {
                    router.replace(`/play/${params.id}`);
                }, 300);
            }
            setProgress(Math.floor(currentProgress));
        }, intervalTime);

        return () => clearInterval(timer);
    }, [params.id, router]);

    // SVG parameters for circular progress
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex-1 w-full bg-gradient-to-br from-[#3b1263] via-[#1b0833] to-[#0c0318] flex flex-col items-center relative overflow-hidden font-sans pb-safe">

            {/* Top Bar Navigation */}
            <div className="absolute top-0 w-full z-40 px-5 pt-safe-top pb-3 flex justify-start pointer-events-none mt-4">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white pointer-events-auto hover:bg-black/60 transition-colors shadow-lg"
                >
                    <Power size={20} />
                </button>
            </div>

            {/* Main Center UI */}
            <div className="flex-1 flex flex-col items-center justify-center w-full relative z-10 -mt-20">

                {/* Avatar and Progress Ring Source */}
                <div className="relative w-28 h-28 flex items-center justify-center mb-6">
                    {/* SVG Ring Background */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                        <circle
                            className="text-white/10"
                            strokeWidth="4"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="50"
                            cy="50"
                        />
                        {/* SVG Animated Foreground Ring */}
                        <circle
                            className="text-[#8B3DFF] transition-all duration-100 ease-linear shadow-[0_0_15px_rgba(139,61,255,0.8)]"
                            strokeWidth="5"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r={radius}
                            cx="50"
                            cy="50"
                            style={{ filter: "drop-shadow(0 0 6px #8B3DFF)" }}
                        />
                    </svg>

                    {/* Game Icon */}
                    <div
                        className="w-[82px] h-[82px] rounded-[18px] overflow-hidden border-2 border-transparent relative z-10"
                        style={{ borderImage: "linear-gradient(to bottom right, #ffffff30, transparent) 1" }}
                    >
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${game.image}')` }}></div>
                    </div>
                </div>

                {/* Text Content */}
                <h1 className="text-white text-xl font-bold tracking-wide mb-2 drop-shadow-md">{game.title}</h1>
                <p className="text-gray-300 font-medium">{progress}%...</p>
            </div>

            {/* Bottom AdMob Banner Container */}
            <div className="w-full pb-8 flex flex-col items-center relative z-20 gap-6">

                {/* Actual MREC Ad Space */}
                <BannerAd />

                {/* Subdued Watermark Logo */}
                <div className="flex items-center gap-2 opacity-30 mt-2">
                    <div className="w-5 h-5 rounded-md border border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                    <span className="text-white font-bold tracking-widest uppercase text-sm">Jolibox</span>
                </div>
            </div>

            {/* Atmospheric Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[50%] bg-[#8B3DFF]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
        </div>
    );
}
