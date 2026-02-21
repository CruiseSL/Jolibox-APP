"use client";

import Link from "next/link";
import { ChevronLeft, History } from "lucide-react";
import { BalanceHeader } from "@/components/cashback/BalanceHeader";
import { DetailCard } from "@/components/cashback/DetailCard";
import { WithdrawalCard } from "@/components/cashback/WithdrawalCard";
import { useMockState } from "@/context/MockStateContext";
import { useEffect } from "react";

export default function CashbackPage() {
    const { activeMethod } = useMockState();

    // No mandatory check on load anymore

    return (
        <div className="w-full h-full relative flex flex-col bg-[#F8F5FF] overflow-hidden">
            {/* Status Bar Placeholder */}
            <div className="flex justify-between items-center px-6 py-3 text-sm font-semibold sticky top-0 z-50 bg-[#F8F5FF]/95 backdrop-blur-md flex-shrink-0">
                <span>9:41</span>
                <div className="flex gap-1.5 item-center">
                    <div className="flex gap-1">
                        <div className="h-2.5 w-px bg-slate-900"></div>
                        <div className="h-2.5 w-px bg-slate-900"></div>
                        <div className="h-2.5 w-px bg-slate-900"></div>
                        <div className="h-2.5 w-px bg-slate-400"></div>
                    </div>
                    <div className="h-3 w-4 border-[1.5px] border-slate-300 rounded-[4px] relative ml-1">
                        <div className="absolute inset-0.5 bg-slate-900 rounded-[1px]"></div>
                    </div>
                </div>
            </div>

            {/* Top Navigation */}
            <div className="flex items-center justify-between px-4 py-2 sticky top-[44px] z-40 bg-[#F8F5FF]/95 backdrop-blur-md flex-shrink-0">
                <Link href="/" className="p-2 -ml-2 hover:bg-white/50 rounded-full transition-colors">
                    <ChevronLeft className="h-6 w-6 text-slate-900" strokeWidth={2.5} />
                </Link>
                <h1 className="text-lg font-bold text-slate-900">Cashback</h1>
                <div className="flex items-center">
                    <button className="p-2 -mr-2 hover:bg-white/50 rounded-full transition-colors">
                        <History className="h-6 w-6 text-gray-500" strokeWidth={2} />
                    </button>
                </div>
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto scrollbar-hide pb-10">
                <div className="px-5 pt-2 space-y-5">
                    <BalanceHeader />
                    <DetailCard />
                    <WithdrawalCard />
                </div>
            </main>
        </div>
    );
}
