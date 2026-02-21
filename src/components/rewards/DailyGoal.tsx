import { Button } from "@/components/ui/button";

export function DailyGoal() {
    return (
        <div className="rounded-[24px] bg-gradient-to-r from-[#fff5e1] to-[#fffaf1] shadow-sm border border-[#fbf2e2] overflow-hidden">
            {/* Top Info Section */}
            <div className="pl-4 pr-16 py-3 relative overflow-hidden">
                <div className="relative z-10 flex flex-col justify-center h-[56px]">
                    <h3 className="text-[#d97706] font-black text-[18px] leading-tight mb-1 whitespace-nowrap">Endless Daily Rewards</h3>
                    <p className="text-[11px] text-[#cca468] font-bold italic leading-none whitespace-nowrap">
                        Watch & play to free rewards
                    </p>
                </div>
                {/* Dummy Clapperboard Image Position Right */}
                <div className="absolute -right-3 top-[55%] -translate-y-1/2 w-[105px] h-[105px] drop-shadow-sm pointer-events-none z-20 overflow-visible">
                    <img src="/rewards/daily_rewards.svg" className="w-full h-full object-contain" alt="Rewards" />
                </div>
            </div>

            {/* Bottom Progress Section */}
            <div className="bg-white rounded-b-[24px] px-4 py-4 space-y-3">
                <div className="flex justify-between items-end gap-2">
                    <p className="text-[10px] text-gray-500 font-medium">Earn 1 Jolicoin every 1 min (up to 300/day)</p>
                    <Button variant="secondary" className="bg-gray-100 hover:bg-gray-200 text-slate-500 text-[11px] font-bold h-7 rounded-full px-5 min-w-[70px]">
                        Go
                    </Button>
                </div>

                <div className="relative pt-1 pb-3">
                    {/* Progress Bar Container: Striped Background */}
                    <div className="h-9 w-full rounded-2xl bg-gray-100 overflow-hidden relative">
                        <div
                            className="absolute inset-0 w-full h-full opacity-50"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 6px, #cbd5e1 6px, #cbd5e1 10px)'
                            }}
                        ></div>
                        {/* Progress Fill over Stripes */}
                        <div
                            className="absolute left-0 top-0 bottom-0 bg-[#d4c1ff] rounded-2xl z-10 flex items-center justify-center border border-purple-200 shadow-sm transition-all duration-500"
                            style={{ width: '50%' }}
                        >
                            <span className="text-[11px] font-bold text-slate-800 leading-none mr-2">+100 Earned</span>
                        </div>
                    </div>
                    {/* Floating Tooltip Pill */}
                    <div className="absolute left-1/2 -bottom-0 -translate-x-1/2 bg-black text-white text-[9px] font-bold px-3 py-1 rounded-full whitespace-nowrap z-20 shadow-md">
                        100 / 300 mins
                    </div>
                </div>
            </div>
        </div>
    );
}
