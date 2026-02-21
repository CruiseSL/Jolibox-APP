import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Film, Smartphone, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export function TaskList() {
    return (
        <div className="space-y-4 pb-8">
            <h2 className="text-[17px] font-black text-slate-900 mb-2 px-1">Tasks</h2>
            <div className="space-y-6">
                <TaskItem
                    icon={Gamepad2}
                    title="Play 7 games (2/7)"
                    reward="+1000"
                    progress={25}
                    actionLabel="Claim"
                    actionVariant="primary"
                    bonusBadge="+6"
                />

                <TaskItem
                    icon={Film}
                    title="Watch 3 home videos"
                    reward="+1000"
                    progress={40}
                    actionLabel="Go"
                    actionVariant="secondary"
                />

                <TaskItem
                    icon={Smartphone}
                    title="Register a Jolibox account"
                    reward="+1000"
                    progress={0}
                    hideProgress={true}
                    actionLabel="Claimed"
                    actionVariant="ghost"
                />
            </div>
        </div>
    );
}

function TaskItem({
    icon: Icon,
    title,
    reward,
    progress,
    actionLabel,
    actionVariant,
    hideProgress = false,
    bonusBadge
}: {
    icon: any;
    title: string;
    reward: string;
    progress: number;
    actionLabel: string;
    actionVariant: "primary" | "secondary" | "ghost";
    hideProgress?: boolean;
    bonusBadge?: string;
}) {
    // Custom thin black line on dashed gray line for progress
    const dashPattern = "repeating-linear-gradient(90deg, #e2e8f0 0px, #e2e8f0 4px, transparent 4px, transparent 8px)";

    return (
        <div className="flex items-center justify-between gap-2.5">
            <div className="h-[42px] w-[42px] bg-[#f5f5f5] rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="h-5 w-5 text-slate-900" strokeWidth={2.5} />
            </div>

            <div className="flex-1 space-y-1 min-w-0 pr-1">
                <div className="font-bold text-[13px] text-slate-900 truncate leading-tight">{title}</div>
                <div className="flex items-center gap-1.5 h-4">
                    <img src="/rewards/jolicoin.svg" alt="Jolicoin" className="w-[14px] h-[14px]" />
                    <span className="text-slate-900 text-[11px] font-bold">{reward}</span>

                    {!hideProgress && (
                        <div className="flex-1 max-w-[70px] h-[3px] bg-gray-100 rounded-full overflow-hidden relative ml-1" style={{ backgroundImage: dashPattern }}>
                            <div className="absolute top-0 bottom-0 left-0 bg-slate-900 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative flex-shrink-0">
                {bonusBadge && (
                    <div className="absolute -top-3 -right-1 z-10 bg-[#e0d4ff] text-[#6039ff] text-[9px] font-black px-[5px] py-[2px] rounded-full border border-white flex items-center gap-0.5 shadow-sm">
                        <img src="/rewards/jolicoin.svg" className="w-2.5 h-2.5" alt="Jolicoin" />
                        {bonusBadge}
                    </div>
                )}
                <Button
                    variant={actionVariant === "ghost" ? "ghost" : "default"}
                    className={cn(
                        "rounded-full h-8 px-4 text-[11px] font-bold min-w-[68px]",
                        actionVariant === "primary" && "bg-[#6039ff] hover:bg-[#502ce0] text-white shadow-md shadow-purple-200/50",
                        actionVariant === "secondary" && "bg-purple-50 hover:bg-purple-100 text-[#6039ff] shadow-none border-0",
                        actionVariant === "ghost" && "bg-transparent border border-gray-200 text-gray-400 hover:bg-gray-50 cursor-default"
                    )}
                >
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
}
