import { Button } from "@/components/ui/button";
import { Coins } from "lucide-react";

export function DailyGoal() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div className="space-y-1">
                    <h3 className="text-[17px] font-bold text-slate-900">Play Games & Watch Dramas</h3>
                    <p className="text-xs text-gray-500 max-w-[200px] leading-relaxed">
                        Earn 1 Jolicoin every 2 mins (up to
                        <span className="inline-flex align-middle mx-1">
                            <Coins className="h-3 w-3 text-purple-500 fill-purple-500" />
                        </span>
                        150 daily)
                    </p>
                </div>
                <Button variant="secondary" className="bg-purple-50 hover:bg-purple-100 text-purple-600 text-xs font-medium h-7 rounded-full px-4">
                    Go
                </Button>
            </div>

            <div className="relative">
                {/* Custom Striped Progress Bar */}
                <div className="h-10 w-full rounded-full bg-gray-100 overflow-hidden relative">
                    <div
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #e2e8f0 10px, #e2e8f0 14px)'
                        }}
                    ></div>
                    {/* Actual progress fill would go here overlaying the stripes */}
                    <div
                        className="absolute left-0 top-0 bottom-0 bg-slate-900 rounded-full z-10 flex items-center px-3"
                        style={{ width: '25%' }}
                    >
                        <span className="text-[10px] font-bold text-white leading-none">0 / 300 mins</span>
                    </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-gray-300 font-medium">
                    60 mins
                </div>
            </div>
        </div>
    );
}
