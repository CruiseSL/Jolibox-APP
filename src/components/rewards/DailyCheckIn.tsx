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
        <div className="flex gap-[16px] overflow-x-auto px-1 scrollbar-hide snap-x">
            {days.map((item) => (
                <div key={item.day} className="flex flex-col items-center gap-[6px] min-w-[50px] snap-start">
                    {/* Circle */}
                    <div
                        className={cn(
                            "flex flex-col items-center justify-center rounded-full transition-all relative h-[52px] w-[52px]",
                            item.status === "claimed" ? "border border-[#e9d5ff] bg-white" : "",
                            item.status === "active" ? "border-[2px] border-[#c084fc] bg-[#fdf4ff] shadow-[0_0_15px_rgba(192,132,252,0.3)]" : "",
                            item.status === "upcoming" ? "border border-gray-100 bg-white" : ""
                        )}
                    >
                        {item.status === "claimed" ? (
                            <Check className="h-4 w-4 text-slate-800 mb-[1px]" strokeWidth={3} />
                        ) : (
                            <img src="/rewards/jolicoin.svg" className={cn("w-[22px] h-[22px] mb-[1px] object-contain", item.status === "upcoming" && "grayscale opacity-40")} alt="Jolicoin" />
                        )}
                        <span className={cn(
                            "font-bold leading-none",
                            item.status === "active" ? "text-[12px] text-[#c084fc]" : "text-[10px] text-slate-800",
                            item.status === "upcoming" && "text-gray-400"
                        )}>+{item.reward}</span>
                    </div>

                    {/* Label underneath */}
                    <span className={cn(
                        "text-[10px] whitespace-nowrap text-center",
                        item.status === "active" ? "text-slate-900 font-extrabold" : "text-gray-400 font-medium"
                    )}>
                        {item.status === "active" ? "Today" : `${item.day} day`}
                    </span>
                </div>
            ))}
        </div>
    );
}
