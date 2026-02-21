"use client";

import { useMockState } from "@/context/MockStateContext";
import { Switch } from "@/components/ui/switch";
import { BottomNav } from "@/components/rewards/BottomNav";

export default function MePage() {
    const { withdrawalStatus, setWithdrawalStatus, showAds, setShowAds } = useMockState();

    const toggleStatus = (checked: boolean) => {
        setWithdrawalStatus(checked ? "sufficient" : "insufficient");
    };

    return (
        <div className="w-full h-full relative flex flex-col overflow-hidden text-slate-900 bg-gray-50">
            <main className="flex-1 overflow-y-auto scrollbar-hide pb-[100px]">
                <div className="flex flex-col p-6 space-y-8">
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

                        {/* Developer: Ad Controls */}
                        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                            <div className="space-y-0.5">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Global Ad Toggle
                                </label>
                                <p className="text-[10px] text-gray-500">
                                    Enable or disable all mock ads (Splash, Launch, Feed) globally.
                                </p>
                            </div>
                            <Switch
                                checked={showAds}
                                onCheckedChange={setShowAds}
                            />
                        </div>

                        <div className="bg-gray-100 p-3 rounded-lg text-xs font-mono text-gray-600">
                            Current Status: <span className="font-bold text-slate-900">{withdrawalStatus}</span>
                        </div>
                    </div>
                </div>
            </main>
            <BottomNav />
        </div>
    );
}
