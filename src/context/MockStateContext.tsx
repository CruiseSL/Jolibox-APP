"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type WithdrawalStatus = "insufficient" | "sufficient";

export type WithdrawalMethod = 'paynow' | 'paypal' | 'crypto' | null;

export interface WithdrawalDetails {
    paynow: { email: string };
    paypal: { name: string; email: string };
    crypto: { token: 'USDT' | 'USDC'; address: string; email: string };
}

// Initial empty state for details
const initialDetails: WithdrawalDetails = {
    paynow: { email: '' },
    paypal: { name: '', email: '' },
    crypto: { token: 'USDT', address: '', email: '' }
};

interface MockStateContextType {
    withdrawalStatus: WithdrawalStatus;
    setWithdrawalStatus: (status: WithdrawalStatus) => void;
    showAds: boolean;
    setShowAds: (show: boolean) => void;
    activeMethod: WithdrawalMethod;
    setActiveMethod: (method: WithdrawalMethod) => void;
    savedDetails: WithdrawalDetails;
    setSavedDetails: (details: WithdrawalDetails) => void;
    updateDetail: <K extends keyof WithdrawalDetails>(method: K, data: Partial<WithdrawalDetails[K]>) => void;
}

const MockStateContext = createContext<MockStateContextType | undefined>(undefined);

export function MockStateProvider({ children }: { children: ReactNode }) {
    const [withdrawalStatus, setWithdrawalStatus] = useState<WithdrawalStatus>("insufficient");
    const [showAds, setShowAds] = useState<boolean>(true);
    const [activeMethod, setActiveMethod] = useState<WithdrawalMethod>(null);
    const [savedDetails, setSavedDetails] = useState<WithdrawalDetails>(initialDetails);

    const updateDetail = <K extends keyof WithdrawalDetails>(method: K, data: Partial<WithdrawalDetails[K]>) => {
        setSavedDetails(prev => ({
            ...prev,
            [method]: { ...prev[method], ...data }
        }));
    };

    return (
        <MockStateContext.Provider value={{
            withdrawalStatus,
            setWithdrawalStatus,
            showAds,
            setShowAds,
            activeMethod,
            setActiveMethod,
            savedDetails,
            setSavedDetails,
            updateDetail
        }}>
            {children}
        </MockStateContext.Provider>
    );
}

export function useMockState() {
    const context = useContext(MockStateContext);
    if (context === undefined) {
        throw new Error("useMockState must be used within a MockStateProvider");
    }
    return context;
}
