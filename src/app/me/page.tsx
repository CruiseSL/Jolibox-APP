"use client";

import { useMockState } from "@/context/MockStateContext";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/rewards/BottomNav";

export default function MePage() {
    const { withdrawalStatus, setWithdrawalStatus } = useMockState();

    const toggleStatus = (checked: boolean) => {
        setWithdrawalStatus(checked ? "sufficient" : "insufficient");
    };

    return (
        <div className="min-h-screen text-slate-900 pb-20 bg-[#252525]">
            <div className="mx-auto max-w-md min-h-screen bg-gray-50 relative flex flex-col p-6 space-y-8">
                <h1 className="text-2xl font-bold">Me</h1>

                <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
                    <h2 className="font-bold text-lg border-b pb-2">Developer Tools</h2>

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Simulate Sufficient Balance
                            </label>
                            <p className="text-[10px] text-gray-500">
                                Toggle between "Insufficient" ($3.20) and "Sufficient" states for Cashback page.
                            </p>
                        </div>
                        <Switch
                            checked={withdrawalStatus === "sufficient"}
                            onCheckedChange={toggleStatus}
                        />
                    </div>

                    <div className="bg-gray-100 p-3 rounded-lg text-xs font-mono text-gray-600">
                        Current Status: <span className="font-bold text-slate-900">{withdrawalStatus}</span>
                    </div>
                </div>

            </div>
            <BottomNav />
        </div>
    );
}
