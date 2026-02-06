"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { RedeemConfirmDialog } from "./RedeemConfirmDialog";
import { RedeemSuccessDialog } from "./RedeemSuccessDialog";

export function MembershipSection() {
    const [selectedItem, setSelectedItem] = useState<{ title: string; price: string } | null>(null);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);

    const items = [
        {
            title: "Basic · 1 Day Pass",
            price: "10 Jolicoin",
            subtitle: "Skip all game ads for today",
            tag: "Most Popular",
            tagColor: "bg-purple-100 text-purple-700"
        },
        {
            title: "Basic · 3 Days Pass",
            price: "25 Jolicoin",
            subtitle: "Enjoy ad-free gaming for 3 days",
            tag: "Best Value",
            tagColor: "bg-green-100 text-green-700"
        },
        {
            title: "Basic · 7 Days Pass",
            price: "50 Jolicoin",
            subtitle: "A full week without game ads",
            tag: null
        },
        {
            title: "Standard · 1 Day Pass",
            price: "20 Jolicoin",
            subtitle: "Skip game & drama ads for a day",
            tag: "Try Premium",
            tagColor: "bg-blue-100 text-blue-600"
        },
    ];

    const handleRedeemClick = (item: typeof items[0]) => {
        setSelectedItem(item);
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
        <div className="rounded-2xl bg-white p-5 shadow-sm space-y-4">
            <h4 className="font-bold text-slate-900 text-sm">Day Pass</h4>

            <div className="space-y-3">
                {items.map((item, idx) => (
                    <div key={idx} className="rounded-xl bg-gray-50 p-4 border border-gray-100 flex flex-col justify-center gap-3">
                        <div className="flex justify-between items-start w-full">
                            {/* Left Content */}
                            <div className="flex flex-col items-start gap-1 flex-1 pr-2">
                                {item.tag && (
                                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.tagColor} mb-0.5`}>
                                        {item.tag}
                                    </span>
                                )}
                                <div className="font-bold text-slate-900 text-sm">
                                    {item.title}
                                </div>
                                <div className="text-xs text-gray-400 font-medium">
                                    {item.subtitle}
                                </div>
                            </div>

                            {/* Right Content: Price + Button */}
                            <div className="flex flex-col items-end gap-2 shrink-0">
                                <span className="text-[#AD00FF] font-bold text-sm">
                                    {item.price}
                                </span>
                                <Button
                                    size="sm"
                                    className="h-7 px-4 bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-full text-xs font-semibold shadow-sm shadow-purple-100"
                                    onClick={() => handleRedeemClick(item)}
                                >
                                    Redeem
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <RedeemConfirmDialog
                open={confirmOpen}
                onOpenChange={setConfirmOpen}
                item={selectedItem}
                onConfirm={handleConfirm}
            />

            <RedeemSuccessDialog
                open={successOpen}
                onOpenChange={setSuccessOpen}
                item={selectedItem}
            />
        </div>
    );
}
