"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft } from "lucide-react";
import { useMockState, WithdrawalMethod, WithdrawalDetails } from "@/context/MockStateContext";

interface WithdrawalSettingsModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isMandatory?: boolean; // If true, closing without save exits the page
}

export function WithdrawalSettingsModal({ open, onOpenChange, isMandatory = false }: WithdrawalSettingsModalProps) {
    const router = useRouter();
    const { savedDetails, setSavedDetails, setActiveMethod, activeMethod } = useMockState();

    // Local state for the form
    const [method, setMethod] = useState<WithdrawalMethod>(activeMethod || "paynow");
    const [localDetails, setLocalDetails] = useState<WithdrawalDetails>(savedDetails);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Sync local state when modal opens or context changes
    useEffect(() => {
        if (open) {
            setMethod(activeMethod || "paynow");
            setLocalDetails(savedDetails);
            setErrors({});
        }
    }, [open, activeMethod, savedDetails]);

    // Handle Method Change
    const handleMethodChange = (value: string) => {
        setMethod(value as WithdrawalMethod);
        setErrors({}); // Clear errors on method switch
    };

    // Generic Input Change Handler
    const handleInputChange = (
        methodKey: keyof WithdrawalDetails,
        field: string,
        value: string
    ) => {
        setLocalDetails(prev => ({
            ...prev,
            [methodKey]: {
                ...prev[methodKey],
                [field]: value
            }
        }));
        // Clear specific error
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    // Validation Logic
    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (method === "paynow") {
            const { email } = localDetails.paynow;
            if (!email) newErrors.email = "Please enter your PayNow email.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";
        } else if (method === "paypal") {
            const { name, email } = localDetails.paypal;
            if (!name?.trim()) newErrors.name = "Please enter your PayPal account name.";
            else if (/[^a-zA-Z0-9\s.\-']/.test(name)) newErrors.name = "Invalid name. Please remove special characters.";

            if (!email?.trim()) newErrors.email = "Please enter your PayPal email.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";
        } else if (method === "crypto") {
            const { address, email } = localDetails.crypto;
            if (!address?.trim()) newErrors.address = "Please enter your wallet address.";
            if (!email?.trim()) newErrors.email = "Please enter your email.";
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
        }

        return isValid;
    };

    // Handle Save
    const handleSave = () => {
        if (!validate()) return;

        // Commit to global state
        // Trim inputs before saving where necessary
        const finalDetails = { ...localDetails };
        if (method === "paypal") {
            finalDetails.paypal.name = finalDetails.paypal.name.trim();
            finalDetails.paypal.email = finalDetails.paypal.email.trim();
        }

        setSavedDetails(finalDetails);
        setActiveMethod(method);
        onOpenChange(false);
    };

    // Handle Close / Cancel
    const handleClose = () => {
        if (isMandatory) {
            router.back(); // Exit page if mandatory
        } else {
            onOpenChange(false); // Just close
        }
    };

    return (
        <Dialog open={open} onOpenChange={(val) => !val && handleClose()}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden bg-white [&>button]:hidden">
                <DialogHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                    <DialogTitle className="text-base font-semibold">Add a withdrawal account</DialogTitle>
                    <button onClick={handleClose} className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
                        <X className="h-4 w-4" />
                        <span className="sr-only">Close</span>
                    </button>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Method Selector */}
                    <div className="space-y-2">
                        <Label>Withdrawal method</Label>
                        <Select value={method || "paynow"} onValueChange={handleMethodChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select method" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="paynow">PayNow</SelectItem>
                                <SelectItem value="paypal">PayPal</SelectItem>
                                <SelectItem value="crypto">Crypto (USDT/USDC)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Dynamic Fields */}
                    {method === "paynow" && (
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                                placeholder="Enter email"
                                value={localDetails.paynow.email}
                                onChange={(e) => handleInputChange("paynow", "email", e.target.value)}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>
                    )}

                    {method === "paypal" && (
                        <>
                            <div className="space-y-2">
                                <Label>PayPal Account Name</Label>
                                <Input
                                    placeholder="Enter account name"
                                    maxLength={50}
                                    value={localDetails.paypal.name}
                                    onChange={(e) => handleInputChange("paypal", "name", e.target.value)}
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>PayPal Account Email</Label>
                                <Input
                                    placeholder="Enter PayPal email"
                                    maxLength={254}
                                    value={localDetails.paypal.email}
                                    onChange={(e) => handleInputChange("paypal", "email", e.target.value)}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                        </>
                    )}

                    {method === "crypto" && (
                        <>
                            <div className="space-y-2">
                                <Label>Token type</Label>
                                <Select
                                    value={localDetails.crypto.token}
                                    onValueChange={(val) => handleInputChange("crypto", "token", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select token" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="USDT">USDT</SelectItem>
                                        <SelectItem value="USDC">USDC</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Wallet address</Label>
                                <Input
                                    placeholder="Enter wallet address"
                                    value={localDetails.crypto.address}
                                    onChange={(e) => handleInputChange("crypto", "address", e.target.value)}
                                    className={errors.address ? "border-red-500" : ""}
                                />
                                {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    placeholder="Enter email for notification"
                                    value={localDetails.crypto.email}
                                    onChange={(e) => handleInputChange("crypto", "email", e.target.value)}
                                    className={errors.email ? "border-red-500" : ""}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-4 border-t flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="flex-1 bg-[#AD00FF] hover:bg-[#9000D4] text-white"
                        onClick={handleSave}
                    >
                        Save
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
