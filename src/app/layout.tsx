import type { Metadata } from "next";
import Script from "next/script";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Spicy Books — Find Romance Book Spice Levels, Tropes & Content Warnings",
    template: "%s | SpicyBooks",
  },
  description:
    "SpicyBooks rates every romance and romantasy book on a 0-5 spice scale. Find spice levels, tropes, and content warnings before your next read.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LB584VVXRP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LB584VVXRP');
          `}
        </Script>
        <Header />
        <main>{children}</main>
        <footer className="relative mt-20 border-t" style={{ borderColor: "var(--border)" }}>
          <div
            className="absolute inset-0 opacity-50"
            style={{ background: "linear-gradient(180deg, var(--surface-warm), var(--background))" }}
          />
          <div className="relative mx-auto max-w-6xl px-6 py-12 text-center">
            <div className="divider-ornament mb-6">
              <span className="text-sm tracking-widest uppercase" style={{ color: "var(--text-muted)" }}>
                SpicyBooks
              </span>
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              © {new Date().getFullYear()} SpicyBooks. All rights reserved.
            </p>
            <p className="mt-1 text-xs" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
              As an Amazon Associate we earn from qualifying purchases.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
