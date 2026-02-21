"use client";

import { useMockState } from "@/context/MockStateContext";
import { Info, ExternalLink } from "lucide-react";

export function BannerAd() {
    const { showAds } = useMockState();

    if (!showAds) return null;

    return (
        <div className="w-[300px] h-[250px] bg-white border border-gray-200 shadow-sm relative overflow-hidden flex flex-col mx-auto">
            {/* Ad Badge/Icon */}
            <div className="absolute top-0 right-0 bg-white/90 px-1 py-0.5 rounded-bl z-10 flex items-center gap-1 shadow-sm border-b border-l border-gray-100">
                <span className="text-[9px] text-blue-500 font-bold">Ad</span>
                <Info size={10} className="text-gray-400" />
            </div>

            {/* Simulated Google Ad Content */}
            <div className="flex-1 w-full bg-gray-100 relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop')` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-bold text-lg leading-tight mb-1 drop-shadow-md">Epic Fantasy RPG</h3>
                    <p className="text-[11px] line-clamp-2 opacity-90 drop-shadow">Join millions of players in the ultimate open world adventure. Free to play!</p>
                </div>
            </div>

            {/* Bottom action bar */}
            <div className="h-14 bg-white px-3 flex items-center justify-between border-t border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-inner">
                        RPG
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900 leading-tight">Install Now</span>
                        <span className="text-[10px] text-gray-500">Google Play</span>
                    </div>
                </div>

                <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm hover:bg-blue-700 transition-colors">
                    Open <ExternalLink size={12} />
                </button>
            </div>
        </div>
    );
}
