import type { Metadata } from "next";
import { Instrument_Serif, Instrument_Sans } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Snehasish Ray",
  description: "Software Engineer and Interface Designer based in India",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Snehasish Ray",
    description: "Software Engineer and Interface Designer based in India",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Snehasish Ray - Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Snehasish Ray",
    description: "Software Engineer and Interface Designer based in India",
    images: ["/banner.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">{children}</body>
    </html>
  );
}
