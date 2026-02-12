

import { NextResponse, NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    const body = await req.json();

    try {
        const n8nweebhook = 'https://larryautomated.app.n8n.cloud/webhook/post-links'
        const { postLinks, captchaToken } = body;

        if (!captchaToken) {
            return NextResponse.json({ message: "CAPTCHA token missing" }, { status: 400 });
        }

        const formData = new FormData();
        formData.append('secret', process.env.TURNSTILE_SECRET_KEY || "");
        formData.append('response', captchaToken);

        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            body: formData,
        });

        const verifyData = await verifyRes.json();

        if (!verifyData.success) {
            return NextResponse.json({ message: "CAPTCHA verification failed" }, { status: 400 });
        }

        if (postLinks && postLinks.length > 0) {
            await fetch(n8nweebhook, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ postLinks })
            })

            return NextResponse.json({ message: "Form submitted successfully!" }, { status: 200 })
        }
        return NextResponse.json({ message: "Please input at least one url" }, { status: 400, statusText: 'Bad Request!, Please follow instructions!' })
    } catch (err) {
        if (err instanceof Error) {
            console.error(err.message)
            return NextResponse.json({ message: err.message }, { status: 500, statusText: err.message })
        }
    }
}