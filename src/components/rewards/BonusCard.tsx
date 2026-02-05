import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Gamepad2, PlaySquare, Smartphone, Lock, Coins, CircleDollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export function BonusCard() {
    return (
        <div className="rounded-3xl bg-sky-100 p-4 space-y-4">
            {/* Timer Section */}
            <div className="flex flex-col items-center gap-2">
                <div className="flex gap-2">
                    <TimeBox value="07" label="d" />
                    <TimeBox value="03" label="h" />
                    <TimeBox value="21" label="m" />
                    <TimeBox value="45" label="s" />
                </div>
                <p className="text-sky-600 font-medium text-sm">Complete tasks for new user bonus!</p>
            </div>

            {/* Tasks Section */}
            <div className="space-y-4">
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

            {/* Final Grand Bonus */}
            <div className="rounded-2xl bg-white p-4 space-y-3">
                <h3 className="font-bold text-lg text-slate-900">Final grand bonus</h3>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100">
                            <Coins className="h-4 w-4 text-purple-600 fill-purple-600" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900">2000</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <CircleDollarSign className="h-4 w-4 text-green-600 fill-green-600" />
                        </div>
                        <span className="text-2xl font-bold text-slate-900">$1.20</span>
                    </div>
                </div>

                <Button className="w-full bg-purple-400 hover:bg-purple-500 text-white font-medium h-12 rounded-xl gap-2 cursor-not-allowed">
                    <Lock className="h-4 w-4" />
                    Complete all three tasks to unlock
                </Button>
            </div>
        </div>
    );
}

function TimeBox({ value, label }: { value: string; label: string }) {
    return (
        <div className="flex items-baseline bg-sky-300/50 backdrop-blur-sm rounded-lg px-2 py-1.5 min-w-[3.2rem] justify-center">
            <span className="text-xl font-bold text-slate-900">{value}</span>
            <span className="text-xs font-semibold text-slate-700 ml-0.5">{label}</span>
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
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-start gap-3 flex-1">
                <div className="h-10 w-10 bg-sky-200/50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-slate-700" />
                </div>
                <div className="space-y-1 w-full max-w-[160px]">
                    <div className="font-medium text-sm text-slate-900 truncate">{title}</div>
                    <div className="flex items-center gap-1.5">
                        <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-purple-100 flex-shrink-0">
                            <Coins className="h-2.5 w-2.5 text-purple-600 fill-purple-600" />
                        </div>
                        <span className="text-slate-600 text-xs font-medium">{reward}</span>
                        {progress < 100 && (
                            <Progress value={progress} className="h-1.5 flex-1 bg-sky-200" indicatorClassName="bg-slate-900" />
                        )}
                    </div>
                </div>
            </div>

            <Button
                variant={actionVariant === "ghost" ? "ghost" : "default"}
                className={cn(
                    "rounded-full h-8 px-5 text-xs font-medium min-w-[80px]",
                    actionVariant === "primary" && "bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-200",
                    actionVariant === "secondary" && "bg-sky-300/50 hover:bg-sky-300 text-slate-700 shadow-none border-0",
                    actionVariant === "ghost" && "text-slate-500 hover:bg-transparent cursor-default"
                )}
            >
                {actionLabel}
            </Button>
        </div>
    )
}
