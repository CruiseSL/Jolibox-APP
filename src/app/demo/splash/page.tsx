"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashDemoPage() {
    const router = useRouter();

    useEffect(() => {
        // Clear the session storage to reset "Cold Start"
        sessionStorage.removeItem("hasSeenSplash");

        // Redirect to home to trigger the splash
        // Small delay to ensure storage is cleared
        setTimeout(() => {
            router.push("/");
        }, 100);
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="text-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto"></div>
                <p>Resetting Cold Start State...</p>
            </div>
        </div>
    );
}
