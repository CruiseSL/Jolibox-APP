import { Gamepad2, PlaySquare, Smartphone, Lock } from "lucide-react";
import { TaskItem } from "@/components/shared/TaskItem";

export function BonusCard() {
    return (
        <div className="rounded-[24px] bg-white shadow-sm border border-gray-100 overflow-hidden mt-0">
            {/* Top Blue Banner Section */}
            <div className="bg-[#eaf4fe] px-4 py-4 relative">
                <div className="relative z-10 w-2/3">
                    <h3 className="text-[#0c4a6e] font-black text-[20px] mb-3 leading-none">New User Bonus</h3>
                    <div className="flex gap-[6px]">
                        <TimeBox value="07" label="d" />
                        <TimeBox value="03" label="h" />
                        <TimeBox value="21" label="m" />
                        <TimeBox value="45" label="s" />
                    </div>
                </div>
                {/* Dummy Chest Graphic Positioned Right */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 w-[90px] h-[90px] drop-shadow-md z-20">
                    <img src="/rewards/new_user_bonus.svg" className="w-full h-full object-contain" alt="New User Bonus" />
                </div>
            </div>

            <div className="p-4 space-y-4">
                {/* Final Grand Bonus Header Text */}
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-[17px] text-slate-900 leading-tight">Final bonus</h3>
                        <p className="text-[11px] text-slate-500 font-medium mt-0.5">Complete all three tasks to receive</p>
                    </div>

                    {/* Locked Status Pill */}
                    <div className="flex items-center gap-1 bg-purple-200 text-purple-600 px-3 py-1.5 rounded-full text-xs font-bold">
                        <Lock className="h-3 w-3" />
                        <span>unlock</span>
                    </div>
                </div>

                {/* Final Rewards display */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 h-6">
                        <img src="/rewards/jolicoin.svg" alt="Jolicoin" className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
                        <span className="text-[15px] font-black text-slate-900 tracking-tight">2000</span>
                    </div>
                    <div className="flex items-center gap-1.5 h-6">
                        <img src="/rewards/cash.svg" alt="Cash" className="w-5 h-5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
                        <span className="text-[15px] font-black text-slate-900 tracking-tight">$1.20</span>
                    </div>
                </div>
            </div>

            {/* Separator */}
            <div className="h-px bg-gray-100 mx-4" />

            {/* Tasks Section */}
            <div className="px-4 py-4 space-y-5">
                <TaskItem
                    icon={Gamepad2}
                    title="Play games (1/3)"
                    reward="+1000"
                    progress={33}
                    actionLabel="Claim"
                    actionVariant="primary"
                    compact
                />
                <TaskItem
                    icon={PlaySquare}
                    title="Watch dramas (2/3)"
                    reward="+1000"
                    progress={66}
                    actionLabel="Go"
                    actionVariant="secondary"
                    compact
                />
                <TaskItem
                    icon={Smartphone}
                    title="Register a Jolibox account"
                    reward="+1000"
                    progress={100}
                    actionLabel="Claimed"
                    actionVariant="ghost"
                    hideProgress
                    compact
                />
            </div>
        </div>
    );
}

function TimeBox({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex items-baseline bg-[#b6ddf9] rounded-[6px] text-center px-[6px] py-[2px]">
            <span className="text-[14px] font-black text-[#0c4a6e] leading-tight">{value}</span>
            <span className="text-[10px] font-bold text-[#0c4a6e] opacity-80 mt-0.5 ml-[2px]">{label}</span>
        </div>
    )
}

