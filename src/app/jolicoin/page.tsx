import { StatusBar } from "@/components/shared/StatusBar";
import Link from "next/link";
import { ChevronLeft, History } from "lucide-react";
import { BalanceCard } from "@/components/jolicoin/BalanceCard";
import { Button } from "@/components/ui/button";
import { RedeemSection } from "@/components/jolicoin/RedeemSection";
import { MembershipSection } from "@/components/jolicoin/MembershipSection";

export default function JolicoinPage() {
    return (
        <div className="w-full h-full bg-[#F5F5FA] relative flex flex-col text-slate-900 overflow-hidden">
            {/* Background Gradient Mesh - subtle top glow matching mockup */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-100/60 via-transparent to-transparent pointer-events-none z-0" />

            <StatusBar bgClass="bg-[#F5F5FA]/90 backdrop-blur-sm" />

            {/* Top Navigation */}
            <div className="flex items-center justify-between px-4 py-2 sticky top-[44px] z-40 bg-[#F5F5FA]/90 backdrop-blur-sm flex-shrink-0">
                <Link href="/" className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors relative z-10">
                    <ChevronLeft className="h-6 w-6 text-slate-900" strokeWidth={2.5} />
                </Link>
                <h1 className="text-lg font-bold text-slate-900 relative z-10">Jolicoin</h1>
                <button className="p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors relative z-10">
                    <History className="h-6 w-6 text-gray-500" strokeWidth={2} />
                </button>
            </div>

            {/* Content */}
            <main className="flex-1 overflow-y-auto scrollbar-hide pb-10 relative z-10">
                <div className="px-5 pt-4 space-y-8">
                    <BalanceCard />

                    <div className="space-y-3">
                        <h3 className="text-base font-bold text-slate-900">How to earn Jolicoin</h3>

                        <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6">
                            <div className="space-y-3 px-1">
                                <div className="flex gap-3 items-start">
                                    <span className="text-gray-400 text-sm font-medium mt-0.5">1.</span>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        Play games and watch dramas.
                                    </p>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <span className="text-gray-400 text-sm font-medium mt-0.5">2.</span>
                                    <p className="text-gray-500 text-sm font-medium leading-relaxed">
                                        Complete daily check-in and tasks.
                                    </p>
                                </div>
                            </div>

                            <Link href="/" className="block">
                                <Button className="w-fit px-6 bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-full h-9 text-xs font-semibold shadow-md shadow-purple-100">
                                    Go to Rewards
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-base font-bold text-slate-900">Redeem</h3>
                        <RedeemSection />
                        <MembershipSection />
                    </div>
                </div>
            </main>
        </div>
    );
}
