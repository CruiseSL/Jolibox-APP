"use client";

import { useMockState } from "@/context/MockStateContext";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Lock, ArrowRight, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

import { useState } from "react";
import { WithdrawalConfirmationDrawer } from "./WithdrawalConfirmationDrawer";
import { WithdrawalSuccessDialog } from "./WithdrawalSuccessDialog";

export function WithdrawalCard() {
    const { withdrawalStatus, setWithdrawalStatus, activeMethod } = useMockState();
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const isInsufficient = withdrawalStatus === "insufficient";

    const handleWithdrawClick = () => {
        if (!amount) return;

        const value = parseFloat(amount);
        if (isNaN(value) || value < 4) {
            setError("Minimum withdrawal amount is $4");
            return;
        }
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        setConfirmOpen(false);
        // Simulate API call delay if needed
        setTimeout(() => {
            setSuccessOpen(true);
        }, 300);
    };

    return (
        <div className="space-y-6">
            {/* Status Card */}
            <div className="rounded-xl bg-white p-5 shadow-sm border border-dashed border-purple-200">
                {isInsufficient ? (
                    <>
                        <h3 className="text-sm font-medium text-slate-700 mb-3">
                            You're <span className="font-bold text-slate-900">$0.80</span> away from withdrawal
                        </h3>

                        <div className="space-y-1 mb-6">
                            <Progress value={80} className="h-2" indicatorClassName="bg-[#AD00FF]" />
                            <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                                <span>$3.20</span>
                                <span>$4.00</span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs text-gray-500 font-medium">Earn more Jolicoins to reach the minimum:</p>

                            <Link href="/" className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium text-slate-700">Tasks & check-in (faster)</span>
                                <div className="flex items-center gap-1 text-[#AD00FF] text-xs font-bold">
                                    Go to Rewards <ArrowRight className="h-3 w-3" />
                                </div>
                            </Link>

                            <Link href="/discover" className="flex justify-between items-center bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                                <span className="text-sm font-medium text-slate-700">Play games & watch dramas</span>
                                <div className="flex items-center gap-1 text-[#AD00FF] text-xs font-bold">
                                    Go to Discover <ArrowRight className="h-3 w-3" />
                                </div>
                            </Link>
                        </div>

                        <div className="mt-6 space-y-2">
                            <h4 className="text-sm text-gray-500 font-medium">Withdraw</h4>
                            <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg h-12 px-4 text-gray-300">
                                <Lock className="h-4 w-4" />
                                <span className="text-sm font-medium">$ Minimum $4 to withdraw</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Sufficient State Header */}
                        <div className="flex items-center gap-2 mb-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <h3 className="text-sm font-medium text-slate-700">You can withdraw now</h3>
                        </div>

                        {/* Progress Bar (Full) */}
                        <div className="space-y-1 mb-6">
                            <Progress value={100} className="h-2" indicatorClassName="bg-[#AD00FF]" />
                            <div className="flex justify-end text-[10px] text-gray-400 font-medium">
                                <span>$4.00</span>
                            </div>
                        </div>

                        {/* Withdraw Input */}
                        <div className="mt-6 space-y-2">
                            <h4 className="text-sm text-gray-500 font-medium">Withdraw</h4>
                            <div className={cn(
                                "flex items-center gap-2 bg-white border rounded-lg h-12 px-4 shadow-sm transition-colors",
                                error ? "border-red-500 ring-1 ring-red-100" : "border-gray-200"
                            )}>
                                <span className="text-gray-400 text-sm">$</span>
                                <input
                                    type="text"
                                    placeholder="Amount (min $4, integers only)"
                                    className="flex-1 text-sm text-slate-900 placeholder:text-gray-300 outline-none"
                                    value={amount}
                                    onChange={(e) => {
                                        setAmount(e.target.value);
                                        if (error) setError("");
                                    }}
                                />
                            </div>
                            {error && (
                                <p className="text-xs text-red-500 ml-1 animate-in fade-in slide-in-from-top-1">
                                    {error}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>

            {/* Action Button */}
            <Button
                className={cn(
                    "w-full h-14 rounded-full text-lg font-bold shadow-xl transition-all text-white",
                    (isInsufficient || !amount)
                        ? "disabled:opacity-50 disabled:cursor-not-allowed bg-[#C6ADF8] hover:bg-[#B08CEF]"
                        : "bg-[#AD00FF] hover:bg-[#9000D4] shadow-purple-200"
                )}
                disabled={isInsufficient || !amount}
                onClick={handleWithdrawClick}
            >
                Withdraw via <span className="font-black italic ml-1 uppercase">{activeMethod || '...'}</span>
            </Button>

            {/* Dialogs */}
            <WithdrawalConfirmationDrawer
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                amount={amount}
                onConfirm={handleConfirm}
            />

            <WithdrawalSuccessDialog
                open={successOpen}
                onOpenChange={(open) => {
                    setSuccessOpen(open);
                    if (!open) {
                        // Reset to insufficient state after closing success dialog
                        setWithdrawalStatus("insufficient");
                    }
                }}
            />
        </div>
    );
}
