import { Button } from "@/components/ui/button";

export function RedeemSection() {
    return (
        <div className="space-y-3">
            <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Redeem Your Benefits</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                    Use Jolicoin to redeem cashback, memberships, and more.
                </p>
            </div>

            {/* Cashback Card */}
            <div className="rounded-2xl bg-white p-5 shadow-sm border border-purple-50 space-y-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <h4 className="font-bold text-slate-900 text-base">Cashback</h4>
                        <p className="text-[10px] text-gray-400 font-medium">Current cashback balance</p>
                    </div>
                    <span className="text-xs text-gray-400 font-medium bg-gray-50 px-2 py-1 rounded-md">
                        1,000 Jolicoin ≈ S$1.00
                    </span>
                </div>

                <div className="text-3xl font-bold text-slate-900">S$1.25</div>

                <p className="text-xs text-orange-500 font-medium">
                    Only <span className="font-bold">S$2.75</span> more to cash out
                </p>

                <Button className="w-full bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-xl h-11 font-medium shadow-md shadow-purple-100">
                    Go to Cashback
                </Button>
            </div>
        </div>
    );
}
