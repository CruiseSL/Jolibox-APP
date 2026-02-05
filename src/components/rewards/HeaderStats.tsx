import { ChevronRight, CircleDollarSign, Coins } from "lucide-react";
import Link from "next/link";

export function HeaderStats() {
    return (
        <div className="grid grid-cols-2 gap-4 px-2">
            {/* Jolicoin Stats */}
            <Link href="/jolicoin" className="flex flex-col cursor-pointer active:opacity-70 transition-opacity">
                <div className="flex items-center gap-1 mb-1">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-100">
                        <Coins className="h-3.5 w-3.5 text-purple-600 fill-purple-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Jolicoin</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-4xl font-bold tracking-tight text-slate-900">1,250</span>
            </Link>

            {/* Cashback Stats */}
            <Link href="/cashback" className="flex flex-col items-end cursor-pointer active:opacity-70 transition-opacity">
                <div className="flex items-center gap-1 mb-1">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100">
                        <CircleDollarSign className="h-3.5 w-3.5 text-green-600 fill-green-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-600">Cashback</span>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                </div>
                <span className="text-4xl font-bold tracking-tight text-slate-900">$0.23</span>
            </Link>
        </div>
    );
}
