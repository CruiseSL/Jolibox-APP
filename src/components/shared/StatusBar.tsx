import { cn } from "@/lib/utils";

interface StatusBarProps {
    variant?: "light" | "dark";
    bgClass?: string;
}

export function StatusBar({ variant = "light", bgClass }: StatusBarProps) {
    const isDark = variant === "dark";

    return (
        <div
            className={cn(
                "flex justify-between items-center px-6 py-2 text-xs font-semibold sticky top-0 z-50 backdrop-blur-md flex-shrink-0",
                isDark ? "text-white" : "text-slate-900",
                bgClass
            )}
        >
            <span>9:41</span>
            <div className="flex gap-1.5 items-center">
                {isDark ? (
                    <>
                        <div className="flex gap-0.5 items-end h-3">
                            <div className="w-1 h-1 bg-white rounded-full"></div>
                            <div className="w-1 h-1.5 bg-white rounded-full"></div>
                            <div className="w-1 h-2 bg-white rounded-full"></div>
                            <div className="w-1 h-2.5 bg-gray-600 rounded-full"></div>
                        </div>
                        <div className="h-3 w-5 border border-white/80 rounded-[4px] p-0.5 flex">
                            <div className="h-full w-[80%] bg-white rounded-[2px]"></div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex gap-1">
                            <div className="h-2.5 w-px bg-slate-900"></div>
                            <div className="h-2.5 w-px bg-slate-900"></div>
                            <div className="h-2.5 w-px bg-slate-900"></div>
                            <div className="h-2.5 w-px bg-slate-400"></div>
                        </div>
                        <div className="h-3 w-4 border-[1.5px] border-slate-300 rounded-[4px] relative ml-1">
                            <div className="absolute inset-0.5 bg-slate-900 rounded-[1px]"></div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
