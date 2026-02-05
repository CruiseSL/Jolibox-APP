import { CircleHelp } from "lucide-react";

export function BalanceCard() {
    return (
        <div className="flex flex-col items-center text-center space-y-2 py-6">
            <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                <span>Jolicoin Balance</span>
                <CircleHelp className="h-4 w-4 text-gray-400" />
            </div>

            <div className="flex items-center gap-2">
                {/* Purple Coin Icon Placeholder - using a div with gradient for now or an image if available. 
                    Mockup shows a purple coin. I'll use a simple styled div to simulate it or a Lucide icon if closest. 
                    The mockup has a specific detailed coin. I will use a placeholder circle with gradient. */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#AD00FF] to-[#7000FF] flex items-center justify-center shadow-sm">
                    <div className="w-5 h-5 rounded-full border-2 border-white/30" />
                </div>
                <div className="text-4xl font-black text-slate-900 tracking-tight">1,250</div>
            </div>
        </div>
    );
}
