'use client'

import React, { useState, SubmitEvent } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Turnstile } from "@marsidev/react-turnstile";
const UrlForm = () => {

    const [textValue, setTextValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);


    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const postLinks = textValue.split('\n').filter(url => url.trim() !== "");
            const response = await fetch("/api/url-form", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ postLinks, captchaToken }),
            });
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }
            toast.success("Form submitted successfully!");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
                setError(error.message);
            }
        } finally {
            setLoading(false);
            setTextValue("");
            setCaptchaToken(null);
        }
    };


    return (
        <>
            <ToastContainer />
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="calligraffitti-regular text-2xl/9 font-bold tracking-tight text-white">
                        Borderless Tek
                    </h2>
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">Paste LinkedIn post url here!</h2>
                </div>

                <AnimatePresence>
                    <motion.div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeInOut", stiffness: 700, delay: 0.25 }}
                    >
                        <form method="POST" onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="postUrls" className="block text-sm/6 font-medium text-gray-100">
                                    Post Urls
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="postUrls"
                                        name="postUrls"
                                        required
                                        rows={20}
                                        autoComplete="postUrls"
                                        value={textValue}
                                        onChange={(e) => setTextValue(e.target.value)}
                                        className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                                    />
                                </div>
                            </div>



                            <div>
                                <Turnstile
                                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY as string}
                                    onSuccess={(token) => setCaptchaToken(token)}
                                    onError={() => setError("CAPTCHA verification failed")}
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                                >
                                    {loading ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                        {error && <p className="text-red-500">{error}</p>}
                    </motion.div>
                </AnimatePresence>
            </div>
        </>
    )
}

export default React.memo(UrlForm)