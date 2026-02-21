"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { BannerAd } from "@/components/ads/BannerAd";

import { MOCK_GAMES } from "@/lib/mockGames";

export function GameList({ activeTab }: { activeTab: string }) {
    // Filter games based on tab
    const filteredGames =
        activeTab === "All"
            ? MOCK_GAMES
            : MOCK_GAMES.filter((g) => g.category === activeTab || (activeTab !== "All" && Math.random() > 0.5)); // Fallback mock

    return (
        <div className="grid grid-cols-3 gap-x-3 gap-y-6 px-5 pb-24">
            {filteredGames.map((game, index) => {
                // Insert Ad banner at every 3rd position (index 3, 6, 9, etc.)
                const showAdBefore = activeTab === "All" && index > 0 && index % 3 === 0;

                return (
                    <div key={game.id} className={showAdBefore ? "col-span-3 contents" : ""}>
                        {showAdBefore && (
                            <div className="col-span-3 flex justify-center w-full my-2">
                                <BannerAd />
                            </div>
                        )}

                        <Link href={`/game/${game.id}`} className="flex flex-col space-y-2 col-span-1">
                            <div className="relative aspect-square bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-sm">
                                {/* Placeholder Image with actual cover */}
                                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${game.image}')` }}></div>
                                {/* Rating overlay */}
                                <div className="absolute bottom-1.5 left-1.5 bg-[#121212]/80 px-1.5 py-0.5 rounded flex items-center gap-0.5 text-[10px] text-white font-medium border border-white/5">
                                    <Star size={10} className="fill-yellow-400 text-yellow-400" />
                                    {game.rating?.toFixed(1) || "4.5"}
                                </div>
                            </div>
                            <span className="text-sm font-bold text-gray-200 line-clamp-2 leading-tight">
                                {game.title}
                            </span>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
}
