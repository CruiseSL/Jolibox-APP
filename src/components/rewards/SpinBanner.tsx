"use client";

import { useToast } from "@/components/ui/toast";

export function SpinBanner() {
    const { showToast } = useToast();

    return (
        <div className="flex justify-center drop-shadow-sm" onClick={() => showToast("Coming soon")}>
            <img src="/rewards/spin_win.png" className="w-full h-auto object-contain" alt="Spin & Win Big Rewards!" />
        </div>
    );
}
