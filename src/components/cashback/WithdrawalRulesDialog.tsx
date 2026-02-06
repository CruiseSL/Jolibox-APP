import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

interface WithdrawalRulesDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function WithdrawalRulesDialog({ open, onOpenChange }: WithdrawalRulesDialogProps) {
    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-w-md mx-auto h-[85vh] rounded-t-2xl px-6">
                <div className="mx-auto w-full max-w-sm flex flex-col h-full">
                    <DrawerHeader className="px-0 py-6">
                        <DrawerTitle className="text-lg font-bold text-center">Withdrawal Rules</DrawerTitle>
                    </DrawerHeader>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto -mr-2 pr-2 text-sm text-gray-500 leading-relaxed space-y-4 pb-6">
                        <ol className="list-decimal pl-4 space-y-4">
                            <li>
                                <span className="font-medium text-slate-700">Minimum withdrawal amount:</span> The minimum cashback amount that can be withdrawn is [xxx].
                            </li>
                            <li>
                                <span className="font-medium text-slate-700">Processing time:</span> Withdrawal requests will normally be processed within 1-3 business days, depending on the processing time of the chosen withdrawal method.
                            </li>
                            <li>
                                <span className="font-medium text-slate-700">Withdrawal fees:</span> We don&apos;t charge withdrawal fees, but certain fees may apply due to charges from the withdrawal method.
                            </li>
                            <li>
                                <span className="font-medium text-slate-700">Eligibility:</span> Cashback withdrawal is only available to users who have met the requirements and Jolibox&apos;s terms and conditions.
                            </li>
                            <li>
                                <span className="font-medium text-slate-700">Suspension and refusal:</span> Jolibox reserves the right to suspend and refuse cashback requests if abnormal or fraudulent activities are identified.
                            </li>
                        </ol>

                        <div className="space-y-2 pt-2 border-t border-gray-100 mt-4">
                            <p className="mt-4">The cashback program&apos;s terms and conditions are subject to change at any time.</p>
                            <p>By withdrawing cashback, you acknowledge that you have read, understood, and agreed to these rules and terms.</p>
                        </div>
                    </div>

                    <DrawerFooter className="px-0 py-6 mt-auto">
                        <DrawerClose asChild>
                            <Button
                                className="w-full bg-[#AD00FF] hover:bg-[#9600db] text-white rounded-full h-12 font-bold text-base"
                            >
                                Close
                            </Button>
                        </DrawerClose>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
