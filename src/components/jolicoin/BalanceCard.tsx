import { Button } from "@/components/ui/button";
import Link from "next/link";

export function BalanceCard() {
    return (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-4">
            <div className="space-y-1">
                <h2 className="text-gray-500 text-sm font-medium">Jolicoin Balance</h2>
                <div className="text-4xl font-black text-slate-900 tracking-tight">1,250</div>
            </div>

            <p className="text-xs text-gray-500 max-w-[280px] leading-relaxed">
                Earn Jolicoin by playing games, watching dramas, and completing tasks.
            </p>

            <Link href="/">
                <Button className="bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-full px-8 h-10 text-sm font-semibold shadow-lg shadow-purple-200">
                    Go to Rewards
                </Button>
            </Link>
        </div>
    );
}
