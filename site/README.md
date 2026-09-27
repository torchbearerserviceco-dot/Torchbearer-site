# Torchbearer Construction — landing page

Production implementation of the "Torchbearer Landing v2" design (see
`../chats/chat1.md` and `../project/Torchbearer Landing v2.dc.html` for the
original prototype and design history). Next.js App Router + a route
handler that emails quote requests via [Resend](https://resend.com).

## Local development

```bash
npm install
cp .env.example .env.local   # fill in RESEND_API_KEY (see below)
npm run dev
```

Open http://localhost:3000.

## Quote form → email

`src/components/QuoteForm.tsx` posts `FormData` (first name, email,
description, up to 8 photos) to `src/app/api/quote/route.ts`, which sends
an email via Resend to `QUOTE_TO_EMAIL` with the photos as attachments.

Required environment variables (see `.env.example`):

- `RESEND_API_KEY` — from your [Resend dashboard](https://resend.com/api-keys).
- `QUOTE_TO_EMAIL` — defaults to `torchbearerserviceco@gmail.com`.
- `QUOTE_FROM_EMAIL` — must be an address on a domain you've **verified**
  in Resend (Resend → Domains). Until a domain is verified this can stay
  as `onboarding@resend.dev`, but that sender is rate-limited and meant
  for testing only — don't rely on it for real customer traffic.

**Known limit:** photo attachments are inlined into the email request body.
Hosting platforms typically cap serverless function request bodies (e.g.
Vercel's default is a few MB), so very large or numerous photos can fail
to send. The form caps uploads at 8 photos / 8MB each client- and
server-side, which fits comfortably for typical phone photos, but if you
run into failures in practice, the next step would be switching to direct
client-to-storage uploads (e.g. Vercel Blob) and emailing links instead of
attachments.

## Deploying

1. Push this repo to GitHub and import it into [Vercel](https://vercel.com/new).
   - **Root directory:** set it to `site` (this Next.js app lives in a
     subdirectory alongside the design handoff bundle).
2. In the Vercel project's Environment Variables, add `RESEND_API_KEY`,
   `QUOTE_TO_EMAIL`, and `QUOTE_FROM_EMAIL`.
3. In Resend, verify the domain you want to send from (Domains → Add
   Domain, then add the DNS records it gives you at your registrar) so
   `QUOTE_FROM_EMAIL` can use a real address on your domain instead of
   the sandbox one.
4. Point your purchased domain at Vercel (Vercel project → Settings →
   Domains → Add, then update the registrar's nameservers/DNS records as
   instructed).

## Structure

- `src/app/page.tsx` — the landing page markup.
- `src/components/QuoteForm.tsx` — the quote form (client component).
- `src/app/api/quote/route.ts` — route handler that emails submissions.
- `src/lib/fonts.ts` — shared Oswald/Barlow font-family strings (fonts are
  self-hosted via `next/font/google`, configured in `src/app/layout.tsx`).
- `public/logo.png` — the Torchbearer Construction shield emblem (transparent PNG,
  cut from `../project/uploads/torchbearer-construction-logo.webp`).
