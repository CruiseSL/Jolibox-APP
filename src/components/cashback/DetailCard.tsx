import { ArrowRight, Coins, CircleDollarSign } from "lucide-react";
import Link from "next/link";

export function DetailCard() {
    return (
        <div className="rounded-xl bg-white p-4 shadow-sm border border-gray-100 flex flex-col gap-4">
            <h3 className="text-gray-500 text-xs font-medium">Detail</h3>

            {/* Cash Item */}
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <CircleDollarSign className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-slate-700 font-medium">Cash earned directly</span>
                </div>
                <span className="text-sm font-bold text-slate-900">+$5.00</span>
            </div>

            {/* Jolicoins Item */}
            <Link href="/jolicoin" className="flex justify-between items-center cursor-pointer hover:bg-gray-50 -mx-2 px-2 py-1 rounded-lg transition-colors">
                <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-slate-700 font-medium">10,000 Jolicoins</span>
                </div>
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-[#AD00FF]">
                        <span className="text-sm font-bold">+$1.00</span>
                        <ArrowRight className="h-3 w-3" />
                    </div>
                    <span className="text-[10px] text-[#AD00FF] font-medium leading-none">View details</span>
                </div>
            </Link>
        </div>
    );
}
