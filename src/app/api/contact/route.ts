import { contactSchema } from "@/lib/contactSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const parsed = contactSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }

        // TODO: Integrate with an email service (e.g. Resend, Nodemailer, Supabase)
        // For now we just log and return success
        console.log("New contact message:", parsed.data);

        return NextResponse.json(
            { message: "Message received! I'll get back to you soon." },
            { status: 200 }
        );
    } catch {
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
