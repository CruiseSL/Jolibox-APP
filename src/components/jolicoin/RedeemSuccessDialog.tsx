import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RedeemSuccessDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: { title: string } | null;
}

export function RedeemSuccessDialog({ open, onOpenChange, item }: RedeemSuccessDialogProps) {
    if (!item) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full !max-w-[343px] rounded-[24px] p-8 bg-white border-none shadow-xl gap-0">
                <DialogHeader className="space-y-6">
                    <DialogTitle className="text-xl font-bold text-center text-slate-900">
                        Redeem Successful
                    </DialogTitle>
                </DialogHeader>

                <div className="text-center pb-8 space-y-1">
                    <p className="text-gray-900 font-bold text-[15px]">
                        You have redeemed
                    </p>
                    <p className="text-gray-900 font-bold text-[15px]">
                        {item.title}
                    </p>
                </div>

                <DialogClose asChild>
                    <Button
                        className="w-full bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-full h-12 font-bold text-base shadow-purple-200 shadow-md"
                    >
                        Got it
                    </Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    );
}
