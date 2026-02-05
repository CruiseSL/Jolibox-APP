import { Gem } from "lucide-react";

export function SpinBanner() {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-200 via-orange-100 to-purple-200 h-24 flex items-center px-6 shadow-sm">
            <div className="z-10 flex flex-col items-start gap-1">
                <h3 className="text-xl font-black text-slate-800 leading-none">
                    Spin & Win <br /> Big Rewards!
                </h3>
            </div>

            {/* Decorative Wheel Placeholder elements */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 rounded-full border-[6px] border-white/30 bg-purple-600 h-32 w-32 flex items-center justify-center shadow-lg">
                <div className="absolute inset-2 rounded-full border border-yellow-300/50 bg-purple-700 flex items-center justify-center">
                    <Gem className="h-8 w-8 text-yellow-300 animate-pulse" />
                    <div className="absolute inset-0 rounded-full border-[1px] border-white/20"
                        style={{ background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(255,255,255,0.1) 60deg, transparent 60deg, rgba(255,255,255,0.1) 120deg, transparent 120deg)' }}>
                    </div>
                </div>
                {/* Pointer */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 h-4 w-3 bg-yellow-400 border-2 border-white rounded-sm rotate-180 z-20 shadow-sm"></div>
            </div>
        </div>
    );
}
