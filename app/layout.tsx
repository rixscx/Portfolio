import React from "react"; // ✅ Use runtime import, not type-only
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manish P - AI Engineer & Full-Stack Developer",
  description:
    "Passionate AI Engineer and Full-Stack Developer specializing in Machine Learning, Deep Learning, and cutting-edge web technologies. Building intelligent solutions that bridge technology and real-world impact.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Full-Stack Developer",
    "Python",
    "JavaScript",
    "React",
    "TensorFlow",
    "Computer Vision",
    "NLP",
    "Portfolio",
  ],
  authors: [{ name: "Manish P" }],
  creator: "Manish P",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://manishp.dev",
    title: "Manish P - AI Engineer & Full-Stack Developer",
    description:
      "Passionate AI Engineer and Full-Stack Developer specializing in Machine Learning, Deep Learning, and cutting-edge web technologies.",
    siteName: "Manish P Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Manish P - AI Engineer & Full-Stack Developer",
    description:
      "Passionate AI Engineer and Full-Stack Developer specializing in Machine Learning, Deep Learning, and cutting-edge web technologies.",
    creator: "@manishp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
