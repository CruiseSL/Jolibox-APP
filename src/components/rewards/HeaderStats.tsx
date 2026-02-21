import { ChevronRight } from "lucide-react";
import Link from "next/link";

export function HeaderStats() {
    return (
        <div className="grid grid-cols-2 gap-4 px-3">
            {/* Jolicoin Stats */}
            <Link href="/jolicoin" className="flex flex-col cursor-pointer active:opacity-70 transition-opacity">
                <div className="flex items-center gap-1.5 mb-1">
                    <img src="/rewards/jolicoin.svg" alt="Jolicoin" className="w-[18px] h-[18px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
                    <span className="text-[14px] font-medium text-slate-600 tracking-wide">Jolicoin</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" strokeWidth={2.5} />
                </div>
                <span className="text-[30px] font-black tracking-tighter text-[#0f172a] leading-none">1,250</span>
            </Link>

            {/* Cashback Stats */}
            <Link href="/cashback" className="flex flex-col cursor-pointer active:opacity-70 transition-opacity pl-2">
                <div className="flex items-center gap-1.5 mb-1">
                    <img src="/rewards/cash.svg" alt="Cashback" className="w-[18px] h-[18px] drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]" />
                    <span className="text-[14px] font-medium text-slate-600 tracking-wide">Cashback</span>
                    <ChevronRight className="h-4 w-4 text-slate-400" strokeWidth={2.5} />
                </div>
                <span className="text-[30px] font-black tracking-tighter text-[#0f172a] leading-none">$0.23</span>
            </Link>
        </div>
    );
}
