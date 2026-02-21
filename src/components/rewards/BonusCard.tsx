import { Button } from "@/components/ui/button";
import { Gamepad2, PlaySquare, Smartphone, Lock, Coins, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

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
                />
                <TaskItem
                    icon={PlaySquare}
                    title="Watch dramas (2/3)"
                    reward="+1000"
                    progress={66}
                    actionLabel="Go"
                    actionVariant="secondary"
                />
                <TaskItem
                    icon={Smartphone}
                    title="Register a Jolibox account"
                    reward="+1000"
                    progress={100}
                    actionLabel="Claimed"
                    actionVariant="ghost"
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

function TaskItem({
    icon: Icon,
    title,
    reward,
    progress,
    actionLabel,
    actionVariant
}: {
    icon: any;
    title: string;
    reward: string;
    progress: number;
    actionLabel: string;
    actionVariant: "primary" | "secondary" | "ghost";
}) {
    // Custom thin black line on dashed gray line for progress
    const dashPattern = "repeating-linear-gradient(90deg, #e2e8f0 0px, #e2e8f0 4px, transparent 4px, transparent 8px)";

    return (
        <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 flex-1 min-w-0">
                <div className="h-9 w-9 bg-gray-100 rounded-[14px] flex items-center justify-center flex-shrink-0">
                    <Icon className="h-4 w-4 text-slate-800" strokeWidth={2.5} />
                </div>
                <div className="space-y-0.5 flex-1 min-w-0">
                    <div className="font-bold text-[13px] text-slate-900 truncate pr-1 leading-tight">{title}</div>

                    <div className="flex items-center gap-1.5 h-4">
                        <img src="/rewards/jolicoin.svg" alt="Jolicoin" className="w-[14px] h-[14px]" />
                        <span className="text-slate-900 text-[11px] font-bold">{reward}</span>

                        {progress < 100 && (
                            <div className="flex-1 max-w-[70px] h-[3px] bg-gray-100 rounded-full overflow-hidden relative ml-1" style={{ backgroundImage: actionVariant !== 'ghost' ? dashPattern : '' }}>
                                <div className="absolute top-0 bottom-0 left-0 bg-slate-900 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Button
                variant={actionVariant === "ghost" ? "ghost" : "default"}
                className={cn(
                    "rounded-full h-8 px-4 text-[11px] font-bold min-w-[64px] flex-shrink-0",
                    actionVariant === "primary" && "bg-[#6039ff] hover:bg-[#502ce0] text-white shadow-md shadow-purple-200/50",
                    actionVariant === "secondary" && "bg-gray-100/80 hover:bg-gray-200 text-slate-500 shadow-none border-0",
                    actionVariant === "ghost" && "text-slate-400 bg-transparent hover:bg-transparent cursor-default px-0 pr-1 text-xs font-semibold"
                )}
            >
                {actionLabel}
            </Button>
        </div>
    )
}
