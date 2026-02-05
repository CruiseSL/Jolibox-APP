import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function DailyCheckIn() {
    const days = [
        { day: 1, reward: 10, status: "claimed" },
        { day: 2, reward: 10, status: "active" },
        { day: 3, reward: 10, status: "upcoming" },
        { day: 4, reward: 10, status: "upcoming" },
        { day: 5, reward: 10, status: "upcoming" },
        { day: 6, reward: 10, status: "upcoming" },
        { day: 7, reward: 10, status: "upcoming" },
    ];

    return (
        <div className="flex gap-2 overflow-x-auto pb-6 pt-2 px-1 scrollbar-hide snap-x">
            {days.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-3 min-w-[3.5rem] snap-start">
                    {/* Circle */}
                    <div
                        className={cn(
                            "flex items-center justify-center rounded-full transition-all relative h-12 w-12",
                            // Colors
                            item.status === "claimed" && "bg-purple-100",
                            item.status === "active" && "bg-[#AD00FF] shadow-xl shadow-purple-200",
                            item.status === "upcoming" && "bg-purple-50"
                        )}
                    >
                        {item.status === "claimed" ? (
                            <Check className="h-6 w-6 text-[#AD00FF]" strokeWidth={4} />
                        ) : (
                            <div className={cn(
                                "flex flex-col items-center leading-none",
                                item.status === "active" ? "text-white" : "text-purple-300"
                            )}>
                                {item.status !== "active" && <span className="text-[10px] grayscale opacity-70">🪙</span>}
                                <span className={cn(
                                    "font-bold",
                                    item.status === "active" ? "text-sm" : "text-xs"
                                )}>+{item.reward}</span>
                            </div>
                        )}
                    </div>

                    {/* Label */}
                    <span className={cn(
                        "text-xs whitespace-nowrap",
                        item.status === "active" ? "text-slate-900 font-extrabold text-sm" : "text-gray-400 font-medium"
                    )}>
                        {item.status === "active" ? "Tap to claim" : `${item.day} day`}
                    </span>
                </div>
            ))}
        </div>
    );
}
