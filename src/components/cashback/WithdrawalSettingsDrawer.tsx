"use client";

import { useState, useEffect } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useMockState, WithdrawalMethod, WithdrawalDetails } from "@/context/MockStateContext";

interface WithdrawalSettingsDrawerProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSaveSuccess?: () => void;
}

export function WithdrawalSettingsDrawer({ open, onOpenChange, onSaveSuccess }: WithdrawalSettingsDrawerProps) {
    const { savedDetails, setSavedDetails, setActiveMethod, activeMethod } = useMockState();

    // Local state for the form
    const [method, setMethod] = useState<WithdrawalMethod>(activeMethod || "paynow");
    const [localDetails, setLocalDetails] = useState<WithdrawalDetails>(savedDetails);
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Sync local state when open changes
    useEffect(() => {
        if (open) {
            setMethod(activeMethod || "paynow");
            setLocalDetails(savedDetails);
            setErrors({});
        }
    }, [open, activeMethod, savedDetails]);

    const handleMethodChange = (value: string) => {
        setMethod(value as WithdrawalMethod);
        setErrors({});
    };

    const handleInputChange = (
        methodKey: keyof WithdrawalDetails,
        field: string,
        value: string
    ) => {
        setLocalDetails(prev => ({
            ...prev,
            [methodKey]: { ...prev[methodKey], [field]: value }
        }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        if (method === "paynow") {
            const { email } = localDetails.paynow;
            if (!email) newErrors.email = "Please enter your PayNow email.";
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

    const handleSave = () => {
        if (!validate()) return;

        const finalDetails = { ...localDetails };

        setSavedDetails(finalDetails);
        setActiveMethod(method);
        onOpenChange(false);
        if (onSaveSuccess) onSaveSuccess();
    };

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent className="max-w-md mx-auto rounded-t-2xl px-6 bg-white">
                <div className="mx-auto w-full max-w-sm flex flex-col">
                    <DrawerHeader className="px-0 py-6 flex justify-between items-center relative">
                        <DrawerTitle className="text-lg font-bold w-full text-center">Add withdrawal account</DrawerTitle>
                        <DrawerClose asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 absolute right-0 top-1/2 -translate-y-1/2">
                                <X className="h-5 w-5" />
                            </Button>
                        </DrawerClose>
                    </DrawerHeader>

                    {/* Scrollable Form Content */}
                    <div className="flex-1 space-y-6 pb-6">
                        {/* Method Selector */}
                        <div className="space-y-2">
                            <Label>Withdrawal method</Label>
                            <Select value={method || "paynow"} onValueChange={handleMethodChange}>
                                <SelectTrigger className="h-12 bg-gray-50 border-gray-100">
                                    <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="paynow">PayNow</SelectItem>
                                    <SelectItem value="crypto">Crypto (USDT/USDC)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Fields */}
                        {method === "paynow" && (
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    placeholder="Enter email"
                                    value={localDetails.paynow.email}
                                    onChange={(e) => handleInputChange("paynow", "email", e.target.value)}
                                    className={`h-12 bg-gray-50 border-gray-100 ${errors.email ? "border-red-500" : ""}`}
                                />
                                {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                            </div>
                        )}

                        {method === "crypto" && (
                            <>
                                <div className="space-y-2">
                                    <Label>Token type</Label>
                                    <Select
                                        value={localDetails.crypto.token}
                                        onValueChange={(val) => handleInputChange("crypto", "token", val)}
                                    >
                                        <SelectTrigger className="h-12 bg-gray-50 border-gray-100">
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
                                        className={`h-12 bg-gray-50 border-gray-100 ${errors.address ? "border-red-500" : ""}`}
                                    />
                                    {errors.address && <p className="text-xs text-red-500">{errors.address}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label>Email</Label>
                                    <Input
                                        placeholder="Enter email for notification"
                                        value={localDetails.crypto.email}
                                        onChange={(e) => handleInputChange("crypto", "email", e.target.value)}
                                        className={`h-12 bg-gray-50 border-gray-100 ${errors.email ? "border-red-500" : ""}`}
                                    />
                                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                                </div>
                            </>
                        )}
                    </div>

                    <DrawerFooter className="px-0 py-6 mt-auto flex-row gap-4">
                        <DrawerClose asChild>
                            <Button variant="outline" className="flex-1 h-12 rounded-full font-bold border-gray-200 text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                                Cancel
                            </Button>
                        </DrawerClose>
                        <Button
                            className="flex-1 h-12 rounded-full bg-[#AD00FF] hover:bg-[#9600db] text-white font-bold text-lg shadow-purple-200 shadow-md"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
