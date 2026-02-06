"use client";

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useMockState, WithdrawalMethod, WithdrawalDetails } from "@/context/MockStateContext";
import { useState } from "react";
import { WithdrawalSettingsDrawer } from "./WithdrawalSettingsDrawer";
import { ChevronRight } from "lucide-react";

interface WithdrawalConfirmationDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    amount: string;
    onConfirm: () => void;
}

export function WithdrawalConfirmationDrawer({ open, onOpenChange, amount, onConfirm }: WithdrawalConfirmationDrawerProps) {
    const { activeMethod, savedDetails } = useMockState();
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Helper to format method summary
    const getMethodSummary = () => {
        if (!activeMethod) return "No method selected";

        const details = savedDetails[activeMethod];

        if (activeMethod === "paynow") {
            const email = (details as WithdrawalDetails['paynow']).email;
            return `PayNow · ${maskEmail(email)}`;
        }
        if (activeMethod === "paypal") {
            // PayPal · Name · Email
            const { name, email } = details as WithdrawalDetails['paypal'];
            // Mask name: Jo***
            const maskedName = name.length > 2 ? `${name.substring(0, 2)}***` : name;
            return `PayPal · ${maskedName} · ${maskEmail(email)}`;
        }
        if (activeMethod === "crypto") {
            // Crypto(USDT) · 0x12***89ab · Email
            const { token, address, email } = details as WithdrawalDetails['crypto'];
            const maskedAddress = address.length > 8
                ? `${address.substring(0, 4)}***${address.substring(address.length - 4)}`
                : address;
            return `Crypto(${token}) · ${maskedAddress} · ${maskEmail(email)}`;
        }
        return activeMethod;
    };

    const maskEmail = (email: string) => {
        if (!email) return "";
        const [local, domain] = email.split("@");
        if (!local) return email;
        return `${local.charAt(0)}***@${domain}`;
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="bg-white max-w-md mx-auto">
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle className="text-center text-lg font-bold">Confirm withdrawal</DrawerTitle>
                    </DrawerHeader>

                    <div className="p-4 space-y-6">
                        {/* Amount */}
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-gray-500 text-sm">Amount</span>
                            <span className="text-xl font-bold text-slate-900">${amount}</span>
                        </div>

                        {/* Method */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 text-sm">Method</span>
                                <button
                                    onClick={() => setSettingsOpen(true)}
                                    className="text-xs text-[#AD00FF] font-medium flex items-center"
                                >
                                    Change <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-lg text-sm font-medium text-slate-700 break-all">
                                {getMethodSummary()}
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="space-y-3 pt-4">
                            <Button
                                className="w-full h-12 rounded-full bg-[#AD00FF] hover:bg-[#9000D4] text-white font-bold text-lg"
                                onClick={onConfirm}
                            >
                                Confirm
                            </Button>
                            <DrawerClose asChild>
                                <Button variant="outline" className="w-full h-12 rounded-full border-none text-gray-400 hover:text-gray-600 font-medium">
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </div>
                    </div>
                </div>
            </DrawerContent>

            {/* Nested Settings Drawer */}
            <WithdrawalSettingsDrawer
                open={settingsOpen}
                onOpenChange={setSettingsOpen}
            />
        </Drawer>
    );
}
