import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

const MAX_PHOTOS = 8;
const MAX_PHOTO_BYTES = 8 * 1024 * 1024;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const firstName = String(formData.get("firstName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const photoEntries = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0)
    .slice(0, MAX_PHOTOS);

  const okName = firstName.length > 0;
  const okEmail = /.+@.+\..+/.test(email);
  if (!okName || !okEmail) {
    return NextResponse.json(
      { error: "Please provide a valid first name and email." },
      { status: 400 }
    );
  }

  for (const photo of photoEntries) {
    if (photo.size > MAX_PHOTO_BYTES) {
      return NextResponse.json(
        { error: "Each photo must be under 8MB." },
        { status: 400 }
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL || "torchbearerserviceco@gmail.com";
  const fromEmail = process.env.QUOTE_FROM_EMAIL || "onboarding@resend.dev";

  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Quote requests are not configured yet. Please email us directly." },
      { status: 500 }
    );
  }

  const attachments = await Promise.all(
    photoEntries.map(async (photo) => ({
      filename: photo.name || "photo.jpg",
      content: Buffer.from(await photo.arrayBuffer()),
    }))
  );

  const resend = new Resend(apiKey);

  const safeName = escapeHtml(firstName);
  const safeEmail = escapeHtml(email);
  const safeDescription = escapeHtml(description || "(no description provided)").replace(
    /\n/g,
    "<br>"
  );

  const { error } = await resend.emails.send({
    from: `Torchbearer Website <${fromEmail}>`,
    to: [toEmail],
    replyTo: email,
    subject: `New quote request from ${firstName}`,
    html: `
      <div style="font-family:sans-serif; font-size:15px; color:#0c1d39;">
        <p><strong>First name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Project details:</strong><br>${safeDescription}</p>
        <p><strong>Photos attached:</strong> ${attachments.length}</p>
      </div>
    `,
    attachments,
  });

  if (error) {
    console.error("Resend send failed", error);
    return NextResponse.json(
      { error: "Could not send your request. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
