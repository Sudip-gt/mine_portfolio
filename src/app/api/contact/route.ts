import { contactSchema } from "@/lib/contactSchema";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from 'resend';

// Initialize Resend with your API key
// Make sure to add RESEND_API_KEY to your environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

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

        const { name, email, message } = parsed.data;

        // Send email using Resend
        const { error } = await resend.emails.send({
            from: `${process.env.PERSONAL_NAME ?? "Portfolio"} <onboarding@resend.dev>`,
            to: process.env.PERSONAL_EMAIL!,
            subject: `New message from ${name} — Portfolio Contact`,
            replyTo: email,
            html: `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#0f0f0f;font-family:Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f0f;padding:40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#1a1a1a;border-radius:12px;border:1px solid #27272a;overflow:hidden;max-width:600px;width:100%;">
            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:32px 40px;">
                <h1 style="margin:0;color:#fff;font-size:22px;font-weight:700;">New Contact Message</h1>
                <p style="margin:6px 0 0;color:rgba(255,255,255,0.7);font-size:14px;">From your portfolio website</p>
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td style="padding:32px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding-bottom:20px;">
                      <p style="margin:0 0 4px;color:#6366f1;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Sender</p>
                      <p style="margin:0;color:#e4e4e7;font-size:16px;font-weight:600;">${name}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:20px;">
                      <p style="margin:0 0 4px;color:#6366f1;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Email</p>
                      <a href="mailto:${email}" style="color:#818cf8;font-size:15px;text-decoration:none;">${email}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-bottom:24px;">
                      <p style="margin:0 0 8px;color:#6366f1;font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Message</p>
                      <div style="background:#0f0f0f;border:1px solid #27272a;border-radius:8px;padding:16px;">
                        <p style="margin:0;color:#d4d4d8;font-size:15px;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</p>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <a href="mailto:${email}?subject=Re: Your message on my portfolio"
                         style="display:inline-block;background:#4f46e5;color:#fff;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">
                        Reply to ${name}
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:16px 40px;border-top:1px solid #27272a;">
                <p style="margin:0;color:#52525b;font-size:12px;">Sent via your portfolio contact form</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json(
                { error: "Failed to send email. Please try again." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Message sent successfully! I'll get back to you soon." },
            { status: 200 }
        );
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}

