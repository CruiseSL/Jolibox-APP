import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RedeemSection() {
    return (
        <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">Redeem</h3>

            {/* Cashback Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm space-y-4">
                <div className="space-y-4">
                    <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-sm">Cashback</h4>
                        <p className="text-xs text-gray-400 font-medium">Your Jolicoin value</p>
                    </div>

                    <div className="space-y-1">
                        <div className="text-xl font-bold text-slate-900">
                            1,250 Jolicoin ≈ S$0.80
                        </div>
                        <p className="text-[10px] text-gray-400 font-medium">
                            Exchange rate: 1,000 Jolicoin ≈ S$1.00
                        </p>
                    </div>

                    <div className="space-y-1 pt-2">
                        <p className="text-xs text-gray-400 font-medium">Total cashback balance</p>
                        <div className="text-lg font-bold text-slate-900">S$1.25</div>
                    </div>
                </div>

                <Link href="/cashback" className="block">
                    <Button className="w-full bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-full h-10 font-medium shadow-md shadow-purple-100">
                        Go to Cashback
                    </Button>
                </Link>
            </div>
        </div>
    );
}
