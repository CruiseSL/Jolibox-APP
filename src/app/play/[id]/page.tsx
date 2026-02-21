"use client";

import { useParams, useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function PlayPage() {
    const params = useParams();
    const router = useRouter();

    return (
        <div className="flex-1 w-full bg-black flex flex-col font-sans relative overflow-hidden">
            {/* Mock Game Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 border-4 border-[#8B3DFF] border-t-transparent rounded-full animate-spin mb-6"></div>
                <h1 className="text-white text-2xl font-black mb-2">Game Instance {params.id}</h1>
                <p className="text-gray-400">Playable area simulated.<br />The game canvas goes here natively.</p>
            </div>

            {/* Floating Action / Close Header */}
            <div className="absolute top-0 w-full z-50 px-4 pt-safe-top pb-2 flex justify-start pointer-events-none mt-4">
                <button
                    onClick={() => router.back()}
                    className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white pointer-events-auto hover:bg-black/80 transition-colors shadow-xl"
                >
                    <X size={20} />
                </button>
            </div>
        </div>
    );
}
