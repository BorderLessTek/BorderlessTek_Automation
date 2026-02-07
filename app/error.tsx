

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { RefreshCcw, AlertTriangle } from "lucide-react";

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error;
    reset: () => void;
}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(containerRef.current, {
            opacity: 0,
            scale: 0.95,
            duration: 0.6,
            ease: "power3.out",
        });
    }, []);

    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50 px-6">
            <div
                ref={containerRef}
                className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center"
            >
                <div className="flex justify-center mb-5">
                    <div className="bg-red-100 p-4 rounded-full">
                        <AlertTriangle className="w-10 h-10 text-red-600" />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-gray-900 mb-3">
                    Something went wrong
                </h1>

                <p className="text-gray-600 mb-6">
                    An unexpected error occurred. Don’t worry — it’s not your fault.
                </p>

                {/* Optional: remove in production */}
                <p className="text-xs text-red-500 mb-6 break-all">
                    {error.message}
                </p>

                <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                >
                    <RefreshCcw size={18} />
                    Try Again
                </button>
            </div>
        </div>
    );
}
