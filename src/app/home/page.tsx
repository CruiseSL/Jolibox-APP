"use client";

import { useState } from "react";
import { BottomNav } from "@/components/rewards/BottomNav";
import { GameList } from "@/components/home/GameList";
import { Search, Star } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MOCK_GAMES } from "@/lib/mockGames";

const TABS = ["All", "Battle", "Casual", "Alpinia oxyphylla"];

// Taking specific popular slices for top sections
const TRENDING_GAMES = MOCK_GAMES.slice(0, 3);
const MINI_ICONS = MOCK_GAMES.slice(3, 7);
const LEADERBOARD_GAMES = MOCK_GAMES.slice(7, 10);
const POPULAR_GAMES = MOCK_GAMES.slice(10, 12);

export default function HomePage() {
    const [activeTab, setActiveTab] = useState("All");

    return (
        <div className="w-full h-full relative flex flex-col bg-[#121212] font-sans overflow-hidden">
            {/* Status Bar Space */}
            <div className="px-6 py-2 text-sm font-semibold sticky top-0 z-50 bg-[#121212]/90 backdrop-blur-xl text-white flex justify-between items-center border-b border-transparent flex-shrink-0">
                <span>9:41</span>
                <div className="flex gap-1.5 item-center">
                    <div className="flex gap-0.5 items-end h-3">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1.5 bg-white rounded-full"></div>
                        <div className="w-1 h-2 bg-white rounded-full"></div>
                        <div className="w-1 h-2.5 bg-gray-600 rounded-full"></div>
                    </div>
                    <div className="h-3 w-5 border border-white/80 rounded-[4px] p-0.5 flex">
                        <div className="h-full w-[80%] bg-white rounded-[2px]"></div>
                    </div>
                </div>
            </div>

            {/* App Header */}
            <div className="px-4 pt-2 pb-4 flex items-center justify-between sticky top-[32px] z-40 bg-[#121212]/95 backdrop-blur-xl flex-shrink-0">
                <div className="flex gap-6 items-center">
                    <div className="flex flex-col items-center">
                        <h1 className="text-xl font-bold text-white leading-none">Games</h1>
                        <div className="w-6 h-1 rounded-full bg-purple-500 mt-1.5"></div>
                    </div>
                    <h1 className="text-xl font-bold text-gray-500 leading-none pb-2.5">Dramas</h1>
                </div>
                <button className="text-white pb-2.5">
                    <Search size={22} />
                </button>
            </div>

            <main className="flex-1 overflow-y-auto scrollbar-hide pb-[100px]">
                {/* Leaderboard Section */}
                <div className="mt-2 px-4">
                    <h2 className="text-[17px] font-bold text-white mb-4">Leaderboard</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 pl-4 after:content-[''] after:pr-4 after:block">
                        {LEADERBOARD_GAMES.map((game, i) => (
                            <Link href={`/game/${game.id}`} key={game.id} className="flex-shrink-0 w-32 flex flex-col items-center bg-gradient-to-b from-white/5 to-transparent rounded-[20px] p-4 border border-white/5 relative overflow-hidden group hover:scale-[1.02] transition-transform">
                                {/* Soft glow effect */}
                                <div className="absolute top-0 w-full h-1/2 bg-purple-500/10 blur-xl rounded-full"></div>
                                <div className="w-[72px] h-[72px] rounded-2xl overflow-hidden relative shadow-lg z-10 mb-3 border border-white/10">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${game.image}')` }}></div>
                                </div>
                                <h3 className="text-white font-bold text-[13px] text-center line-clamp-2 leading-[1.2] min-h-[30px] mb-3 z-10 tracking-tight group-hover:text-purple-300 transition-colors">{game.title}</h3>
                                <button className="w-full py-1.5 rounded-full border border-purple-500/50 text-purple-400 font-bold text-[13px] z-10 group-hover:bg-purple-500/10 transition-colors">Play</button>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Trending Section */}
                <div className="mt-6 px-4">
                    <h2 className="text-[17px] font-bold text-white mb-4">Trending</h2>

                    {/* Top 3 Composite */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        {/* Top 1 */}
                        <div className="col-span-1 rounded-[20px] bg-[#1a1a1a] relative overflow-hidden aspect-[3/4]">
                            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${TRENDING_GAMES[0].image}')` }}></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-black/20 to-transparent"></div>

                            <div className="absolute top-2 left-0 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-[11px] px-3 py-1 rounded-r-full shadow-lg">
                                Top 1
                            </div>

                            <div className="absolute bottom-3 left-3 right-3">
                                <h3 className="text-white font-bold text-sm leading-tight drop-shadow-md">{TRENDING_GAMES[0].title}</h3>
                            </div>
                        </div>

                        {/* Top 2 & 3 */}
                        <div className="grid grid-rows-2 gap-3">
                            {/* Top 2 */}
                            <div className="rounded-[16px] bg-[#1a1a1a] relative overflow-hidden w-full h-full">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${TRENDING_GAMES[1].image}')` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-black/20 to-transparent"></div>

                                <div className="absolute top-2 left-0 bg-gradient-to-r from-yellow-500 to-orange-400 text-black font-bold text-[11px] px-3 py-1 rounded-r-full shadow-lg">
                                    Top 2
                                </div>
                                <div className="absolute bottom-2 left-3 right-3">
                                    <h3 className="text-white font-bold text-xs leading-tight drop-shadow-md line-clamp-2">{TRENDING_GAMES[1].title}</h3>
                                </div>
                            </div>

                            {/* Top 3 */}
                            <div className="rounded-[16px] bg-[#1a1a1a] relative overflow-hidden w-full h-full">
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${TRENDING_GAMES[2].image}')` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/90 via-black/20 to-transparent"></div>

                                <div className="absolute top-2 left-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-[11px] px-3 py-1 rounded-r-full shadow-lg">
                                    Top 3
                                </div>
                                <div className="absolute bottom-2 left-3 right-3">
                                    <h3 className="text-white font-bold text-xs leading-tight drop-shadow-md line-clamp-2">{TRENDING_GAMES[2].title}</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trending Row Icons */}
                    <div className="grid grid-cols-4 gap-2.5">
                        {MINI_ICONS.map((game, i) => (
                            <Link href={`/game/${game.id}`} key={i} className="flex flex-col group hover:scale-105 transition-transform">
                                <div className="w-full aspect-square rounded-[14px] bg-[#1a1a1a] mb-2 relative overflow-hidden shadow-sm border border-white/5">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${game.image}')` }}></div>
                                </div>
                                <h4 className="text-[10px] font-bold text-gray-300 line-clamp-2 leading-[1.2] group-hover:text-purple-300 transition-colors">{game.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Popular Section */}
                <div className="mt-8 px-4">
                    <h2 className="text-[17px] font-bold text-white mb-4">Popular</h2>
                    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 pl-4 after:content-[''] after:pr-4 after:block">
                        {POPULAR_GAMES.map((game, i) => (
                            <Link href={`/game/${game.id}`} key={i} className="flex-shrink-0 w-[240px] flex flex-col group hover:scale-[1.02] transition-transform">
                                <div className="w-full aspect-[2/1] bg-[#1a1a1a] rounded-[18px] relative overflow-hidden mb-2 shadow-md border border-white/5">
                                    {/* Instead of landscape we use the square image but cropped, or custom wrapper. Best is to show the image shifted/scaled correctly. */}
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${game.image}')` }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#121212]/50 to-transparent"></div>
                                    <div className="absolute bottom-1.5 left-1.5 bg-[#121212]/80 px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[10px] text-white font-medium border border-white/5 backdrop-blur-md">
                                        <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                        {game.rating}
                                    </div>
                                </div>
                                <h4 className="text-[13px] font-bold text-white leading-tight group-hover:text-purple-300 transition-colors">{game.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Brawl Time Section */}
                <div className="mt-6 px-4">
                    <h2 className="text-[17px] font-bold text-white mb-4">Brawl Time</h2>
                    <div className="grid grid-cols-4 gap-2.5">
                        {MINI_ICONS.map((game, i) => (
                            <Link href={`/game/${game.id}`} key={i} className="flex flex-col group hover:scale-105 transition-transform">
                                <div className="w-full aspect-square rounded-[14px] bg-[#1a1a1a] mb-2 relative overflow-hidden shadow-sm border border-white/5">
                                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${game.image}')` }}></div>
                                    <div className="absolute bottom-1 left-1 bg-[#121212]/80 px-1 py-0.5 rounded flex items-center gap-0.5 text-[9px] text-white font-medium border border-white/5 backdrop-blur-md">
                                        <Star size={8} className="fill-yellow-400 text-yellow-400" />
                                        {game.rating}
                                    </div>
                                </div>
                                <h4 className="text-[10px] font-bold text-gray-300 line-clamp-2 leading-[1.2] group-hover:text-purple-300 transition-colors">{game.title}</h4>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Sticky Tabs for Grid list */}
                <div className="sticky top-0 z-40 bg-[#121212]/95 backdrop-blur-xl py-3 border-b border-white/5 overflow-x-auto scrollbar-hide px-4 mt-6 mb-2">
                    <div className="flex gap-2">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-[13px] font-bold transition-all select-none whitespace-nowrap",
                                    activeTab === tab
                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-900/40"
                                        : "bg-white/5 border border-white/5 text-gray-300 hover:bg-white/10"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Filtered Grid List with Ad */}
                <div>
                    <GameList activeTab={activeTab} />
                </div>
            </main>

            <BottomNav />
        </div>
    );
}
