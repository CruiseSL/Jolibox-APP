"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useMockState } from "@/context/MockStateContext";

interface WithdrawalSuccessDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function WithdrawalSuccessDialog({ open, onOpenChange }: WithdrawalSuccessDialogProps) {
    const { activeMethod } = useMockState();

    const isCrypto = activeMethod === "crypto";

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-xs text-center bg-white">
                <div className="flex flex-col items-center gap-4 py-4">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />

                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-center">Withdrawal submitted</DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-gray-500 leading-relaxed">
                        {isCrypto
                            ? "After the transfer is completed, we’ll notify you by email."
                            : "We’ll complete the payout within 1-3 business days. Please keep an eye on your account."
                        }
                    </p>
                </div>

                <DialogFooter className="sm:justify-center">
                    <Button
                        className="w-full bg-[#AD00FF] hover:bg-[#9000D4] rounded-full"
                        onClick={() => onOpenChange(false)}
                    >
                        OK
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
