import Link from "next/link";
import { ChevronLeft, History } from "lucide-react";
import { BalanceCard } from "@/components/jolicoin/BalanceCard";
import { RedeemSection } from "@/components/jolicoin/RedeemSection";
import { MembershipSection } from "@/components/jolicoin/MembershipSection";

export default function JolicoinPage() {
    return (
        <div className="min-h-screen text-slate-900 pb-10 bg-[#252525]">
            <div className="mx-auto max-w-md bg-white min-h-screen shadow-sm relative flex flex-col">
                {/* Status Bar Placeholder */}
                <div className="flex justify-between items-center px-6 py-3 text-sm font-semibold sticky top-0 z-50 bg-white/95 backdrop-blur-md">
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
                <div className="flex items-center justify-between px-4 py-2 sticky top-[44px] z-40 bg-white/95 backdrop-blur-md">
                    <Link href="/" className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ChevronLeft className="h-6 w-6 text-slate-900" strokeWidth={2.5} />
                    </Link>
                    <h1 className="text-lg font-bold text-slate-900">Jolicoin</h1>
                    <button className="p-2 -mr-2 hover:bg-gray-100 rounded-full transition-colors">
                        <History className="h-6 w-6 text-gray-400" strokeWidth={2} />
                    </button>
                </div>

                {/* Content */}
                <main className="px-5 pt-2 flex-1 space-y-8">
                    <BalanceCard />
                    <RedeemSection />
                    <MembershipSection />
                </main>
            </div>
        </div>
    );
}
