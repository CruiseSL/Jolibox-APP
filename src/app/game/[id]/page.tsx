"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Power } from "lucide-react";
import { BannerAd } from "@/components/ads/BannerAd";
import { getGameById, MOCK_GAMES, Game } from "@/lib/mockGames";
import { useMockState } from "@/context/MockStateContext";
import Link from "next/link";

function ProgressRing({ progress, size, iconSize, image }: { progress: number; size: number; iconSize: number; image: string }) {
    const radius = 42;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle className="text-white/10" strokeWidth="6" stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50" />
                <circle
                    className="text-[#8B3DFF] transition-all duration-100 ease-linear"
                    strokeWidth="7" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" stroke="currentColor" fill="transparent" r={radius} cx="50" cy="50"
                    style={{ filter: "drop-shadow(0 0 4px #8B3DFF)" }}
                />
            </svg>
            <div className="rounded-full overflow-hidden border-2 border-white/30 relative z-10" style={{ width: iconSize, height: iconSize }}>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${image}')` }}></div>
            </div>
        </div>
    );
}

function JoliboxWatermark() {
    return (
        <div className="flex justify-center items-center gap-1.5 opacity-30">
            <div className="w-3.5 h-3.5 rounded border border-white flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-sm"></div>
            </div>
            <span className="text-white font-bold tracking-widest uppercase text-[10px]">Jolibox</span>
        </div>
    );
}

export default function GameLoadingPage() {
    const params = useParams();
    const router = useRouter();
    const { setSimulatorOrientation } = useMockState();
    const [progress, setProgress] = useState(0);
    const [showAd, setShowAd] = useState(false);
    const [showRecommend, setShowRecommend] = useState(false);
    const [loadFailed, setLoadFailed] = useState(false);

    const game = getGameById(params.id as string);
    const isLandscape = game.orientation === "landscape";
    const recommendedGames = MOCK_GAMES.filter(g => g.id !== game.id).slice(0, 4);

    // Set simulator orientation on mount, reset on unmount
    useEffect(() => {
        if (isLandscape) {
            setSimulatorOrientation("landscape");
        }
        return () => {
            setSimulatorOrientation("portrait");
        };
    }, [isLandscape, setSimulatorOrientation]);

    useEffect(() => {
        const adTimer = setTimeout(() => setShowAd(true), 1000);
        const failTimer = setTimeout(() => setLoadFailed(true), 2000);
        const recommendTimer = setTimeout(() => setShowRecommend(true), 3000);

        let currentProgress = 0;
        const step = 60 / (2000 / 50);
        const timer = setInterval(() => {
            if (currentProgress >= 60) { clearInterval(timer); return; }
            currentProgress += step;
            if (currentProgress > 60) currentProgress = 60;
            setProgress(Math.floor(currentProgress));
        }, 50);

        return () => {
            clearInterval(timer);
            clearTimeout(adTimer);
            clearTimeout(failTimer);
            clearTimeout(recommendTimer);
        };
    }, [params.id]);

    const handleTryAgain = () => {
        setLoadFailed(false);
        setProgress(60);
        let currentProgress = 60;
        const step = 40 / (3000 / 50);
        const timer = setInterval(() => {
            currentProgress += step;
            if (currentProgress >= 100) {
                currentProgress = 100;
                clearInterval(timer);
                setTimeout(() => router.replace(`/play/${params.id}`), 300);
            }
            setProgress(Math.floor(currentProgress));
        }, 50);
    };

    const handleBack = () => {
        router.back();
    };

    const statusContent = loadFailed ? (
        <div className="flex flex-col items-center gap-2">
            <p className="text-gray-400 text-xs">Loading failed</p>
            <button onClick={handleTryAgain} className="bg-[#8B3DFF]/80 hover:bg-[#8B3DFF] text-white font-bold px-6 py-1.5 rounded-full text-xs transition-colors">
                Try again
            </button>
        </div>
    ) : (
        <p className="text-gray-300 text-xs">{progress}%...</p>
    );

    if (isLandscape) {
        return <LandscapeLayout
            game={game} progress={progress} showAd={showAd} showRecommend={showRecommend}
            loadFailed={loadFailed} recommendedGames={recommendedGames}
            statusContent={statusContent} onBack={handleBack}
        />;
    }

    // Portrait layout
    const blockTop = showRecommend ? "6%" : "22%";

    return (
        <div className="flex-1 w-full bg-gradient-to-br from-[#3b1263] via-[#1b0833] to-[#0c0318] relative overflow-hidden font-sans">
            <div className="absolute top-0 left-0 z-40 px-4 pt-2.5">
                <button onClick={handleBack} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/60 transition-colors shadow-lg">
                    <Power size={16} />
                </button>
            </div>

            <div className="absolute left-0 right-0 flex flex-col items-center z-10 transition-all duration-500 ease-out px-4" style={{ top: blockTop }}>
                <ProgressRing progress={progress} size={72} iconSize={54} image={game.image} />
                <h1 className="text-white text-[15px] font-bold tracking-wide mb-0.5 mt-2.5">{game.title}</h1>
                {statusContent}

                {showAd && (
                    <div className="mt-4 w-full flex justify-center animate-in fade-in duration-500">
                        <BannerAd />
                    </div>
                )}

                {showRecommend && (
                    <div className="w-full mt-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center gap-2 mb-1.5">
                            <div className="flex-1 h-px bg-gray-600/50"></div>
                            <p className="text-white font-bold text-[11px] text-center whitespace-nowrap">Play games below instantly now!</p>
                            <div className="flex-1 h-px bg-gray-600/50"></div>
                        </div>
                        <p className="text-gray-500 text-[9px] text-center mb-2.5">
                            We will continue loading [{game.title}] in the background
                        </p>
                        <div className="grid grid-cols-4 gap-2.5">
                            {recommendedGames.map((g) => (
                                <Link href={`/game/${g.id}`} key={g.id} className="flex flex-col items-center group">
                                    <div className="w-full aspect-square rounded-xl overflow-hidden mb-1 border border-white/10">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${g.image}')` }}></div>
                                    </div>
                                    <span className="text-[9px] text-gray-300 font-medium text-center line-clamp-2 leading-tight">{g.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="absolute bottom-3 left-0 right-0 z-10">
                <JoliboxWatermark />
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[50%] bg-[#8B3DFF]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
        </div>
    );
}

/* ===== Landscape Layout ===== */
/* Now renders natively in an 882×344 landscape container — no CSS rotate needed */

function LandscapeLayout({
    game, progress, showAd, showRecommend, loadFailed, recommendedGames, statusContent, onBack
}: {
    game: Game; progress: number; showAd: boolean; showRecommend: boolean;
    loadFailed: boolean; recommendedGames: Game[]; statusContent: React.ReactNode;
    onBack: () => void;
}) {
    return (
        <div className="flex-1 w-full relative overflow-hidden font-sans bg-gradient-to-br from-[#3b1263] via-[#1b0833] to-[#0c0318]">
            {/* Power button — top-left */}
            <div className="absolute top-0 left-0 z-40 px-3 pt-2">
                <button onClick={onBack} className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-xl flex items-center justify-center text-white hover:bg-black/60 transition-colors shadow-lg">
                    <Power size={14} />
                </button>
            </div>

            {/* Game info — transitions position based on state */}
            <div
                className="absolute z-10 flex flex-col items-center transition-all duration-500 ease-out"
                style={{
                    left: showAd ? "28%" : "50%",
                    top: showRecommend ? "10%" : "50%",
                    transform: `translate(-50%, ${showRecommend ? "0%" : "-50%"})`,
                }}
            >
                <ProgressRing progress={progress} size={64} iconSize={48} image={game.image} />
                <h1 className="text-white text-sm font-bold tracking-wide mt-2 mb-0.5">{game.title}</h1>
                {statusContent}

                {/* Recommend games — below game info in landscape */}
                {showRecommend && (
                    <div className="mt-3 w-[280px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center gap-1.5 mb-1">
                            <div className="flex-1 h-px bg-gray-600/50"></div>
                            <p className="text-white font-bold text-[9px] text-center whitespace-nowrap">Play games below instantly now!</p>
                            <div className="flex-1 h-px bg-gray-600/50"></div>
                        </div>
                        <p className="text-gray-500 text-[8px] text-center mb-1.5">
                            We will continue loading [{game.title}] in the background
                        </p>
                        <div className="grid grid-cols-4 gap-2">
                            {recommendedGames.map((g) => (
                                <Link href={`/game/${g.id}`} key={g.id} className="flex flex-col items-center group">
                                    <div className="w-full aspect-square rounded-lg overflow-hidden mb-0.5 border border-white/10">
                                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${g.image}')` }}></div>
                                    </div>
                                    <span className="text-[7px] text-gray-300 font-medium text-center line-clamp-1 leading-tight">{g.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Ad — right side of landscape */}
            {showAd && (
                <div className="absolute right-[8%] top-1/2 -translate-y-1/2 z-10 animate-in fade-in duration-500" style={{ width: 380 }}>
                    <BannerAd />
                </div>
            )}

            {/* Jolibox watermark — bottom center */}
            <div className="absolute bottom-2 left-0 right-0 z-10">
                <JoliboxWatermark />
            </div>

            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[50%] bg-[#8B3DFF]/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen"></div>
        </div>
    );
}
