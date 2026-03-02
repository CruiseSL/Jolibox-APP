import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface TaskItemProps {
    icon: LucideIcon;
    title: string;
    reward: string;
    progress: number;
    actionLabel: string;
    actionVariant: "primary" | "secondary" | "ghost";
    hideProgress?: boolean;
    bonusBadge?: string;
    compact?: boolean;
}

const dashPattern = "repeating-linear-gradient(90deg, #e2e8f0 0px, #e2e8f0 4px, transparent 4px, transparent 8px)";

export function TaskItem({
    icon: Icon,
    title,
    reward,
    progress,
    actionLabel,
    actionVariant,
    hideProgress = false,
    bonusBadge,
    compact = false,
}: TaskItemProps) {
    const showProgress = !hideProgress && progress < 100;

    return (
        <div className="flex items-center justify-between gap-2.5">
            <div className={cn(
                "bg-[#f5f5f5] flex items-center justify-center flex-shrink-0",
                compact ? "h-9 w-9 rounded-[14px]" : "h-[42px] w-[42px] rounded-xl"
            )}>
                <Icon className={cn("text-slate-900", compact ? "h-4 w-4" : "h-5 w-5")} strokeWidth={2.5} />
            </div>

            <div className="flex-1 space-y-0.5 min-w-0 pr-1">
                <div className="font-bold text-[13px] text-slate-900 truncate leading-tight">{title}</div>
                <div className="flex items-center gap-1.5 h-4">
                    <img src="/rewards/jolicoin.svg" alt="Jolicoin" className="w-[14px] h-[14px]" />
                    <span className="text-slate-900 text-[11px] font-bold">{reward}</span>
                    {showProgress && (
                        <div
                            className="flex-1 max-w-[70px] h-[3px] bg-gray-100 rounded-full overflow-hidden relative ml-1"
                            style={{ backgroundImage: dashPattern }}
                        >
                            <div
                                className="absolute top-0 bottom-0 left-0 bg-slate-900 rounded-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                            />
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
