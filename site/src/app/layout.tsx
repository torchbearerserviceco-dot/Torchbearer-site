import type { Metadata } from "next";
import { Oswald, Barlow } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Torchbearer Construction | One Quote. Not A Dime More.",
  description:
    "Handyman work, renovation, custom carpentry, fencing, land clearing and more across the Greater Knoxville Area, TN. One straight hard bid — no hidden fees, no surprises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${oswald.variable} ${barlow.variable}`}>
      <body>{children}</body>
    </html>
  );
}
