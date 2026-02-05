import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, Film, Smartphone, Coins } from "lucide-react";
import { cn } from "@/lib/utils";

export function TaskList() {
    return (
        <div className="space-y-4 pb-4">
            <h2 className="text-xl font-bold text-slate-900">Tasks</h2>
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
                <div className="h-px bg-gray-100" />
                <TaskItem
                    icon={Film}
                    title="Watch 3 home videos"
                    reward="+1000"
                    progress={40}
                    actionLabel="Go"
                    actionVariant="secondary"
                />
                <div className="h-px bg-gray-100" />
                <TaskItem
                    icon={Smartphone}
                    title="Register a Jolibox account"
                    reward="+1000"
                    progress={0}
                    // progress 0 implies no progress bar needed for this one based on design? 
                    // Actually looking at design, "Register" task has no progress bar in the general list either usually 
                    // or acts as single step. The design shows just the text.
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
    return (
        <div className="flex items-center justify-between gap-3">
            <div className="h-11 w-11 bg-gray-100/80 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Icon className="h-6 w-6 text-slate-800" strokeWidth={2.5} />
            </div>

            <div className="flex-1 space-y-1.5 min-w-0">
                <div className="font-bold text-sm text-slate-900 truncate">{title}</div>
                <div className="flex items-center gap-2">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 flex-shrink-0">
                        <Coins className="h-2.5 w-2.5 text-purple-600 fill-purple-600" />
                    </div>
                    <span className="text-slate-900 text-xs font-bold">{reward}</span>
                    {!hideProgress && (
                        <Progress value={progress} className="h-1 w-16 bg-gray-100" indicatorClassName="bg-slate-900" />
                    )}
                </div>
            </div>

            <div className="relative">
                {bonusBadge && (
                    <div className="absolute -top-3 -right-1 z-10 bg-purple-200 text-purple-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-white">
                        {bonusBadge}
                        <span className="inline-block ml-0.5 w-1 h-1 bg-purple-500 rounded-full"></span>
                    </div>
                )}
                <Button
                    variant={actionVariant === "ghost" ? "ghost" : "default"}
                    className={cn(
                        "rounded-full h-8 px-6 text-xs font-bold min-w-[80px]",
                        actionVariant === "primary" && "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200",
                        actionVariant === "secondary" && "bg-purple-50 hover:bg-purple-100 text-purple-600 shadow-none border-0",
                        actionVariant === "ghost" && "bg-gray-100 hover:bg-gray-200 text-gray-500 cursor-default"
                    )}
                >
                    {actionLabel}
                </Button>
            </div>
        </div>
    );
}
