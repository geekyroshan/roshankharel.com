import "@/app/styles/globals.css";
import Script from "next/script";
import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";
import { Providers } from "./providers";
import { umamiSiteId } from "@/lib/env.api";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const options = {
  title: "Roshan Kharel | AI Engineer & Architect",
  description:
    "Roshan Kharel is a specialized AI Engineer and MLOps Architect building intelligent systems and scalable infrastructure.",
  url: "https://roshankharel.com",
  ogImage:
    "https://res.cloudinary.com/geekyroshan/image/upload/v1692635746/roshankharel/og.png",
};

export const metadata: Metadata = {
  title: options.title,
  metadataBase: new URL(options.url),
  description: options.description,
  openGraph: {
    title: options.title,
    url: options.url,
    siteName: "roshankharel.com",
    locale: "en-US",
    type: "website",
    description: options.description,
    images: options.ogImage,
  },
  alternates: {
    canonical: options.url,
  },
  other: {
    "google-site-verification": "IzcWMgn5Qjf-LCtA337KTGjivsf9bmod_1pZ-jxYQh8",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans dark:bg-zinc-950 bg-white dark:text-white text-zinc-700`}
      >
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
      {/* Only render Umami script if website ID is available */}
      {umamiSiteId && (
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id={umamiSiteId}
        />
      )}
    </html>
  );
}
