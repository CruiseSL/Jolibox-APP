import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RedeemConfirmDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    item: { title: string; price: string } | null;
    onConfirm: () => void;
}

export function RedeemConfirmDialog({ open, onOpenChange, item, onConfirm }: RedeemConfirmDialogProps) {
    if (!item) return null;

    // Extract numerical part of price for display if needed, or just use full string
    // "100 Jolicoin" -> "100 Jolicoin"

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-full !max-w-[343px] rounded-[24px] p-6 bg-white border-none shadow-xl gap-0">
                <DialogHeader className="pt-2">
                    <DialogTitle className="text-xl font-bold text-center text-slate-900">
                        Confirm Redeem?
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4 text-center">
                    <p className="text-gray-500 font-medium text-[15px] leading-relaxed">
                        Confirm to cost <span className="font-bold text-slate-900">{item.price}</span>
                        <br />
                        to redeem <span className="font-bold text-slate-900">{item.title}</span>
                    </p>
                </div>

                <div className="flex flex-col gap-3 w-full pt-2">
                    <Button
                        onClick={onConfirm}
                        className="w-full bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-full h-12 font-bold text-base shadow-purple-200 shadow-md"
                    >
                        Confirm
                    </Button>
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            className="w-full text-gray-400 hover:text-gray-600 hover:bg-transparent font-medium"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}
