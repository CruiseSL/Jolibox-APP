import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function BalanceHeader() {
    return (
        <div className="flex flex-col items-center pt-2 pb-6 space-y-4">
            {/* Ticker */}
            <div className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm animate-fade-in">
                <Avatar className="h-5 w-5">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <span className="text-[10px] text-gray-500 font-medium italic">C*****e just successfully withdrew $2</span>
            </div>

            {/* Balance Display */}
            <div className="flex items-baseline gap-2">
                <span className="text-lg font-medium text-slate-800">SGD</span>
                <span className="text-5xl font-bold text-slate-900 tracking-tight">6.00</span>
            </div>
        </div>
    );
}
