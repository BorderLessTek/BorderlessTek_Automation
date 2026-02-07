


"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(containerRef.current?.children || [], {
            opacity: 0,
            y: 30,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
        });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-indigo-50 px-6">
            <div
                ref={containerRef}
                className="max-w-xl text-center bg-white rounded-2xl shadow-xl p-10"
            >
                <h1 className="text-7xl font-extrabold text-indigo-600 mb-4">404</h1>

                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    Page Not Found
                </h2>

                <p className="text-gray-600 mb-8">
                    The page you’re looking for doesn’t exist or may have been moved.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                    >
                        <Home size={18} />
                        Go Home
                    </Link>

                    <button
                        onClick={() => history.back()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                        <ArrowLeft size={18} />
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
}
